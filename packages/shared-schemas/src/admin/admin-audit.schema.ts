/**
 * Admin Audit Schema
 * Zod schemas for admin audit trail definitions
 */

import { z } from 'zod';
import { ADMIN_AUDIT_EVENT, ADMIN_AUDIT_RETENTION } from '@vubon/shared-constants';
import {
  idSchema,
  timestampSchema,
  jsonObjectSchema,
  nullable,
  stringWithLength,
} from '../common/core-primitives.schema';
import { adminLogLevelSchema } from './admin-log.schema';

/**
 * Admin audit event enum schema (from constants)
 */
export const adminAuditEventSchema = z.enum([
  // Authentication
  'auth.login',
  'auth.logout',
  'auth.failed',
  'auth.session',
  'auth.token',
  // Authorization
  'authz.grant',
  'authz.revoke',
  'authz.deny',
  // CRUD
  'crud.create',
  'crud.read',
  'crud.update',
  'crud.delete',
  // System
  'system.start',
  'system.stop',
  'system.restart',
  'system.maintenance',
  'system.backup',
  'system.restore',
  'system.update',
  // Security
  'security.mfa',
  'security.otp',
  'security.block',
  'security.unblock',
  // Admin
  'admin.create',
  'admin.update',
  'admin.delete',
  'admin.suspend',
  'admin.unsuspend',
  // Data
  'data.export',
  'data.import',
  'data.bulk',
]);

/**
 * Admin audit retention enum schema (from constants)
 */
export const adminAuditRetentionSchema = z.enum([
  'standard',
  'important',
  'critical',
  'compliance',
  'permanent',
]);

/**
 * Admin audit storage enum schema (from constants)
 */
export const adminAuditStorageSchema = z.enum(['database', 'file', 'elasticsearch', 's3', 'cloud']);

/**
 * Admin audit category enum schema (from constants)
 */
export const adminAuditCategorySchema = z.enum([
  'authentication',
  'authorization',
  'access',
  'admin_actions',
  'user_actions',
  'system',
  'security',
  'data',
  'business',
]);

/**
 * Admin audit event data schema
 */
export const adminAuditEventDataSchema = z.object({
  event: adminAuditEventSchema,
  eventId: z.string(),
  timestamp: z.string().datetime(),
  adminId: idSchema,
  category: adminAuditCategorySchema,
  severity: adminLogLevelSchema,
  retention: adminAuditRetentionSchema,
  details: jsonObjectSchema,
  ip: nullable(z.string()),
  userAgent: nullable(z.string()),
});

/**
 * Admin audit log schema (complete audit log entry)
 */
export const adminAuditLogSchema = z.object({
  id: idSchema,
  event: adminAuditEventSchema,
  adminId: idSchema,
  adminName: stringWithLength(2, 100),
  adminRole: z.string(),
  resourceType: z.string(),
  resourceId: z.string(),
  changes: nullable(
    z.object({
      before: jsonObjectSchema.optional(),
      after: jsonObjectSchema.optional(),
    })
  ),
  category: adminAuditCategorySchema,
  severity: adminLogLevelSchema,
  retention: adminAuditRetentionSchema,
  storage: adminAuditStorageSchema,
  metadata: nullable(jsonObjectSchema),
  ipAddress: nullable(z.string()),
  userAgent: nullable(z.string()),
  requestId: nullable(z.string()),
  sessionId: nullable(z.string()),
  isArchived: z.boolean().default(false),
  archivedAt: nullable(timestampSchema),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  deletedAt: nullable(timestampSchema).default(null),
});

/**
 * Admin audit filter parameters schema
 */
export const adminAuditFilterParamsSchema = z.object({
  adminId: nullable(idSchema).optional(),
  event: z.union([adminAuditEventSchema, z.array(adminAuditEventSchema)]).optional(),
  category: z.union([adminAuditCategorySchema, z.array(adminAuditCategorySchema)]).optional(),
  severity: z.union([adminLogLevelSchema, z.array(adminLogLevelSchema)]).optional(),
  retention: z.union([adminAuditRetentionSchema, z.array(adminAuditRetentionSchema)]).optional(),
  resourceType: z.string().optional(),
  resourceId: z.string().optional(),
  isArchived: z.boolean().optional(),
  dateRange: z
    .object({
      start: timestampSchema.optional(),
      end: timestampSchema.optional(),
    })
    .optional(),
  search: z.string().optional(),
});

