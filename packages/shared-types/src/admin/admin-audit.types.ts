/**
 * Admin Audit Types
 * Audit trail definitions and helpers
 */

import { BaseEntity, ID, Timestamp, Nullable, JsonObject } from '../common/core-primitives.types';
import type { AdminLogLevel } from './admin-log.types';

/**
 * Admin audit event type
 * Based on ADMIN_AUDIT_EVENT from constants
 */
export type AdminAuditEvent =
  | 'auth.login'
  | 'auth.logout'
  | 'auth.failed'
  | 'auth.session'
  | 'auth.token'
  | 'authz.grant'
  | 'authz.revoke'
  | 'authz.deny'
  | 'crud.create'
  | 'crud.read'
  | 'crud.update'
  | 'crud.delete'
  | 'system.start'
  | 'system.stop'
  | 'system.restart'
  | 'system.maintenance'
  | 'system.backup'
  | 'system.restore'
  | 'system.update'
  | 'security.mfa'
  | 'security.otp'
  | 'security.block'
  | 'security.unblock'
  | 'admin.create'
  | 'admin.update'
  | 'admin.delete'
  | 'admin.suspend'
  | 'admin.unsuspend'
  | 'data.export'
  | 'data.import'
  | 'data.bulk';

/**
 * Admin audit retention type
 * Based on ADMIN_AUDIT_RETENTION from constants
 */
export type AdminAuditRetention =
  'standard' | 'important' | 'critical' | 'compliance' | 'permanent';

/**
 * Admin audit storage type
 * Based on ADMIN_AUDIT_STORAGE from constants
 */
export type AdminAuditStorage = 'database' | 'file' | 'elasticsearch' | 's3' | 'cloud';

/**
 * Admin audit category type
 * Based on ADMIN_AUDIT_CATEGORY from constants
 */
export type AdminAuditCategory =
  | 'authentication'
  | 'authorization'
  | 'access'
  | 'admin_actions'
  | 'user_actions'
  | 'system'
  | 'security'
  | 'data'
  | 'business';

/**
 * Admin audit event data interface
 * Represents a single audit event
 */
export interface AdminAuditEventData {
  /** Audit event type */
  event: AdminAuditEvent;
  /** Unique audit event ID */
  eventId: string;
  /** ISO timestamp of event */
  timestamp: string;
  /** Admin ID who performed the action */
  adminId: ID;
  /** Event category */
  category: AdminAuditCategory;
  /** Severity level */
  severity: AdminLogLevel;
  /** Retention period */
  retention: AdminAuditRetention;
  /** Additional details */
  details: JsonObject;
  /** IP address */
  ip: Nullable<string>;
  /** User agent */
  userAgent: Nullable<string>;
}

/**
 * Admin audit log interface
 * Complete audit log entry
 */
export interface AdminAuditLog extends BaseEntity {
  /** Audit log ID */
  id: ID;
  /** Audit event */
  event: AdminAuditEvent;
  /** Admin ID who performed the action */
  adminId: ID;
  /** Admin name (denormalized for history) */
  adminName: string;
  /** Admin role (denormalized for history) */
  adminRole: string;
  /** Resource type affected */
  resourceType: string;
  /** Resource ID affected */
  resourceId: string;
  /** Changes made */
  changes?: Nullable<{
    before?: JsonObject;
    after?: JsonObject;
  }>;
  /** Event category */
  category: AdminAuditCategory;
  /** Severity level */
  severity: AdminLogLevel;
  /** Retention period */
  retention: AdminAuditRetention;
  /** Storage type */
  storage: AdminAuditStorage;
  /** Additional metadata */
  metadata?: Nullable<JsonObject>;
  /** IP address */
  ipAddress: Nullable<string>;
  /** User agent */
  userAgent: Nullable<string>;
  /** Request ID for tracing */
  requestId: Nullable<string>;
  /** Session ID */
  sessionId: Nullable<string>;
  /** Whether audit log is archived */
  isArchived: boolean;
  /** Archived timestamp */
  archivedAt?: Nullable<Timestamp>;
}

/**
 * Admin audit filter parameters
 */
export interface AdminAuditFilterParams {
  /** Filter by admin ID */
  adminId?: ID;
  /** Filter by event type */
  event?: AdminAuditEvent | AdminAuditEvent[];
  /** Filter by category */
  category?: AdminAuditCategory | AdminAuditCategory[];
  /** Filter by severity */
  severity?: AdminLogLevel | AdminLogLevel[];
  /** Filter by retention */
  retention?: AdminAuditRetention | AdminAuditRetention[];
  /** Filter by resource type */
  resourceType?: string;
  /** Filter by resource ID */
  resourceId?: string;
  /** Filter by archived status */
  isArchived?: boolean;
  /** Date range filter */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Search term */
  search?: string;
}

/**
 * Admin audit statistics
 */
export interface AdminAuditStatistics {
  /** Total number of audit entries */
  totalEntries: number;
  /** Count by event type */
  eventCounts: Record<AdminAuditEvent, number>;
  /** Count by category */
  categoryCounts: Record<AdminAuditCategory, number>;
  /** Count by severity */
  severityCounts: Record<AdminLogLevel, number>;
  /** Count by retention */
  retentionCounts: Record<AdminAuditRetention, number>;
  /** Count by archived status */
  archivedCount: number;
  /** Period covered */
  period: {
    start: Date;
    end: Date;
  };
  /** Most active admin */
  mostActiveAdmin?: {
    adminId: ID;
    eventCount: number;
  };
}

/**
 * Get audit event category
 */
