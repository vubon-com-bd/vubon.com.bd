/**
 * Authentication Permission Schema
 * Zod schemas for permission management, checking, and assignment
 */

import { z } from 'zod';
import {
  AUTH_PERMISSIONS,
  ADMIN_AUTH_PERMISSIONS,
  SUPER_ADMIN_AUTH_PERMISSIONS,
  ALL_AUTH_PERMISSIONS,
  AUTH_PERMISSION_CATEGORIES,
  AUTH_PERMISSION_CATEGORY_MAP,
  type AuthPermission,
  type AdminAuthPermission,
  type SuperAdminAuthPermission,
  type AllAuthPermission,
  type AuthPermissionCategory,
} from '@vubon/shared-constants';
import { idSchema, timestampSchema } from '../common/core-primitives.schema';

// ============================================================
// AUTH PERMISSION CATEGORY SCHEMA
// ============================================================

/**
 * Auth permission category schema
 */
export const authPermissionCategorySchema = z.enum([
  AUTH_PERMISSION_CATEGORIES.AUTH,
  AUTH_PERMISSION_CATEGORIES.TOKEN,
  AUTH_PERMISSION_CATEGORIES.PASSWORD,
  AUTH_PERMISSION_CATEGORIES.VERIFICATION,
  AUTH_PERMISSION_CATEGORIES.SESSION,
  AUTH_PERMISSION_CATEGORIES.PROFILE,
  AUTH_PERMISSION_CATEGORIES.ADMIN,
  AUTH_PERMISSION_CATEGORIES.SECURITY,
  AUTH_PERMISSION_CATEGORIES.SYSTEM,
]);

// ============================================================
// AUTH PERMISSION SCHEMAS
// ============================================================

/**
 * All auth permissions schema (Combined)
 * This includes all permissions from AUTH_PERMISSIONS, ADMIN_AUTH_PERMISSIONS, and SUPER_ADMIN_AUTH_PERMISSIONS
 */
export const allAuthPermissionSchema = z.enum([
  // Core auth permissions
  AUTH_PERMISSIONS.AUTH_LOGIN,
  AUTH_PERMISSIONS.AUTH_LOGOUT,
  AUTH_PERMISSIONS.AUTH_REFRESH_TOKEN,
  AUTH_PERMISSIONS.AUTH_VERIFY_TOKEN,
  AUTH_PERMISSIONS.AUTH_REVOKE_TOKEN,
  AUTH_PERMISSIONS.AUTH_CHANGE_PASSWORD,
  AUTH_PERMISSIONS.AUTH_RESET_PASSWORD,
  AUTH_PERMISSIONS.AUTH_FORGOT_PASSWORD,
  AUTH_PERMISSIONS.AUTH_VERIFY_EMAIL,
  AUTH_PERMISSIONS.AUTH_VERIFY_PHONE,
  AUTH_PERMISSIONS.AUTH_ENABLE_2FA,
  AUTH_PERMISSIONS.AUTH_DISABLE_2FA,
  AUTH_PERMISSIONS.AUTH_VERIFY_2FA,
  AUTH_PERMISSIONS.AUTH_MANAGE_SESSIONS,
  AUTH_PERMISSIONS.AUTH_TERMINATE_SESSION,
  AUTH_PERMISSIONS.AUTH_TERMINATE_ALL_SESSIONS,
  AUTH_PERMISSIONS.AUTH_VIEW_PROFILE,
  AUTH_PERMISSIONS.AUTH_UPDATE_PROFILE,
  AUTH_PERMISSIONS.AUTH_DELETE_ACCOUNT,
  AUTH_PERMISSIONS.AUTH_MANAGE_SETTINGS,
  AUTH_PERMISSIONS.AUTH_VIEW_AUDIT,
  // Admin auth permissions
  ADMIN_AUTH_PERMISSIONS.ADMIN_VIEW_USERS,
  ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_USERS,
  ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_ROLES,
  ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_PERMISSIONS,
  ADMIN_AUTH_PERMISSIONS.ADMIN_VIEW_SESSIONS,
  ADMIN_AUTH_PERMISSIONS.ADMIN_TERMINATE_SESSION,
  ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_2FA,
  ADMIN_AUTH_PERMISSIONS.ADMIN_VIEW_AUDIT,
  ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_AUTH_SETTINGS,
  ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_SECURITY,
  ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_API_KEYS,
  ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_WEBHOOKS,
  ADMIN_AUTH_PERMISSIONS.ADMIN_MANAGE_RATE_LIMITS,
  // Super admin auth permissions
  SUPER_ADMIN_AUTH_PERMISSIONS.SUPER_ADMIN_MANAGE_AUTH,
  SUPER_ADMIN_AUTH_PERMISSIONS.SUPER_ADMIN_MANAGE_SECURITY,
  SUPER_ADMIN_AUTH_PERMISSIONS.SUPER_ADMIN_MANAGE_SYSTEM,
  SUPER_ADMIN_AUTH_PERMISSIONS.SUPER_ADMIN_EMERGENCY_ACCESS,
  SUPER_ADMIN_AUTH_PERMISSIONS.SUPER_ADMIN_MANAGE_RECOVERY,
]);

// ============================================================
// AUTH PERMISSION RECORD SCHEMA
// ============================================================

/**
 * Auth permission record schema
 */
