/**
 * Authentication Permission Types
 * Types for permission management, checking, and assignment
 */

import type {
  AuthPermission,
  AdminAuthPermission,
  SuperAdminAuthPermission,
  AllAuthPermission,
  AuthPermissionCategory,
} from '@vubon/shared-constants';
import {
  AUTH_PERMISSIONS,
  ADMIN_AUTH_PERMISSIONS,
  SUPER_ADMIN_AUTH_PERMISSIONS,
  ALL_AUTH_PERMISSIONS,
  AUTH_PERMISSION_CATEGORIES,
  AUTH_PERMISSION_CATEGORY_MAP,
} from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';

// ============================================================
// PERMISSION RECORD
// ============================================================

/**
 * Permission record
 */
export interface AuthPermissionRecord {
  /** Unique permission ID */
  id: ID;
  /** Permission name (e.g., 'auth:login') */
  name: AllAuthPermission;
  /** Display name */
  displayName: string;
  /** Permission description */
  description?: string;
  /** Permission category */
  category: AuthPermissionCategory;
  /** Whether permission is active */
  isActive: boolean;
  /** Whether permission is system-level (cannot be deleted) */
  isSystem: boolean;
  /** When the permission was created */
  createdAt: Timestamp;
  /** When the permission was updated */
  updatedAt: Timestamp;
}

// ============================================================
// PERMISSION ASSIGNMENT
// ============================================================

/**
 * User permission assignment
 */
export interface AuthUserPermission {
  /** Unique assignment ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** Permission name */
  permissionName: AllAuthPermission;
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
export interface AuthRolePermission {
  /** Unique assignment ID */
  id: ID;
  /** Role ID */
  roleId: ID;
  /** Permission name */
  permissionName: AllAuthPermission;
  /** Whether the permission is granted */
  isGranted: boolean;
  /** When the permission was assigned */
  assignedAt: Timestamp;
}

// ============================================================
// PERMISSION CHECK REQUEST
// ============================================================

/**
 * Request to check permissions
 */
export interface AuthPermissionCheckRequest {
  /** User ID or role ID */
  subjectId: ID;
  /** Subject type (user or role) */
  subjectType: 'user' | 'role';
  /** Permission(s) to check */
  permissions: AllAuthPermission | AllAuthPermission[];
  /** Whether to check for ALL permissions (AND) or ANY (OR) */
  mode?: 'all' | 'any';
}

/**
 * Permission check result
 */
export interface AuthPermissionCheckResult {
  /** Whether the check passed */
  hasPermission: boolean;
  /** Permissions that were granted */
  grantedPermissions: AllAuthPermission[];
  /** Permissions that were denied */
  deniedPermissions: AllAuthPermission[];
  /** Mode used for checking */
  mode: 'all' | 'any';
}

// ============================================================
// PERMISSION ASSIGNMENT REQUEST
// ============================================================

/**
 * Request to assign permissions to a user
 */
export interface AuthAssignUserPermissionsRequest {
  /** User ID */
  userId: ID;
  /** Permission(s) to assign */
  permissions: AllAuthPermission | AllAuthPermission[];
  /** Whether to grant (true) or revoke (false) */
  grant: boolean;
  /** Reason for assignment */
  reason?: string;
  /** Expiry for temporary permissions */
  expiresAt?: Timestamp;
  /** Who is performing the assignment */
  assignedBy?: ID;
}

/**
 * Request to assign permissions to a role
 */
export interface AuthAssignRolePermissionsRequest {
  /** Role ID */
  roleId: ID;
  /** Permission(s) to assign */
  permissions: AllAuthPermission | AllAuthPermission[];
  /** Whether to grant (true) or revoke (false) */
  grant: boolean;
}

// ============================================================
// PERMISSION RESPONSE
// ============================================================

/**
 * Permission operation response
 */
export interface AuthPermissionResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Assigned permissions (if applicable) */
  assignments?: AuthUserPermission[] | AuthRolePermission[];
  /** Error message if failed */
  error?: string;
}

// ============================================================
// PERMISSION FILTER
// ============================================================

/**
 * Filter for querying permissions
 */