/**
 * Admin audit statistics schema
 */
export const adminAuditStatisticsSchema = z.object({
  totalEntries: z.number().int().min(0),
  eventCounts: z.record(z.string(), z.number().int().min(0)),
  categoryCounts: z.record(z.string(), z.number().int().min(0)),
  severityCounts: z.record(z.string(), z.number().int().min(0)),
  retentionCounts: z.record(z.string(), z.number().int().min(0)),
  archivedCount: z.number().int().min(0),
  period: z.object({
    start: timestampSchema,
    end: timestampSchema,
  }),
  mostActiveAdmin: z
    .object({
      adminId: idSchema,
      eventCount: z.number().int().min(0),
    })
    .optional(),
});

/**
 * Type inference from schemas
 */
export type AdminAuditEventSchema = z.infer<typeof adminAuditEventSchema>;
export type AdminAuditRetentionSchema = z.infer<typeof adminAuditRetentionSchema>;
export type AdminAuditStorageSchema = z.infer<typeof adminAuditStorageSchema>;
export type AdminAuditCategorySchema = z.infer<typeof adminAuditCategorySchema>;
export type AdminAuditEventDataSchema = z.infer<typeof adminAuditEventDataSchema>;
export type AdminAuditLogSchema = z.infer<typeof adminAuditLogSchema>;
export type AdminAuditFilterParamsSchema = z.infer<typeof adminAuditFilterParamsSchema>;
export type AdminAuditStatisticsSchema = z.infer<typeof adminAuditStatisticsSchema>;

/**
 * Helper function to get audit event category
 */
export function getAdminAuditEventCategoryFromEvent(
  event: AdminAuditEventSchema
): AdminAuditCategorySchema {
  const categoryMap: Record<AdminAuditEventSchema, AdminAuditCategorySchema> = {
    'auth.login': 'authentication',
    'auth.logout': 'authentication',
    'auth.failed': 'authentication',
    'auth.session': 'authentication',
    'auth.token': 'authentication',
    'authz.grant': 'authorization',
    'authz.revoke': 'authorization',
    'authz.deny': 'authorization',
    'crud.create': 'access',
    'crud.read': 'access',
    'crud.update': 'access',
    'crud.delete': 'access',
    'system.start': 'system',
    'system.stop': 'system',
    'system.restart': 'system',
    'system.maintenance': 'system',
    'system.backup': 'system',
    'system.restore': 'system',
    'system.update': 'system',
    'security.mfa': 'security',
    'security.otp': 'security',
    'security.block': 'security',
    'security.unblock': 'security',
    'admin.create': 'admin_actions',
    'admin.update': 'admin_actions',
    'admin.delete': 'admin_actions',
    'admin.suspend': 'admin_actions',
    'admin.unsuspend': 'admin_actions',
    'data.export': 'data',
    'data.import': 'data',
    'data.bulk': 'data',
  };
  return categoryMap[event] || 'system';
}

/**
 * Helper function to get audit event label
 */
export function getAdminAuditEventLabelFromEvent(event: AdminAuditEventSchema): string {
  const labelMap: Record<AdminAuditEventSchema, string> = {
    'auth.login': 'User Login',
    'auth.logout': 'User Logout',
    'auth.failed': 'Failed Login',
    'auth.session': 'Session Event',
    'auth.token': 'Token Event',
    'authz.grant': 'Permission Granted',
    'authz.revoke': 'Permission Revoked',
    'authz.deny': 'Access Denied',
    'crud.create': 'Record Created',
    'crud.read': 'Record Read',
    'crud.update': 'Record Updated',
    'crud.delete': 'Record Deleted',
    'system.start': 'System Started',
    'system.stop': 'System Stopped',
    'system.restart': 'System Restarted',
    'system.maintenance': 'System Maintenance',
    'system.backup': 'System Backup',
    'system.restore': 'System Restore',
    'system.update': 'System Update',
    'security.mfa': 'MFA Event',
    'security.otp': 'OTP Event',
    'security.block': 'User Blocked',
    'security.unblock': 'User Unblocked',
    'admin.create': 'Admin Created',
    'admin.update': 'Admin Updated',
    'admin.delete': 'Admin Deleted',
    'admin.suspend': 'Admin Suspended',
    'admin.unsuspend': 'Admin Unsuspended',
    'data.export': 'Data Exported',
    'data.import': 'Data Imported',
    'data.bulk': 'Bulk Operation',
  };
  return labelMap[event] || event;
}

