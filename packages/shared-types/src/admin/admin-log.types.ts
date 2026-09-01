/**
 * Admin Log Types
 * Logging definitions for admin operations
 */

import { BaseEntity, ID, Timestamp, Nullable, JsonObject } from '../common/core-primitives.types';
import type { AdminActivityType } from './admin-activity.types';

/**
 * Admin log level type
 * Based on ADMIN_LOG_LEVEL from constants
 */
export type AdminLogLevel =
  'debug' | 'info' | 'notice' | 'warning' | 'error' | 'critical' | 'alert' | 'emergency';

/**
 * Admin log category type
 * Based on ADMIN_LOG_CATEGORY from constants
 */
export type AdminLogCategory =
  | 'auth'
  | 'access'
  | 'security'
  | 'system'
  | 'application'
  | 'business'
  | 'performance'
  | 'audit'
  | 'transaction'
  | 'error'
  | 'debug'
  | 'info';

/**
 * Admin log source type
 * Based on ADMIN_LOG_SOURCE from constants
 */
export type AdminLogSource =
  | 'frontend'
  | 'backend'
  | 'api'
  | 'service'
  | 'worker'
  | 'scheduler'
  | 'webhook'
  | 'queue'
  | 'database'
  | 'cache'
  | 'file';

/**
 * Admin log format type
 * Based on ADMIN_LOG_FORMAT from constants
 */
export type AdminLogFormat = 'json' | 'text' | 'csv' | 'xml' | 'yaml';

/**
 * Admin log entry interface
 * Represents a single log entry
 */
export interface AdminLogEntry extends BaseEntity {
  /** Log entry ID */
  id: ID;
  /** Admin ID who performed the activity */
  adminId: ID;
  /** Activity type */
  activity: AdminActivityType;
  /** Log level */
  level: AdminLogLevel;
  /** Log category */
  category: AdminLogCategory;
  /** Log source */
  source: AdminLogSource;
  /** Log format */
  format: AdminLogFormat;
  /** Log message */
  message: string;
  /** Additional details */
  details?: Nullable<JsonObject>;
  /** IP address of the request */
  ipAddress?: Nullable<string>;
  /** User agent of the request */
  userAgent?: Nullable<string>;
  /** Request ID for tracing */
  requestId?: Nullable<string>;
  /** Session ID */
  sessionId?: Nullable<string>;
  /** Correlation ID for tracing */
  correlationId?: Nullable<string>;
  /** Duration of operation in milliseconds */
  duration?: Nullable<number>;
  /** Memory usage in MB */
  memoryUsage?: Nullable<number>;
  /** CPU usage percentage */
  cpuUsage?: Nullable<number>;
  /** Error stack trace (if error) */
  stackTrace?: Nullable<string>;
  /** Whether log is archived */
  isArchived: boolean;
  /** Archived timestamp */
  archivedAt?: Nullable<Timestamp>;
}

/**
 * Admin log filter parameters
 */
export interface AdminLogFilterParams {
  /** Filter by admin ID */
  adminId?: ID;
  /** Filter by activity type */
  activity?: AdminActivityType | AdminActivityType[];
  /** Filter by log level */
  level?: AdminLogLevel | AdminLogLevel[];
  /** Filter by category */
  category?: AdminLogCategory | AdminLogCategory[];
  /** Filter by source */
  source?: AdminLogSource | AdminLogSource[];
  /** Filter by archived status */
  isArchived?: boolean;
  /** Date range filter */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Search term (message, details) */
  search?: string;
  /** Minimum duration filter */
  minDuration?: number;
  /** Maximum duration filter */
  maxDuration?: number;
}

/**
 * Admin log statistics
 */
