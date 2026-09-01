/**
 * Admin Activity Constants
 * Activity tracking and logging definitions
 */

/**
 * Admin activity types
 */
export const ADMIN_ACTIVITY = {
  // Authentication activities
  LOGIN: 'login',
  LOGOUT: 'logout',
  LOGIN_FAILED: 'login_failed',
  SESSION_START: 'session_start',
  SESSION_END: 'session_end',
  SESSION_EXPIRED: 'session_expired',
  SESSION_EXTENDED: 'session_extended',
  TOKEN_REFRESH: 'token_refresh',
  TOKEN_REVOKE: 'token_revoke',

  // Profile activities
  PROFILE_UPDATE: 'profile_update',
  PROFILE_VIEW: 'profile_view',
  PASSWORD_CHANGE: 'password_change',
  PASSWORD_RESET: 'password_reset',
  PASSWORD_RESET_REQUEST: 'password_reset_request',
  EMAIL_CHANGE: 'email_change',
  EMAIL_VERIFICATION: 'email_verification',
  PHONE_CHANGE: 'phone_change',
  PHONE_VERIFICATION: 'phone_verification',
  AVATAR_UPDATE: 'avatar_update',
  AVATAR_REMOVE: 'avatar_remove',

  // Admin management activities
  ADMIN_CREATE: 'admin_create',
  ADMIN_UPDATE: 'admin_update',
  ADMIN_DELETE: 'admin_delete',
  ADMIN_SUSPEND: 'admin_suspend',
  ADMIN_UNSUSPEND: 'admin_unsuspend',
  ADMIN_ACTIVATE: 'admin_activate',
  ADMIN_DEACTIVATE: 'admin_deactivate',
  ADMIN_ROLE_CHANGE: 'admin_role_change',
  ADMIN_LEVEL_CHANGE: 'admin_level_change',
  ADMIN_DEPARTMENT_CHANGE: 'admin_department_change',
  ADMIN_PERMISSION_CHANGE: 'admin_permission_change',

  // User management activities
  USER_CREATE: 'user_create',
  USER_UPDATE: 'user_update',
  USER_DELETE: 'user_delete',
  USER_SUSPEND: 'user_suspend',
  USER_UNSUSPEND: 'user_unsuspend',
  USER_VERIFY: 'user_verify',
  USER_BLOCK: 'user_block',
  USER_UNBLOCK: 'user_unblock',
  USER_PROMOTE: 'user_promote',
  USER_DEMOTE: 'user_demote',

  // Vendor management activities
  VENDOR_CREATE: 'vendor_create',
  VENDOR_UPDATE: 'vendor_update',
  VENDOR_DELETE: 'vendor_delete',
  VENDOR_VERIFY: 'vendor_verify',
  VENDOR_SUSPEND: 'vendor_suspend',
  VENDOR_UNSUSPEND: 'vendor_unsuspend',
  VENDOR_APPROVE: 'vendor_approve',
  VENDOR_REJECT: 'vendor_reject',

  // Product management activities
  PRODUCT_CREATE: 'product_create',
  PRODUCT_UPDATE: 'product_update',
  PRODUCT_DELETE: 'product_delete',
  PRODUCT_APPROVE: 'product_approve',
  PRODUCT_REJECT: 'product_reject',
  PRODUCT_PUBLISH: 'product_publish',
  PRODUCT_UNPUBLISH: 'product_unpublish',

  // Order management activities
  ORDER_VIEW: 'order_view',
  ORDER_UPDATE: 'order_update',
  ORDER_CANCEL: 'order_cancel',
  ORDER_REFUND: 'order_refund',
  ORDER_SHIP: 'order_ship',
  ORDER_STATUS_CHANGE: 'order_status_change',

  // Payment activities
  PAYMENT_VIEW: 'payment_view',
  PAYMENT_REFUND: 'payment_refund',
  PAYMENT_CAPTURE: 'payment_capture',
  PAYMENT_VOID: 'payment_void',

  // Settings activities
  SETTINGS_VIEW: 'settings_view',
  SETTINGS_UPDATE: 'settings_update',
  CONFIG_UPDATE: 'config_update',
  CONFIG_RESET: 'config_reset',

  // Report activities
  REPORT_VIEW: 'report_view',
  REPORT_GENERATE: 'report_generate',
  REPORT_EXPORT: 'report_export',
  REPORT_SCHEDULE: 'report_schedule',

  // System activities
  SYSTEM_MAINTENANCE: 'system_maintenance',
  SYSTEM_BACKUP: 'system_backup',
  SYSTEM_RESTORE: 'system_restore',
  SYSTEM_UPDATE: 'system_update',
  SYSTEM_CLEAR: 'system_clear',

  // Security activities
  MFA_ENABLE: 'mfa_enable',
  MFA_DISABLE: 'mfa_disable',
  MFA_VERIFY: 'mfa_verify',
  MFA_FAILED: 'mfa_failed',
  OTP_SEND: 'otp_send',
  OTP_VERIFY: 'otp_verify',
  OTP_FAILED: 'otp_failed',
  IP_CHANGE: 'ip_change',
  DEVICE_CHANGE: 'device_change',

  // Log activities
  LOG_VIEW: 'log_view',
  LOG_EXPORT: 'log_export',
  LOG_CLEAR: 'log_clear',
  LOG_ARCHIVE: 'log_archive',

  // Audit activities
  AUDIT_VIEW: 'audit_view',
  AUDIT_EXPORT: 'audit_export',
  AUDIT_SEARCH: 'audit_search',

  // Special activities
  EXPORT_DATA: 'export_data',
  IMPORT_DATA: 'import_data',
  BULK_OPERATION: 'bulk_operation',
  API_CALL: 'api_call',
  WEBHOOK_SEND: 'webhook_send',
  WEBHOOK_RECEIVE: 'webhook_receive',
} as const;

