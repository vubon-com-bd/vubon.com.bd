/**
 * Admin Audit Constants
 * Audit trail definitions and helpers
 */

import { ADMIN_LOG_LEVEL, type AdminLogLevel } from './admin-log.constants';

/**
 * Audit event types
 */
export const ADMIN_AUDIT_EVENT = {
  // Authentication events
  AUTH_LOGIN: 'auth.login',
  AUTH_LOGOUT: 'auth.logout',
  AUTH_FAILED: 'auth.failed',
  AUTH_SESSION: 'auth.session',
  AUTH_TOKEN: 'auth.token',

  // Authorization events
  AUTHZ_GRANT: 'authz.grant',
  AUTHZ_REVOKE: 'authz.revoke',
  AUTHZ_DENY: 'authz.deny',

  // CRUD events
  CREATE: 'crud.create',
  READ: 'crud.read',
  UPDATE: 'crud.update',
  DELETE: 'crud.delete',

  // System events
  SYSTEM_START: 'system.start',
  SYSTEM_STOP: 'system.stop',
  SYSTEM_RESTART: 'system.restart',
  SYSTEM_MAINTENANCE: 'system.maintenance',
  SYSTEM_BACKUP: 'system.backup',
  SYSTEM_RESTORE: 'system.restore',
  SYSTEM_UPDATE: 'system.update',

  // Security events
  SECURITY_MFA: 'security.mfa',
  SECURITY_OTP: 'security.otp',
  SECURITY_BLOCK: 'security.block',
  SECURITY_UNBLOCK: 'security.unblock',

  // Admin events
  ADMIN_CREATE: 'admin.create',
  ADMIN_UPDATE: 'admin.update',
  ADMIN_DELETE: 'admin.delete',
  ADMIN_SUSPEND: 'admin.suspend',
  ADMIN_UNSUSPEND: 'admin.unsuspend',

  // Data events
  DATA_EXPORT: 'data.export',
  DATA_IMPORT: 'data.import',
  DATA_BULK: 'data.bulk',
} as const;

export type AdminAuditEvent = (typeof ADMIN_AUDIT_EVENT)[keyof typeof ADMIN_AUDIT_EVENT];

/**
 * Audit log retention periods
 */
export const ADMIN_AUDIT_RETENTION = {
  /** 30 days for standard logs */
  STANDARD: 'standard',
  /** 90 days for important logs */
  IMPORTANT: 'important',
  /** 180 days for critical logs */
  CRITICAL: 'critical',
  /** 365 days for compliance logs */
  COMPLIANCE: 'compliance',
  /** Permanent retention */
  PERMANENT: 'permanent',
} as const;

export type AdminAuditRetention =
  (typeof ADMIN_AUDIT_RETENTION)[keyof typeof ADMIN_AUDIT_RETENTION];

/**
 * Audit log storage types
 */
export const ADMIN_AUDIT_STORAGE = {
  DATABASE: 'database',
  FILE: 'file',
  ELASTICSEARCH: 'elasticsearch',
  S3: 's3',
  CLOUD: 'cloud',
} as const;

export type AdminAuditStorage = (typeof ADMIN_AUDIT_STORAGE)[keyof typeof ADMIN_AUDIT_STORAGE];

/**
 * Audit categories
 */
export const ADMIN_AUDIT_CATEGORY = {
  AUTH: 'authentication',
  AUTHORIZATION: 'authorization',
  ACCESS: 'access',
  ADMIN: 'admin_actions',
  USER: 'user_actions',
  SYSTEM: 'system',
  SECURITY: 'security',
  DATA: 'data',
  BUSINESS: 'business',
} as const;

export type AdminAuditCategory = (typeof ADMIN_AUDIT_CATEGORY)[keyof typeof ADMIN_AUDIT_CATEGORY];

/**
 * Audit event category mapping
 */
