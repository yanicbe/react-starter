import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import PageNotFound from "./page-components/error/page-not-found";
import Home from "./page-components/home/page";
import RegisterInformationsParent from "./page-components/register/informations/page";
import Logout from "./page-components/register/logout/page";
import Register from "./page-components/register/page";
import ResetPassword from "./page-components/register/reset-password";
import Support from "./page-components/support/page";
import MailVerification from "./page-components/verification/mail-verification";

const Routes = () => {
  // TODO - remove the comment from the code below as soon as the .env is set up
  // const [element, setElement] = useState(<Preloader />);
  // const [isProfileComplete, setProfileComplete] = useState(false);
  // const { user: loggedInUser } = useUser();

  // TODO - remove the the code below as soon as the .env is set up
  const [, setProfileComplete] = useState(false);

  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO - as soon as .env is set up, remove the comment from the if statement
    // if (isLoading) {
    //   setElement(<Preloader />);
    //   return;
    // }
    // if (!isAuthenticated) {
    //   return;
    // }
    setProfileComplete(true);
  }, [isAuthenticated, isLoading, navigate, user]);

  // TODO - remove the comment from the code below as soon as the .env is set up
  // const getElement = (route: string, element: JSX.Element, title: string) => {
  //   // TODO - check if user has access to the route. If not return the <NoAccess /> component.
  //   if (!loggedInUser) {
  //     return <Preloader />;
  //   }
  //   return element;
  // };

  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
      // TODO - remove the comment from the code below as soon as the .env is set up
      // element: isProfileComplete ? getElement("/", <Home />, "das Dashboard") : element,
    },
    {
      path: "/register/info",
      element: <RegisterInformationsParent />,
    },
    { path: "/logout", element: <Logout /> },
    { path: "/verification/mail", element: <MailVerification /> },
    { path: "/support", element: <Support /> },
    { path: "/reset", element: <ResetPassword /> },
    { path: "/register", element: <Register /> },
    { path: "/*", element: <PageNotFound /> },
  ]);

  return routes;
};

export default Routes;