/**
 * Helper function to get audit event severity
 */
export function getAdminAuditEventSeverityFromEvent(
  event: AdminAuditEventSchema
): z.infer<typeof adminLogLevelSchema> {
  const severityMap: Record<AdminAuditEventSchema, z.infer<typeof adminLogLevelSchema>> = {
    'auth.login': 'info',
    'auth.logout': 'info',
    'auth.failed': 'warning',
    'auth.session': 'info',
    'auth.token': 'info',
    'authz.grant': 'warning',
    'authz.revoke': 'warning',
    'authz.deny': 'warning',
    'crud.create': 'info',
    'crud.read': 'debug',
    'crud.update': 'info',
    'crud.delete': 'critical',
    'system.start': 'info',
    'system.stop': 'warning',
    'system.restart': 'warning',
    'system.maintenance': 'warning',
    'system.backup': 'info',
    'system.restore': 'critical',
    'system.update': 'warning',
    'security.mfa': 'info',
    'security.otp': 'info',
    'security.block': 'warning',
    'security.unblock': 'warning',
    'admin.create': 'info',
    'admin.update': 'info',
    'admin.delete': 'critical',
    'admin.suspend': 'warning',
    'admin.unsuspend': 'info',
    'data.export': 'info',
    'data.import': 'warning',
    'data.bulk': 'warning',
  };
  return severityMap[event] || 'info';
}

/**
 * Helper function to get retention period for audit event
 */
export function getAdminAuditRetentionPeriodForEvent(
  event: AdminAuditEventSchema
): AdminAuditRetentionSchema {
  const severity = getAdminAuditEventSeverityFromEvent(event);
  if (severity === 'critical') {
    return 'compliance';
  }
  if (severity === 'warning' || severity === 'error') {
    return 'critical';
  }
  return 'standard';
}

/**
 * Helper function to get retention label
 */
export function getAdminAuditRetentionLabelFromRetention(
  retention: AdminAuditRetentionSchema
): string {
  const labelMap: Record<AdminAuditRetentionSchema, string> = {
    standard: 'Standard (30 days)',
    important: 'Important (90 days)',
    critical: 'Critical (180 days)',
    compliance: 'Compliance (365 days)',
    permanent: 'Permanent',
  };
  return labelMap[retention] || retention;
}

/**
 * Helper function to generate unique audit event ID
 */