export const ADMIN_AUDIT_EVENT_CATEGORY: Record<AdminAuditEvent, AdminAuditCategory> = {
  [ADMIN_AUDIT_EVENT.AUTH_LOGIN]: ADMIN_AUDIT_CATEGORY.AUTH,
  [ADMIN_AUDIT_EVENT.AUTH_LOGOUT]: ADMIN_AUDIT_CATEGORY.AUTH,
  [ADMIN_AUDIT_EVENT.AUTH_FAILED]: ADMIN_AUDIT_CATEGORY.AUTH,
  [ADMIN_AUDIT_EVENT.AUTH_SESSION]: ADMIN_AUDIT_CATEGORY.AUTH,
  [ADMIN_AUDIT_EVENT.AUTH_TOKEN]: ADMIN_AUDIT_CATEGORY.AUTH,
  [ADMIN_AUDIT_EVENT.AUTHZ_GRANT]: ADMIN_AUDIT_CATEGORY.AUTHORIZATION,
  [ADMIN_AUDIT_EVENT.AUTHZ_REVOKE]: ADMIN_AUDIT_CATEGORY.AUTHORIZATION,
  [ADMIN_AUDIT_EVENT.AUTHZ_DENY]: ADMIN_AUDIT_CATEGORY.AUTHORIZATION,
  [ADMIN_AUDIT_EVENT.CREATE]: ADMIN_AUDIT_CATEGORY.ACCESS,
  [ADMIN_AUDIT_EVENT.READ]: ADMIN_AUDIT_CATEGORY.ACCESS,
  [ADMIN_AUDIT_EVENT.UPDATE]: ADMIN_AUDIT_CATEGORY.ACCESS,
  [ADMIN_AUDIT_EVENT.DELETE]: ADMIN_AUDIT_CATEGORY.ACCESS,
  [ADMIN_AUDIT_EVENT.SYSTEM_START]: ADMIN_AUDIT_CATEGORY.SYSTEM,
  [ADMIN_AUDIT_EVENT.SYSTEM_STOP]: ADMIN_AUDIT_CATEGORY.SYSTEM,
  [ADMIN_AUDIT_EVENT.SYSTEM_RESTART]: ADMIN_AUDIT_CATEGORY.SYSTEM,
  [ADMIN_AUDIT_EVENT.SYSTEM_MAINTENANCE]: ADMIN_AUDIT_CATEGORY.SYSTEM,
  [ADMIN_AUDIT_EVENT.SYSTEM_BACKUP]: ADMIN_AUDIT_CATEGORY.SYSTEM,
  [ADMIN_AUDIT_EVENT.SYSTEM_RESTORE]: ADMIN_AUDIT_CATEGORY.SYSTEM,
  [ADMIN_AUDIT_EVENT.SYSTEM_UPDATE]: ADMIN_AUDIT_CATEGORY.SYSTEM,
  [ADMIN_AUDIT_EVENT.SECURITY_MFA]: ADMIN_AUDIT_CATEGORY.SECURITY,
  [ADMIN_AUDIT_EVENT.SECURITY_OTP]: ADMIN_AUDIT_CATEGORY.SECURITY,
  [ADMIN_AUDIT_EVENT.SECURITY_BLOCK]: ADMIN_AUDIT_CATEGORY.SECURITY,
  [ADMIN_AUDIT_EVENT.SECURITY_UNBLOCK]: ADMIN_AUDIT_CATEGORY.SECURITY,
  [ADMIN_AUDIT_EVENT.ADMIN_CREATE]: ADMIN_AUDIT_CATEGORY.ADMIN,
  [ADMIN_AUDIT_EVENT.ADMIN_UPDATE]: ADMIN_AUDIT_CATEGORY.ADMIN,
  [ADMIN_AUDIT_EVENT.ADMIN_DELETE]: ADMIN_AUDIT_CATEGORY.ADMIN,
  [ADMIN_AUDIT_EVENT.ADMIN_SUSPEND]: ADMIN_AUDIT_CATEGORY.ADMIN,
  [ADMIN_AUDIT_EVENT.ADMIN_UNSUSPEND]: ADMIN_AUDIT_CATEGORY.ADMIN,
  [ADMIN_AUDIT_EVENT.DATA_EXPORT]: ADMIN_AUDIT_CATEGORY.DATA,
  [ADMIN_AUDIT_EVENT.DATA_IMPORT]: ADMIN_AUDIT_CATEGORY.DATA,
  [ADMIN_AUDIT_EVENT.DATA_BULK]: ADMIN_AUDIT_CATEGORY.DATA,
};

/**
 * Audit event labels
 */
