import { UserInfoUserRole } from "../api/interfaces/user-profile.interface";

// Define role hierarchy (higher number = more permissions)
const ROLE_HIERARCHY: Record<UserInfoUserRole, number> = {
  [UserInfoUserRole.USER]: 1,
  [UserInfoUserRole.TEAMLEADER]: 2,
  [UserInfoUserRole.ADMIN]: 3,
  [UserInfoUserRole.SUPERADMIN]: 4,
};

/**
 * Check if a user role has permission to access a required role level
 * @param userRole - The user's current role
 * @param requiredRole - The minimum required role for access
 * @returns boolean - true if user has permission
 */
export function hasRolePermission(userRole: UserInfoUserRole, requiredRole: UserInfoUserRole): boolean {
  const userLevel = ROLE_HIERARCHY[userRole];
  const requiredLevel = ROLE_HIERARCHY[requiredRole];

  return userLevel >= requiredLevel;
}

/**
 * Check if user has any of the specified roles
 * @param userRole - The user's current role
 * @param allowedRoles - Array of roles that are allowed
 * @returns boolean - true if user has any of the allowed roles
 */
export function hasAnyRole(userRole: UserInfoUserRole, allowedRoles: UserInfoUserRole[]): boolean {
  return allowedRoles.some(role => hasRolePermission(userRole, role));
}

/**
 * Get user role from string (with type safety)
 * @param roleString - Role as string from API
 * @returns Role enum or null if invalid
 */
export function parseRole(roleString: string): UserInfoUserRole | null {
  if (Object.values(UserInfoUserRole).includes(roleString as UserInfoUserRole)) {
    return roleString as UserInfoUserRole;
  }
  return null;
}