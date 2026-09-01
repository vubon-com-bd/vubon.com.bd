/**
 * Admin Activity Types
 * Activity tracking and logging definitions
 */

import { BaseEntity, ID, Timestamp, Nullable, JsonObject } from '../common/core-primitives.types';

/**
 * Activity type
 * Based on ADMIN_ACTIVITY from constants
 */
export type AdminActivityType =
  | 'login'
  | 'logout'
  | 'login_failed'
  | 'session_start'
  | 'session_end'
  | 'session_expired'
  | 'session_extended'
  | 'token_refresh'
  | 'token_revoke'
  | 'profile_update'
  | 'profile_view'
  | 'password_change'
  | 'password_reset'
  | 'password_reset_request'
  | 'email_change'
  | 'email_verification'
  | 'phone_change'
  | 'phone_verification'
  | 'avatar_update'
  | 'avatar_remove'
  | 'admin_create'
  | 'admin_update'
  | 'admin_delete'
  | 'admin_suspend'
  | 'admin_unsuspend'
  | 'admin_activate'
  | 'admin_deactivate'
  | 'admin_role_change'
  | 'admin_level_change'
  | 'admin_department_change'
  | 'admin_permission_change'
  | 'user_create'
  | 'user_update'
  | 'user_delete'
  | 'user_suspend'
  | 'user_unsuspend'
  | 'user_verify'
  | 'user_block'
  | 'user_unblock'
  | 'user_promote'
  | 'user_demote'
  | 'vendor_create'
  | 'vendor_update'
  | 'vendor_delete'
  | 'vendor_verify'
  | 'vendor_suspend'
  | 'vendor_unsuspend'
  | 'vendor_approve'
  | 'vendor_reject'
  | 'product_create'
  | 'product_update'
  | 'product_delete'
  | 'product_approve'
  | 'product_reject'
  | 'product_publish'
  | 'product_unpublish'
  | 'order_view'
  | 'order_update'
  | 'order_cancel'
  | 'order_refund'
  | 'order_ship'
  | 'order_status_change'
  | 'payment_view'
  | 'payment_refund'
  | 'payment_capture'
  | 'payment_void'
  | 'settings_view'
  | 'settings_update'
  | 'config_update'
  | 'config_reset'
  | 'report_view'
  | 'report_generate'
  | 'report_export'
  | 'report_schedule'
  | 'system_maintenance'
  | 'system_backup'
  | 'system_restore'
  | 'system_update'
  | 'system_clear'
  | 'mfa_enable'
  | 'mfa_disable'
  | 'mfa_verify'
  | 'mfa_failed'
  | 'otp_send'
  | 'otp_verify'
  | 'otp_failed'
  | 'ip_change'
  | 'device_change'
  | 'log_view'
  | 'log_export'
  | 'log_clear'
  | 'log_archive'
  | 'audit_view'
  | 'audit_export'
  | 'audit_search'
  | 'export_data'
  | 'import_data'
  | 'bulk_operation'
  | 'api_call'
  | 'webhook_send'
  | 'webhook_receive';

/**
 * Activity severity type
 * Based on ACTIVITY_SEVERITY from constants
 */
export type AdminActivitySeverity = 'info' | 'debug' | 'warning' | 'error' | 'critical';

/**
 * Activity context type
 * Based on ACTIVITY_CONTEXT from constants
 */
export type AdminActivityContext =
  'web' | 'mobile' | 'api' | 'system' | 'cron' | 'webhook' | 'queue' | 'event';

/**
 * Activity category type
 * Based on ACTIVITY_CATEGORY from constants
 */
export type AdminActivityCategory =
  | 'authentication'
  | 'profile'
  | 'admin'
  | 'user'
  | 'vendor'
  | 'product'
  | 'order'
  | 'payment'
  | 'settings'
  | 'report'
  | 'system'
  | 'security'
  | 'log'
  | 'audit';

/**
 * Admin activity interface
 * Represents a single activity entry
 */