export const authPermissionRecordSchema = z.object({
  id: idSchema,
  name: allAuthPermissionSchema,
  displayName: z.string().min(1),
  description: z.string().optional(),
  category: authPermissionCategorySchema,
  isActive: z.boolean().default(true),
  isSystem: z.boolean().default(false),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

// ============================================================
// AUTH PERMISSION ASSIGNMENT SCHEMAS
// ============================================================

/**
 * Auth user permission schema
 */
export const authUserPermissionSchema = z.object({
  id: idSchema,
  userId: idSchema,
  permissionName: allAuthPermissionSchema,
  isGranted: z.boolean().default(true),
  reason: z.string().optional(),
  assignedBy: idSchema.optional(),
  assignedAt: timestampSchema,
  expiresAt: timestampSchema.optional(),
});

/**
 * Auth role permission schema
 */
export const authRolePermissionSchema = z.object({
  id: idSchema,
  roleId: idSchema,
  permissionName: allAuthPermissionSchema,
  isGranted: z.boolean().default(true),
  assignedAt: timestampSchema,
});

// ============================================================
// AUTH PERMISSION CHECK REQUEST SCHEMA
// ============================================================

/**
 * Auth permission check request schema
 */
export const authPermissionCheckRequestSchema = z.object({
  subjectId: idSchema,
  subjectType: z.enum(['user', 'role']),
  permissions: z.union([allAuthPermissionSchema, z.array(allAuthPermissionSchema)]),
  mode: z.enum(['all', 'any']).default('any'),
});

/**
 * Auth permission check result schema
 */
export const authPermissionCheckResultSchema = z.object({
  hasPermission: z.boolean(),
  grantedPermissions: z.array(allAuthPermissionSchema),
  deniedPermissions: z.array(allAuthPermissionSchema),
  mode: z.enum(['all', 'any']),
});

// ============================================================
// AUTH PERMISSION ASSIGNMENT REQUEST SCHEMAS
// ============================================================

/**
 * Auth assign user permissions request schema
 */
export const authAssignUserPermissionsRequestSchema = z.object({
  userId: idSchema,
  permissions: z.union([allAuthPermissionSchema, z.array(allAuthPermissionSchema)]),
  grant: z.boolean().default(true),
  reason: z.string().optional(),
  expiresAt: timestampSchema.optional(),
  assignedBy: idSchema.optional(),
});

/**
 * Auth assign role permissions request schema
 */
export const authAssignRolePermissionsRequestSchema = z.object({
  roleId: idSchema,
  permissions: z.union([allAuthPermissionSchema, z.array(allAuthPermissionSchema)]),
  grant: z.boolean().default(true),
});

// ============================================================
// AUTH PERMISSION RESPONSE SCHEMA
// ============================================================

/**
 * Auth permission response schema
 */
export const authPermissionResponseSchema = z.object({
  success: z.boolean(),
  assignments: z
    .union([z.array(authUserPermissionSchema), z.array(authRolePermissionSchema)])
    .optional(),
  error: z.string().optional(),
});

// ============================================================
// AUTH PERMISSION FILTER SCHEMAS
// ============================================================

/**
 * Auth permission filter schema
 */
export const authPermissionFilterSchema = z.object({
  category: z
    .union([authPermissionCategorySchema, z.array(authPermissionCategorySchema)])
    .optional(),
  isActive: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  names: z.union([allAuthPermissionSchema, z.array(allAuthPermissionSchema)]).optional(),
  search: z.string().optional(),
});

/**
 * Auth user permission filter schema
 */
export const authUserPermissionFilterSchema = z.object({
  userId: idSchema.optional(),
  permissionName: z.union([allAuthPermissionSchema, z.array(allAuthPermissionSchema)]).optional(),
  isGranted: z.boolean().optional(),
  activeOnly: z.boolean().optional(),
});

// ============================================================
// AUTH PERMISSION SUMMARY SCHEMA
// ============================================================

/**
 * Auth user permission summary schema
 */
export const authUserPermissionSummarySchema = z.object({
  userId: idSchema,
  totalPermissions: z.number().int().min(0),
  grantedPermissions: z.array(allAuthPermissionSchema),
  deniedPermissions: z.array(allAuthPermissionSchema),
  permissionsByCategory: z.record(authPermissionCategorySchema, z.array(allAuthPermissionSchema)),
  hasAdminPermissions: z.boolean(),
  hasSuperAdminPermissions: z.boolean(),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthPermissionRecord = z.infer<typeof authPermissionRecordSchema>;
export type AuthUserPermission = z.infer<typeof authUserPermissionSchema>;
export type AuthRolePermission = z.infer<typeof authRolePermissionSchema>;
export type AuthPermissionCheckRequest = z.infer<typeof authPermissionCheckRequestSchema>;
export type AuthPermissionCheckResult = z.infer<typeof authPermissionCheckResultSchema>;
export type AuthAssignUserPermissionsRequest = z.infer<
  typeof authAssignUserPermissionsRequestSchema
>;
export type AuthAssignRolePermissionsRequest = z.infer<
  typeof authAssignRolePermissionsRequestSchema
>;
export type AuthPermissionResponse = z.infer<typeof authPermissionResponseSchema>;
export type AuthPermissionFilter = z.infer<typeof authPermissionFilterSchema>;
export type AuthUserPermissionFilter = z.infer<typeof authUserPermissionFilterSchema>;
export type AuthUserPermissionSummary = z.infer<typeof authUserPermissionSummarySchema>;

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
