/**
 * Admin Activity Constants
 * অ্যাডমিন অ্যাক্টিভিটি সম্পর্কিত কনস্ট্যান্টস
 */

export const ADMIN_ACTIVITY = {
  // Activity types
  TYPES: {
    LOGIN: 'login',
    LOGOUT: 'logout',
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    VIEW: 'view',
    EXPORT: 'export',
    IMPORT: 'import',
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

  // Activity status
  STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    CANCELLED: 'cancelled',
  },

  // Activity importance
  IMPORTANCE: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Default values
  DEFAULTS: {
    MAX_RECORDS: 100,
    RETENTION_DAYS: 90,
    BATCH_SIZE: 50,
  },
} as const;

export type AdminActivityType = (typeof ADMIN_ACTIVITY.TYPES)[keyof typeof ADMIN_ACTIVITY.TYPES];
export type AdminActivityStatus =
  (typeof ADMIN_ACTIVITY.STATUS)[keyof typeof ADMIN_ACTIVITY.STATUS];
export type AdminActivityImportance =
  (typeof ADMIN_ACTIVITY.IMPORTANCE)[keyof typeof ADMIN_ACTIVITY.IMPORTANCE];
