/**
 * Admin Log Schema
 * Zod schemas for admin log definitions
 */

import { z } from 'zod';
import { ADMIN_LOG_LEVEL, ADMIN_LOG_CATEGORY } from '@vubon/shared-constants';
import {
  idSchema,
  timestampSchema,
  jsonObjectSchema,
  nullable,
  numberWithRange,
} from '../common/core-primitives.schema';
import { adminActivityTypeSchema } from './admin-activity.schema';

/**
 * Admin log level enum schema (from constants)
 */
export const adminLogLevelSchema = z.enum([
  'debug',
  'info',
  'notice',
  'warning',
  'error',
  'critical',
  'alert',
  'emergency',
]);

/**
 * Admin log category enum schema (from constants)
 */
export const adminLogCategorySchema = z.enum([
  'auth',
  'access',
  'security',
  'system',
  'application',
  'business',
  'performance',
  'audit',
  'transaction',
  'error',
  'debug',
  'info',
]);

/**
 * Admin log source enum schema (from constants)
 */
export const adminLogSourceSchema = z.enum([
  'frontend',
  'backend',
  'api',
  'service',
  'worker',
  'scheduler',
  'webhook',
  'queue',
  'database',
  'cache',
  'file',
]);

/**
 * Admin log format enum schema (from constants)
 */
export const adminLogFormatSchema = z.enum(['json', 'text', 'csv', 'xml', 'yaml']);

/**
 * Admin log entry schema
 */
export const adminLogEntrySchema = z.object({
  id: idSchema,
  adminId: idSchema,
  activity: adminActivityTypeSchema,
  level: adminLogLevelSchema,
  category: adminLogCategorySchema,
  source: adminLogSourceSchema,
  format: adminLogFormatSchema,
  message: z.string(),
  details: nullable(jsonObjectSchema),
  ipAddress: nullable(z.string()),
  userAgent: nullable(z.string()),
  requestId: nullable(z.string()),
  sessionId: nullable(z.string()),
  correlationId: nullable(z.string()),
  duration: nullable(numberWithRange(0)),
  memoryUsage: nullable(numberWithRange(0)),
  cpuUsage: nullable(numberWithRange(0, 100)),
  stackTrace: nullable(z.string()),
  isArchived: z.boolean().default(false),
  archivedAt: nullable(timestampSchema),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  deletedAt: nullable(timestampSchema).default(null),
});

/**
 * Admin log filter parameters schema
 */
export const adminLogFilterParamsSchema = z.object({
  adminId: nullable(idSchema).optional(),
  activity: z.union([adminActivityTypeSchema, z.array(adminActivityTypeSchema)]).optional(),
  level: z.union([adminLogLevelSchema, z.array(adminLogLevelSchema)]).optional(),
  category: z.union([adminLogCategorySchema, z.array(adminLogCategorySchema)]).optional(),
  source: z.union([adminLogSourceSchema, z.array(adminLogSourceSchema)]).optional(),
  isArchived: z.boolean().optional(),
  dateRange: z
    .object({
      start: timestampSchema.optional(),
      end: timestampSchema.optional(),
    })
    .optional(),
  search: z.string().optional(),
  minDuration: numberWithRange(0).optional(),
  maxDuration: numberWithRange(0).optional(),
});

/**
 * Admin log statistics schema
 */
export const adminLogStatisticsSchema = z.object({
  totalLogs: z.number().int().min(0),
  levelCounts: z.record(z.string(), z.number().int().min(0)),
  categoryCounts: z.record(z.string(), z.number().int().min(0)),
  sourceCounts: z.record(z.string(), z.number().int().min(0)),
  archivedCount: z.number().int().min(0),
  errorCount: z.number().int().min(0),
  averageDuration: z.number().min(0),
  period: z.object({
    start: timestampSchema,
    end: timestampSchema,
  }),
});

/**
 * Type inference from schemas
 */
export type AdminLogLevelSchema = z.infer<typeof adminLogLevelSchema>;
export type AdminLogCategorySchema = z.infer<typeof adminLogCategorySchema>;
export type AdminLogSourceSchema = z.infer<typeof adminLogSourceSchema>;
export type AdminLogFormatSchema = z.infer<typeof adminLogFormatSchema>;
export type AdminLogEntrySchema = z.infer<typeof adminLogEntrySchema>;
export type AdminLogFilterParamsSchema = z.infer<typeof adminLogFilterParamsSchema>;
export type AdminLogStatisticsSchema = z.infer<typeof adminLogStatisticsSchema>;

/**
 * Helper function to get log level priority
 */
export function getAdminLogLevelPriority(level: AdminLogLevelSchema): number {
  const priorityMap: Record<AdminLogLevelSchema, number> = {
    debug: 0,
    info: 1,
    notice: 2,
    warning: 3,
    error: 4,
    critical: 5,
    alert: 6,
    emergency: 7,
  };
  return priorityMap[level] || 0;
}

/**
 * Helper function to get log level label
 */
