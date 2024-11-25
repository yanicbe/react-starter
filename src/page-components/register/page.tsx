import { useAuth0 } from "@auth0/auth0-react";

const Register = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    const login = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: "/",
        },
        fragment: "register",
      });
    };
    login();
    return <div>Redirecting...</div>;
  }

  return <></>;
};

export default Register;
