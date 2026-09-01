/**
 * Admin Activity Schema
 * Zod schemas for admin activity tracking definitions
 */

import { z } from 'zod';
import {
  idSchema,
  timestampSchema,
  jsonObjectSchema,
  nullable,
} from '../common/core-primitives.schema';

/**
 * Admin activity type enum schema (from constants)
 */
export const adminActivityTypeSchema = z.enum([
  // Authentication
  'login',
  'logout',
  'login_failed',
  'session_start',
  'session_end',
  'session_expired',
  'session_extended',
  'token_refresh',
  'token_revoke',
  // Profile
  'profile_update',
  'profile_view',
  'password_change',
  'password_reset',
  'password_reset_request',
  'email_change',
  'email_verification',
  'phone_change',
  'phone_verification',
  'avatar_update',
  'avatar_remove',
  // Admin management
  'admin_create',
  'admin_update',
  'admin_delete',
  'admin_suspend',
  'admin_unsuspend',
  'admin_activate',
  'admin_deactivate',
  'admin_role_change',
  'admin_level_change',
  'admin_department_change',
  'admin_permission_change',
  // User management
  'user_create',
  'user_update',
  'user_delete',
  'user_suspend',
  'user_unsuspend',
  'user_verify',
  'user_block',
  'user_unblock',
  'user_promote',
  'user_demote',
  // Vendor management
  'vendor_create',
  'vendor_update',
  'vendor_delete',
  'vendor_verify',
  'vendor_suspend',
  'vendor_unsuspend',
  'vendor_approve',
  'vendor_reject',
  // Product management
  'product_create',
  'product_update',
  'product_delete',
  'product_approve',
  'product_reject',
  'product_publish',
  'product_unpublish',
  // Order management
  'order_view',
  'order_update',
  'order_cancel',
  'order_refund',
  'order_ship',
  'order_status_change',
  // Payment management
  'payment_view',
  'payment_refund',
  'payment_capture',
  'payment_void',
  // Settings
  'settings_view',
  'settings_update',
  'config_update',
  'config_reset',
  // Report
  'report_view',
  'report_generate',
  'report_export',
  'report_schedule',
  // System
  'system_maintenance',
  'system_backup',
  'system_restore',
  'system_update',
  'system_clear',
  // Security
  'mfa_enable',
  'mfa_disable',
  'mfa_verify',
  'mfa_failed',
  'otp_send',
  'otp_verify',
  'otp_failed',
  'ip_change',
  'device_change',
  // Log
  'log_view',
  'log_export',
  'log_clear',
  'log_archive',
  // Audit
  'audit_view',
  'audit_export',
  'audit_search',
  // Special
  'export_data',
  'import_data',
  'bulk_operation',
  'api_call',
  'webhook_send',
  'webhook_receive',
]);

/**
 * Admin activity severity enum schema (from constants)
 */
export const adminActivitySeveritySchema = z.enum([
  'info',
  'debug',
  'warning',
  'error',
  'critical',
]);

/**
 * Admin activity context enum schema (from constants)
 */
export const adminActivityContextSchema = z.enum([
  'web',
  'mobile',
  'api',
  'system',
  'cron',
  'webhook',
  'queue',
  'event',
]);

/**
 * Admin activity category enum schema (from constants)
 */
export const adminActivityCategorySchema = z.enum([
  'authentication',
  'profile',
  'admin',
  'user',
  'vendor',
  'product',
  'order',
  'payment',
  'settings',
  'report',
  'system',
  'security',
  'log',
  'audit',
]);

/**
 * Admin activity schema
 */
export const adminActivitySchema = z.object({
  id: idSchema,
  adminId: idSchema,
  type: adminActivityTypeSchema,
  severity: adminActivitySeveritySchema,
  category: adminActivityCategorySchema,
  context: adminActivityContextSchema,
  description: z.string(),
  metadata: nullable(jsonObjectSchema),
  ipAddress: nullable(z.string()),
  userAgent: nullable(z.string()),
  requestId: nullable(z.string()),
  sessionId: nullable(z.string()),
  isSystem: z.boolean().default(false),
  requiresAttention: z.boolean().default(false),
  isReviewed: z.boolean().default(false),
  reviewedBy: nullable(idSchema),
  reviewedAt: nullable(timestampSchema),
  reviewNotes: nullable(z.string()),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  deletedAt: nullable(timestampSchema).default(null),
});

/**
 * Admin activity filter parameters schema
 */
export const adminActivityFilterParamsSchema = z.object({
  adminId: nullable(idSchema).optional(),
  type: z.union([adminActivityTypeSchema, z.array(adminActivityTypeSchema)]).optional(),
  severity: z.union([adminActivitySeveritySchema, z.array(adminActivitySeveritySchema)]).optional(),
  category: z.union([adminActivityCategorySchema, z.array(adminActivityCategorySchema)]).optional(),
  context: z.union([adminActivityContextSchema, z.array(adminActivityContextSchema)]).optional(),
  isSystem: z.boolean().optional(),
  requiresAttention: z.boolean().optional(),
  isReviewed: z.boolean().optional(),
  dateRange: z
    .object({
      start: timestampSchema.optional(),
      end: timestampSchema.optional(),
    })
    .optional(),
  search: z.string().optional(),
});

/**
 * Admin activity statistics schema
 */
