/**
 * Authentication Permission Constants
 * Permission definitions for auth-related access control
 */

export const AUTH_PERMISSION = {
  // User permissions
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_VERIFY: 'user:verify',
  USER_BAN: 'user:ban',
  USER_UNBAN: 'user:unban',
  USER_SUSPEND: 'user:suspend',
  USER_UNSUSPEND: 'user:unsuspend',

  // Auth permissions
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
  AUTH_REFRESH: 'auth:refresh',
  AUTH_RESET_PASSWORD: 'auth:reset-password',
  AUTH_CHANGE_PASSWORD: 'auth:change-password',
  AUTH_VERIFY_EMAIL: 'auth:verify-email',
  AUTH_VERIFY_PHONE: 'auth:verify-phone',
  AUTH_VERIFY_IDENTITY: 'auth:verify-identity',

  // MFA permissions
  MFA_ENABLE: 'mfa:enable',
  MFA_DISABLE: 'mfa:disable',
  MFA_RESET: 'mfa:reset',
  MFA_BACKUP_CODES: 'mfa:backup-codes',

  // 2FA permissions
  TWO_FA_ENABLE: '2fa:enable',
  TWO_FA_DISABLE: '2fa:disable',
  TWO_FA_RESET: '2fa:reset',

  // Session permissions
  SESSION_READ: 'session:read',
  SESSION_TERMINATE: 'session:terminate',
  SESSION_TERMINATE_ALL: 'session:terminate-all',
  SESSION_REVOKE: 'session:revoke',

  // Token permissions
  TOKEN_CREATE: 'token:create',
  TOKEN_REVOKE: 'token:revoke',
  TOKEN_READ: 'token:read',

  // Admin permissions
  ADMIN_USER_MANAGE: 'admin:user-manage',
  ADMIN_AUTH_SETTINGS: 'admin:auth-settings',
  ADMIN_SECURITY_SETTINGS: 'admin:security-settings',
  ADMIN_AUDIT_LOG: 'admin:audit-log',

  // Role permissions
  ROLE_READ: 'role:read',
  ROLE_WRITE: 'role:write',
  ROLE_UPDATE: 'role:update',
  ROLE_DELETE: 'role:delete',

  // Permission management
  PERMISSION_READ: 'permission:read',
  PERMISSION_WRITE: 'permission:write',
  PERMISSION_UPDATE: 'permission:update',
  PERMISSION_DELETE: 'permission:delete',
} as const;

export type AuthPermission = (typeof AUTH_PERMISSION)[keyof typeof AUTH_PERMISSION];

export const USER_PERMISSIONS: AuthPermission[] = [
  AUTH_PERMISSION.USER_READ,
  AUTH_PERMISSION.USER_WRITE,
  AUTH_PERMISSION.USER_UPDATE,
  AUTH_PERMISSION.USER_DELETE,
  AUTH_PERMISSION.USER_VERIFY,
  AUTH_PERMISSION.USER_BAN,
  AUTH_PERMISSION.USER_UNBAN,
  AUTH_PERMISSION.USER_SUSPEND,
  AUTH_PERMISSION.USER_UNSUSPEND,
];

export const AUTH_PERMISSIONS: AuthPermission[] = [
  AUTH_PERMISSION.AUTH_LOGIN,
  AUTH_PERMISSION.AUTH_LOGOUT,
  AUTH_PERMISSION.AUTH_REFRESH,
  AUTH_PERMISSION.AUTH_RESET_PASSWORD,
  AUTH_PERMISSION.AUTH_CHANGE_PASSWORD,
  AUTH_PERMISSION.AUTH_VERIFY_EMAIL,
  AUTH_PERMISSION.AUTH_VERIFY_PHONE,
  AUTH_PERMISSION.AUTH_VERIFY_IDENTITY,
];

export const MFA_PERMISSIONS: AuthPermission[] = [
  AUTH_PERMISSION.MFA_ENABLE,
  AUTH_PERMISSION.MFA_DISABLE,
  AUTH_PERMISSION.MFA_RESET,
  AUTH_PERMISSION.MFA_BACKUP_CODES,
];

