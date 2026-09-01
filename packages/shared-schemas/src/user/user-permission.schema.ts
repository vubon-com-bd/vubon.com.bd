/**
 * User Permission Schema
 * Zod schemas for user permission management, checking, and assignment
 */

import { z } from 'zod';
import {
  USER_PERMISSION,
  USER_PERMISSION_CATEGORY,
  USER_PERMISSION_STATUS,
  USER_PERMISSION_SECURITY_LEVEL,
  USER_PERMISSION_CATEGORY_MAP,
  USER_PERMISSION_DEPENDENCIES,
  USER_PERMISSION_SECURITY_LEVEL_MAP,
  USER_PERMISSION_LABELS,
  USER_PERMISSION_CATEGORY_LABELS,
} from '@vubon/shared-constants';
import { idSchema, timestampSchema, jsonObjectSchema } from '../common/core-primitives.schema';

// ============================================================
// USER PERMISSION TYPE SCHEMAS
// ============================================================

/**
 * User permission schema
 */
export const userPermissionSchema = z.enum([
  USER_PERMISSION.PROFILE_VIEW,
  USER_PERMISSION.PROFILE_UPDATE,
  USER_PERMISSION.PROFILE_DELETE,
  USER_PERMISSION.PROFILE_EXPORT,
  USER_PERMISSION.ACCOUNT_VIEW,
  USER_PERMISSION.ACCOUNT_UPDATE,
  USER_PERMISSION.ACCOUNT_DELETE,
  USER_PERMISSION.ACCOUNT_SUSPEND,
  USER_PERMISSION.ACCOUNT_ACTIVATE,
  USER_PERMISSION.ACCOUNT_LOCK,
  USER_PERMISSION.ACCOUNT_UNLOCK,
  USER_PERMISSION.ADDRESS_VIEW,
  USER_PERMISSION.ADDRESS_CREATE,
  USER_PERMISSION.ADDRESS_UPDATE,
  USER_PERMISSION.ADDRESS_DELETE,
  USER_PERMISSION.ADDRESS_VERIFY,
  USER_PERMISSION.CONTACT_VIEW,
  USER_PERMISSION.CONTACT_CREATE,
  USER_PERMISSION.CONTACT_UPDATE,
  USER_PERMISSION.CONTACT_DELETE,
  USER_PERMISSION.CONTACT_VERIFY,
  USER_PERMISSION.KYC_SUBMIT,
  USER_PERMISSION.KYC_VIEW,
  USER_PERMISSION.KYC_UPDATE,
  USER_PERMISSION.KYC_APPROVE,
  USER_PERMISSION.KYC_REJECT,
  USER_PERMISSION.KYC_REVIEW,
  USER_PERMISSION.VERIFICATION_REQUEST,
  USER_PERMISSION.VERIFICATION_VIEW,
  USER_PERMISSION.VERIFICATION_APPROVE,
  USER_PERMISSION.VERIFICATION_REJECT,
  USER_PERMISSION.SESSION_VIEW,
  USER_PERMISSION.SESSION_TERMINATE,
  USER_PERMISSION.SESSION_TERMINATE_ALL,
  USER_PERMISSION.ACTIVITY_VIEW,
  USER_PERMISSION.ACTIVITY_EXPORT,
  USER_PERMISSION.ACTIVITY_CLEAR,
  USER_PERMISSION.NOTIFICATION_VIEW,
  USER_PERMISSION.NOTIFICATION_MARK_READ,
  USER_PERMISSION.NOTIFICATION_DELETE,
  USER_PERMISSION.NOTIFICATION_PREFERENCE,
  USER_PERMISSION.PREFERENCE_VIEW,
  USER_PERMISSION.PREFERENCE_UPDATE,
  USER_PERMISSION.PREFERENCE_RESET,
  USER_PERMISSION.SETTINGS_VIEW,
  USER_PERMISSION.SETTINGS_UPDATE,
  USER_PERMISSION.SETTINGS_RESET,
  USER_PERMISSION.SECURITY_VIEW,
  USER_PERMISSION.SECURITY_UPDATE,
  USER_PERMISSION.SECURITY_LOGIN_HISTORY,
  USER_PERMISSION.SECURITY_DEVICE_MANAGE,
  USER_PERMISSION.RELATIONSHIP_VIEW,
  USER_PERMISSION.RELATIONSHIP_CREATE,
  USER_PERMISSION.RELATIONSHIP_UPDATE,
  USER_PERMISSION.RELATIONSHIP_DELETE,
  USER_PERMISSION.RELATIONSHIP_BLOCK,
  USER_PERMISSION.RELATIONSHIP_UNBLOCK,
  USER_PERMISSION.SUBSCRIPTION_VIEW,
  USER_PERMISSION.SUBSCRIPTION_CREATE,
  USER_PERMISSION.SUBSCRIPTION_CANCEL,
  USER_PERMISSION.SUBSCRIPTION_RENEW,
  USER_PERMISSION.SUBSCRIPTION_UPGRADE,
  USER_PERMISSION.SUBSCRIPTION_DOWNGRADE,
  USER_PERMISSION.EXPORT_USER_DATA,
  USER_PERMISSION.EXPORT_ACTIVITY,
  USER_PERMISSION.EXPORT_SETTINGS,
]);

