/**
 * Authentication Role Types
 * Types for role management, hierarchy, and definitions
 */

import type { AuthRole } from '@vubon/shared-constants';
import {
  AUTH_ROLES,
  AUTH_ROLE_NAMES,
  AUTH_ROLE_DESCRIPTIONS,
  AUTH_ROLE_HIERARCHY,
  ADMIN_AUTH_ROLES,
  AUTHENTICATED_AUTH_ROLES,
  DEFAULT_AUTH_ROLE,
  GUEST_AUTH_ROLE,
} from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';

// ============================================================
// ROLE RECORD
// ============================================================

/**
 * Role record
 */
export interface AuthRoleRecord {
  /** Unique role ID */
  id: ID;
  /** Role name (e.g., 'admin', 'user') */
  name: AuthRole;
  /** Display name */
  displayName: string;
  /** Role description */
  description: string;
  /** Hierarchy level (higher = more privileged) */
  hierarchyLevel: number;
  /** Whether role is active */
  isActive: boolean;
  /** Whether role is system-defined (cannot be deleted) */
  isSystem: boolean;
  /** Whether role is assignable to users */
  isAssignable: boolean;
  /** When the role was created */
  createdAt: Timestamp;
  /** When the role was updated */
  updatedAt: Timestamp;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

// ============================================================
// ROLE FILTER
// ============================================================

/**
 * Filter for querying roles
 */
export interface AuthRoleFilter {
  /** Filter by role name */
  names?: AuthRole | AuthRole[];
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by system status */
  isSystem?: boolean;
  /** Filter by assignable status */
  isAssignable?: boolean;
  /** Search by display name or description */
  search?: string;
}

// ============================================================
// ROLE COMPARISON
// ============================================================

/**
 * Role comparison result
 */
export interface AuthRoleComparison {
  /** The two roles being compared */
  role1: AuthRole;
  role2: AuthRole;
  /** Hierarchy levels of both roles */
  hierarchyLevels: [number, number];
  /** Which role has higher privilege (or 'equal') */
  higherPrivilege: AuthRole | 'equal' | null;
  /** Whether role1 outranks role2 */
  role1OutranksRole2: boolean;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if role is valid
 */
export function isValidAuthRole(role: string): role is AuthRole {
  return Object.values(AUTH_ROLES).includes(role as AuthRole);
}

/**
 * Get role display name
 */
export function getAuthRoleDisplayName(role: AuthRole): string {
  return AUTH_ROLE_NAMES[role] || 'Unknown Role';
}

/**
 * Get role description
 */
export function getAuthRoleDescription(role: AuthRole): string {
  return AUTH_ROLE_DESCRIPTIONS[role] || 'No description available';
}

/**
 * Get role hierarchy level
 */
export function getAuthRoleHierarchyLevel(role: AuthRole): number {
  return AUTH_ROLE_HIERARCHY[role] || 0;
}

/**
 * Check if role is admin
 */
export function isAuthRoleAdmin(role: AuthRole): boolean {
  return ADMIN_AUTH_ROLES.includes(role);
}

/**
 * Check if role is authenticated
 */
export function isAuthRoleAuthenticated(role: AuthRole): boolean {
  return AUTHENTICATED_AUTH_ROLES.includes(role);
}

/**
 * Check if role is assignable to users
 */
export function isAuthRoleAssignable(role: AuthRole): boolean {
  return role !== AUTH_ROLES.GUEST;
}

/**
 * Check if one role outranks another
 */
export function doesAuthRoleOutrank(role1: AuthRole, role2: AuthRole): boolean {
  return getAuthRoleHierarchyLevel(role1) > getAuthRoleHierarchyLevel(role2);
}

/**
 * Check if roles are equal in hierarchy
 */
export function areAuthRolesEqual(role1: AuthRole, role2: AuthRole): boolean {
  return getAuthRoleHierarchyLevel(role1) === getAuthRoleHierarchyLevel(role2);
}

/**
 * Compare two roles
 */
export function compareAuthRoles(role1: AuthRole, role2: AuthRole): AuthRoleComparison {
  const level1 = getAuthRoleHierarchyLevel(role1);
  const level2 = getAuthRoleHierarchyLevel(role2);

  let higherPrivilege: AuthRole | 'equal' | null = null;
  if (level1 > level2) higherPrivilege = role1;
  else if (level2 > level1) higherPrivilege = role2;
  else higherPrivilege = 'equal';

  return {
    role1,
    role2,
    hierarchyLevels: [level1, level2],
    higherPrivilege,
    role1OutranksRole2: level1 > level2,
  };
}

/**
 * Get assignable roles (excluding guest)
 */
export function getAssignableAuthRoles(): AuthRole[] {
  return Object.values(AUTH_ROLES).filter((role) => role !== AUTH_ROLES.GUEST);
}

/**
 * Get all auth roles
 */
export function getAllAuthRoles(): AuthRole[] {
  return Object.values(AUTH_ROLES);
}

/**
 * Get highest role from a list of roles
 */
export function getHighestAuthRole(roles: AuthRole[]): AuthRole | null {
  if (roles.length === 0) return null;

  return roles.reduce((highest, current) => {
    return getAuthRoleHierarchyLevel(current) > getAuthRoleHierarchyLevel(highest)
      ? current
      : highest;
  });
}

/**
 * Get default role for new users
 */
export function getDefaultAuthRole(): AuthRole {
  return DEFAULT_AUTH_ROLE;
}

/**
 * Get guest role
 */
export function getGuestAuthRole(): AuthRole {
  return GUEST_AUTH_ROLE;
}

/**
 * Filter roles by admin status
 */
export function filterAuthRolesByAdmin(roles: AuthRole[]): AuthRole[] {
  return roles.filter((role) => isAuthRoleAdmin(role));
}

/**
 * Filter roles by authenticated status
 */
export function filterAuthRolesByAuthenticated(roles: AuthRole[]): AuthRole[] {
  return roles.filter((role) => isAuthRoleAuthenticated(role));
}