export interface AdminLogStatistics {
  /** Total number of logs */
  totalLogs: number;
  /** Count by level */
  levelCounts: Record<AdminLogLevel, number>;
  /** Count by category */
  categoryCounts: Record<AdminLogCategory, number>;
  /** Count by source */
  sourceCounts: Record<AdminLogSource, number>;
  /** Count by archived status */
  archivedCount: number;
  /** Count by error level (error, critical, alert, emergency) */
  errorCount: number;
  /** Average duration of operations */
  averageDuration: number;
  /** Period covered */
  period: {
    start: Date;
    end: Date;
  };
}

/**
 * Get log level priority
 */
export function getAdminLogLevelPriority(level: AdminLogLevel): number {
  const priority: Record<AdminLogLevel, number> = {
    debug: 0,
    info: 1,
    notice: 2,
    warning: 3,
    error: 4,
    critical: 5,
    alert: 6,
    emergency: 7,
  };
  return priority[level] || 0;
}

/**
 * Get log level label
 */
export function getAdminLogLevelLabel(level: AdminLogLevel): string {
  const labels: Record<AdminLogLevel, string> = {
    debug: 'Debug',
    info: 'Info',
    notice: 'Notice',
    warning: 'Warning',
    error: 'Error',
    critical: 'Critical',
    alert: 'Alert',
    emergency: 'Emergency',
  };
  return labels[level] || level;
}

/**
 * Get log level color
 */
export function getAdminLogLevelColor(level: AdminLogLevel): string {
  const colors: Record<AdminLogLevel, string> = {
    debug: '#6C757D',
    info: '#17A2B8',
    notice: '#007BFF',
    warning: '#FFC107',
    error: '#DC3545',
    critical: '#FD7E14',
    alert: '#FF6B6B',
    emergency: '#FF0000',
  };
  return colors[level] || '#6C757D';
}

/**
 * Get log category label
 */