export interface AdminActivity extends BaseEntity {
  /** Activity ID */
  id: ID;
  /** Admin ID who performed the activity */
  adminId: ID;
  /** Type of activity */
  type: AdminActivityType;
  /** Severity level */
  severity: AdminActivitySeverity;
  /** Category of activity */
  category: AdminActivityCategory;
  /** Context where activity occurred */
  context: AdminActivityContext;
  /** Activity description */
  description: string;
  /** Additional metadata */
  metadata?: Nullable<JsonObject>;
  /** IP address of the request */
  ipAddress?: Nullable<string>;
  /** User agent of the request */
  userAgent?: Nullable<string>;
  /** Request ID (for tracing) */
  requestId?: Nullable<string>;
  /** Session ID */
  sessionId?: Nullable<string>;
  /** Whether activity is system generated */
  isSystem: boolean;
  /** Whether activity requires attention */
  requiresAttention: boolean;
  /** Whether activity has been reviewed */
  isReviewed: boolean;
  /** Reviewed by admin ID */
  reviewedBy?: Nullable<ID>;
  /** Review timestamp */
  reviewedAt?: Nullable<Timestamp>;
  /** Notes from review */
  reviewNotes?: Nullable<string>;
}

/**
 * Activity filter parameters
 */
export interface AdminActivityFilterParams {
  /** Filter by admin ID */
  adminId?: ID;
  /** Filter by activity type */
  type?: AdminActivityType | AdminActivityType[];
  /** Filter by severity */
  severity?: AdminActivitySeverity | AdminActivitySeverity[];
  /** Filter by category */
  category?: AdminActivityCategory | AdminActivityCategory[];
  /** Filter by context */
  context?: AdminActivityContext | AdminActivityContext[];
  /** Filter by system generated */
  isSystem?: boolean;
  /** Filter by requires attention */
  requiresAttention?: boolean;
  /** Filter by reviewed status */
  isReviewed?: boolean;
  /** Date range filter */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Search term (description, metadata) */
  search?: string;
}

/**
 * Activity statistics
 */
export interface AdminActivityStatistics {
  /** Total number of activities */
  totalActivities: number;
  /** Count by type */
  typeCounts: Record<AdminActivityType, number>;
  /** Count by severity */
  severityCounts: Record<AdminActivitySeverity, number>;
  /** Count by category */
  categoryCounts: Record<AdminActivityCategory, number>;
  /** Count by context */
  contextCounts: Record<AdminActivityContext, number>;
  /** Number requiring attention */
  attentionCount: number;
  /** Number reviewed */
  reviewedCount: number;
  /** Period covered */
  period: {
    start: Date;
    end: Date;
  };
  /** Most active admin */
  mostActiveAdmin?: {
    adminId: ID;
    activityCount: number;
  };
}

/**
 * Activity summary
 */
export interface AdminActivitySummary {
  /** Date of summary */
  date: string;
  /** Total activities */
  total: number;
  /** Breakdown by severity */
  severity: Record<AdminActivitySeverity, number>;
  /** Breakdown by category */
  category: Record<AdminActivityCategory, number>;
  /** Activities requiring attention */
  attention: AdminActivity[];
  /** Top activities */
  topActivities: Array<{
    type: AdminActivityType;
    count: number;
  }>;
}

/**
 * Get activity severity from type
 */