/**
 * User permission category schema
 */
export const userPermissionCategorySchema = z.enum([
  USER_PERMISSION_CATEGORY.PROFILE,
  USER_PERMISSION_CATEGORY.ACCOUNT,
  USER_PERMISSION_CATEGORY.ADDRESS,
  USER_PERMISSION_CATEGORY.CONTACT,
  USER_PERMISSION_CATEGORY.KYC,
  USER_PERMISSION_CATEGORY.VERIFICATION,
  USER_PERMISSION_CATEGORY.SESSION,
  USER_PERMISSION_CATEGORY.ACTIVITY,
  USER_PERMISSION_CATEGORY.NOTIFICATION,
  USER_PERMISSION_CATEGORY.PREFERENCE,
  USER_PERMISSION_CATEGORY.SETTINGS,
  USER_PERMISSION_CATEGORY.SECURITY,
  USER_PERMISSION_CATEGORY.RELATIONSHIP,
  USER_PERMISSION_CATEGORY.SUBSCRIPTION,
  USER_PERMISSION_CATEGORY.EXPORT,
]);

/**
 * User permission status schema
 */
export const userPermissionStatusSchema = z.enum([
  USER_PERMISSION_STATUS.ENABLED,
  USER_PERMISSION_STATUS.DISABLED,
  USER_PERMISSION_STATUS.DEPRECATED,
  USER_PERMISSION_STATUS.EXPERIMENTAL,
]);

/**
 * User permission security level schema
 */
export const userPermissionSecurityLevelSchema = z.enum([
  USER_PERMISSION_SECURITY_LEVEL.LOW,
  USER_PERMISSION_SECURITY_LEVEL.MEDIUM,
  USER_PERMISSION_SECURITY_LEVEL.HIGH,
  USER_PERMISSION_SECURITY_LEVEL.CRITICAL,
]);

// ============================================================
// USER PERMISSION RECORD SCHEMA
// ============================================================

/**
 * User permission record schema
 */
