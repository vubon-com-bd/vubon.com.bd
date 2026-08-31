/**
 * User Permission Types
 * Types for user permission management, checking, and assignment
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';
import {
  USER_PERMISSION,
  USER_PERMISSION_CATEGORY,
  USER_PERMISSION_CATEGORY_MAP,
  USER_PERMISSION_LABELS,
  USER_PERMISSION_DEPENDENCIES,
  USER_PERMISSION_STATUS,
  USER_PERMISSION_SECURITY_LEVEL,
  USER_PERMISSION_SECURITY_LEVEL_MAP,
  USER_PERMISSION_CATEGORY_LABELS,
} from '@vubon/shared-constants';

// ============================================================
// USER PERMISSION TYPES
// ============================================================

/**
 * User permission type
 */
export type UserPermission = (typeof USER_PERMISSION)[keyof typeof USER_PERMISSION];

/**
 * User permission category type
 */
export type UserPermissionCategory =
  (typeof USER_PERMISSION_CATEGORY)[keyof typeof USER_PERMISSION_CATEGORY];

/**
 * User permission status type
 */
export type UserPermissionStatus =
  (typeof USER_PERMISSION_STATUS)[keyof typeof USER_PERMISSION_STATUS];

/**
 * User permission security level type
 */
export type UserPermissionSecurityLevel =
  (typeof USER_PERMISSION_SECURITY_LEVEL)[keyof typeof USER_PERMISSION_SECURITY_LEVEL];

// ============================================================
// USER PERMISSION RECORD
// ============================================================

/**
 * User permission record
 */
export interface UserPermissionRecord {
  /** Unique identifier */
  id: ID;
  /** Permission name */
  name: UserPermission;
  /** Display name for UI */
  displayName: string;
  /** Permission description */
  description?: string;
  /** Category of the permission */
  category: UserPermissionCategory;
  /** Security level of the permission */
  securityLevel: UserPermissionSecurityLevel;
  /** Status of the permission */
  status: UserPermissionStatus;
  /** Dependencies (other permissions required) */
  dependencies: UserPermission[];
  /** Whether permission is active */
  isActive: boolean;
  /** Whether permission is system-defined */
  isSystem: boolean;
  /** When the permission was created */
  createdAt: Timestamp;
  /** When the permission was updated */
  updatedAt: Timestamp;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER PERMISSION ASSIGNMENT
// ============================================================

/**
 * User permission assignment
 */
export interface UserPermissionAssignment {
  /** Unique assignment ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** Permission name */
  permissionName: UserPermission;
  /** Whether the permission is granted */
  isGranted: boolean;
  /** Reason for granting/denying */
  reason?: string;
  /** Who assigned the permission */
  assignedBy?: ID;
  /** When the permission was assigned */
  assignedAt: Timestamp;
  /** When the permission expires (if temporary) */
  expiresAt?: Timestamp;
}

/**
 * Role permission assignment
 */
export interface RolePermissionAssignment {
  /** Unique assignment ID */
  id: ID;
  /** Role ID */
  roleId: ID;
  /** Permission name */
  permissionName: UserPermission;
  /** Whether the permission is granted */
  isGranted: boolean;
  /** When the permission was assigned */
  assignedAt: Timestamp;
}

// ============================================================
// USER PERMISSION CHECK
// ============================================================

/**
 * Permission check request
 */
export interface UserPermissionCheckRequest {
  /** User ID or role ID */
  subjectId: ID;
  /** Subject type (user or role) */
  subjectType: 'user' | 'role';
  /** Permission(s) to check */
  permissions: UserPermission | UserPermission[];
  /** Whether to check for ALL permissions (AND) or ANY (OR) */
  mode?: 'all' | 'any';
}

/**
 * Permission check result
 */
export interface UserPermissionCheckResult {
  /** Whether the check passed */
  hasPermission: boolean;
  /** Permissions that were granted */
  grantedPermissions: UserPermission[];
  /** Permissions that were denied */
  deniedPermissions: UserPermission[];
  /** Mode used for checking */
  mode: 'all' | 'any';
}

// ============================================================
// USER PERMISSION FILTER
// ============================================================

/**
 * Permission filter
 */
export interface UserPermissionFilter {
  /** Filter by category */
  category?: UserPermissionCategory | UserPermissionCategory[];
  /** Filter by security level */
  securityLevel?: UserPermissionSecurityLevel | UserPermissionSecurityLevel[];
  /** Filter by status */
  status?: UserPermissionStatus | UserPermissionStatus[];
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by system status */
  isSystem?: boolean;
  /** Filter by permission name */
  names?: UserPermission | UserPermission[];
  /** Search by display name or description */
  search?: string;
}

/**
 * User permission assignment filter
 */
export interface UserPermissionAssignmentFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by permission name */
  permissionName?: UserPermission | UserPermission[];
  /** Filter by granted status */
  isGranted?: boolean;
  /** Filter by active assignments (not expired) */
  activeOnly?: boolean;
}

// ============================================================
// USER PERMISSION SUMMARY
// ============================================================

/**
 * User permission summary
 */
export interface UserPermissionSummary {
  /** User ID */
  userId: ID;
  /** Total permissions assigned */
  totalPermissions: number;
  /** Granted permissions */
  grantedPermissions: UserPermission[];
  /** Denied permissions */
  deniedPermissions: UserPermission[];
  /** Permissions grouped by category */
  permissionsByCategory: Record<UserPermissionCategory, UserPermission[]>;
  /** Permissions grouped by security level */
  permissionsBySecurityLevel: Record<UserPermissionSecurityLevel, UserPermission[]>;
  /** Whether user has admin-level permissions */
  hasAdminPermissions: boolean;
  /** Whether user has critical permissions */
  hasCriticalPermissions: boolean;
}

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
 * Returns invalid permissions
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