export function getAdminActivitySeverity(type: AdminActivityType): AdminActivitySeverity {
  const severityMap: Record<AdminActivityType, AdminActivitySeverity> = {
    login: 'info',
    logout: 'info',
    login_failed: 'warning',
    session_start: 'info',
    session_end: 'info',
    session_expired: 'warning',
    session_extended: 'info',
    token_refresh: 'info',
    token_revoke: 'warning',
    profile_update: 'info',
    profile_view: 'info',
    password_change: 'info',
    password_reset: 'info',
    password_reset_request: 'info',
    email_change: 'warning',
    email_verification: 'info',
    phone_change: 'info',
    phone_verification: 'info',
    avatar_update: 'info',
    avatar_remove: 'info',
    admin_create: 'warning',
    admin_update: 'warning',
    admin_delete: 'critical',
    admin_suspend: 'warning',
    admin_unsuspend: 'info',
    admin_activate: 'info',
    admin_deactivate: 'warning',
    admin_role_change: 'critical',
    admin_level_change: 'warning',
    admin_department_change: 'info',
    admin_permission_change: 'warning',
    user_create: 'info',
    user_update: 'info',
    user_delete: 'critical',
    user_suspend: 'warning',
    user_unsuspend: 'info',
    user_verify: 'info',
    user_block: 'warning',
    user_unblock: 'info',
    user_promote: 'info',
    user_demote: 'info',
    vendor_create: 'info',
    vendor_update: 'info',
    vendor_delete: 'critical',
    vendor_verify: 'info',
    vendor_suspend: 'warning',
    vendor_unsuspend: 'info',
    vendor_approve: 'info',
    vendor_reject: 'warning',
    product_create: 'info',
    product_update: 'info',
    product_delete: 'critical',
    product_approve: 'info',
    product_reject: 'warning',
    product_publish: 'info',
    product_unpublish: 'info',
    order_view: 'info',
    order_update: 'info',
    order_cancel: 'warning',
    order_refund: 'warning',
    order_ship: 'info',
    order_status_change: 'info',
    payment_view: 'info',
    payment_refund: 'warning',
    payment_capture: 'info',
    payment_void: 'warning',
    settings_view: 'info',
    settings_update: 'info',
    config_update: 'warning',
    config_reset: 'critical',
    report_view: 'info',
    report_generate: 'info',
    report_export: 'info',
    report_schedule: 'info',
    system_maintenance: 'warning',
    system_backup: 'info',
    system_restore: 'critical',
    system_update: 'warning',
    system_clear: 'warning',
    mfa_enable: 'info',
    mfa_disable: 'warning',
    mfa_verify: 'info',
    mfa_failed: 'warning',
    otp_send: 'info',
    otp_verify: 'info',
    otp_failed: 'warning',
    ip_change: 'warning',
    device_change: 'warning',
    log_view: 'info',
    log_export: 'info',
    log_clear: 'warning',
    log_archive: 'info',
    audit_view: 'info',
    audit_export: 'info',
    audit_search: 'info',
    export_data: 'info',
    import_data: 'warning',
    bulk_operation: 'warning',
    api_call: 'info',
    webhook_send: 'info',
    webhook_receive: 'info',
  };
  return severityMap[type] || 'info';
}

/**
 * Get activity category from type
 */
export function getAdminActivityCategory(type: AdminActivityType): AdminActivityCategory {
  const categoryMap: Record<AdminActivityType, AdminActivityCategory> = {
    login: 'authentication',
    logout: 'authentication',
    login_failed: 'authentication',
    session_start: 'authentication',
    session_end: 'authentication',
    session_expired: 'authentication',
    session_extended: 'authentication',
    token_refresh: 'authentication',
    token_revoke: 'authentication',
    profile_update: 'profile',
    profile_view: 'profile',
    password_change: 'profile',
    password_reset: 'profile',
    password_reset_request: 'profile',
    email_change: 'profile',
    email_verification: 'profile',
    phone_change: 'profile',
    phone_verification: 'profile',
    avatar_update: 'profile',
    avatar_remove: 'profile',
    admin_create: 'admin',
    admin_update: 'admin',
    admin_delete: 'admin',
    admin_suspend: 'admin',
    admin_unsuspend: 'admin',
    admin_activate: 'admin',
    admin_deactivate: 'admin',
    admin_role_change: 'admin',
    admin_level_change: 'admin',
    admin_department_change: 'admin',
    admin_permission_change: 'admin',
    user_create: 'user',
    user_update: 'user',
    user_delete: 'user',
    user_suspend: 'user',
    user_unsuspend: 'user',
    user_verify: 'user',
    user_block: 'user',
    user_unblock: 'user',
    user_promote: 'user',
    user_demote: 'user',
    vendor_create: 'vendor',
    vendor_update: 'vendor',
    vendor_delete: 'vendor',
    vendor_verify: 'vendor',
    vendor_suspend: 'vendor',
    vendor_unsuspend: 'vendor',
    vendor_approve: 'vendor',
    vendor_reject: 'vendor',
    product_create: 'product',
    product_update: 'product',
    product_delete: 'product',
    product_approve: 'product',
    product_reject: 'product',
    product_publish: 'product',
    product_unpublish: 'product',
    order_view: 'order',
    order_update: 'order',
    order_cancel: 'order',
    order_refund: 'order',
    order_ship: 'order',
    order_status_change: 'order',
    payment_view: 'payment',
    payment_refund: 'payment',
    payment_capture: 'payment',
    payment_void: 'payment',
    settings_view: 'settings',
    settings_update: 'settings',
    config_update: 'settings',
    config_reset: 'settings',
    report_view: 'report',
    report_generate: 'report',
    report_export: 'report',
    report_schedule: 'report',
    system_maintenance: 'system',
    system_backup: 'system',
    system_restore: 'system',
    system_update: 'system',
    system_clear: 'system',
    mfa_enable: 'security',
    mfa_disable: 'security',
    mfa_verify: 'security',
    mfa_failed: 'security',
    otp_send: 'security',
    otp_verify: 'security',
    otp_failed: 'security',
    ip_change: 'security',
    device_change: 'security',
    log_view: 'log',
    log_export: 'log',
    log_clear: 'log',
    log_archive: 'log',
    audit_view: 'audit',
    audit_export: 'audit',
    audit_search: 'audit',
    export_data: 'admin',
    import_data: 'admin',
    bulk_operation: 'admin',
    api_call: 'system',
    webhook_send: 'system',
    webhook_receive: 'system',
  };
  return categoryMap[type] || 'system';
}