export const userPermissionRecordSchema = z.object({
  id: idSchema,
  name: userPermissionSchema,
  displayName: z.string().min(1),
  description: z.string().optional(),
  category: userPermissionCategorySchema,
  securityLevel: userPermissionSecurityLevelSchema,
  status: userPermissionStatusSchema,
  dependencies: z.array(userPermissionSchema),
  isActive: z.boolean().default(true),
  isSystem: z.boolean().default(false),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER PERMISSION ASSIGNMENT SCHEMAS
// ============================================================

/**
 * User permission assignment schema
 */
export const userPermissionAssignmentSchema = z.object({
  id: idSchema,
  userId: idSchema,
  permissionName: userPermissionSchema,
  isGranted: z.boolean().default(true),
  reason: z.string().optional(),
  assignedBy: idSchema.optional(),
  assignedAt: timestampSchema,
  expiresAt: timestampSchema.optional(),
});

/**
 * Role permission assignment schema
 */
export const rolePermissionAssignmentSchema = z.object({
  id: idSchema,
  roleId: idSchema,
  permissionName: userPermissionSchema,
  isGranted: z.boolean().default(true),
  assignedAt: timestampSchema,
});

// ============================================================
// USER PERMISSION CHECK SCHEMAS
// ============================================================

/**
 * User permission check request schema
 */
export const userPermissionCheckRequestSchema = z.object({
  subjectId: idSchema,
  subjectType: z.enum(['user', 'role']),
  permissions: z.union([userPermissionSchema, z.array(userPermissionSchema)]),
  mode: z.enum(['all', 'any']).default('any'),
});

/**
 * User permission check result schema
 */
export const userPermissionCheckResultSchema = z.object({
  hasPermission: z.boolean(),
  grantedPermissions: z.array(userPermissionSchema),
  deniedPermissions: z.array(userPermissionSchema),
  mode: z.enum(['all', 'any']),
});

// ============================================================
// USER PERMISSION FILTER SCHEMAS
// ============================================================

/**
 * User permission filter schema
 */
export const userPermissionFilterSchema = z.object({
  category: z
    .union([userPermissionCategorySchema, z.array(userPermissionCategorySchema)])
    .optional(),
  securityLevel: z
    .union([userPermissionSecurityLevelSchema, z.array(userPermissionSecurityLevelSchema)])
    .optional(),
  status: z.union([userPermissionStatusSchema, z.array(userPermissionStatusSchema)]).optional(),
  isActive: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  names: z.union([userPermissionSchema, z.array(userPermissionSchema)]).optional(),
  search: z.string().optional(),
});

/**
 * User permission assignment filter schema
 */
export const userPermissionAssignmentFilterSchema = z.object({
  userId: idSchema.optional(),
  permissionName: z.union([userPermissionSchema, z.array(userPermissionSchema)]).optional(),
  isGranted: z.boolean().optional(),
  activeOnly: z.boolean().optional(),
});

// ============================================================
// USER PERMISSION SUMMARY SCHEMA
// ============================================================

/**
 * User permission summary schema
 */
export const userPermissionSummarySchema = z.object({
  userId: idSchema,
  totalPermissions: z.number().int().min(0),
  grantedPermissions: z.array(userPermissionSchema),
  deniedPermissions: z.array(userPermissionSchema),
  permissionsByCategory: z.record(userPermissionCategorySchema, z.array(userPermissionSchema)),
  permissionsBySecurityLevel: z.record(
    userPermissionSecurityLevelSchema,
    z.array(userPermissionSchema)
  ),
  hasAdminPermissions: z.boolean(),
  hasCriticalPermissions: z.boolean(),
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserPermission = z.infer<typeof userPermissionSchema>;
export type UserPermissionCategory = z.infer<typeof userPermissionCategorySchema>;
export type UserPermissionStatus = z.infer<typeof userPermissionStatusSchema>;
export type UserPermissionSecurityLevel = z.infer<typeof userPermissionSecurityLevelSchema>;
export type UserPermissionRecord = z.infer<typeof userPermissionRecordSchema>;
export type UserPermissionAssignment = z.infer<typeof userPermissionAssignmentSchema>;
export type RolePermissionAssignment = z.infer<typeof rolePermissionAssignmentSchema>;
export type UserPermissionCheckRequest = z.infer<typeof userPermissionCheckRequestSchema>;
export type UserPermissionCheckResult = z.infer<typeof userPermissionCheckResultSchema>;
export type UserPermissionFilter = z.infer<typeof userPermissionFilterSchema>;
export type UserPermissionAssignmentFilter = z.infer<typeof userPermissionAssignmentFilterSchema>;
export type UserPermissionSummary = z.infer<typeof userPermissionSummarySchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user permission is valid
 */
export function isValidUserPermission(permission: string): permission is UserPermission {
  return Object.values(USER_PERMISSION).includes(permission as UserPermission);
}

/**
 * Check if user permission category is valid
 */
export function isValidUserPermissionCategory(
  category: string
): category is UserPermissionCategory {
  return Object.values(USER_PERMISSION_CATEGORY).includes(category as UserPermissionCategory);
}

/**
 * Check if user permission status is valid
 */
export function isValidUserPermissionStatus(status: string): status is UserPermissionStatus {
  return Object.values(USER_PERMISSION_STATUS).includes(status as UserPermissionStatus);
}

/**
 * Check if user permission security level is valid
 */
export function isValidUserPermissionSecurityLevel(
  level: string
): level is UserPermissionSecurityLevel {
  return Object.values(USER_PERMISSION_SECURITY_LEVEL).includes(
    level as UserPermissionSecurityLevel
  );
}

/**
 * Get user permission display name
 */
export function getUserPermissionDisplayName(permission: UserPermission): string {
  return USER_PERMISSION_LABELS[permission] || permission;
}

/**
 * Get user permission category
 */
export function getUserPermissionCategory(permission: UserPermission): UserPermissionCategory {
  return (USER_PERMISSION_CATEGORY_MAP[permission] ||
    USER_PERMISSION_CATEGORY.PROFILE) as UserPermissionCategory;
}

/**
 * Get user permission dependencies
 */
export function getUserPermissionDependencies(permission: UserPermission): UserPermission[] {
  return (USER_PERMISSION_DEPENDENCIES[permission] || []) as UserPermission[];
}

/**
 * Get user permission security level
 */
export function getUserPermissionSecurityLevel(
  permission: UserPermission
): UserPermissionSecurityLevel {
  return (USER_PERMISSION_SECURITY_LEVEL_MAP[permission] ||
    USER_PERMISSION_SECURITY_LEVEL.LOW) as UserPermissionSecurityLevel;
}

/**
 * Check if user permission is high security
 */
export function isUserPermissionHighSecurity(permission: UserPermission): boolean {
  const level = getUserPermissionSecurityLevel(permission);
  return (
    level === USER_PERMISSION_SECURITY_LEVEL.HIGH ||
    level === USER_PERMISSION_SECURITY_LEVEL.CRITICAL
  );
}

/**
 * Check if user permission is critical
 */
export function isUserPermissionCritical(permission: UserPermission): boolean {
  return getUserPermissionSecurityLevel(permission) === USER_PERMISSION_SECURITY_LEVEL.CRITICAL;
}

/**
 * Check if user has permission
 */
export function hasUserPermission(
  userPermissions: UserPermission[],
  requiredPermission: UserPermission
): boolean {
  return userPermissions.includes(requiredPermission);
}

/**
 * Check if user has all permissions
 */
export function hasAllUserPermissions(
  userPermissions: UserPermission[],
  requiredPermissions: UserPermission[]
): boolean {
  return requiredPermissions.every((permission) => userPermissions.includes(permission));
}

/**
 * Check if user has any permission
 */
export function hasAnyUserPermission(
  userPermissions: UserPermission[],
  requiredPermissions: UserPermission[]
): boolean {
  return requiredPermissions.some((permission) => userPermissions.includes(permission));
}

/**
 * Get all user permissions
 */
export function getAllUserPermissions(): UserPermission[] {
  return Object.values(USER_PERMISSION);
}

/**
 * Get user permissions by category
 */
export function getUserPermissionsByCategory(category: UserPermissionCategory): UserPermission[] {
  return getAllUserPermissions().filter(
    (permission) => getUserPermissionCategory(permission) === category
  );
}

/**
 * Get user permissions by security level
 */
export function getUserPermissionsBySecurityLevel(
  level: UserPermissionSecurityLevel
): UserPermission[] {
  return getAllUserPermissions().filter(
    (permission) => getUserPermissionSecurityLevel(permission) === level
  );
}

/**
 * Get profile permissions
 */
export function getProfileUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.PROFILE);
}

/**
 * Get account permissions
 */
export function getAccountUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.ACCOUNT);
}

