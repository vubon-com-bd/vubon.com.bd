/**
 * Authentication Role Constants
 * Core authentication roles for access control
 */

/**
 * Authentication Roles
 * Core roles for authentication and authorization
 */
export const AUTH_ROLES = {
  /** Super Administrator - Full system access */
  SUPER_ADMIN: 'super_admin',
  /** Administrator - Platform management access */
  ADMIN: 'admin',
  /** Regular authenticated user */
  USER: 'user',
  /** Unauthenticated guest user */
  GUEST: 'guest',
} as const;

export type AuthRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];

/**
 * Auth Role Display Names
 * Human-readable names for each role
 */
export const AUTH_ROLE_NAMES: Record<AuthRole, string> = {
  [AUTH_ROLES.SUPER_ADMIN]: 'Super Administrator',
  [AUTH_ROLES.ADMIN]: 'Administrator',
  [AUTH_ROLES.USER]: 'User',
  [AUTH_ROLES.GUEST]: 'Guest',
} as const;

/**
 * Auth Role Descriptions
 * Brief descriptions for each role
 */
export const AUTH_ROLE_DESCRIPTIONS: Record<AuthRole, string> = {
  [AUTH_ROLES.SUPER_ADMIN]: 'Has full access to all authentication and system features',
  [AUTH_ROLES.ADMIN]: 'Has access to authentication and platform management features',
  [AUTH_ROLES.USER]: 'Regular authenticated user with standard access',
  [AUTH_ROLES.GUEST]: 'Unauthenticated user with limited access',
} as const;

/**
 * Auth Role Hierarchy
 * Defines the hierarchical order (higher number = higher privilege)
 */
export const AUTH_ROLE_HIERARCHY: Record<AuthRole, number> = {
  [AUTH_ROLES.SUPER_ADMIN]: 100,
  [AUTH_ROLES.ADMIN]: 90,
  [AUTH_ROLES.USER]: 10,
  [AUTH_ROLES.GUEST]: 0,
} as const;

/**
 * Admin Auth Roles
 * Roles that have administrative privileges
 */
export const ADMIN_AUTH_ROLES: AuthRole[] = [AUTH_ROLES.SUPER_ADMIN, AUTH_ROLES.ADMIN] as const;

/**
 * Authenticated Auth Roles
 * Roles that represent authenticated users
 */
export const AUTHENTICATED_AUTH_ROLES: AuthRole[] = [
  AUTH_ROLES.SUPER_ADMIN,
  AUTH_ROLES.ADMIN,
  AUTH_ROLES.USER,
] as const;

/**
 * Default Auth Role
 * Default role assigned to new authenticated users
 */
export const DEFAULT_AUTH_ROLE: AuthRole = AUTH_ROLES.USER;

/**
 * Guest Auth Role
 * Role assigned to unauthenticated users
 */
export const GUEST_AUTH_ROLE: AuthRole = AUTH_ROLES.GUEST;

/**
 * Helper function to check if role exists
 */
export function isValidAuthRole(role: string): role is AuthRole {
  return Object.values(AUTH_ROLES).includes(role as AuthRole);
}

/**
 * Helper function to get role name
 */
export function getAuthRoleName(role: AuthRole): string {
  return AUTH_ROLE_NAMES[role] || 'Unknown Role';
}

/**
 * Helper function to get role description
 */
export function getAuthRoleDescription(role: AuthRole): string {
  return AUTH_ROLE_DESCRIPTIONS[role] || 'No description available';
}

/**
 * Helper function to check if role is admin
 */
export function isAdminAuthRole(role: AuthRole): boolean {
  return ADMIN_AUTH_ROLES.includes(role);
}

/**
 * Helper function to check if role is authenticated
 */
export function isAuthenticatedAuthRole(role: AuthRole): boolean {
  return AUTHENTICATED_AUTH_ROLES.includes(role);
}

/**
 * Helper function to get role hierarchy level
 */
export function getAuthRoleHierarchy(role: AuthRole): number {
  return AUTH_ROLE_HIERARCHY[role] || 0;
}

/**
 * Helper function to check if one role outranks another
 */
export function doesAuthRoleOutrank(role1: AuthRole, role2: AuthRole): boolean {
  return getAuthRoleHierarchy(role1) > getAuthRoleHierarchy(role2);
}

/**
 * Helper function to get assignable auth roles
 * Returns roles that can be assigned to users (excluding guest)
 */
export function getAssignableAuthRoles(): AuthRole[] {
  return Object.values(AUTH_ROLES).filter((role) => role !== AUTH_ROLES.GUEST);
}