export function generateAdminAuditEventId(): string {
  return `audit_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Helper function to build audit event data
 */
export function buildAdminAuditEventData(
  event: AdminAuditEventSchema,
  adminId: string,
  details: Record<string, unknown>
): AdminAuditEventDataSchema {
  return {
    event,
    eventId: generateAdminAuditEventId(),
    timestamp: new Date().toISOString(),
    adminId,
    category: getAdminAuditEventCategoryFromEvent(event),
    severity: getAdminAuditEventSeverityFromEvent(event),
    retention: getAdminAuditRetentionPeriodForEvent(event),
    details,
    ip: (details.ip as string) || null,
    userAgent: (details.userAgent as string) || null,
  };
}

/**
 * Helper function to check if audit event is for a specific category
 */
export function isAdminAuditEventForCategory(
  event: AdminAuditEventSchema,
  category: AdminAuditCategorySchema
): boolean {
  return getAdminAuditEventCategoryFromEvent(event) === category;
}

/**
 * Helper function to check if audit event is high severity
 */
export function isAdminHighSeverityAuditEvent(event: AdminAuditEventSchema): boolean {
  const severity = getAdminAuditEventSeverityFromEvent(event);
  return severity === 'warning' || severity === 'error' || severity === 'critical';
}

/**
 * Helper function to get audit events by category
 */
export function getAdminAuditEventsByCategoryFromList(
  events: AdminAuditEventSchema[],
  category: AdminAuditCategorySchema
): AdminAuditEventSchema[] {
  return events.filter((event) => getAdminAuditEventCategoryFromEvent(event) === category);
}

/**
 * Helper function to get audit events by severity
 */
export function getAdminAuditEventsBySeverityFromList(
  events: AdminAuditEventSchema[],
  severity: z.infer<typeof adminLogLevelSchema>
): AdminAuditEventSchema[] {
  return events.filter((event) => getAdminAuditEventSeverityFromEvent(event) === severity);
}

/**
 * Helper function to create audit statistics from array
 */
export function createAdminAuditStatisticsFromArray(
  auditLogs: AdminAuditLogSchema[],
  period: { start: Date; end: Date }
): AdminAuditStatisticsSchema {
  const stats: AdminAuditStatisticsSchema = {
    totalEntries: auditLogs.length,
    eventCounts: {},
    categoryCounts: {},
    severityCounts: {},
    retentionCounts: {},
    archivedCount: 0,
    period: {
      start: period.start,
      end: period.end,
    },
    mostActiveAdmin: undefined,
  };

  const adminEventCount: Record<string, number> = {};

  auditLogs.forEach((log) => {
    const event = log.event as AdminAuditEventSchema;
    const category = log.category as AdminAuditCategorySchema;
    const severity = log.severity as z.infer<typeof adminLogLevelSchema>;
    const retention = log.retention as AdminAuditRetentionSchema;

    stats.eventCounts[event] = (stats.eventCounts[event] || 0) + 1;
    stats.categoryCounts[category] = (stats.categoryCounts[category] || 0) + 1;
    stats.severityCounts[severity] = (stats.severityCounts[severity] || 0) + 1;
    stats.retentionCounts[retention] = (stats.retentionCounts[retention] || 0) + 1;

    if (log.isArchived) stats.archivedCount++;

    adminEventCount[log.adminId] = (adminEventCount[log.adminId] || 0) + 1;
  });

  // Find most active admin
  let maxCount = 0;
  for (const [adminId, count] of Object.entries(adminEventCount)) {
    if (count > maxCount) {
      maxCount = count;
      stats.mostActiveAdmin = { adminId, eventCount: count };
    }
  }

  return stats;
}

/**
 * Get all audit event options for dropdown
 */
export function getAdminAuditEventOptions(): Array<{
  value: AdminAuditEventSchema;
  label: string;
  severity: z.infer<typeof adminLogLevelSchema>;
  category: AdminAuditCategorySchema;
}> {
  return (Object.values(ADMIN_AUDIT_EVENT) as AdminAuditEventSchema[]).map((event) => ({
    value: event,
    label: getAdminAuditEventLabelFromEvent(event),
    severity: getAdminAuditEventSeverityFromEvent(event),
    category: getAdminAuditEventCategoryFromEvent(event),
  }));
}

/**
 * Get retention period options for dropdown
 */
export function getAdminAuditRetentionOptions(): Array<{
  value: AdminAuditRetentionSchema;
  label: string;
}> {
  return (Object.values(ADMIN_AUDIT_RETENTION) as AdminAuditRetentionSchema[]).map((retention) => ({
    value: retention,
    label: getAdminAuditRetentionLabelFromRetention(retention),
  }));
}

/**
 * Export schemas as an object for convenient access
 */
export const adminAuditSchemas = {
  auditLog: adminAuditLogSchema,
  event: adminAuditEventSchema,
  retention: adminAuditRetentionSchema,
  storage: adminAuditStorageSchema,
  category: adminAuditCategorySchema,
  eventData: adminAuditEventDataSchema,
  filter: adminAuditFilterParamsSchema,
  statistics: adminAuditStatisticsSchema,
  getCategory: getAdminAuditEventCategoryFromEvent,
  getLabel: getAdminAuditEventLabelFromEvent,
  getSeverity: getAdminAuditEventSeverityFromEvent,
  getRetention: getAdminAuditRetentionPeriodForEvent,
  getRetentionLabel: getAdminAuditRetentionLabelFromRetention,
  generateId: generateAdminAuditEventId,
  buildEvent: buildAdminAuditEventData,
  isForCategory: isAdminAuditEventForCategory,
  isHighSeverity: isAdminHighSeverityAuditEvent,
  getByCategory: getAdminAuditEventsByCategoryFromList,
  getBySeverity: getAdminAuditEventsBySeverityFromList,
  createStatistics: createAdminAuditStatisticsFromArray,
  getEventOptions: getAdminAuditEventOptions,
  getRetentionOptions: getAdminAuditRetentionOptions,
};

export default adminAuditSchemas;
