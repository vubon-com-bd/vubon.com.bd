/**
 * Authentication Permission Constants
 * Core authentication permissions for access control
 */

/**
 * Core Authentication Permissions
 * Basic authentication and authorization permissions
 */
export const AUTH_PERMISSIONS = {
  /** Login to the system */
  AUTH_LOGIN: 'auth:login',
  /** Logout from the system */
  AUTH_LOGOUT: 'auth:logout',
  /** Refresh authentication token */
  AUTH_REFRESH_TOKEN: 'auth:refresh-token',
  /** Verify authentication token */
  AUTH_VERIFY_TOKEN: 'auth:verify-token',
  /** Revoke authentication token */
  AUTH_REVOKE_TOKEN: 'auth:revoke-token',
  /** Change password */
  AUTH_CHANGE_PASSWORD: 'auth:change-password',
  /** Reset password */
  AUTH_RESET_PASSWORD: 'auth:reset-password',
  /** Forgot password request */
  AUTH_FORGOT_PASSWORD: 'auth:forgot-password',
  /** Verify email address */
  AUTH_VERIFY_EMAIL: 'auth:verify-email',
  /** Verify phone number */
  AUTH_VERIFY_PHONE: 'auth:verify-phone',
  /** Enable 2FA */
  AUTH_ENABLE_2FA: 'auth:enable-2fa',
  /** Disable 2FA */
  AUTH_DISABLE_2FA: 'auth:disable-2fa',
  /** Verify 2FA code */
  AUTH_VERIFY_2FA: 'auth:verify-2fa',
  /** Manage sessions */
  AUTH_MANAGE_SESSIONS: 'auth:manage-sessions',
  /** Terminate own session */
  AUTH_TERMINATE_SESSION: 'auth:terminate-session',
  /** Terminate all sessions */
  AUTH_TERMINATE_ALL_SESSIONS: 'auth:terminate-all-sessions',
  /** View own profile */
  AUTH_VIEW_PROFILE: 'auth:view-profile',
  /** Update own profile */
  AUTH_UPDATE_PROFILE: 'auth:update-profile',
  /** Delete own account */
  AUTH_DELETE_ACCOUNT: 'auth:delete-account',
  /** Manage account settings */
  AUTH_MANAGE_SETTINGS: 'auth:manage-settings',
  /** View audit logs */
  AUTH_VIEW_AUDIT: 'auth:view-audit',
} as const;

export type AuthPermission = (typeof AUTH_PERMISSIONS)[keyof typeof AUTH_PERMISSIONS];

/**
 * Admin Authentication Permissions
 * Extended permissions for authentication management
 */
export const ADMIN_AUTH_PERMISSIONS = {
  ...AUTH_PERMISSIONS,
  /** View all users */
  ADMIN_VIEW_USERS: 'admin:view-users',
  /** Manage all users */
  ADMIN_MANAGE_USERS: 'admin:manage-users',
  /** Manage all roles */
  ADMIN_MANAGE_ROLES: 'admin:manage-roles',
  /** Manage all permissions */
  ADMIN_MANAGE_PERMISSIONS: 'admin:manage-permissions',
  /** View all sessions */
  ADMIN_VIEW_SESSIONS: 'admin:view-sessions',
  /** Terminate any session */
  ADMIN_TERMINATE_SESSION: 'admin:terminate-session',
  /** Manage 2FA for all users */
  ADMIN_MANAGE_2FA: 'admin:manage-2fa',
  /** View all audit logs */
  ADMIN_VIEW_AUDIT: 'admin:view-audit',
  /** Manage auth settings */
  ADMIN_MANAGE_AUTH_SETTINGS: 'admin:manage-auth-settings',
  /** Manage security policies */
  ADMIN_MANAGE_SECURITY: 'admin:manage-security',
  /** Manage API keys */
  ADMIN_MANAGE_API_KEYS: 'admin:manage-api-keys',
  /** Manage webhooks */
  ADMIN_MANAGE_WEBHOOKS: 'admin:manage-webhooks',
  /** Manage rate limiting */
  ADMIN_MANAGE_RATE_LIMITS: 'admin:manage-rate-limits',
} as const;

export type AdminAuthPermission =
  (typeof ADMIN_AUTH_PERMISSIONS)[keyof typeof ADMIN_AUTH_PERMISSIONS];

