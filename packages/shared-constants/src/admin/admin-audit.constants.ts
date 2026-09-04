/**
 * Admin Audit Constants
 * অ্যাডমিন অডিট সম্পর্কিত কনস্ট্যান্টস
 */

export const ADMIN_AUDIT = {
  // Audit actions
  ACTIONS: {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    VIEW: 'view',
    EXPORT: 'export',
    IMPORT: 'import',
    LOGIN: 'login',
    LOGOUT: 'logout',
    APPROVE: 'approve',
    REJECT: 'reject',
    SUSPEND: 'suspend',
    UNSUSPEND: 'unsuspend',
    BAN: 'ban',
    UNBAN: 'unban',
    LOCK: 'lock',
    UNLOCK: 'unlock',
    ROLE_CHANGE: 'role_change',
    PERMISSION_CHANGE: 'permission_change',
    SETTINGS_CHANGE: 'settings_change',
    PASSWORD_CHANGE: 'password_change',
    PROFILE_UPDATE: 'profile_update',
  },

  // Audit resources
  RESOURCES: {
    ADMIN: 'admin',
    USER: 'user',
    CONTENT: 'content',
    FINANCE: 'finance',
    SETTINGS: 'settings',
    SYSTEM: 'system',
    ROLE: 'role',
    PERMISSION: 'permission',
    REPORT: 'report',
    NOTIFICATION: 'notification',
  },

  // Audit status
  STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending',
  },

  // Default values
  DEFAULTS: {
    MAX_RECORDS: 1000,
    RETENTION_DAYS: 365,
    BATCH_SIZE: 100,
  },
} as const;

export type AdminAuditAction = (typeof ADMIN_AUDIT.ACTIONS)[keyof typeof ADMIN_AUDIT.ACTIONS];
export type AdminAuditResource = (typeof ADMIN_AUDIT.RESOURCES)[keyof typeof ADMIN_AUDIT.RESOURCES];
export type AdminAuditStatus = (typeof ADMIN_AUDIT.STATUS)[keyof typeof ADMIN_AUDIT.STATUS];
