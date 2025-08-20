// src/components/ProtectedRoute.tsx
import { UserInfoUserRole, UserInfoUserType } from "@/lib/api/interfaces/user-profile.interface";
import { hasAnyRole, hasRolePermission, parseRole } from "@/lib/utils/role-manager";
import { BlueLoadingFallback } from "@/ui-components/ui/suspense-wrapper";
import React, { ReactNode, useContext } from "react";
import { Context } from "./context";

interface ProtectedRouteProps {
  children: ReactNode;
  // Option 1: Single minimum required role (hierarchical)
  minRole?: UserInfoUserRole;
  // Option 2: Array of specific allowed roles (exact match)
  allowedRoles?: UserInfoUserRole[];
  // Option 3: object for min role for internal and customer
  minRoleMap?: {
    internal: UserInfoUserRole;
    customer: UserInfoUserRole;
  };
  // Custom fallback component for unauthorized access
  fallback?: ReactNode;
  // Redirect path for unauthorized users
  redirectTo?: string;
}

// Default unauthorized access component
export const UnauthorizedAccess = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
      <div className="text-red-600 text-6xl mb-4">🚫</div>
      <h1 className="text-2xl font-bold text-red-800 mb-2">Zugriff verweigert</h1>
      <p className="text-red-600 mb-4">Du hast keine Berechtigung, um auf diese Seite zuzugreifen.</p>
      <p className="text-sm text-red-500">
        Bitte kontaktiere deinen Administrator, wenn du glaubst, dass dies ein Fehler ist.
      </p>
    </div>
  </div>
);

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  minRole,
  allowedRoles,
  minRoleMap,
  fallback = <UnauthorizedAccess />,
  redirectTo,
}) => {
  const { user } = useContext(Context);

  if (!user) {
    return <BlueLoadingFallback text="Lädt Nutzer..." />;
  }

  // Parse user role from API response
  const userRole = parseRole(user.userRole);

  // If we can't parse the user role, deny access
  if (!userRole) {
    console.warn("Invalid user role:", user.userRole);
    return <>{fallback}</>;
  }

  let hasAccess = false;

  // Check permissions based on provided props
  if (minRole) {
    // Hierarchical permission check
    hasAccess = hasRolePermission(userRole, minRole);
  } else if (allowedRoles && allowedRoles.length > 0) {
    // Specific roles check
    hasAccess = hasAnyRole(userRole, allowedRoles);
  } else if (minRoleMap) {
    if (user.userType === UserInfoUserType.INTERNAL) {
      hasAccess = hasRolePermission(userRole, minRoleMap.internal);
    } else if (user.userType === UserInfoUserType.CUSTOMER) {
      hasAccess = hasRolePermission(userRole, minRoleMap.customer);
    }
  } else {
    // If no role restrictions specified, allow access
    hasAccess = true;
  }

  // Handle unauthorized access
  if (!hasAccess) {
    if (redirectTo) {
      // Redirect logic would go here if using react-router
      window.location.href = redirectTo;
      return null;
    }

    return <>{fallback}</>;
  }

  // User has access, render children
  return <div className="p-8 w-full h-full">{children}</div>;
};

// Convenience components for common role checks
export const AdminOnlyRoute: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <ProtectedRoute minRole={UserInfoUserRole.ADMIN} fallback={fallback}>
    {children}
  </ProtectedRoute>
);