/**
 * Super Admin Authentication Permissions
 * All authentication permissions
 */
export const SUPER_ADMIN_AUTH_PERMISSIONS = {
  ...ADMIN_AUTH_PERMISSIONS,
  /** Manage all authentication systems */
  SUPER_ADMIN_MANAGE_AUTH: 'super_admin:manage-auth',
  /** Manage all security configurations */
  SUPER_ADMIN_MANAGE_SECURITY: 'super_admin:manage-security',
  /** Manage all system settings */
  SUPER_ADMIN_MANAGE_SYSTEM: 'super_admin:manage-system',
  /** Manage emergency access */
  SUPER_ADMIN_EMERGENCY_ACCESS: 'super_admin:emergency-access',
  /** Manage disaster recovery */
  SUPER_ADMIN_MANAGE_RECOVERY: 'super_admin:manage-recovery',
} as const;

export type SuperAdminAuthPermission =
  (typeof SUPER_ADMIN_AUTH_PERMISSIONS)[keyof typeof SUPER_ADMIN_AUTH_PERMISSIONS];

/**
 * All Authentication Permissions
 * Combined authentication permissions
 */
export const ALL_AUTH_PERMISSIONS = {
  ...AUTH_PERMISSIONS,
  ...ADMIN_AUTH_PERMISSIONS,
  ...SUPER_ADMIN_AUTH_PERMISSIONS,
} as const;

export type AllAuthPermission = (typeof ALL_AUTH_PERMISSIONS)[keyof typeof ALL_AUTH_PERMISSIONS];

/**
 * Auth Permission Categories
 * Categories for grouping authentication permissions
 */
export const AUTH_PERMISSION_CATEGORIES = {
  /** Authentication operations (login, logout, etc.) */
  AUTH: 'auth',
  /** Token management operations */
  TOKEN: 'token',
  /** Password management operations */
  PASSWORD: 'password',
  /** Verification operations (email, phone, 2FA) */
  VERIFICATION: 'verification',
  /** Session management operations */
  SESSION: 'session',
  /** Profile management operations */
  PROFILE: 'profile',
  /** Admin management operations */
  ADMIN: 'admin',
  /** Security management operations */
  SECURITY: 'security',
  /** System management operations */
  SYSTEM: 'system',
} as const;

export type AuthPermissionCategory =
  (typeof AUTH_PERMISSION_CATEGORIES)[keyof typeof AUTH_PERMISSION_CATEGORIES];

/**
 * Auth Permission Category Map
 * Maps each auth permission to its category
 */
