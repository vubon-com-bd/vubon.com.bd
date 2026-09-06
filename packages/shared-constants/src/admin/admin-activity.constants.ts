/**
 * Admin Activity Constants (EXTENDS common/types)
 * @module shared-constants/admin/admin-activity.constants
 */

import { TYPES } from '../common/types.constants';

export const ADMIN_ACTIVITY = {
  // Base types from common
  ...TYPES,

  // Activity types
  TYPES: {
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    UPDATE_PROFILE: 'update_profile',
    CHANGE_PASSWORD: 'change_password',
    RESET_PASSWORD: 'reset_password',
    VERIFY_EMAIL: 'verify_email',
    VERIFY_PHONE: 'verify_phone',
    UPDATE_SETTINGS: 'update_settings',
    UPDATE_PREFERENCES: 'update_preferences',
    VIEW_PAGE: 'view_page',
    SEARCH: 'search',
    ADMIN_LOGIN: 'admin_login',
    ADMIN_LOGOUT: 'admin_logout',
    ADMIN_REGISTER: 'admin_register',
    ADMIN_CREATE: 'admin_create',
    ADMIN_UPDATE: 'admin_update',
    ADMIN_DELETE: 'admin_delete',
    ADMIN_BLOCK: 'admin_block',
    ADMIN_UNBLOCK: 'admin_unblock',
    ADMIN_SUSPEND: 'admin_suspend',
    ADMIN_UNSUSPEND: 'admin_unsuspend',
    ADMIN_VERIFY: 'admin_verify',
    ADMIN_UNVERIFY: 'admin_unverify',
    ADMIN_APPROVE: 'admin_approve',
    ADMIN_REJECT: 'admin_reject',
    ADMIN_ROLE_ASSIGN: 'admin_role_assign',
    ADMIN_ROLE_REVOKE: 'admin_role_revoke',
    ADMIN_PERMISSION_GRANT: 'admin_permission_grant',
    ADMIN_PERMISSION_REVOKE: 'admin_permission_revoke',
    ADMIN_SYSTEM_VIEW: 'admin_system_view',
    ADMIN_SYSTEM_UPDATE: 'admin_system_update',
    ADMIN_SYSTEM_MAINTENANCE: 'admin_system_maintenance',
    ADMIN_SYSTEM_BACKUP: 'admin_system_backup',
    ADMIN_SYSTEM_RESTORE: 'admin_system_restore',
    ADMIN_AUDIT_VIEW: 'admin_audit_view',
    ADMIN_AUDIT_EXPORT: 'admin_audit_export',
    ADMIN_AUDIT_DELETE: 'admin_audit_delete',
    ADMIN_SECURITY_VIEW: 'admin_security_view',
    ADMIN_SECURITY_UPDATE: 'admin_security_update',
    ADMIN_DATABASE_VIEW: 'admin_database_view',
    ADMIN_DATABASE_UPDATE: 'admin_database_update',
    ADMIN_DATABASE_BACKUP: 'admin_database_backup',
    ADMIN_DATABASE_RESTORE: 'admin_database_restore',
    ADMIN_NETWORK_VIEW: 'admin_network_view',
    ADMIN_NETWORK_UPDATE: 'admin_network_update',
  } as const,

  // Activity status
  STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    BLOCKED: 'blocked',
    SUSPICIOUS: 'suspicious',
    ANOMALOUS: 'anomalous',
  } as const,

  // Activity importance
  IMPORTANCE: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Activity categories
  CATEGORIES: {
    AUTH: 'auth',
    PROFILE: 'profile',
    ADMIN: 'admin',
    SYSTEM: 'system',
    SECURITY: 'security',
    DATABASE: 'database',
    NETWORK: 'network',
    AUDIT: 'audit',
    MANAGEMENT: 'management',
    CONFIGURATION: 'configuration',
    MAINTENANCE: 'maintenance',
    MONITORING: 'monitoring',
  } as const,

  // Activity tracking
  TRACKING: {
    TRACK_IP: true,
    TRACK_DEVICE: true,
    TRACK_LOCATION: true,
    TRACK_USER_AGENT: true,
    TRACK_REFERRER: true,
    TRACK_SESSION: true,
    TRACK_DURATION: true,
    TRACK_ACTIONS: true,
    MAX_HISTORY: 10000,
    RETENTION_DAYS: 365,
  },

  // Activity limits
  LIMITS: {
    MAX_ACTIVITIES_PER_DAY: 5000,
    MAX_ACTIVITIES_PER_SESSION: 500,
    MAX_UNIQUE_ACTIVITIES: 100,
    MAX_LOGIN_ATTEMPTS: 5,
    MAX_FAILED_ATTEMPTS: 3,
  },

  // Default values
  DEFAULTS: {
    STATUS: 'success',
    IMPORTANCE: 'medium',
    CATEGORY: 'system',
  },
} as const;

export type AdminActivityType = (typeof ADMIN_ACTIVITY.TYPES)[keyof typeof ADMIN_ACTIVITY.TYPES];
export type AdminActivityStatus =
  (typeof ADMIN_ACTIVITY.STATUS)[keyof typeof ADMIN_ACTIVITY.STATUS];
export type AdminActivityImportance =
  (typeof ADMIN_ACTIVITY.IMPORTANCE)[keyof typeof ADMIN_ACTIVITY.IMPORTANCE];
export type AdminActivityCategory =
  (typeof ADMIN_ACTIVITY.CATEGORIES)[keyof typeof ADMIN_ACTIVITY.CATEGORIES];