export const adminActivityStatisticsSchema = z.object({
  totalActivities: z.number().int().min(0),
  typeCounts: z.record(z.string(), z.number().int().min(0)),
  severityCounts: z.record(z.string(), z.number().int().min(0)),
  categoryCounts: z.record(z.string(), z.number().int().min(0)),
  contextCounts: z.record(z.string(), z.number().int().min(0)),
  attentionCount: z.number().int().min(0),
  reviewedCount: z.number().int().min(0),
  period: z.object({
    start: timestampSchema,
    end: timestampSchema,
  }),
  mostActiveAdmin: z
    .object({
      adminId: idSchema,
      activityCount: z.number().int().min(0),
    })
    .optional(),
});

/**
 * Admin activity summary schema
 */
export const adminActivitySummarySchema = z.object({
  date: z.string(),
  total: z.number().int().min(0),
  severity: z.record(z.string(), z.number().int().min(0)),
  category: z.record(z.string(), z.number().int().min(0)),
  attention: z.array(adminActivitySchema),
  topActivities: z.array(
    z.object({
      type: adminActivityTypeSchema,
      count: z.number().int().min(0),
    })
  ),
});

/**
 * Type inference from schemas
 */
export type AdminActivityTypeSchema = z.infer<typeof adminActivityTypeSchema>;
export type AdminActivitySeveritySchema = z.infer<typeof adminActivitySeveritySchema>;
export type AdminActivityContextSchema = z.infer<typeof adminActivityContextSchema>;
export type AdminActivityCategorySchema = z.infer<typeof adminActivityCategorySchema>;
export type AdminActivitySchema = z.infer<typeof adminActivitySchema>;
export type AdminActivityFilterParamsSchema = z.infer<typeof adminActivityFilterParamsSchema>;
export type AdminActivityStatisticsSchema = z.infer<typeof adminActivityStatisticsSchema>;
export type AdminActivitySummarySchema = z.infer<typeof adminActivitySummarySchema>;

/**
 * Helper function to get activity severity from type
 */
export function getAdminActivitySeverityFromType(
  type: AdminActivityTypeSchema
): AdminActivitySeveritySchema {
  const severityMap: Record<AdminActivityTypeSchema, AdminActivitySeveritySchema> = {
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
 * Helper function to get activity category from type
 */
export function getAdminActivityCategoryFromType(
  type: AdminActivityTypeSchema
): AdminActivityCategorySchema {
  const categoryMap: Record<AdminActivityTypeSchema, AdminActivityCategorySchema> = {
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
 * Helper function to get activity label
 */
export function getAdminActivityLabel(type: AdminActivityTypeSchema): string {
  const labelMap: Record<AdminActivityTypeSchema, string> = {
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
  return labelMap[type] || type;
}

/**
 * Helper function to check if activity is high severity
 */
export function isAdminHighSeverityActivity(type: AdminActivityTypeSchema): boolean {
  const severity = getAdminActivitySeverityFromType(type);
  return severity === 'warning' || severity === 'error' || severity === 'critical';
}

/**
 * Helper function to create activity data
 */
export function createAdminActivityData(
  adminId: string,
  type: AdminActivityTypeSchema,
  metadata?: Record<string, unknown>
): Omit<AdminActivitySchema, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  return {
    adminId,
    type,
    severity: getAdminActivitySeverityFromType(type),
    category: getAdminActivityCategoryFromType(type),
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
 * Helper function to create activity statistics
 */
export function createAdminActivityStatisticsFromArray(
  activities: AdminActivitySchema[],
  period: { start: Date; end: Date }
): AdminActivityStatisticsSchema {
  const stats: AdminActivityStatisticsSchema = {
    totalActivities: activities.length,
    typeCounts: {},
    severityCounts: {},
    categoryCounts: {},
    contextCounts: {},
    attentionCount: 0,
    reviewedCount: 0,
    period: {
      start: period.start,
      end: period.end,
    },
    mostActiveAdmin: undefined,
  };

  const adminActivityCount: Record<string, number> = {};

  activities.forEach((activity) => {
    const type = activity.type as AdminActivityTypeSchema;
    const severity = activity.severity as AdminActivitySeveritySchema;
    const category = activity.category as AdminActivityCategorySchema;
    const context = activity.context as AdminActivityContextSchema;

    stats.typeCounts[type] = (stats.typeCounts[type] || 0) + 1;
    stats.severityCounts[severity] = (stats.severityCounts[severity] || 0) + 1;
    stats.categoryCounts[category] = (stats.categoryCounts[category] || 0) + 1;
    stats.contextCounts[context] = (stats.contextCounts[context] || 0) + 1;

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

/**
 * Export schemas as an object for convenient access
 */
export const adminActivitySchemas = {
  activity: adminActivitySchema,
  type: adminActivityTypeSchema,
  severity: adminActivitySeveritySchema,
  context: adminActivityContextSchema,
  category: adminActivityCategorySchema,
  filter: adminActivityFilterParamsSchema,
  statistics: adminActivityStatisticsSchema,
  summary: adminActivitySummarySchema,
  getSeverity: getAdminActivitySeverityFromType,
  getCategory: getAdminActivityCategoryFromType,
  getLabel: getAdminActivityLabel,
  isHighSeverity: isAdminHighSeverityActivity,
  create: createAdminActivityData,
  createStatistics: createAdminActivityStatisticsFromArray,
};

export default adminActivitySchemas;
