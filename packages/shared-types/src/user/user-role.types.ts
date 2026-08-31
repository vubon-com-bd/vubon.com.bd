/**
 * User Role Types
 * Types for user role management, hierarchy, and definitions
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';
import {
  USER_ROLE,
  USER_ROLE_CATEGORY,
  USER_ROLE_LEVEL,
  USER_ROLE_HIERARCHY,
  USER_ROLE_CATEGORY_MAP,
  USER_ROLE_LABELS,
  USER_ROLE_DESCRIPTIONS,
  USER_ROLE_PRIORITY,
  COMMON_USER_ROLE_TRANSITIONS,
  type UserRoleTransition as ConstantsUserRoleTransition,
} from '@vubon/shared-constants';

// ============================================================
// USER ROLE TYPES
// ============================================================

/**
 * User role type
 */
export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

/**
 * User role category type
 */
export type UserRoleCategory = (typeof USER_ROLE_CATEGORY)[keyof typeof USER_ROLE_CATEGORY];

/**
 * User role level type
 */
export type UserRoleLevel = (typeof USER_ROLE_LEVEL)[keyof typeof USER_ROLE_LEVEL];

// ============================================================
// USER ROLE RECORD
// ============================================================

/**
 * User role record
 */
export interface UserRoleRecord {
  /** Unique identifier */
  id: ID;
  /** Role name */
  name: UserRole;
  /** Display name for UI */
  displayName: string;
  /** Role description */
  description: string;
  /** Category of the role */
  category: UserRoleCategory;
  /** Hierarchy level (lower number = higher privilege) */
  level: UserRoleLevel;
  /** Whether role is active */
  isActive: boolean;
  /** Whether role is system-defined (cannot be deleted) */
  isSystem: boolean;
  /** Whether role is assignable to users */
  isAssignable: boolean;
  /** Whether this is the default role for new users */
  isDefault: boolean;
  /** Priority for sorting */
  priority: number;
  /** When the role was created */
  createdAt: Timestamp;
  /** When the role was updated */
  updatedAt: Timestamp;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER ROLE FILTER
// ============================================================

/**
 * Filter for querying user roles
 */
export interface UserRoleFilter {
  /** Filter by role names */
  names?: UserRole | UserRole[];
  /** Filter by category */
  category?: UserRoleCategory | UserRoleCategory[];
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by system status */
  isSystem?: boolean;
  /** Filter by assignable status */
  isAssignable?: boolean;
  /** Filter by default role */
  isDefault?: boolean;
  /** Search by display name or description */
  search?: string;
}

// ============================================================
// USER ROLE COMPARISON
// ============================================================

/**
 * User role comparison result
 */
export interface UserRoleComparison {
  /** The two roles being compared */
  role1: UserRole;
  role2: UserRole;
  /** Hierarchy levels of both roles */
  levels: [UserRoleLevel, UserRoleLevel];
  /** Which role has higher privilege (or 'equal') */
  higherPrivilege: UserRole | 'equal' | null;
  /** Whether role1 outranks role2 */
  role1OutranksRole2: boolean;
}

// ============================================================
// USER ROLE TRANSITION
// ============================================================

/**
 * User role transition definition
 * Re-exported from constants for type consistency
 */
export type UserRoleTransition = ConstantsUserRoleTransition;

// ============================================================
// USER ROLE SUMMARY
// ============================================================

/**
 * Summary of user roles
 */
export interface UserRoleSummary {
  /** Total number of roles */
  totalRoles: number;
  /** Number of active roles */
  activeRoles: number;
  /** Number of system roles */
  systemRoles: number;
  /** Number of assignable roles */
  assignableRoles: number;
  /** Roles grouped by category */
  rolesByCategory: Record<UserRoleCategory, UserRole[]>;
  /** All available roles */
  allRoles: UserRole[];
  /** Default role for new users */
  defaultRole: UserRole;
  /** Highest privilege role */
  highestRole: UserRole;
  /** Lowest privilege role */
  lowestRole: UserRole;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user role is valid
 */
export function isValidUserRole(role: string): role is UserRole {
  return Object.values(USER_ROLE).includes(role as UserRole);
}

/**
 * Check if user role category is valid
 */
export function isValidUserRoleCategory(category: string): category is UserRoleCategory {
  return Object.values(USER_ROLE_CATEGORY).includes(category as UserRoleCategory);
}

/**
 * Get user role display name
 */
export function getUserRoleDisplayName(role: UserRole): string {
  return USER_ROLE_LABELS[role] || role;
}

/**
 * Get user role description
 */
export function getUserRoleDescription(role: UserRole): string {
  return USER_ROLE_DESCRIPTIONS[role] || 'No description available';
}

/**
 * Get user role hierarchy level
 */
export function getUserRoleLevel(role: UserRole): UserRoleLevel {
  return (USER_ROLE_HIERARCHY[role] || USER_ROLE_LEVEL.LEVEL_8) as UserRoleLevel;
}

/**
 * Get user role category
 */
export function getUserRoleCategory(role: UserRole): UserRoleCategory {
  return (USER_ROLE_CATEGORY_MAP[role] || USER_ROLE_CATEGORY.OPERATIONAL) as UserRoleCategory;
}

/**
 * Get user role priority
 */
export function getUserRolePriority(role: UserRole): number {
  return USER_ROLE_PRIORITY[role] || 999;
}

/**
 * Check if role is admin role
 */
export function isUserRoleAdmin(role: UserRole): boolean {
  const adminRoles: UserRole[] = ['super_admin', 'admin', 'manager'];
  return adminRoles.includes(role);
}

/**
 * Check if role is content role
 */
export function isUserRoleContent(role: UserRole): boolean {
  const contentRoles: UserRole[] = ['content_creator', 'editor', 'reviewer', 'moderator'];
  return contentRoles.includes(role);
}

/**
 * Check if role is support role
 */
export function isUserRoleSupport(role: UserRole): boolean {
  const supportRoles: UserRole[] = ['support', 'auditor'];
  return supportRoles.includes(role);
}

/**
 * Check if role is technical role
 */
export function isUserRoleTechnical(role: UserRole): boolean {
  const technicalRoles: UserRole[] = ['developer', 'analyst'];
  return technicalRoles.includes(role);
}

/**
 * Check if role has elevated privileges
 */
export function hasUserRoleElevatedPrivileges(role: UserRole): boolean {
  const elevatedRoles: UserRole[] = ['super_admin', 'admin', 'manager', 'moderator', 'developer'];
  return elevatedRoles.includes(role);
}

/**
 * Check if role outranks another role
 */
export function doesUserRoleOutrank(role1: UserRole, role2: UserRole): boolean {
  return getUserRoleLevel(role1) < getUserRoleLevel(role2);
}

/**
 * Check if roles are equal in hierarchy
 */
export function areUserRolesEqual(role1: UserRole, role2: UserRole): boolean {
  return getUserRoleLevel(role1) === getUserRoleLevel(role2);
}

/**
 * Compare two user roles
 */
export function compareUserRoles(role1: UserRole, role2: UserRole): UserRoleComparison {
  const level1 = getUserRoleLevel(role1);
  const level2 = getUserRoleLevel(role2);

  let higherPrivilege: UserRole | 'equal' | null = null;
  if (level1 < level2) higherPrivilege = role1;
  else if (level2 < level1) higherPrivilege = role2;
  else higherPrivilege = 'equal';

  return {
    role1,
    role2,
    levels: [level1, level2],
    higherPrivilege,
    role1OutranksRole2: level1 < level2,
  };
}

/**
 * Get all user roles
 */
export function getAllUserRoles(): UserRole[] {
  return Object.values(USER_ROLE);
}

/**
 * Get admin user roles
 */
export function getAdminUserRoles(): UserRole[] {
  return getAllUserRoles().filter((role) => isUserRoleAdmin(role));
}

/**
 * Get content user roles
 */
export function getContentUserRoles(): UserRole[] {
  return getAllUserRoles().filter((role) => isUserRoleContent(role));
}

/**
 * Get support user roles
 */
export function getSupportUserRoles(): UserRole[] {
  return getAllUserRoles().filter((role) => isUserRoleSupport(role));
}

/**
 * Get technical user roles
 */
export function getTechnicalUserRoles(): UserRole[] {
  return getAllUserRoles().filter((role) => isUserRoleTechnical(role));
}

/**
 * Get user roles by category
 */
export function getUserRolesByCategory(category: UserRoleCategory): UserRole[] {
  return getAllUserRoles().filter((role) => getUserRoleCategory(role) === category);
}

/**
 * Get highest privilege role from list
 */
export function getHighestUserRole(roles: UserRole[]): UserRole | null {
  if (roles.length === 0) return null;

  return roles.reduce((highest, current) => {
    return getUserRoleLevel(current) < getUserRoleLevel(highest) ? current : highest;
  });
}

/**
 * Get lowest privilege role from list
 */
export function getLowestUserRole(roles: UserRole[]): UserRole | null {
  if (roles.length === 0) return null;

  return roles.reduce((lowest, current) => {
    return getUserRoleLevel(current) > getUserRoleLevel(lowest) ? current : lowest;
  });
}

/**
 * Sort user roles by priority
 */
export function sortUserRolesByPriority(roles: UserRole[]): UserRole[] {
  return [...roles].sort((a, b) => {
    return (USER_ROLE_PRIORITY[a] || 999) - (USER_ROLE_PRIORITY[b] || 999);
  });
}

/**
 * Check if role can access resource (requires minimum role level)
 */
export function canUserRoleAccess(role: UserRole, requiredRole: UserRole): boolean {
  return getUserRoleLevel(role) <= getUserRoleLevel(requiredRole);
}

/**
 * Check if role is system role
 */
export function isUserRoleSystem(role: UserRole): boolean {
  const systemRoles: UserRole[] = ['super_admin', 'admin', 'manager'];
  return systemRoles.includes(role);
}

/**
 * Check if role is regular user role
 */
export function isUserRoleRegular(role: UserRole): boolean {
  const regularRoles: UserRole[] = ['user', 'guest'];
  return regularRoles.includes(role);
}

/**
 * Check if role is assignable to users
 */
export function isUserRoleAssignable(role: UserRole): boolean {
  const unassignableRoles: UserRole[] = ['super_admin', 'guest'];
  return !unassignableRoles.includes(role);
}

/**
 * Get assignable user roles (excluding guest and super_admin)
 */
export function getAssignableUserRoles(): UserRole[] {
  return getAllUserRoles().filter((role) => isUserRoleAssignable(role));
}

/**
 * Check if role is default role for new users
 */
export function isUserRoleDefault(role: UserRole): boolean {
  return role === 'user';
}

/**
 * Get default user role
 */
export function getDefaultUserRole(): UserRole {
  return 'user';
}

/**
 * Get guest user role
 */
export function getGuestUserRole(): UserRole {
  return 'guest';
}

/**
 * Get all user role categories
 */
export function getAllUserRoleCategories(): UserRoleCategory[] {
  return Object.values(USER_ROLE_CATEGORY);
}

/**
 * Get user role category label
 */
export function getUserRoleCategoryLabel(category: UserRoleCategory): string {
  const labels: Record<UserRoleCategory, string> = {
    system: 'System',
    admin: 'Administrative',
    management: 'Management',
    content: 'Content',
    support: 'Support',
    technical: 'Technical',
    operational: 'Operational',
  };
  return labels[category] || category;
}

/**
 * Create user role summary
 */
export function createUserRoleSummary(roles: UserRole[]): UserRoleSummary {
  const allRoles = getAllUserRoles();
  const activeRoles = roles.filter((role) => isUserRoleAssignable(role));

  const rolesByCategory = {} as Record<UserRoleCategory, UserRole[]>;
  for (const category of getAllUserRoleCategories()) {
    rolesByCategory[category] = getUserRolesByCategory(category);
  }

  return {
    totalRoles: allRoles.length,
    activeRoles: activeRoles.length,
    systemRoles: allRoles.filter((role) => isUserRoleSystem(role)).length,
    assignableRoles: getAssignableUserRoles().length,
    rolesByCategory,
    allRoles,
    defaultRole: getDefaultUserRole(),
    highestRole: 'super_admin',
    lowestRole: 'guest',
  };
}

/**
 * Get allowed next user roles based on transitions
 */
export function getAllowedNextUserRoles(
  currentRole: UserRole,
  allowedTransitions: UserRoleTransition[] = COMMON_USER_ROLE_TRANSITIONS
): UserRole[] {
  return allowedTransitions
    .filter((t) => t.from === currentRole && t.allowed)
    .map((t) => t.to as UserRole);
}

/**
 * Check if user role transition is allowed
 */
export function canUserRoleTransitionTo(
  currentRole: UserRole,
  nextRole: UserRole,
  allowedTransitions: UserRoleTransition[] = COMMON_USER_ROLE_TRANSITIONS
): boolean {
  return allowedTransitions.some((t) => t.from === currentRole && t.to === nextRole && t.allowed);
}

/**
 * Validate user role transition
 */
export function validateUserRoleTransition(
  currentRole: UserRole,
  nextRole: UserRole,
  allowedTransitions: UserRoleTransition[] = COMMON_USER_ROLE_TRANSITIONS
): { valid: boolean; message: string } {
  const isValid = canUserRoleTransitionTo(currentRole, nextRole, allowedTransitions);

  if (isValid) {
    return {
      valid: true,
      message: `Transition from ${currentRole} to ${nextRole} is allowed`,
    };
  }

  return {
    valid: false,
    message: `Transition from ${currentRole} to ${nextRole} is not allowed`,
  };
}

/**
 * Get user role by name (with validation)
 */
export function getUserRoleByName(roleName: string): UserRole | null {
  if (isValidUserRole(roleName)) {
    return roleName;
  }
  return null;
}

/**
 * Check if role has specific permission level
 * @param role User role
 * @param minimumLevel Minimum required role level
 */
export function hasUserRoleMinimumLevel(role: UserRole, minimumLevel: UserRoleLevel): boolean {
  return getUserRoleLevel(role) <= minimumLevel;
}