export const ADMIN_AUDIT_EVENT_LABEL: Record<AdminAuditEvent, string> = {
  [ADMIN_AUDIT_EVENT.AUTH_LOGIN]: 'User Login',
  [ADMIN_AUDIT_EVENT.AUTH_LOGOUT]: 'User Logout',
  [ADMIN_AUDIT_EVENT.AUTH_FAILED]: 'Failed Login',
  [ADMIN_AUDIT_EVENT.AUTH_SESSION]: 'Session Event',
  [ADMIN_AUDIT_EVENT.AUTH_TOKEN]: 'Token Event',
  [ADMIN_AUDIT_EVENT.AUTHZ_GRANT]: 'Permission Granted',
  [ADMIN_AUDIT_EVENT.AUTHZ_REVOKE]: 'Permission Revoked',
  [ADMIN_AUDIT_EVENT.AUTHZ_DENY]: 'Access Denied',
  [ADMIN_AUDIT_EVENT.CREATE]: 'Record Created',
  [ADMIN_AUDIT_EVENT.READ]: 'Record Read',
  [ADMIN_AUDIT_EVENT.UPDATE]: 'Record Updated',
  [ADMIN_AUDIT_EVENT.DELETE]: 'Record Deleted',
  [ADMIN_AUDIT_EVENT.SYSTEM_START]: 'System Started',
  [ADMIN_AUDIT_EVENT.SYSTEM_STOP]: 'System Stopped',
  [ADMIN_AUDIT_EVENT.SYSTEM_RESTART]: 'System Restarted',
  [ADMIN_AUDIT_EVENT.SYSTEM_MAINTENANCE]: 'System Maintenance',
  [ADMIN_AUDIT_EVENT.SYSTEM_BACKUP]: 'System Backup',
  [ADMIN_AUDIT_EVENT.SYSTEM_RESTORE]: 'System Restore',
  [ADMIN_AUDIT_EVENT.SYSTEM_UPDATE]: 'System Update',
  [ADMIN_AUDIT_EVENT.SECURITY_MFA]: 'MFA Event',
  [ADMIN_AUDIT_EVENT.SECURITY_OTP]: 'OTP Event',
  [ADMIN_AUDIT_EVENT.SECURITY_BLOCK]: 'User Blocked',
  [ADMIN_AUDIT_EVENT.SECURITY_UNBLOCK]: 'User Unblocked',
  [ADMIN_AUDIT_EVENT.ADMIN_CREATE]: 'Admin Created',
  [ADMIN_AUDIT_EVENT.ADMIN_UPDATE]: 'Admin Updated',
  [ADMIN_AUDIT_EVENT.ADMIN_DELETE]: 'Admin Deleted',
  [ADMIN_AUDIT_EVENT.ADMIN_SUSPEND]: 'Admin Suspended',
  [ADMIN_AUDIT_EVENT.ADMIN_UNSUSPEND]: 'Admin Unsuspended',
  [ADMIN_AUDIT_EVENT.DATA_EXPORT]: 'Data Exported',
  [ADMIN_AUDIT_EVENT.DATA_IMPORT]: 'Data Imported',
  [ADMIN_AUDIT_EVENT.DATA_BULK]: 'Bulk Operation',
};

/**
 * Audit event severity
 */
export const ADMIN_AUDIT_EVENT_SEVERITY: Record<AdminAuditEvent, AdminLogLevel> = {
  [ADMIN_AUDIT_EVENT.AUTH_LOGIN]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.AUTH_LOGOUT]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.AUTH_FAILED]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.AUTH_SESSION]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.AUTH_TOKEN]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.AUTHZ_GRANT]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.AUTHZ_REVOKE]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.AUTHZ_DENY]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.CREATE]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.READ]: ADMIN_LOG_LEVEL.DEBUG,
  [ADMIN_AUDIT_EVENT.UPDATE]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.DELETE]: ADMIN_LOG_LEVEL.CRITICAL,
  [ADMIN_AUDIT_EVENT.SYSTEM_START]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.SYSTEM_STOP]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.SYSTEM_RESTART]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.SYSTEM_MAINTENANCE]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.SYSTEM_BACKUP]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.SYSTEM_RESTORE]: ADMIN_LOG_LEVEL.CRITICAL,
  [ADMIN_AUDIT_EVENT.SYSTEM_UPDATE]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.SECURITY_MFA]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.SECURITY_OTP]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.SECURITY_BLOCK]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.SECURITY_UNBLOCK]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.ADMIN_CREATE]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.ADMIN_UPDATE]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.ADMIN_DELETE]: ADMIN_LOG_LEVEL.CRITICAL,
  [ADMIN_AUDIT_EVENT.ADMIN_SUSPEND]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.ADMIN_UNSUSPEND]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.DATA_EXPORT]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_AUDIT_EVENT.DATA_IMPORT]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_AUDIT_EVENT.DATA_BULK]: ADMIN_LOG_LEVEL.WARNING,
};

/**
 * Audit event interface
 */