export interface AuthPermissionFilter {
  /** Filter by category */
  category?: AuthPermissionCategory | AuthPermissionCategory[];
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by system status */
  isSystem?: boolean;
  /** Filter by permission name */
  names?: AllAuthPermission | AllAuthPermission[];
  /** Search by display name or description */
  search?: string;
}

/**
 * Filter for querying user permissions
 */
export interface AuthUserPermissionFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by permission name */
  permissionName?: AllAuthPermission | AllAuthPermission[];
  /** Filter by granted status */
  isGranted?: boolean;
  /** Filter by active assignments (not expired) */
  activeOnly?: boolean;
}

// ============================================================
// PERMISSION SUMMARY
// ============================================================

/**
 * Permission summary for a user
 */
export interface AuthUserPermissionSummary {
  /** User ID */
  userId: ID;
  /** Total permissions assigned */
  totalPermissions: number;
  /** Granted permissions */
  grantedPermissions: AllAuthPermission[];
  /** Denied permissions */
  deniedPermissions: AllAuthPermission[];
  /** Permissions grouped by category */
  permissionsByCategory: Record<AuthPermissionCategory, AllAuthPermission[]>;
  /** Whether user has admin permissions */
  hasAdminPermissions: boolean;
  /** Whether user has super admin permissions */
  hasSuperAdminPermissions: boolean;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if permission is valid
 */
export function isValidAuthPermission(permission: string): permission is AllAuthPermission {
  return Object.values(ALL_AUTH_PERMISSIONS).includes(permission as AllAuthPermission);
}

/**
 * Get permission category
 */
export function getAuthPermissionCategory(permission: AllAuthPermission): AuthPermissionCategory {
  return AUTH_PERMISSION_CATEGORY_MAP[permission] || AUTH_PERMISSION_CATEGORIES.AUTH;
}

/**
 * Check if permission is admin-level
 */
export function isAuthPermissionAdmin(permission: AllAuthPermission): boolean {
  return permission.startsWith('admin:') || permission.startsWith('super_admin:');
}

/**
 * Check if permission is super admin-level
 */
export function isAuthPermissionSuperAdmin(permission: AllAuthPermission): boolean {
  return permission.startsWith('super_admin:');
}

/**
 * Get all permissions by category
 */
export function getAuthPermissionsByCategory(
  category: AuthPermissionCategory
): AllAuthPermission[] {
  return Object.keys(AUTH_PERMISSION_CATEGORY_MAP)
    .filter((key) => AUTH_PERMISSION_CATEGORY_MAP[key] === category)
    .map((key) => key as AllAuthPermission);
}

/**
 * Check if user has permission
 */
export function hasAuthPermission(
  userPermissions: AllAuthPermission[],
  requiredPermission: AllAuthPermission
): boolean {
  return userPermissions.includes(requiredPermission);
}

/**
 * Check if user has any of the permissions
 */
export function hasAnyAuthPermission(
  userPermissions: AllAuthPermission[],
  requiredPermissions: AllAuthPermission[]
): boolean {
  return requiredPermissions.some((permission) => userPermissions.includes(permission));
}

/**
 * Check if user has all permissions
 */
export function hasAllAuthPermissions(
  userPermissions: AllAuthPermission[],
  requiredPermissions: AllAuthPermission[]
): boolean {
  return requiredPermissions.every((permission) => userPermissions.includes(permission));
}

/**
 * Get human-readable label for permission
 */
export function getAuthPermissionLabel(permission: AllAuthPermission): string {
  const labels: Partial<Record<AllAuthPermission, string>> = {
    'auth:login': 'Login',
    'auth:logout': 'Logout',
    'auth:refresh-token': 'Refresh Token',
    'auth:verify-token': 'Verify Token',
    'auth:revoke-token': 'Revoke Token',
    'auth:change-password': 'Change Password',
    'auth:reset-password': 'Reset Password',
    'auth:forgot-password': 'Forgot Password',
    'auth:verify-email': 'Verify Email',
    'auth:verify-phone': 'Verify Phone',
    'auth:enable-2fa': 'Enable 2FA',
    'auth:disable-2fa': 'Disable 2FA',
    'auth:verify-2fa': 'Verify 2FA',
    'auth:manage-sessions': 'Manage Sessions',
    'auth:terminate-session': 'Terminate Session',
    'auth:terminate-all-sessions': 'Terminate All Sessions',
    'auth:view-profile': 'View Profile',
    'auth:update-profile': 'Update Profile',
    'auth:delete-account': 'Delete Account',
    'auth:manage-settings': 'Manage Settings',
    'auth:view-audit': 'View Audit Logs',
    'admin:view-users': 'View Users',
    'admin:manage-users': 'Manage Users',
    'admin:manage-roles': 'Manage Roles',
    'admin:manage-permissions': 'Manage Permissions',
    'admin:view-sessions': 'View Sessions',
    'admin:terminate-session': 'Terminate Any Session',
    'admin:manage-2fa': 'Manage 2FA',
    'admin:view-audit': 'View All Audit Logs',
    'admin:manage-auth-settings': 'Manage Auth Settings',
    'admin:manage-security': 'Manage Security Policies',
    'admin:manage-api-keys': 'Manage API Keys',
    'admin:manage-webhooks': 'Manage Webhooks',
    'admin:manage-rate-limits': 'Manage Rate Limits',
    'super_admin:manage-auth': 'Manage Authentication System',
    'super_admin:manage-security': 'Manage Security Configuration',
    'super_admin:manage-system': 'Manage System Settings',
    'super_admin:emergency-access': 'Emergency Access',
    'super_admin:manage-recovery': 'Manage Disaster Recovery',
  };
  return labels[permission] || permission;
}

/**
 * Get human-readable label for permission category
 */
export function getAuthPermissionCategoryLabel(category: AuthPermissionCategory): string {
  const labels: Record<AuthPermissionCategory, string> = {
    auth: 'Authentication',
    token: 'Token Management',
    password: 'Password Management',
    verification: 'Verification',
    session: 'Session Management',
    profile: 'Profile Management',
    admin: 'Administration',
    security: 'Security',
    system: 'System',
  };
  return labels[category] || 'Unknown Category';
}

/**
 * Create permission check result
 */
export function createAuthPermissionCheckResult(
  hasPermission: boolean,
  grantedPermissions: AllAuthPermission[],
  deniedPermissions: AllAuthPermission[],
  mode: 'all' | 'any' = 'any'
): AuthPermissionCheckResult {
  return {
    hasPermission,
    grantedPermissions,
    deniedPermissions,
    mode,
  };
}

/**
 * Check if permission is sensitive (requires special handling)
 */
export function isAuthPermissionSensitive(permission: AllAuthPermission): boolean {
  const sensitivePermissions: AllAuthPermission[] = [
    AUTH_PERMISSIONS.AUTH_DELETE_ACCOUNT,
    ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_USERS,
    ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_ROLES,
    ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_PERMISSIONS,
    SUPER_ADMIN_AUTH_PERMISSIONS.SUPER_ADMIN_MANAGE_AUTH,
    SUPER_ADMIN_AUTH_PERMISSIONS.SUPER_ADMIN_MANAGE_SECURITY,
    SUPER_ADMIN_AUTH_PERMISSIONS.SUPER_ADMIN_MANAGE_SYSTEM,
  ];
  return sensitivePermissions.includes(permission);
}

/**
 * Get all auth permissions
 */
export function getAllAuthPermissions(): AllAuthPermission[] {
  return Object.values(ALL_AUTH_PERMISSIONS);
}

/**
 * Get core auth permissions
 */
export function getCoreAuthPermissions(): AuthPermission[] {
  return Object.values(AUTH_PERMISSIONS);
}

/**
 * Get admin auth permissions
 */
export function getAdminAuthPermissions(): AdminAuthPermission[] {
  return Object.values(ADMIN_AUTH_PERMISSIONS);
}

/**
 * Get super admin auth permissions
 */
export function getSuperAdminAuthPermissions(): SuperAdminAuthPermission[] {
  return Object.values(SUPER_ADMIN_AUTH_PERMISSIONS);
}

/**
 * Validate permission list
 * Returns invalid permissions
 */
export function validateAuthPermissionList(permissions: string[]): {
  valid: AllAuthPermission[];
  invalid: string[];
} {
  const valid: AllAuthPermission[] = [];
  const invalid: string[] = [];

  permissions.forEach((permission) => {
    if (isValidAuthPermission(permission)) {
      valid.push(permission);
    } else {
      invalid.push(permission);
    }
  });

  return { valid, invalid };
}
