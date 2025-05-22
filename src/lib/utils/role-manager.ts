import { Role } from "../api/interfaces/utils";

// Define role hierarchy (higher number = more permissions)
const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.User]: 1,
  [Role.Admin]: 2,
  [Role.SuperAdmin]: 3,
};

/**
 * Check if a user role has permission to access a required role level
 * @param userRole - The user's current role
 * @param requiredRole - The minimum required role for access
 * @returns boolean - true if user has permission
 */
export function hasRolePermission(userRole: Role, requiredRole: Role): boolean {
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
export function hasAnyRole(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.some(role => hasRolePermission(userRole, role));
}

/**
 * Get user role from string (with type safety)
 * @param roleString - Role as string from API
 * @returns Role enum or null if invalid
 */
export function parseRole(roleString: string): Role | null {
  if (Object.values(Role).includes(roleString as Role)) {
    return roleString as Role;
  }
  return null;
}