/**
 * Get address permissions
 */
export function getAddressUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.ADDRESS);
}

/**
 * Get contact permissions
 */
export function getContactUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.CONTACT);
}

/**
 * Get KYC permissions
 */
export function getKycUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.KYC);
}

/**
 * Get verification permissions
 */
export function getVerificationUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.VERIFICATION);
}

/**
 * Get session permissions
 */
export function getSessionUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.SESSION);
}

/**
 * Get activity permissions
 */
export function getActivityUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.ACTIVITY);
}

/**
 * Get notification permissions
 */
export function getNotificationUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.NOTIFICATION);
}

/**
 * Get preference permissions
 */
export function getPreferenceUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.PREFERENCE);
}

/**
 * Get settings permissions
 */
export function getSettingsUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.SETTINGS);
}

/**
 * Get security permissions
 */
export function getSecurityUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.SECURITY);
}

/**
 * Get relationship permissions
 */
export function getRelationshipUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.RELATIONSHIP);
}

/**
 * Get subscription permissions
 */
export function getSubscriptionUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.SUBSCRIPTION);
}

/**
 * Get export permissions
 */
export function getExportUserPermissions(): UserPermission[] {
  return getUserPermissionsByCategory(USER_PERMISSION_CATEGORY.EXPORT);
}