/**
 * Activity severity levels
 */
export const ACTIVITY_SEVERITY = {
  INFO: 'info',
  DEBUG: 'debug',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical',
} as const;

/**
 * Activity context types
 */
export const ACTIVITY_CONTEXT = {
  WEB: 'web',
  MOBILE: 'mobile',
  API: 'api',
  SYSTEM: 'system',
  CRON: 'cron',
  WEBHOOK: 'webhook',
  QUEUE: 'queue',
  EVENT: 'event',
} as const;

/**
 * Activity severity mapping
 */
export const ADMIN_ACTIVITY_SEVERITY: Record<string, keyof typeof ACTIVITY_SEVERITY> = {
  [ADMIN_ACTIVITY.LOGIN]: 'INFO',
  [ADMIN_ACTIVITY.LOGOUT]: 'INFO',
  [ADMIN_ACTIVITY.LOGIN_FAILED]: 'WARNING',
  [ADMIN_ACTIVITY.SESSION_START]: 'INFO',
  [ADMIN_ACTIVITY.SESSION_END]: 'INFO',
  [ADMIN_ACTIVITY.SESSION_EXPIRED]: 'WARNING',

  [ADMIN_ACTIVITY.PROFILE_UPDATE]: 'INFO',
  [ADMIN_ACTIVITY.PASSWORD_CHANGE]: 'INFO',
  [ADMIN_ACTIVITY.PASSWORD_RESET]: 'INFO',
  [ADMIN_ACTIVITY.EMAIL_CHANGE]: 'WARNING',

  [ADMIN_ACTIVITY.ADMIN_CREATE]: 'WARNING',
  [ADMIN_ACTIVITY.ADMIN_UPDATE]: 'WARNING',
  [ADMIN_ACTIVITY.ADMIN_DELETE]: 'CRITICAL',
  [ADMIN_ACTIVITY.ADMIN_SUSPEND]: 'WARNING',
  [ADMIN_ACTIVITY.ADMIN_ROLE_CHANGE]: 'CRITICAL',

  [ADMIN_ACTIVITY.USER_DELETE]: 'CRITICAL',
  [ADMIN_ACTIVITY.USER_SUSPEND]: 'WARNING',

  [ADMIN_ACTIVITY.SYSTEM_MAINTENANCE]: 'WARNING',
  [ADMIN_ACTIVITY.SYSTEM_BACKUP]: 'INFO',
  [ADMIN_ACTIVITY.SYSTEM_RESTORE]: 'CRITICAL',

  [ADMIN_ACTIVITY.MFA_ENABLE]: 'INFO',
  [ADMIN_ACTIVITY.MFA_DISABLE]: 'WARNING',
  [ADMIN_ACTIVITY.MFA_FAILED]: 'WARNING',

  [ADMIN_ACTIVITY.LOG_CLEAR]: 'WARNING',
  [ADMIN_ACTIVITY.AUDIT_VIEW]: 'INFO',
};

/**
 * Activity categories
 */
export const ACTIVITY_CATEGORY = {
  AUTHENTICATION: 'authentication',
  PROFILE: 'profile',
  ADMIN: 'admin',
  USER: 'user',
  VENDOR: 'vendor',
  PRODUCT: 'product',
  ORDER: 'order',
  PAYMENT: 'payment',
  SETTINGS: 'settings',
  REPORT: 'report',
  SYSTEM: 'system',
  SECURITY: 'security',
  LOG: 'log',
  AUDIT: 'audit',
} as const;

/**
 * Activity category mapping
 */
