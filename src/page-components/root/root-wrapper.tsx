import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import Sidebar from "../navigation/sidebar";
import { ContextProvider } from "./context";

const RootWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const excludeSidebar = ["/register/info", "/reset", "/verification/mail"];

  const location = useLocation();

  return (
    <AuthProvider>
      <div className="flex gap-4 w-full h-full min-h-[100vh]">
        <ContextProvider>
          {!excludeSidebar.includes(location.pathname) && <Sidebar />}
          <Wrapper margin={!excludeSidebar.includes(location.pathname)}>{children}</Wrapper>
        </ContextProvider>
      </div>
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

const Wrapper = ({ children, margin }: { children: React.ReactNode; margin: boolean }) => {
  return (
    <div
      className={(margin ? "ml-28 p-14 flex flex-col w-full min-h-screen" : "") + "bg-[#F9FAFC] min-h-[100vh] w-full"}
    >
      {children}
    </div>
  );
};

export default RootWrapper;