export function getAdminLogLevelLabel(level: AdminLogLevelSchema): string {
  const labelMap: Record<AdminLogLevelSchema, string> = {
    debug: 'Debug',
    info: 'Info',
    notice: 'Notice',
    warning: 'Warning',
    error: 'Error',
    critical: 'Critical',
    alert: 'Alert',
    emergency: 'Emergency',
  };
  return labelMap[level] || level;
}

/**
 * Helper function to get log level color
 */
export function getAdminLogLevelColor(level: AdminLogLevelSchema): string {
  const colorMap: Record<AdminLogLevelSchema, string> = {
    debug: '#6C757D',
    info: '#17A2B8',
    notice: '#007BFF',
    warning: '#FFC107',
    error: '#DC3545',
    critical: '#FD7E14',
    alert: '#FF6B6B',
    emergency: '#FF0000',
  };
  return colorMap[level] || '#6C757D';
}

/**
 * Helper function to get log category label
 */
export function getAdminLogCategoryLabel(category: AdminLogCategorySchema): string {
  const labelMap: Record<AdminLogCategorySchema, string> = {
    auth: 'Authentication',
    access: 'Access Control',
    security: 'Security',
    system: 'System',
    application: 'Application',
    business: 'Business',
    performance: 'Performance',
    audit: 'Audit',
    transaction: 'Transaction',
    error: 'Error',
    debug: 'Debug',
    info: 'Info',
  };
  return labelMap[category] || category;
}

/**
 * Helper function to get log source label
 */
export function getAdminLogSourceLabel(source: AdminLogSourceSchema): string {
  const labelMap: Record<AdminLogSourceSchema, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    api: 'API',
    service: 'Service',
    worker: 'Worker',
    scheduler: 'Scheduler',
    webhook: 'Webhook',
    queue: 'Queue',
    database: 'Database',
    cache: 'Cache',
    file: 'File',
  };
  return labelMap[source] || source;
}

/**
 * Helper function to check if log level is high priority
 */
export function isAdminHighPriorityLog(level: AdminLogLevelSchema): boolean {
  const highPriority: AdminLogLevelSchema[] = ['error', 'critical', 'alert', 'emergency'];
  return highPriority.includes(level);
}

/**
 * Helper function to check if log level is valid
 */
export function isValidAdminLogLevel(level: string): level is AdminLogLevelSchema {
  const validLevels = Object.values(ADMIN_LOG_LEVEL) as AdminLogLevelSchema[];
  return validLevels.includes(level as AdminLogLevelSchema);
}

/**
 * Helper function to check if log category is valid
 */
export function isValidAdminLogCategory(category: string): category is AdminLogCategorySchema {
  const validCategories = Object.values(ADMIN_LOG_CATEGORY) as AdminLogCategorySchema[];
  return validCategories.includes(category as AdminLogCategorySchema);
}

/**
 * Helper function to create log entry data
 */
export function createAdminLogEntryData(
  adminId: string,
  activity: z.infer<typeof adminActivityTypeSchema>,
  message: string,
  details?: Record<string, unknown>
): Omit<AdminLogEntrySchema, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  const level = getAdminLogLevelFromActivity(activity);
  const category = getAdminLogCategoryFromActivity(activity);

  return {
    adminId,
    activity,
    level,
    category,
    source: 'backend',
    format: 'json',
    message,
    details: details || null,
    ipAddress: null,
    userAgent: null,
    requestId: null,
    sessionId: null,
    correlationId: null,
    duration: null,
    memoryUsage: null,
    cpuUsage: null,
    stackTrace: null,
    isArchived: false,
    archivedAt: null,
  };
}

/**
 * Helper function to get log level from activity (internal)
 */