export const TWO_FA_PERMISSIONS: AuthPermission[] = [
  AUTH_PERMISSION.TWO_FA_ENABLE,
  AUTH_PERMISSION.TWO_FA_DISABLE,
  AUTH_PERMISSION.TWO_FA_RESET,
];

export const SESSION_PERMISSIONS: AuthPermission[] = [
  AUTH_PERMISSION.SESSION_READ,
  AUTH_PERMISSION.SESSION_TERMINATE,
  AUTH_PERMISSION.SESSION_TERMINATE_ALL,
  AUTH_PERMISSION.SESSION_REVOKE,
];

export const TOKEN_PERMISSIONS: AuthPermission[] = [
  AUTH_PERMISSION.TOKEN_CREATE,
  AUTH_PERMISSION.TOKEN_REVOKE,
  AUTH_PERMISSION.TOKEN_READ,
];

export const ADMIN_PERMISSIONS: AuthPermission[] = [
  AUTH_PERMISSION.ADMIN_USER_MANAGE,
  AUTH_PERMISSION.ADMIN_AUTH_SETTINGS,
  AUTH_PERMISSION.ADMIN_SECURITY_SETTINGS,
  AUTH_PERMISSION.ADMIN_AUDIT_LOG,
];

export const ROLE_PERMISSIONS: AuthPermission[] = [
  AUTH_PERMISSION.ROLE_READ,
  AUTH_PERMISSION.ROLE_WRITE,
  AUTH_PERMISSION.ROLE_UPDATE,
  AUTH_PERMISSION.ROLE_DELETE,
];

export const PERMISSION_MANAGEMENT: AuthPermission[] = [
  AUTH_PERMISSION.PERMISSION_READ,
  AUTH_PERMISSION.PERMISSION_WRITE,
  AUTH_PERMISSION.PERMISSION_UPDATE,
  AUTH_PERMISSION.PERMISSION_DELETE,
];

export function isUserPermission(permission: AuthPermission): boolean {
  return USER_PERMISSIONS.includes(permission);
}

export function isAuthAuthPermission(permission: AuthPermission): boolean {
  return AUTH_PERMISSIONS.includes(permission);
}

export function isMFAPermission(permission: AuthPermission): boolean {
  return MFA_PERMISSIONS.includes(permission);
}

export function isTwoFAPermission(permission: AuthPermission): boolean {
  return TWO_FA_PERMISSIONS.includes(permission);
}

export function isSessionPermission(permission: AuthPermission): boolean {
  return SESSION_PERMISSIONS.includes(permission);
}

export function isTokenPermission(permission: AuthPermission): boolean {
  return TOKEN_PERMISSIONS.includes(permission);
}

export function isAdminPermission(permission: AuthPermission): boolean {
  return ADMIN_PERMISSIONS.includes(permission);
}

export function isRolePermission(permission: AuthPermission): boolean {
  return ROLE_PERMISSIONS.includes(permission);
}

export function isPermissionManagement(permission: AuthPermission): boolean {
  return PERMISSION_MANAGEMENT.includes(permission);
}