export const ACTIVITY_CATEGORY_MAP: Record<string, keyof typeof ACTIVITY_CATEGORY> = {
  [ADMIN_ACTIVITY.LOGIN]: 'AUTHENTICATION',
  [ADMIN_ACTIVITY.LOGOUT]: 'AUTHENTICATION',
  [ADMIN_ACTIVITY.LOGIN_FAILED]: 'AUTHENTICATION',
  [ADMIN_ACTIVITY.SESSION_START]: 'AUTHENTICATION',
  [ADMIN_ACTIVITY.SESSION_END]: 'AUTHENTICATION',
  [ADMIN_ACTIVITY.SESSION_EXPIRED]: 'AUTHENTICATION',
  [ADMIN_ACTIVITY.TOKEN_REFRESH]: 'AUTHENTICATION',
  [ADMIN_ACTIVITY.TOKEN_REVOKE]: 'AUTHENTICATION',

  [ADMIN_ACTIVITY.PROFILE_UPDATE]: 'PROFILE',
  [ADMIN_ACTIVITY.PROFILE_VIEW]: 'PROFILE',
  [ADMIN_ACTIVITY.PASSWORD_CHANGE]: 'PROFILE',
  [ADMIN_ACTIVITY.PASSWORD_RESET]: 'PROFILE',
  [ADMIN_ACTIVITY.EMAIL_CHANGE]: 'PROFILE',
  [ADMIN_ACTIVITY.PHONE_CHANGE]: 'PROFILE',

  [ADMIN_ACTIVITY.ADMIN_CREATE]: 'ADMIN',
  [ADMIN_ACTIVITY.ADMIN_UPDATE]: 'ADMIN',
  [ADMIN_ACTIVITY.ADMIN_DELETE]: 'ADMIN',
  [ADMIN_ACTIVITY.ADMIN_SUSPEND]: 'ADMIN',
  [ADMIN_ACTIVITY.ADMIN_ROLE_CHANGE]: 'ADMIN',

  [ADMIN_ACTIVITY.USER_CREATE]: 'USER',
  [ADMIN_ACTIVITY.USER_UPDATE]: 'USER',
  [ADMIN_ACTIVITY.USER_DELETE]: 'USER',
  [ADMIN_ACTIVITY.USER_SUSPEND]: 'USER',

  [ADMIN_ACTIVITY.VENDOR_CREATE]: 'VENDOR',
  [ADMIN_ACTIVITY.VENDOR_UPDATE]: 'VENDOR',
  [ADMIN_ACTIVITY.VENDOR_DELETE]: 'VENDOR',

  [ADMIN_ACTIVITY.PRODUCT_CREATE]: 'PRODUCT',
  [ADMIN_ACTIVITY.PRODUCT_UPDATE]: 'PRODUCT',
  [ADMIN_ACTIVITY.PRODUCT_DELETE]: 'PRODUCT',

  [ADMIN_ACTIVITY.ORDER_VIEW]: 'ORDER',
  [ADMIN_ACTIVITY.ORDER_UPDATE]: 'ORDER',
  [ADMIN_ACTIVITY.ORDER_CANCEL]: 'ORDER',

  [ADMIN_ACTIVITY.PAYMENT_VIEW]: 'PAYMENT',
  [ADMIN_ACTIVITY.PAYMENT_REFUND]: 'PAYMENT',

  [ADMIN_ACTIVITY.SETTINGS_VIEW]: 'SETTINGS',
  [ADMIN_ACTIVITY.SETTINGS_UPDATE]: 'SETTINGS',

  [ADMIN_ACTIVITY.REPORT_VIEW]: 'REPORT',
  [ADMIN_ACTIVITY.REPORT_GENERATE]: 'REPORT',

  [ADMIN_ACTIVITY.SYSTEM_MAINTENANCE]: 'SYSTEM',
  [ADMIN_ACTIVITY.SYSTEM_BACKUP]: 'SYSTEM',

  [ADMIN_ACTIVITY.MFA_ENABLE]: 'SECURITY',
  [ADMIN_ACTIVITY.MFA_DISABLE]: 'SECURITY',
  [ADMIN_ACTIVITY.OTP_VERIFY]: 'SECURITY',

  [ADMIN_ACTIVITY.LOG_VIEW]: 'LOG',
  [ADMIN_ACTIVITY.LOG_EXPORT]: 'LOG',

  [ADMIN_ACTIVITY.AUDIT_VIEW]: 'AUDIT',
  [ADMIN_ACTIVITY.AUDIT_EXPORT]: 'AUDIT',
};

/**
 * Get activity severity
 */
export function getActivitySeverity(activity: string): keyof typeof ACTIVITY_SEVERITY {
  return ADMIN_ACTIVITY_SEVERITY[activity] || 'INFO';
}