export function getAdminLogCategoryLabel(category: AdminLogCategory): string {
  const labels: Record<AdminLogCategory, string> = {
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
  return labels[category] || category;
}

/**
 * Get log source label
 */
export function getAdminLogSourceLabel(source: AdminLogSource): string {
  const labels: Record<AdminLogSource, string> = {
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
  return labels[source] || source;
}

/**
 * Check if log level is high priority
 */
export function isAdminHighPriorityLog(level: AdminLogLevel): boolean {
  const highPriority: AdminLogLevel[] = ['error', 'critical', 'alert', 'emergency'];
  return highPriority.includes(level);
}

/**
 * Check if log level is valid
 */
export function isValidAdminLogLevel(level: string): level is AdminLogLevel {
  const validLevels: AdminLogLevel[] = [
    'debug',
    'info',
    'notice',
    'warning',
    'error',
    'critical',
    'alert',
    'emergency',
  ];
  return validLevels.includes(level as AdminLogLevel);
}

/**
 * Check if log category is valid
 */
export function isValidAdminLogCategory(category: string): category is AdminLogCategory {
  const validCategories: AdminLogCategory[] = [
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
  ];
  return validCategories.includes(category as AdminLogCategory);
}

/**
 * Create log entry from activity
 */
export function createAdminLogEntry(
  adminId: ID,
  activity: AdminActivityType,
  message: string,
  details?: JsonObject
): Omit<AdminLogEntry, keyof BaseEntity> {
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
 * Get log level from activity
 * (Internal helper mapping)
 */
function getAdminLogLevelFromActivity(activity: AdminActivityType): AdminLogLevel {
  const levelMap: Partial<Record<AdminActivityType, AdminLogLevel>> = {
    login: 'info',
    logout: 'info',
    login_failed: 'warning',
    session_start: 'info',
    session_end: 'info',
    session_expired: 'warning',
    token_refresh: 'info',
    token_revoke: 'warning',
    profile_update: 'info',
    password_change: 'info',
    password_reset: 'info',
    email_change: 'warning',
    admin_create: 'warning',
    admin_update: 'warning',
    admin_delete: 'critical',
    admin_suspend: 'warning',
    admin_role_change: 'critical',
    user_create: 'info',
    user_update: 'info',
    user_delete: 'critical',
    user_suspend: 'warning',
    system_maintenance: 'warning',
    system_backup: 'info',
    system_restore: 'critical',
    mfa_enable: 'info',
    mfa_disable: 'warning',
    otp_failed: 'warning',
    log_clear: 'warning',
    audit_view: 'info',
    report_view: 'info',
    report_generate: 'info',
    product_approve: 'info',
    product_reject: 'warning',
    vendor_verify: 'info',
    vendor_suspend: 'warning',
    order_ship: 'info',
    payment_refund: 'warning',
  };
  return levelMap[activity] || 'info';
}

/**
 * Get log category from activity
 * (Internal helper mapping)
 */
function getAdminLogCategoryFromActivity(activity: AdminActivityType): AdminLogCategory {
  const categoryMap: Partial<Record<AdminActivityType, AdminLogCategory>> = {
    login: 'auth',
    logout: 'auth',
    login_failed: 'auth',
    session_start: 'auth',
    session_end: 'auth',
    session_expired: 'auth',
    token_refresh: 'auth',
    token_revoke: 'security',
    profile_update: 'application',
    password_change: 'security',
    password_reset: 'security',
    email_change: 'security',
    admin_create: 'application',
    admin_update: 'application',
    admin_delete: 'application',
    admin_suspend: 'application',
    admin_role_change: 'application',
    user_create: 'application',
    user_update: 'application',
    user_delete: 'application',
    user_suspend: 'application',
    system_maintenance: 'system',
    system_backup: 'system',
    system_restore: 'system',
    mfa_enable: 'security',
    mfa_disable: 'security',
    otp_failed: 'security',
    log_clear: 'system',
    audit_view: 'audit',
    report_view: 'application',
    report_generate: 'application',
    product_approve: 'application',
    product_reject: 'application',
    vendor_verify: 'application',
    vendor_suspend: 'application',
    order_ship: 'application',
    payment_refund: 'application',
  };
  return categoryMap[activity] || 'info';
}

/**
 * Create log statistics from array
 */
export function createAdminLogStatistics(
  logs: AdminLogEntry[],
  period: { start: Date; end: Date }
): AdminLogStatistics {
  const stats: AdminLogStatistics = {
    totalLogs: logs.length,
    levelCounts: {
      debug: 0,
      info: 0,
      notice: 0,
      warning: 0,
      error: 0,
      critical: 0,
      alert: 0,
      emergency: 0,
    },
    categoryCounts: {
      auth: 0,
      access: 0,
      security: 0,
      system: 0,
      application: 0,
      business: 0,
      performance: 0,
      audit: 0,
      transaction: 0,
      error: 0,
      debug: 0,
      info: 0,
    },
    sourceCounts: {
      frontend: 0,
      backend: 0,
      api: 0,
      service: 0,
      worker: 0,
      scheduler: 0,
      webhook: 0,
      queue: 0,
      database: 0,
      cache: 0,
      file: 0,
    },
    archivedCount: 0,
    errorCount: 0,
    averageDuration: 0,
    period,
  };

  let totalDuration = 0;
  let durationCount = 0;

  logs.forEach((log) => {
    stats.levelCounts[log.level] = (stats.levelCounts[log.level] || 0) + 1;
    stats.categoryCounts[log.category] = (stats.categoryCounts[log.category] || 0) + 1;
    stats.sourceCounts[log.source] = (stats.sourceCounts[log.source] || 0) + 1;

    if (log.isArchived) stats.archivedCount++;
    if (isAdminHighPriorityLog(log.level)) stats.errorCount++;

    if (log.duration !== null && log.duration !== undefined) {
      totalDuration += log.duration;
      durationCount++;
    }
  });

  stats.averageDuration = durationCount > 0 ? totalDuration / durationCount : 0;

  return stats;
}