export function getPermissionLabel(permission: AuthPermission): string {
  const labels: Record<AuthPermission, string> = {
    [AUTH_PERMISSION.USER_READ]: 'Read User',
    [AUTH_PERMISSION.USER_WRITE]: 'Write User',
    [AUTH_PERMISSION.USER_UPDATE]: 'Update User',
    [AUTH_PERMISSION.USER_DELETE]: 'Delete User',
    [AUTH_PERMISSION.USER_VERIFY]: 'Verify User',
    [AUTH_PERMISSION.USER_BAN]: 'Ban User',
    [AUTH_PERMISSION.USER_UNBAN]: 'Unban User',
    [AUTH_PERMISSION.USER_SUSPEND]: 'Suspend User',
    [AUTH_PERMISSION.USER_UNSUSPEND]: 'Unsuspend User',
    [AUTH_PERMISSION.AUTH_LOGIN]: 'Login',
    [AUTH_PERMISSION.AUTH_LOGOUT]: 'Logout',
    [AUTH_PERMISSION.AUTH_REFRESH]: 'Refresh Session',
    [AUTH_PERMISSION.AUTH_RESET_PASSWORD]: 'Reset Password',
    [AUTH_PERMISSION.AUTH_CHANGE_PASSWORD]: 'Change Password',
    [AUTH_PERMISSION.AUTH_VERIFY_EMAIL]: 'Verify Email',
    [AUTH_PERMISSION.AUTH_VERIFY_PHONE]: 'Verify Phone',
    [AUTH_PERMISSION.AUTH_VERIFY_IDENTITY]: 'Verify Identity',
    [AUTH_PERMISSION.MFA_ENABLE]: 'Enable MFA',
    [AUTH_PERMISSION.MFA_DISABLE]: 'Disable MFA',
    [AUTH_PERMISSION.MFA_RESET]: 'Reset MFA',
    [AUTH_PERMISSION.MFA_BACKUP_CODES]: 'Manage Backup Codes',
    [AUTH_PERMISSION.TWO_FA_ENABLE]: 'Enable 2FA',
    [AUTH_PERMISSION.TWO_FA_DISABLE]: 'Disable 2FA',
    [AUTH_PERMISSION.TWO_FA_RESET]: 'Reset 2FA',
    [AUTH_PERMISSION.SESSION_READ]: 'Read Session',
    [AUTH_PERMISSION.SESSION_TERMINATE]: 'Terminate Session',
    [AUTH_PERMISSION.SESSION_TERMINATE_ALL]: 'Terminate All Sessions',
    [AUTH_PERMISSION.SESSION_REVOKE]: 'Revoke Session',
    [AUTH_PERMISSION.TOKEN_CREATE]: 'Create Token',
    [AUTH_PERMISSION.TOKEN_REVOKE]: 'Revoke Token',
    [AUTH_PERMISSION.TOKEN_READ]: 'Read Token',
    [AUTH_PERMISSION.ADMIN_USER_MANAGE]: 'Manage Users',
    [AUTH_PERMISSION.ADMIN_AUTH_SETTINGS]: 'Configure Auth Settings',
    [AUTH_PERMISSION.ADMIN_SECURITY_SETTINGS]: 'Configure Security Settings',
    [AUTH_PERMISSION.ADMIN_AUDIT_LOG]: 'View Audit Log',
    [AUTH_PERMISSION.ROLE_READ]: 'Read Role',
    [AUTH_PERMISSION.ROLE_WRITE]: 'Write Role',
    [AUTH_PERMISSION.ROLE_UPDATE]: 'Update Role',
    [AUTH_PERMISSION.ROLE_DELETE]: 'Delete Role',
    [AUTH_PERMISSION.PERMISSION_READ]: 'Read Permission',
    [AUTH_PERMISSION.PERMISSION_WRITE]: 'Write Permission',
    [AUTH_PERMISSION.PERMISSION_UPDATE]: 'Update Permission',
    [AUTH_PERMISSION.PERMISSION_DELETE]: 'Delete Permission',
  };

  return labels[permission] || 'Unknown Permission';
}

export function getPermissionCategory(
  permission: AuthPermission
): 'user' | 'auth' | 'mfa' | '2fa' | 'session' | 'token' | 'admin' | 'role' | 'permission' {
  if (isUserPermission(permission)) return 'user';
  if (isAuthAuthPermission(permission)) return 'auth';
  if (isMFAPermission(permission)) return 'mfa';
  if (isTwoFAPermission(permission)) return '2fa';
  if (isSessionPermission(permission)) return 'session';
  if (isTokenPermission(permission)) return 'token';
  if (isAdminPermission(permission)) return 'admin';
  if (isRolePermission(permission)) return 'role';
  return 'permission';
}