function getAdminLogLevelFromActivity(
  activity: z.infer<typeof adminActivityTypeSchema>
): AdminLogLevelSchema {
  const levelMap: Record<z.infer<typeof adminActivityTypeSchema>, AdminLogLevelSchema> = {
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
  return levelMap[activity] || 'info';
}

/**
 * Helper function to get log category from activity (internal)
 */
function getAdminLogCategoryFromActivity(
  activity: z.infer<typeof adminActivityTypeSchema>
): AdminLogCategorySchema {
  const categoryMap: Record<z.infer<typeof adminActivityTypeSchema>, AdminLogCategorySchema> = {
    login: 'auth',
    logout: 'auth',
    login_failed: 'auth',
    session_start: 'auth',
    session_end: 'auth',
    session_expired: 'auth',
    session_extended: 'auth',
    token_refresh: 'auth',
    token_revoke: 'security',
    profile_update: 'application',
    profile_view: 'application',
    password_change: 'security',
    password_reset: 'security',
    password_reset_request: 'security',
    email_change: 'security',
    email_verification: 'application',
    phone_change: 'application',
    phone_verification: 'application',
    avatar_update: 'application',
    avatar_remove: 'application',
    admin_create: 'application',
    admin_update: 'application',
    admin_delete: 'application',
    admin_suspend: 'application',
    admin_unsuspend: 'application',
    admin_activate: 'application',
    admin_deactivate: 'application',
    admin_role_change: 'application',
    admin_level_change: 'application',
    admin_department_change: 'application',
    admin_permission_change: 'application',
    user_create: 'application',
    user_update: 'application',
    user_delete: 'application',
    user_suspend: 'application',
    user_unsuspend: 'application',
    user_verify: 'application',
    user_block: 'application',
    user_unblock: 'application',
    user_promote: 'application',
    user_demote: 'application',
    vendor_create: 'application',
    vendor_update: 'application',
    vendor_delete: 'application',
    vendor_verify: 'application',
    vendor_suspend: 'application',
    vendor_unsuspend: 'application',
    vendor_approve: 'application',
    vendor_reject: 'application',
    product_create: 'application',
    product_update: 'application',
    product_delete: 'application',
    product_approve: 'application',
    product_reject: 'application',
    product_publish: 'application',
    product_unpublish: 'application',
    order_view: 'application',
    order_update: 'application',
    order_cancel: 'application',
    order_refund: 'application',
    order_ship: 'application',
    order_status_change: 'application',
    payment_view: 'application',
    payment_refund: 'application',
    payment_capture: 'application',
    payment_void: 'application',
    settings_view: 'application',
    settings_update: 'application',
    config_update: 'application',
    config_reset: 'application',
    report_view: 'application',
    report_generate: 'application',
    report_export: 'application',
    report_schedule: 'application',
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
    log_view: 'audit',
    log_export: 'audit',
    log_clear: 'system',
    log_archive: 'audit',
    audit_view: 'audit',
    audit_export: 'audit',
    audit_search: 'audit',
    export_data: 'application',
    import_data: 'application',
    bulk_operation: 'application',
    api_call: 'system',
    webhook_send: 'system',
    webhook_receive: 'system',
  };
  return categoryMap[activity] || 'info';
}

/**
 * Helper function to create log statistics from array
 */
export function createAdminLogStatisticsFromArray(
  logs: AdminLogEntrySchema[],
  period: { start: Date; end: Date }
): AdminLogStatisticsSchema {
  const stats: AdminLogStatisticsSchema = {
    totalLogs: logs.length,
    levelCounts: {},
    categoryCounts: {},
    sourceCounts: {},
    archivedCount: 0,
    errorCount: 0,
    averageDuration: 0,
    period: {
      start: period.start,
      end: period.end,
    },
  };

  let totalDuration = 0;
  let durationCount = 0;

  logs.forEach((log) => {
    const level = log.level as AdminLogLevelSchema;
    const category = log.category as AdminLogCategorySchema;
    const source = log.source as AdminLogSourceSchema;

    stats.levelCounts[level] = (stats.levelCounts[level] || 0) + 1;
    stats.categoryCounts[category] = (stats.categoryCounts[category] || 0) + 1;
    stats.sourceCounts[source] = (stats.sourceCounts[source] || 0) + 1;

    if (log.isArchived) stats.archivedCount++;
    if (isAdminHighPriorityLog(level)) stats.errorCount++;

    if (log.duration !== null && log.duration !== undefined) {
      totalDuration += log.duration;
      durationCount++;
    }
  });

  stats.averageDuration = durationCount > 0 ? totalDuration / durationCount : 0;

  return stats;
}

/**
 * Get log level options for dropdown
 */
export function getAdminLogLevelOptions(): Array<{
  value: AdminLogLevelSchema;
  label: string;
  color: string;
}> {
  return (Object.values(ADMIN_LOG_LEVEL) as AdminLogLevelSchema[]).map((level) => ({
    value: level,
    label: getAdminLogLevelLabel(level),
    color: getAdminLogLevelColor(level),
  }));
}

/**
 * Get log category options for dropdown
 */
export function getAdminLogCategoryOptions(): Array<{
  value: AdminLogCategorySchema;
  label: string;
}> {
  return (Object.values(ADMIN_LOG_CATEGORY) as AdminLogCategorySchema[]).map((category) => ({
    value: category,
    label: getAdminLogCategoryLabel(category),
  }));
}

/**
 * Export schemas as an object for convenient access
 */
export const adminLogSchemas = {
  log: adminLogEntrySchema,
  level: adminLogLevelSchema,
  category: adminLogCategorySchema,
  source: adminLogSourceSchema,
  format: adminLogFormatSchema,
  filter: adminLogFilterParamsSchema,
  statistics: adminLogStatisticsSchema,
  getLevelPriority: getAdminLogLevelPriority,
  getLevelLabel: getAdminLogLevelLabel,
  getLevelColor: getAdminLogLevelColor,
  getCategoryLabel: getAdminLogCategoryLabel,
  getSourceLabel: getAdminLogSourceLabel,
  isHighPriority: isAdminHighPriorityLog,
  isValidLevel: isValidAdminLogLevel,
  isValidCategory: isValidAdminLogCategory,
  create: createAdminLogEntryData,
  createStatistics: createAdminLogStatisticsFromArray,
  getLevelOptions: getAdminLogLevelOptions,
  getCategoryOptions: getAdminLogCategoryOptions,
};

export default adminLogSchemas;
