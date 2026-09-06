/**
 * Admin Permission Constants (EXTENDS common/permissions + user-permission.constants)
 * @module shared-constants/admin/admin-permission.constants
 */

import { PERMISSIONS } from '../common/permissions.constants';
import { USER_PERMISSIONS } from '../user/user-permission.constants';

export const ADMIN_PERMISSION = {
  // Base permissions from common
  ...PERMISSIONS,

  // User permissions
  ...USER_PERMISSIONS,

  // Admin specific permissions
  ADMIN_VIEW: 'admin:view',
  ADMIN_CREATE: 'admin:create',
  ADMIN_UPDATE: 'admin:update',
  ADMIN_DELETE: 'admin:delete',
  ADMIN_BLOCK: 'admin:block',
  ADMIN_UNBLOCK: 'admin:unblock',
  ADMIN_SUSPEND: 'admin:suspend',
  ADMIN_UNSUSPEND: 'admin:unsuspend',
  ADMIN_VERIFY: 'admin:verify',
  ADMIN_UNVERIFY: 'admin:unverify',
  ADMIN_APPROVE: 'admin:approve',
  ADMIN_REJECT: 'admin:reject',
  ADMIN_ROLE_ASSIGN: 'admin:role_assign',
  ADMIN_ROLE_REVOKE: 'admin:role_revoke',
  ADMIN_PERMISSION_GRANT: 'admin:permission_grant',
  ADMIN_PERMISSION_REVOKE: 'admin:permission_revoke',
  ADMIN_SYSTEM_VIEW: 'admin:system_view',
  ADMIN_SYSTEM_UPDATE: 'admin:system_update',
  ADMIN_SYSTEM_MAINTENANCE: 'admin:system_maintenance',
  ADMIN_SYSTEM_BACKUP: 'admin:system_backup',
  ADMIN_SYSTEM_RESTORE: 'admin:system_restore',
  ADMIN_SYSTEM_LOGS: 'admin:system_logs',
  ADMIN_SYSTEM_MONITOR: 'admin:system_monitor',
  ADMIN_SYSTEM_CONFIG: 'admin:system_config',
  ADMIN_AUDIT_VIEW: 'admin:audit_view',
  ADMIN_AUDIT_EXPORT: 'admin:audit_export',
  ADMIN_AUDIT_DELETE: 'admin:audit_delete',
  ADMIN_SECURITY_VIEW: 'admin:security_view',
  ADMIN_SECURITY_UPDATE: 'admin:security_update',
  ADMIN_DATABASE_VIEW: 'admin:database_view',
  ADMIN_DATABASE_UPDATE: 'admin:database_update',
  ADMIN_DATABASE_BACKUP: 'admin:database_backup',
  ADMIN_DATABASE_RESTORE: 'admin:database_restore',
  ADMIN_NETWORK_VIEW: 'admin:network_view',
  ADMIN_NETWORK_UPDATE: 'admin:network_update',
} as const;

export type AdminPermissionValue = (typeof ADMIN_PERMISSION)[keyof typeof ADMIN_PERMISSION];

export const ADMIN_PERMISSION_GROUPS = {
  ADMIN_BASIC: [
    ADMIN_PERMISSION.ADMIN_VIEW,
    ADMIN_PERMISSION.ADMIN_CREATE,
    ADMIN_PERMISSION.ADMIN_UPDATE,
    ADMIN_PERMISSION.ADMIN_DELETE,
  ] as const,

  ADMIN_MANAGEMENT: [
    ADMIN_PERMISSION.ADMIN_BLOCK,
    ADMIN_PERMISSION.ADMIN_UNBLOCK,
    ADMIN_PERMISSION.ADMIN_SUSPEND,
    ADMIN_PERMISSION.ADMIN_UNSUSPEND,
    ADMIN_PERMISSION.ADMIN_VERIFY,
    ADMIN_PERMISSION.ADMIN_UNVERIFY,
    ADMIN_PERMISSION.ADMIN_APPROVE,
    ADMIN_PERMISSION.ADMIN_REJECT,
  ] as const,

  ADMIN_ROLES: [
    ADMIN_PERMISSION.ADMIN_ROLE_ASSIGN,
    ADMIN_PERMISSION.ADMIN_ROLE_REVOKE,
    ADMIN_PERMISSION.ADMIN_PERMISSION_GRANT,
    ADMIN_PERMISSION.ADMIN_PERMISSION_REVOKE,
  ] as const,

  ADMIN_SYSTEM: [
    ADMIN_PERMISSION.ADMIN_SYSTEM_VIEW,
    ADMIN_PERMISSION.ADMIN_SYSTEM_UPDATE,
    ADMIN_PERMISSION.ADMIN_SYSTEM_MAINTENANCE,
    ADMIN_PERMISSION.ADMIN_SYSTEM_BACKUP,
    ADMIN_PERMISSION.ADMIN_SYSTEM_RESTORE,
    ADMIN_PERMISSION.ADMIN_SYSTEM_LOGS,
    ADMIN_PERMISSION.ADMIN_SYSTEM_MONITOR,
    ADMIN_PERMISSION.ADMIN_SYSTEM_CONFIG,
  ] as const,

  ADMIN_AUDIT: [
    ADMIN_PERMISSION.ADMIN_AUDIT_VIEW,
    ADMIN_PERMISSION.ADMIN_AUDIT_EXPORT,
    ADMIN_PERMISSION.ADMIN_AUDIT_DELETE,
  ] as const,

  ADMIN_SECURITY: [
    ADMIN_PERMISSION.ADMIN_SECURITY_VIEW,
    ADMIN_PERMISSION.ADMIN_SECURITY_UPDATE,
  ] as const,

  ADMIN_DATABASE: [
    ADMIN_PERMISSION.ADMIN_DATABASE_VIEW,
    ADMIN_PERMISSION.ADMIN_DATABASE_UPDATE,
    ADMIN_PERMISSION.ADMIN_DATABASE_BACKUP,
    ADMIN_PERMISSION.ADMIN_DATABASE_RESTORE,
  ] as const,

  ADMIN_NETWORK: [
    ADMIN_PERMISSION.ADMIN_NETWORK_VIEW,
    ADMIN_PERMISSION.ADMIN_NETWORK_UPDATE,
  ] as const,
} as const;
