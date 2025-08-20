// src/Routes.tsx
import { UserInfoUserRole } from "@/lib/api/interfaces/user-profile.interface";
import { ProtectedRoute } from "@/util-components/root/protected-route";
import { useRoutes } from "react-router-dom";
import Admin from "./page-components/admin/page";
import Home from "./page-components/home/page";
import Logout from "./page-components/register/logout/page";
import Register from "./page-components/register/page";
import ResetPassword from "./page-components/register/reset-password/page";
import Settings from "./page-components/settings/page";
import MailVerification from "./page-components/verification/page";
import PageNotFound from "./util-components/error/page-not-found";
import InternalCustomerWrapper from "./util-components/root/internal-customer-wrapper";

const Routes = () => {
  const routes = useRoutes([
    // Public routes (no authentication required)
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/reset",
      element: <ResetPassword />,
    },
    {
      path: "/verification/mail",
      element: <MailVerification />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },

    // Protected routes (require authentication + role-based access)
    {
      path: "/",
      element: (
        <ProtectedRoute minRole={UserInfoUserRole.USER}>
          <InternalCustomerWrapper customerComponent={<Home />} internalComponent={<Home />} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute minRole={UserInfoUserRole.USER}>
          <Settings />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute minRole={UserInfoUserRole.ADMIN}>
          <Admin />
        </ProtectedRoute>
      ),
    },
    {
      path: "/sign-out",
      element: (
        <ProtectedRoute minRole={UserInfoUserRole.USER}>
          <Logout />
        </ProtectedRoute>
      ),
    },

    // Catch-all route
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return routes;
};

export default Routes;
