/**
 * Authentication Role Schema
 * Zod schemas for role management, hierarchy, and definitions
 */

import { z } from 'zod';
import {
  AUTH_ROLES,
  AUTH_ROLE_NAMES,
  AUTH_ROLE_DESCRIPTIONS,
  AUTH_ROLE_HIERARCHY,
  ADMIN_AUTH_ROLES,
  AUTHENTICATED_AUTH_ROLES,
  DEFAULT_AUTH_ROLE,
  GUEST_AUTH_ROLE,
  type AuthRole,
} from '@vubon/shared-constants';
import { idSchema, timestampSchema, jsonObjectSchema } from '../common/core-primitives.schema';

// ============================================================
// AUTH ROLE SCHEMAS
// ============================================================

/**
 * Auth role schema
 */
export const authRoleSchema = z.enum([
  AUTH_ROLES.SUPER_ADMIN,
  AUTH_ROLES.ADMIN,
  AUTH_ROLES.USER,
  AUTH_ROLES.GUEST,
]);

// ============================================================
// AUTH ROLE RECORD SCHEMA
// ============================================================

/**
 * Auth role record schema
 */
export const authRoleRecordSchema = z.object({
  id: idSchema,
  name: authRoleSchema,
  displayName: z.string().min(1),
  description: z.string().min(1),
  hierarchyLevel: z.number().int().min(0),
  isActive: z.boolean().default(true),
  isSystem: z.boolean().default(false),
  isAssignable: z.boolean().default(true),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// AUTH ROLE FILTER SCHEMA
// ============================================================

/**
 * Auth role filter schema
 */
export const authRoleFilterSchema = z.object({
  names: z.union([authRoleSchema, z.array(authRoleSchema)]).optional(),
  isActive: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  isAssignable: z.boolean().optional(),
  search: z.string().optional(),
});

// ============================================================
// AUTH ROLE COMPARISON SCHEMA
// ============================================================

/**
 * Auth role comparison schema
 */
export const authRoleComparisonSchema = z.object({
  role1: authRoleSchema,
  role2: authRoleSchema,
  hierarchyLevels: z.tuple([z.number().int(), z.number().int()]),
  higherPrivilege: z.union([authRoleSchema, z.literal('equal'), z.null()]),
  role1OutranksRole2: z.boolean(),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthRoleRecord = z.infer<typeof authRoleRecordSchema>;
export type AuthRoleFilter = z.infer<typeof authRoleFilterSchema>;
export type AuthRoleComparison = z.infer<typeof authRoleComparisonSchema>;

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