export function getAdminAuditEventCategory(event: AdminAuditEvent): AdminAuditCategory {
  const categoryMap: Record<AdminAuditEvent, AdminAuditCategory> = {
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
 * Get audit event label
 */
export function getAdminAuditEventLabel(event: AdminAuditEvent): string {
  const labels: Record<AdminAuditEvent, string> = {
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
  return labels[event] || event;
}

/**
 * Get audit event severity
 */
export function getAdminAuditEventSeverity(event: AdminAuditEvent): AdminLogLevel {
  const severityMap: Record<AdminAuditEvent, AdminLogLevel> = {
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
 * Get retention period for audit event
 */
export function getAdminAuditRetentionPeriod(event: AdminAuditEvent): AdminAuditRetention {
  const severity = getAdminAuditEventSeverity(event);
  if (severity === 'critical') {
    return 'compliance';
  }
  if (severity === 'warning' || severity === 'error') {
    return 'critical';
  }
  return 'standard';
}

/**
 * Get retention label
 */
export function getAdminAuditRetentionLabel(retention: AdminAuditRetention): string {
  const labels: Record<AdminAuditRetention, string> = {
    standard: 'Standard (30 days)',
    important: 'Important (90 days)',
    critical: 'Critical (180 days)',
    compliance: 'Compliance (365 days)',
    permanent: 'Permanent',
  };
  return labels[retention] || retention;
}

/**
 * Generate unique audit event ID
 */
export function generateAdminAuditEventId(): string {
  return `audit_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Build audit event
 */
export function buildAdminAuditEvent(
  event: AdminAuditEvent,
  adminId: ID,
  details: JsonObject
): AdminAuditEventData {
  return {
    event,
    eventId: generateAdminAuditEventId(),
    timestamp: new Date().toISOString(),
    adminId,
    category: getAdminAuditEventCategory(event),
    severity: getAdminAuditEventSeverity(event),
    retention: getAdminAuditRetentionPeriod(event),
    details,
    ip: (details.ip as string) || null,
    userAgent: (details.userAgent as string) || null,
  };
}

/**
 * Check if audit event is for a specific category
 */
export function isAdminAuditEventForCategory(
  event: AdminAuditEvent,
  category: AdminAuditCategory
): boolean {
  return getAdminAuditEventCategory(event) === category;
}

/**
 * Check if audit event is high severity
 */
export function isAdminHighSeverityAuditEvent(event: AdminAuditEvent): boolean {
  const severity = getAdminAuditEventSeverity(event);
  return severity === 'warning' || severity === 'error' || severity === 'critical';
}

/**
 * Get audit events by category
 */
export function getAdminAuditEventsByCategory(
  events: AdminAuditEvent[],
  category: AdminAuditCategory
): AdminAuditEvent[] {
  return events.filter((event) => getAdminAuditEventCategory(event) === category);
}

/**
 * Get audit events by severity
 */
export function getAdminAuditEventsBySeverity(
  events: AdminAuditEvent[],
  severity: AdminLogLevel
): AdminAuditEvent[] {
  return events.filter((event) => getAdminAuditEventSeverity(event) === severity);
}

/**
 * Create audit statistics from array
 */
export function createAdminAuditStatistics(
  auditLogs: AdminAuditLog[],
  period: { start: Date; end: Date }
): AdminAuditStatistics {
  // Define all possible values for counts
  const allEvents: AdminAuditEvent[] = [
    'auth.login',
    'auth.logout',
    'auth.failed',
    'auth.session',
    'auth.token',
    'authz.grant',
    'authz.revoke',
    'authz.deny',
    'crud.create',
    'crud.read',
    'crud.update',
    'crud.delete',
    'system.start',
    'system.stop',
    'system.restart',
    'system.maintenance',
    'system.backup',
    'system.restore',
    'system.update',
    'security.mfa',
    'security.otp',
    'security.block',
    'security.unblock',
    'admin.create',
    'admin.update',
    'admin.delete',
    'admin.suspend',
    'admin.unsuspend',
    'data.export',
    'data.import',
    'data.bulk',
  ];
  const allCategories: AdminAuditCategory[] = [
    'authentication',
    'authorization',
    'access',
    'admin_actions',
    'user_actions',
    'system',
    'security',
    'data',
    'business',
  ];
  const allSeverities: AdminLogLevel[] = [
    'debug',
    'info',
    'notice',
    'warning',
    'error',
    'critical',
    'alert',
    'emergency',
  ];
  const allRetentions: AdminAuditRetention[] = [
    'standard',
    'important',
    'critical',
    'compliance',
    'permanent',
  ];

  const stats: AdminAuditStatistics = {
    totalEntries: auditLogs.length,
    eventCounts: {} as Record<AdminAuditEvent, number>,
    categoryCounts: {} as Record<AdminAuditCategory, number>,
    severityCounts: {} as Record<AdminLogLevel, number>,
    retentionCounts: {} as Record<AdminAuditRetention, number>,
    archivedCount: 0,
    period,
    mostActiveAdmin: undefined,
  };

  // Initialize counts
  allEvents.forEach((e) => (stats.eventCounts[e] = 0));
  allCategories.forEach((c) => (stats.categoryCounts[c] = 0));
  allSeverities.forEach((s) => (stats.severityCounts[s] = 0));
  allRetentions.forEach((r) => (stats.retentionCounts[r] = 0));

  const adminEventCount: Record<ID, number> = {};

  auditLogs.forEach((log) => {
    stats.eventCounts[log.event] = (stats.eventCounts[log.event] || 0) + 1;
    stats.categoryCounts[log.category] = (stats.categoryCounts[log.category] || 0) + 1;
    stats.severityCounts[log.severity] = (stats.severityCounts[log.severity] || 0) + 1;
    stats.retentionCounts[log.retention] = (stats.retentionCounts[log.retention] || 0) + 1;

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