/**
 * Get activity label
 */
export function getAdminActivityLabel(type: AdminActivityType): string {
  const labels: Record<AdminActivityType, string> = {
    login: 'Login',
    logout: 'Logout',
    login_failed: 'Login Failed',
    session_start: 'Session Started',
    session_end: 'Session Ended',
    session_expired: 'Session Expired',
    session_extended: 'Session Extended',
    token_refresh: 'Token Refreshed',
    token_revoke: 'Token Revoked',
    profile_update: 'Profile Updated',
    profile_view: 'Profile Viewed',
    password_change: 'Password Changed',
    password_reset: 'Password Reset',
    password_reset_request: 'Password Reset Requested',
    email_change: 'Email Changed',
    email_verification: 'Email Verified',
    phone_change: 'Phone Changed',
    phone_verification: 'Phone Verified',
    avatar_update: 'Avatar Updated',
    avatar_remove: 'Avatar Removed',
    admin_create: 'Admin Created',
    admin_update: 'Admin Updated',
    admin_delete: 'Admin Deleted',
    admin_suspend: 'Admin Suspended',
    admin_unsuspend: 'Admin Unsuspended',
    admin_activate: 'Admin Activated',
    admin_deactivate: 'Admin Deactivated',
    admin_role_change: 'Admin Role Changed',
    admin_level_change: 'Admin Level Changed',
    admin_department_change: 'Admin Department Changed',
    admin_permission_change: 'Admin Permission Changed',
    user_create: 'User Created',
    user_update: 'User Updated',
    user_delete: 'User Deleted',
    user_suspend: 'User Suspended',
    user_unsuspend: 'User Unsuspended',
    user_verify: 'User Verified',
    user_block: 'User Blocked',
    user_unblock: 'User Unblocked',
    user_promote: 'User Promoted',
    user_demote: 'User Demoted',
    vendor_create: 'Vendor Created',
    vendor_update: 'Vendor Updated',
    vendor_delete: 'Vendor Deleted',
    vendor_verify: 'Vendor Verified',
    vendor_suspend: 'Vendor Suspended',
    vendor_unsuspend: 'Vendor Unsuspended',
    vendor_approve: 'Vendor Approved',
    vendor_reject: 'Vendor Rejected',
    product_create: 'Product Created',
    product_update: 'Product Updated',
    product_delete: 'Product Deleted',
    product_approve: 'Product Approved',
    product_reject: 'Product Rejected',
    product_publish: 'Product Published',
    product_unpublish: 'Product Unpublished',
    order_view: 'Order Viewed',
    order_update: 'Order Updated',
    order_cancel: 'Order Cancelled',
    order_refund: 'Order Refunded',
    order_ship: 'Order Shipped',
    order_status_change: 'Order Status Changed',
    payment_view: 'Payment Viewed',
    payment_refund: 'Payment Refunded',
    payment_capture: 'Payment Captured',
    payment_void: 'Payment Voided',
    settings_view: 'Settings Viewed',
    settings_update: 'Settings Updated',
    config_update: 'Config Updated',
    config_reset: 'Config Reset',
    report_view: 'Report Viewed',
    report_generate: 'Report Generated',
    report_export: 'Report Exported',
    report_schedule: 'Report Scheduled',
    system_maintenance: 'System Maintenance',
    system_backup: 'System Backup',
    system_restore: 'System Restore',
    system_update: 'System Update',
    system_clear: 'System Clear',
    mfa_enable: 'MFA Enabled',
    mfa_disable: 'MFA Disabled',
    mfa_verify: 'MFA Verified',
    mfa_failed: 'MFA Failed',
    otp_send: 'OTP Sent',
    otp_verify: 'OTP Verified',
    otp_failed: 'OTP Failed',
    ip_change: 'IP Changed',
    device_change: 'Device Changed',
    log_view: 'Log Viewed',
    log_export: 'Log Exported',
    log_clear: 'Log Cleared',
    log_archive: 'Log Archived',
    audit_view: 'Audit Viewed',
    audit_export: 'Audit Exported',
    audit_search: 'Audit Searched',
    export_data: 'Data Exported',
    import_data: 'Data Imported',
    bulk_operation: 'Bulk Operation',
    api_call: 'API Call',
    webhook_send: 'Webhook Sent',
    webhook_receive: 'Webhook Received',
  };
  return labels[type] || type;
}

