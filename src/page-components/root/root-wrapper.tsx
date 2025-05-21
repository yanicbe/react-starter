import React from "react";

import { SidebarProvider } from "@/ui-components/ui/sidebar";
import { Auth0Provider } from "@auth0/auth0-react";
import AppSidebar from "./app-sidebar";
import { ContextProvider } from "./context";

const RootWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ContextProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="min-h-screen w-full">
            <Wrapper>{children}</Wrapper>
          </main>
        </SidebarProvider>
      </ContextProvider>
    </AuthProvider>
  );
};

const AuthProvider = ({ children }: any) => {
  const redirectUri = window.location.origin;

  if (
    !(
      process.env.REACT_APP_AUTH0_DOMAIN &&
      process.env.REACT_APP_AUTH0_ID &&
      process.env.REACT_APP_AUTH0_AUDIENCE &&
      redirectUri
    )
  ) {
    return null;
  }

  if (process.env.REACT_APP_INITIALIZED) {
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: "openid profile email offline_access",
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        ui_locales: "de",
      }}
    >
      {children}
    </Auth0Provider>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={"h-full"}>{children}</div>;
};

export default RootWrapper;
