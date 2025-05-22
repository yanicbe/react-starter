import { queryClient } from "@/lib/api/client";
import { UserInformationResponseDto } from "@/lib/api/interfaces/user.interface";
import { useCurrentUser } from "@/lib/api/requests/user.requests";
import ErrorModal from "@/ui-components/ui/error-modal";
import { BlueLoadingFallback, SuspenseWrapper } from "@/ui-components/ui/suspense-wrapper";
import { useAuth0 } from "@auth0/auth0-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface IContext {
  accessToken: string;
  user?: UserInformationResponseDto;
  error?: Error;
  setAccessToken?: Dispatch<SetStateAction<string>>;
  setUser?: Dispatch<SetStateAction<UserInformationResponseDto | undefined>>;
  setError?: Dispatch<SetStateAction<Error | undefined>>;
}

export enum ErrorEntity {
  UserForbidden = "UserForbidden",
}

export interface Error {
  message: string;
  title: string;
  error: string;
  statusCode: number;
  entity: ErrorEntity;
  location: {
    path: string;
    redirect: boolean;
  };
  isClosable?: boolean;
  withReload?: boolean;
  mail?: string;
}

export const Context = React.createContext<IContext>({
  accessToken: "",
});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<UserInformationResponseDto | undefined>();
  const [error, setError] = useState<Error>();
  const [isTokenReady, setIsTokenReady] = useState(false);
  const auth0 = useAuth0();

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (auth0.isAuthenticated) {
        try {
          const token = await auth0.getAccessTokenSilently({
            authorizationParams: { scope: "openid profile email offline_access" },
          });
          setAccessToken(token);
          setIsTokenReady(true);
        } catch (error) {
          console.error("Failed to get access token:", error);
          setIsTokenReady(false);
        }
      } else if (!auth0.isLoading) {
        // Only redirect if not on excluded paths
        const shouldRedirect =
          window.location.pathname !== "/register" &&
          !window.location.href.includes("/invite") &&
          !window.location.href.includes("/reset");

        console.log("shouldRedirect", shouldRedirect);

        if (shouldRedirect) {
          auth0.loginWithRedirect({
            appState: {
              returnTo: window.location.pathname,
            },
          });
        }
      }
    };

    fetchAccessToken();
  }, [auth0, auth0.isAuthenticated, auth0.isLoading]);

  // Show loading while Auth0 is initializing
  if (auth0.isLoading) {
    return <BlueLoadingFallback text="Authenticating..." />;
  }

  // Show loading while getting access token
  if (auth0.isAuthenticated && !isTokenReady) {
    return <BlueLoadingFallback text="Authenticating..." />;
  }

  const value: IContext = {
    accessToken,
    user,
    error,
    setAccessToken,
    setUser,
    setError,
  };

  return (
    <Context.Provider value={value}>
      <ApiProvider>
        {isTokenReady ? (
          <BaseApiCall>
            {children}
            <ErrorModal />
          </BaseApiCall>
        ) : (
          <>
            {children}
            <ErrorModal />
          </>
        )}
      </ApiProvider>
    </Context.Provider>
  );
};

const ApiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

// Component that fetches and sets user data using Suspense
const UserDataFetcher = ({ children }: { children: ReactNode }) => {
  const { setUser } = useContext(Context);
  const { user: userData } = useCurrentUser(); // This will suspend until user data is loaded

  // Set user data in context once it's loaded
  useEffect(() => {
    if (userData && setUser) {
      setUser(userData);
    }
  }, [userData, setUser]);

  return <>{children}</>;
};

const BaseApiCall = ({ children }: { children: ReactNode }) => {
  const { accessToken, user } = useContext(Context);

  // If no access token, don't try to fetch user data
  if (!accessToken) {
    return <>{children}</>;
  }

  // If user is already loaded, render children directly
  if (user) {
    return <>{children}</>;
  }

  // Use Suspense to handle loading state while fetching user data
  return (
    <SuspenseWrapper type="green" text="Loading your profile...">
      <UserDataFetcher>{children}</UserDataFetcher>
    </SuspenseWrapper>
  );
};