/**
 * Get user permission category label
 */
export function getUserPermissionCategoryLabel(category: UserPermissionCategory): string {
  return USER_PERMISSION_CATEGORY_LABELS[category] || category;
}

/**
 * Get all user permission categories
 */
export function getAllUserPermissionCategories(): UserPermissionCategory[] {
  return Object.values(USER_PERMISSION_CATEGORY);
}

/**
 * Create permission check result
 */
export function createUserPermissionCheckResult(
  hasPermission: boolean,
  grantedPermissions: UserPermission[],
  deniedPermissions: UserPermission[],
  mode: 'all' | 'any' = 'any'
): UserPermissionCheckResult {
  return {
    hasPermission,
    grantedPermissions,
    deniedPermissions,
    mode,
  };
}

/**
 * Validate permission list
 */
export function validateUserPermissionList(permissions: string[]): {
  valid: UserPermission[];
  invalid: string[];
} {
  const valid: UserPermission[] = [];
  const invalid: string[] = [];

  permissions.forEach((permission) => {
    if (isValidUserPermission(permission)) {
      valid.push(permission);
    } else {
      invalid.push(permission);
    }
  });

  return { valid, invalid };
}

/**
 * Check if permission has dependencies
 */
export function hasUserPermissionDependencies(permission: UserPermission): boolean {
  return getUserPermissionDependencies(permission).length > 0;
}

/**
 * Check if all dependencies are satisfied
 */
export function areUserPermissionDependenciesSatisfied(
  permission: UserPermission,
  userPermissions: UserPermission[]
): boolean {
  const dependencies = getUserPermissionDependencies(permission);
  return dependencies.every((dep) => userPermissions.includes(dep));
}

/**
 * Get all permissions that require a specific permission as dependency
 */
export function getUserPermissionsDependentOn(permission: UserPermission): UserPermission[] {
  return getAllUserPermissions().filter((p) =>
    getUserPermissionDependencies(p).includes(permission)
  );
}