/**
 * Check if activity is high severity
 */
export function isAdminHighSeverityActivity(type: AdminActivityType): boolean {
  const severity = getAdminActivitySeverity(type);
  return severity === 'warning' || severity === 'error' || severity === 'critical';
}

/**
 * Create activity from data
 */
export function createAdminActivity(
  adminId: ID,
  type: AdminActivityType,
  metadata?: JsonObject
): Omit<AdminActivity, keyof BaseEntity> {
  return {
    adminId,
    type,
    severity: getAdminActivitySeverity(type),
    category: getAdminActivityCategory(type),
    context: 'web',
    description: getAdminActivityLabel(type),
    metadata: metadata || null,
    ipAddress: null,
    userAgent: null,
    requestId: null,
    sessionId: null,
    isSystem: false,
    requiresAttention: isAdminHighSeverityActivity(type),
    isReviewed: false,
    reviewedBy: null,
    reviewedAt: null,
    reviewNotes: null,
  };
}

/**
 * Get activity statistics from array
 */
export function createAdminActivityStatistics(
  activities: AdminActivity[],
  period: { start: Date; end: Date }
): AdminActivityStatistics {
  const stats: AdminActivityStatistics = {
    totalActivities: activities.length,
    typeCounts: {} as Record<AdminActivityType, number>,
    severityCounts: {
      info: 0,
      debug: 0,
      warning: 0,
      error: 0,
      critical: 0,
    },
    categoryCounts: {
      authentication: 0,
      profile: 0,
      admin: 0,
      user: 0,
      vendor: 0,
      product: 0,
      order: 0,
      payment: 0,
      settings: 0,
      report: 0,
      system: 0,
      security: 0,
      log: 0,
      audit: 0,
    },
    contextCounts: {
      web: 0,
      mobile: 0,
      api: 0,
      system: 0,
      cron: 0,
      webhook: 0,
      queue: 0,
      event: 0,
    },
    attentionCount: 0,
    reviewedCount: 0,
    period,
    mostActiveAdmin: undefined,
  };

  const adminActivityCount: Record<ID, number> = {};

  activities.forEach((activity) => {
    stats.typeCounts[activity.type] = (stats.typeCounts[activity.type] || 0) + 1;
    stats.severityCounts[activity.severity] = (stats.severityCounts[activity.severity] || 0) + 1;
    stats.categoryCounts[activity.category] = (stats.categoryCounts[activity.category] || 0) + 1;
    stats.contextCounts[activity.context] = (stats.contextCounts[activity.context] || 0) + 1;

    if (activity.requiresAttention) stats.attentionCount++;
    if (activity.isReviewed) stats.reviewedCount++;

    adminActivityCount[activity.adminId] = (adminActivityCount[activity.adminId] || 0) + 1;
  });

  // Find most active admin
  let maxCount = 0;
  for (const [adminId, count] of Object.entries(adminActivityCount)) {
    if (count > maxCount) {
      maxCount = count;
      stats.mostActiveAdmin = { adminId, activityCount: count };
    }
  }

  return stats;
}