/**
 * Get activity category
 */
export function getActivityCategory(activity: string): keyof typeof ACTIVITY_CATEGORY {
  return ACTIVITY_CATEGORY_MAP[activity] || 'SYSTEM';
}

/**
 * Check if activity requires high severity
 */
export function isHighSeverityActivity(activity: string): boolean {
  const severity = getActivitySeverity(activity);
  return severity === 'WARNING' || severity === 'ERROR' || severity === 'CRITICAL';
}

/**
 * Get activity label
 */
export function getActivityLabel(activity: string): string {
  const labels: Record<string, string> = {
    [ADMIN_ACTIVITY.LOGIN]: 'Login',
    [ADMIN_ACTIVITY.LOGOUT]: 'Logout',
    [ADMIN_ACTIVITY.LOGIN_FAILED]: 'Login Failed',
    [ADMIN_ACTIVITY.SESSION_START]: 'Session Started',
    [ADMIN_ACTIVITY.SESSION_END]: 'Session Ended',
    [ADMIN_ACTIVITY.SESSION_EXPIRED]: 'Session Expired',
    [ADMIN_ACTIVITY.PROFILE_UPDATE]: 'Profile Updated',
    [ADMIN_ACTIVITY.PASSWORD_CHANGE]: 'Password Changed',
    [ADMIN_ACTIVITY.PASSWORD_RESET]: 'Password Reset',
    [ADMIN_ACTIVITY.EMAIL_CHANGE]: 'Email Changed',
    [ADMIN_ACTIVITY.ADMIN_CREATE]: 'Admin Created',
    [ADMIN_ACTIVITY.ADMIN_UPDATE]: 'Admin Updated',
    [ADMIN_ACTIVITY.ADMIN_DELETE]: 'Admin Deleted',
    [ADMIN_ACTIVITY.ADMIN_SUSPEND]: 'Admin Suspended',
    [ADMIN_ACTIVITY.ADMIN_ROLE_CHANGE]: 'Admin Role Changed',
    [ADMIN_ACTIVITY.USER_CREATE]: 'User Created',
    [ADMIN_ACTIVITY.USER_UPDATE]: 'User Updated',
    [ADMIN_ACTIVITY.USER_DELETE]: 'User Deleted',
    [ADMIN_ACTIVITY.USER_SUSPEND]: 'User Suspended',
    [ADMIN_ACTIVITY.VENDOR_CREATE]: 'Vendor Created',
    [ADMIN_ACTIVITY.VENDOR_UPDATE]: 'Vendor Updated',
    [ADMIN_ACTIVITY.VENDOR_DELETE]: 'Vendor Deleted',
    [ADMIN_ACTIVITY.PRODUCT_CREATE]: 'Product Created',
    [ADMIN_ACTIVITY.PRODUCT_UPDATE]: 'Product Updated',
    [ADMIN_ACTIVITY.PRODUCT_DELETE]: 'Product Deleted',
    [ADMIN_ACTIVITY.ORDER_VIEW]: 'Order Viewed',
    [ADMIN_ACTIVITY.ORDER_UPDATE]: 'Order Updated',
    [ADMIN_ACTIVITY.ORDER_CANCEL]: 'Order Cancelled',
    [ADMIN_ACTIVITY.PAYMENT_VIEW]: 'Payment Viewed',
    [ADMIN_ACTIVITY.PAYMENT_REFUND]: 'Payment Refunded',
    [ADMIN_ACTIVITY.SETTINGS_VIEW]: 'Settings Viewed',
    [ADMIN_ACTIVITY.SETTINGS_UPDATE]: 'Settings Updated',
    [ADMIN_ACTIVITY.REPORT_VIEW]: 'Report Viewed',
    [ADMIN_ACTIVITY.REPORT_GENERATE]: 'Report Generated',
    [ADMIN_ACTIVITY.SYSTEM_MAINTENANCE]: 'System Maintenance',
    [ADMIN_ACTIVITY.SYSTEM_BACKUP]: 'System Backup',
    [ADMIN_ACTIVITY.SYSTEM_RESTORE]: 'System Restore',
    [ADMIN_ACTIVITY.MFA_ENABLE]: 'MFA Enabled',
    [ADMIN_ACTIVITY.MFA_DISABLE]: 'MFA Disabled',
    [ADMIN_ACTIVITY.OTP_VERIFY]: 'OTP Verified',
    [ADMIN_ACTIVITY.LOG_VIEW]: 'Log Viewed',
    [ADMIN_ACTIVITY.AUDIT_VIEW]: 'Audit Viewed',
  };
  return labels[activity] || activity;
}
