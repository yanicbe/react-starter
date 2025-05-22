import React from "react";

import { SidebarProvider } from "@/ui-components/ui/sidebar";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppSidebar from "./app-sidebar";
import { ContextProvider } from "./context";

const queryClient = new QueryClient();

const RootWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ContextProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen w-full p-8">{children}</main>
          </SidebarProvider>
        </ContextProvider>
      </AuthProvider>
    </QueryClientProvider>
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

export default RootWrapper;
