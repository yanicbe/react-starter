import { UserInformationResponseDto } from "@/lib/api/interfaces/user";
import ErrorModal from "@/ui-components/ui/error-modal";
import Preloader from "@/ui-components/ui/preloader";
import { useAuth0 } from "@auth0/auth0-react";
import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import useApiRequest from "../../lib/hooks/use-request";

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

export const ContextProvider = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<any | undefined>();
  const [error, setError] = useState<Error>();
  const auth0 = useAuth0();

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (setAccessToken) {
        const x = await auth0.getAccessTokenSilently({
          authorizationParams: { scope: "openid profile email offline_access" },
        });
        setAccessToken(x);
      }
    };
    if (auth0.isAuthenticated) {
      fetchAccessToken();
    } else if (!auth0.isLoading) {
      const login = async () => {
        await auth0.loginWithRedirect({
          appState: {
            returnTo: "/",
          },
        });
      };
      if (
        window.location.pathname !== "/register" &&
        !window.location.href.includes("/invite") &&
        !window.location.href.includes("/reset")
      ) {
        login();
      }
      return;
    }
  }, [auth0, auth0.isAuthenticated]);

  const value = {
    accessToken,
    user,
    error,
    setAccessToken,
    setUser,
    setError,
  };

  return (
    <Context.Provider value={value}>
      <BaseApiCall>
        {children}
        <ErrorModal />
      </BaseApiCall>
    </Context.Provider>
  );
};

const BaseApiCall = ({ children }: { children: ReactNode }) => {
  const { apiRequest } = useApiRequest();
  const { accessToken, setUser, user } = useContext(Context);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const getUser = async () => {
    if (
      window.location.href.includes("/register") ||
      window.location.href.includes("/invite") ||
      window.location.href.includes("/reset")
    ) {
      setIsFinished(true);
      return;
    }
    if (accessToken && setUser && !user && process.env.REACT_APP_INITIALIZED !== "false") {
      try {
        // TODO: Change the endpoint to the correct one
        const res = await apiRequest<UserInformationResponseDto>("user-profile/userinfo", "GET");
        if (res.data) {
          setUser(res.data);
        }
        setIsFinished(true);
      } catch (e: any) {
        // user setup is not complete
      }
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, user]);

  if (process.env.REACT_APP_INITIALIZED === "false") {
    return <>{children}</>;
  }

  return <>{isFinished ? children : <Preloader />}</>;
};
