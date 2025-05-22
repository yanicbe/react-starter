// src/components/ProtectedRoute.tsx
import { Role } from "@/lib/api/interfaces/utils";
import { hasAnyRole, hasRolePermission, parseRole } from "@/lib/utils/role-manager";
import { BlueLoadingFallback } from "@/ui-components/ui/suspense-wrapper";
import React, { ReactNode, useContext } from "react";
import { Context } from "./context";

interface ProtectedRouteProps {
  children: ReactNode;
  // Option 1: Single minimum required role (hierarchical)
  minRole?: Role;
  // Option 2: Array of specific allowed roles (exact match)
  allowedRoles?: Role[];
  // Custom fallback component for unauthorized access
  fallback?: ReactNode;
  // Redirect path for unauthorized users
  redirectTo?: string;
}

// Default unauthorized access component
const UnauthorizedAccess = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
      <div className="text-red-600 text-6xl mb-4">🚫</div>
      <h1 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h1>
      <p className="text-red-600 mb-4">You don't have permission to access this page.</p>
      <p className="text-sm text-red-500">Please contact your administrator if you believe this is an error.</p>
    </div>
  </div>
);

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  minRole,
  allowedRoles,
  fallback = <UnauthorizedAccess />,
  redirectTo,
}) => {
  const { user } = useContext(Context);

  if (!user) {
    return <BlueLoadingFallback text="Loading user..." />;
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
  return <>{children}</>;
};

// Convenience components for common role checks
export const AdminOnlyRoute: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <ProtectedRoute minRole={Role.Admin} fallback={fallback}>
    {children}
  </ProtectedRoute>
);

export const SuperAdminOnlyRoute: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({
  children,
  fallback,
}) => (
  <ProtectedRoute minRole={Role.SuperAdmin} fallback={fallback}>
    {children}
  </ProtectedRoute>
);