export interface AdminAuditEventData {
  event: AdminAuditEvent;
  eventId: string;
  timestamp: string;
  adminId: string;
  category: AdminAuditCategory;
  severity: AdminLogLevel;
  retention: AdminAuditRetention;
  details: Record<string, unknown>;
  ip: string | null;
  userAgent: string | null;
}

/**
 * Get audit event category
 */
export function getAdminAuditEventCategory(event: AdminAuditEvent): AdminAuditCategory {
  return ADMIN_AUDIT_EVENT_CATEGORY[event] || ADMIN_AUDIT_CATEGORY.SYSTEM;
}

/**
 * Get audit event label
 */
export function getAdminAuditEventLabel(event: AdminAuditEvent): string {
  return ADMIN_AUDIT_EVENT_LABEL[event] || event;
}

/**
 * Get audit event severity
 */
export function getAdminAuditEventSeverity(event: AdminAuditEvent): AdminLogLevel {
  return ADMIN_AUDIT_EVENT_SEVERITY[event] || ADMIN_LOG_LEVEL.INFO;
}

/**
 * Get retention period for audit event
 */
export function getAdminAuditRetentionPeriod(event: AdminAuditEvent): AdminAuditRetention {
  const severity = getAdminAuditEventSeverity(event);
  if (severity === ADMIN_LOG_LEVEL.CRITICAL) {
    return ADMIN_AUDIT_RETENTION.COMPLIANCE;
  }
  if (severity === ADMIN_LOG_LEVEL.WARNING || severity === ADMIN_LOG_LEVEL.ERROR) {
    return ADMIN_AUDIT_RETENTION.CRITICAL;
  }
  return ADMIN_AUDIT_RETENTION.STANDARD;
}

/**
 * Build audit event
 */
export function buildAdminAuditEvent(
  event: AdminAuditEvent,
  adminId: string,
  details: Record<string, unknown>
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
 * Generate unique audit event ID
 */
export function generateAdminAuditEventId(): string {
  return `audit_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
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
  return (
    severity === ADMIN_LOG_LEVEL.WARNING ||
    severity === ADMIN_LOG_LEVEL.ERROR ||
    severity === ADMIN_LOG_LEVEL.CRITICAL
  );
}

/**
 * Get all audit event options for dropdown
 */
export function getAdminAuditEventOptions(): Array<{
  value: AdminAuditEvent;
  label: string;
  severity: AdminLogLevel;
  category: AdminAuditCategory;
}> {
  return (Object.values(ADMIN_AUDIT_EVENT) as AdminAuditEvent[]).map((event) => ({
    value: event,
    label: getAdminAuditEventLabel(event),
    severity: getAdminAuditEventSeverity(event),
    category: getAdminAuditEventCategory(event),
  }));
}

/**
 * Get audit events by category
 */
export function getAdminAuditEventsByCategory(category: AdminAuditCategory): AdminAuditEvent[] {
  return (Object.values(ADMIN_AUDIT_EVENT) as AdminAuditEvent[]).filter(
    (event) => getAdminAuditEventCategory(event) === category
  );
}

/**
 * Get audit events by severity
 */
export function getAdminAuditEventsBySeverity(severity: AdminLogLevel): AdminAuditEvent[] {
  return (Object.values(ADMIN_AUDIT_EVENT) as AdminAuditEvent[]).filter(
    (event) => getAdminAuditEventSeverity(event) === severity
  );
}

/**
 * Get retention period label
 */
export function getAdminAuditRetentionLabel(retention: AdminAuditRetention): string {
  const labels: Record<AdminAuditRetention, string> = {
    [ADMIN_AUDIT_RETENTION.STANDARD]: 'Standard (30 days)',
    [ADMIN_AUDIT_RETENTION.IMPORTANT]: 'Important (90 days)',
    [ADMIN_AUDIT_RETENTION.CRITICAL]: 'Critical (180 days)',
    [ADMIN_AUDIT_RETENTION.COMPLIANCE]: 'Compliance (365 days)',
    [ADMIN_AUDIT_RETENTION.PERMANENT]: 'Permanent',
  };
  return labels[retention] || retention;
}

/**
 * Get retention period options for dropdown
 */
export function getAdminAuditRetentionOptions(): Array<{
  value: AdminAuditRetention;
  label: string;
}> {
  return (Object.values(ADMIN_AUDIT_RETENTION) as AdminAuditRetention[]).map((retention) => ({
    value: retention,
    label: getAdminAuditRetentionLabel(retention),
  }));
}