export const AUTH_PERMISSION_CATEGORY_MAP: Record<string, AuthPermissionCategory> = {
  'auth:login': AUTH_PERMISSION_CATEGORIES.AUTH,
  'auth:logout': AUTH_PERMISSION_CATEGORIES.AUTH,
  'auth:refresh-token': AUTH_PERMISSION_CATEGORIES.TOKEN,
  'auth:verify-token': AUTH_PERMISSION_CATEGORIES.TOKEN,
  'auth:revoke-token': AUTH_PERMISSION_CATEGORIES.TOKEN,
  'auth:change-password': AUTH_PERMISSION_CATEGORIES.PASSWORD,
  'auth:reset-password': AUTH_PERMISSION_CATEGORIES.PASSWORD,
  'auth:forgot-password': AUTH_PERMISSION_CATEGORIES.PASSWORD,
  'auth:verify-email': AUTH_PERMISSION_CATEGORIES.VERIFICATION,
  'auth:verify-phone': AUTH_PERMISSION_CATEGORIES.VERIFICATION,
  'auth:enable-2fa': AUTH_PERMISSION_CATEGORIES.VERIFICATION,
  'auth:disable-2fa': AUTH_PERMISSION_CATEGORIES.VERIFICATION,
  'auth:verify-2fa': AUTH_PERMISSION_CATEGORIES.VERIFICATION,
  'auth:manage-sessions': AUTH_PERMISSION_CATEGORIES.SESSION,
  'auth:terminate-session': AUTH_PERMISSION_CATEGORIES.SESSION,
  'auth:terminate-all-sessions': AUTH_PERMISSION_CATEGORIES.SESSION,
  'auth:view-profile': AUTH_PERMISSION_CATEGORIES.PROFILE,
  'auth:update-profile': AUTH_PERMISSION_CATEGORIES.PROFILE,
  'auth:delete-account': AUTH_PERMISSION_CATEGORIES.PROFILE,
  'auth:manage-settings': AUTH_PERMISSION_CATEGORIES.PROFILE,
  'auth:view-audit': AUTH_PERMISSION_CATEGORIES.SECURITY,

  'admin:view-users': AUTH_PERMISSION_CATEGORIES.ADMIN,
  'admin:manage-users': AUTH_PERMISSION_CATEGORIES.ADMIN,
  'admin:manage-roles': AUTH_PERMISSION_CATEGORIES.ADMIN,
  'admin:manage-permissions': AUTH_PERMISSION_CATEGORIES.ADMIN,
  'admin:view-sessions': AUTH_PERMISSION_CATEGORIES.ADMIN,
  'admin:terminate-session': AUTH_PERMISSION_CATEGORIES.ADMIN,
  'admin:manage-2fa': AUTH_PERMISSION_CATEGORIES.ADMIN,
  'admin:view-audit': AUTH_PERMISSION_CATEGORIES.ADMIN,
  'admin:manage-auth-settings': AUTH_PERMISSION_CATEGORIES.ADMIN,
  'admin:manage-security': AUTH_PERMISSION_CATEGORIES.SECURITY,
  'admin:manage-api-keys': AUTH_PERMISSION_CATEGORIES.SECURITY,
  'admin:manage-webhooks': AUTH_PERMISSION_CATEGORIES.SECURITY,
  'admin:manage-rate-limits': AUTH_PERMISSION_CATEGORIES.SECURITY,

  'super_admin:manage-auth': AUTH_PERMISSION_CATEGORIES.SYSTEM,
  'super_admin:manage-security': AUTH_PERMISSION_CATEGORIES.SECURITY,
  'super_admin:manage-system': AUTH_PERMISSION_CATEGORIES.SYSTEM,
  'super_admin:emergency-access': AUTH_PERMISSION_CATEGORIES.SYSTEM,
  'super_admin:manage-recovery': AUTH_PERMISSION_CATEGORIES.SYSTEM,
} as const;

/**
 * Helper function to check if auth permission exists
 */
export function isValidAuthPermission(permission: string): permission is AllAuthPermission {
  return Object.values(ALL_AUTH_PERMISSIONS).includes(permission as AllAuthPermission);
}

/**
 * Helper function to get auth permission category
 */
export function getAuthPermissionCategory(permission: string): AuthPermissionCategory | null {
  return AUTH_PERMISSION_CATEGORY_MAP[permission] || null;
}

/**
 * Helper function to get auth permissions by category
 */
export function getAuthPermissionsByCategory(
  category: AuthPermissionCategory
): AllAuthPermission[] {
  return Object.keys(AUTH_PERMISSION_CATEGORY_MAP)
    .filter((key) => AUTH_PERMISSION_CATEGORY_MAP[key] === category)
    .map((key) => key as AllAuthPermission);
}

/**
 * Helper function to check if user has auth permission
 */
export function hasAuthPermission(
  userPermissions: AllAuthPermission[],
  requiredPermission: AllAuthPermission
): boolean {
  return userPermissions.includes(requiredPermission);
}

/**
 * Helper function to check if user has any of the auth permissions
 */
export function hasAnyAuthPermission(
  userPermissions: AllAuthPermission[],
  requiredPermissions: AllAuthPermission[]
): boolean {
  return requiredPermissions.some((permission) => userPermissions.includes(permission));
}

/**
 * Helper function to check if user has all auth permissions
 */
export function hasAllAuthPermissions(
  userPermissions: AllAuthPermission[],
  requiredPermissions: AllAuthPermission[]
): boolean {
  return requiredPermissions.every((permission) => userPermissions.includes(permission));
}

/**
 * Helper function to check if auth permission is admin level
 */
export function isAdminAuthPermission(permission: AllAuthPermission): boolean {
  return permission.startsWith('admin:') || permission.startsWith('super_admin:');
}

/**
 * Helper function to check if auth permission is super admin level
 */
export function isSuperAdminAuthPermission(permission: AllAuthPermission): boolean {
  return permission.startsWith('super_admin:');
}
