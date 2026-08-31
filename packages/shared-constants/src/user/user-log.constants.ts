/**
 * User Log Constants
 * All possible user log-related constants in the system
 * Imports common values where applicable
 */

import { STATUS } from '../common/status.constants';

/**
 * User log types
 * Types of logs a user can generate
 */
export const USER_LOG_TYPE = {
  /** Authentication log */
  AUTHENTICATION: 'authentication',
  /** Access log */
  ACCESS: 'access',
  /** Activity log */
  ACTIVITY: 'activity',
  /** Error log */
  ERROR: 'error',
  /** Security log */
  SECURITY: 'security',
  /** Audit log */
  AUDIT: 'audit',
  /** System log */
  SYSTEM: 'system',
  /** Performance log */
  PERFORMANCE: 'performance',
  /** Debug log */
  DEBUG: 'debug',
  /** Transaction log */
  TRANSACTION: 'transaction',
  /** Notification log */
  NOTIFICATION: 'notification',
  /** Payment log */
  PAYMENT: 'payment',
  /** API log */
  API: 'api',
  /** Webhook log */
  WEBHOOK: 'webhook',
} as const;

/**
 * User log level
 * Severity levels of logs
 */
export const USER_LOG_LEVEL = {
  /** Debug level */
  DEBUG: 'debug',
  /** Info level */
  INFO: 'info',
  /** Warning level */
  WARNING: 'warning',
  /** Error level */
  ERROR: 'error',
  /** Critical level */
  CRITICAL: 'critical',
  /** Fatal level */
  FATAL: 'fatal',
} as const;

/**
 * User log status
 * Status of log entries
 */
export const USER_LOG_STATUS = {
  /** Log is active */
  ACTIVE: STATUS.ACTIVE,
  /** Log is archived */
  ARCHIVED: STATUS.ARCHIVED,
  /** Log is deleted */
  DELETED: STATUS.DELETED,
  /** Log is pending */
  PENDING: STATUS.PENDING,
  /** Log is processed */
  PROCESSED: STATUS.COMPLETED,
  /** Log is failed */
  FAILED: STATUS.FAILED,
} as const;

/**
 * User log category
 * Categories of logs
 */
export const USER_LOG_CATEGORY = {
  /** System logs */
  SYSTEM: 'system',
  /** User logs */
  USER: 'user',
  /** Security logs */
  SECURITY: 'security',
  /** Business logs */
  BUSINESS: 'business',
  /** Technical logs */
  TECHNICAL: 'technical',
} as const;

/**
 * User log source
 * Sources of logs
 */
export const USER_LOG_SOURCE = {
  /** Web application */
  WEB: 'web',
  /** Mobile application */
  MOBILE: 'mobile',
  /** API */
  API: 'api',
  /** Background job */
  JOB: 'job',
  /** Cron job */
  CRON: 'cron',
  /** Queue worker */
  QUEUE: 'queue',
  /** Webhook */
  WEBHOOK: 'webhook',
  /** CLI */
  CLI: 'cli',
  /** Third-party service */
  THIRD_PARTY: 'third_party',
} as const;

/**
 * User log labels
 * Human-readable labels for UI
 */
export const USER_LOG_TYPE_LABELS: Record<string, string> = {
  [USER_LOG_TYPE.AUTHENTICATION]: 'Authentication Log',
  [USER_LOG_TYPE.ACCESS]: 'Access Log',
  [USER_LOG_TYPE.ACTIVITY]: 'Activity Log',
  [USER_LOG_TYPE.ERROR]: 'Error Log',
  [USER_LOG_TYPE.SECURITY]: 'Security Log',
  [USER_LOG_TYPE.AUDIT]: 'Audit Log',
  [USER_LOG_TYPE.SYSTEM]: 'System Log',
  [USER_LOG_TYPE.PERFORMANCE]: 'Performance Log',
  [USER_LOG_TYPE.DEBUG]: 'Debug Log',
  [USER_LOG_TYPE.TRANSACTION]: 'Transaction Log',
  [USER_LOG_TYPE.NOTIFICATION]: 'Notification Log',
  [USER_LOG_TYPE.PAYMENT]: 'Payment Log',
  [USER_LOG_TYPE.API]: 'API Log',
  [USER_LOG_TYPE.WEBHOOK]: 'Webhook Log',
};

/**
 * User log level labels
 */
export const USER_LOG_LEVEL_LABELS: Record<string, string> = {
  [USER_LOG_LEVEL.DEBUG]: 'Debug',
  [USER_LOG_LEVEL.INFO]: 'Info',
  [USER_LOG_LEVEL.WARNING]: 'Warning',
  [USER_LOG_LEVEL.ERROR]: 'Error',
  [USER_LOG_LEVEL.CRITICAL]: 'Critical',
  [USER_LOG_LEVEL.FATAL]: 'Fatal',
};

/**
 * User log status labels
 */
export const USER_LOG_STATUS_LABELS: Record<string, string> = {
  [USER_LOG_STATUS.ACTIVE]: 'Active',
  [USER_LOG_STATUS.ARCHIVED]: 'Archived',
  [USER_LOG_STATUS.DELETED]: 'Deleted',
  [USER_LOG_STATUS.PENDING]: 'Pending',
  [USER_LOG_STATUS.PROCESSED]: 'Processed',
  [USER_LOG_STATUS.FAILED]: 'Failed',
};

/**
 * User log category labels
 */
export const USER_LOG_CATEGORY_LABELS: Record<string, string> = {
  [USER_LOG_CATEGORY.SYSTEM]: 'System Logs',
  [USER_LOG_CATEGORY.USER]: 'User Logs',
  [USER_LOG_CATEGORY.SECURITY]: 'Security Logs',
  [USER_LOG_CATEGORY.BUSINESS]: 'Business Logs',
  [USER_LOG_CATEGORY.TECHNICAL]: 'Technical Logs',
};

/**
 * User log source labels
 */
export const USER_LOG_SOURCE_LABELS: Record<string, string> = {
  [USER_LOG_SOURCE.WEB]: 'Web Application',
  [USER_LOG_SOURCE.MOBILE]: 'Mobile Application',
  [USER_LOG_SOURCE.API]: 'API',
  [USER_LOG_SOURCE.JOB]: 'Background Job',
  [USER_LOG_SOURCE.CRON]: 'Cron Job',
  [USER_LOG_SOURCE.QUEUE]: 'Queue Worker',
  [USER_LOG_SOURCE.WEBHOOK]: 'Webhook',
  [USER_LOG_SOURCE.CLI]: 'CLI',
  [USER_LOG_SOURCE.THIRD_PARTY]: 'Third-Party Service',
};

/**
 * Check if user log type is valid
 */
export function isValidUserLogType(type: string): boolean {
  return Object.values(USER_LOG_TYPE).includes(
    type as (typeof USER_LOG_TYPE)[keyof typeof USER_LOG_TYPE]
  );
}

/**
 * Check if user log level is valid
 */
export function isValidUserLogLevel(level: string): boolean {
  return Object.values(USER_LOG_LEVEL).includes(
    level as (typeof USER_LOG_LEVEL)[keyof typeof USER_LOG_LEVEL]
  );
}

/**
 * Check if user log status is valid
 */
export function isValidUserLogStatus(status: string): boolean {
  return Object.values(USER_LOG_STATUS).includes(
    status as (typeof USER_LOG_STATUS)[keyof typeof USER_LOG_STATUS]
  );
}

/**
 * Check if user log category is valid
 */
export function isValidUserLogCategory(category: string): boolean {
  return Object.values(USER_LOG_CATEGORY).includes(
    category as (typeof USER_LOG_CATEGORY)[keyof typeof USER_LOG_CATEGORY]
  );
}

/**
 * Check if user log source is valid
 */
export function isValidUserLogSource(source: string): boolean {
  return Object.values(USER_LOG_SOURCE).includes(
    source as (typeof USER_LOG_SOURCE)[keyof typeof USER_LOG_SOURCE]
  );
}

/**
 * Get user log type label
 */
export function getUserLogTypeLabel(type: string): string {
  return USER_LOG_TYPE_LABELS[type] || type;
}

/**
 * Get user log level label
 */
export function getUserLogLevelLabel(level: string): string {
  return USER_LOG_LEVEL_LABELS[level] || level;
}

/**
 * Get user log status label
 */
export function getUserLogStatusLabel(status: string): string {
  return USER_LOG_STATUS_LABELS[status] || status;
}

/**
 * Get user log category label
 */
export function getUserLogCategoryLabel(category: string): string {
  return USER_LOG_CATEGORY_LABELS[category] || category;
}

/**
 * Get user log source label
 */
export function getUserLogSourceLabel(source: string): string {
  return USER_LOG_SOURCE_LABELS[source] || source;
}

/**
 * Get log category from log type
 */
export const USER_LOG_TYPE_CATEGORY_MAP: Record<string, string> = {
  [USER_LOG_TYPE.AUTHENTICATION]: USER_LOG_CATEGORY.SECURITY,
  [USER_LOG_TYPE.ACCESS]: USER_LOG_CATEGORY.SYSTEM,
  [USER_LOG_TYPE.ACTIVITY]: USER_LOG_CATEGORY.USER,
  [USER_LOG_TYPE.ERROR]: USER_LOG_CATEGORY.TECHNICAL,
  [USER_LOG_TYPE.SECURITY]: USER_LOG_CATEGORY.SECURITY,
  [USER_LOG_TYPE.AUDIT]: USER_LOG_CATEGORY.SECURITY,
  [USER_LOG_TYPE.SYSTEM]: USER_LOG_CATEGORY.SYSTEM,
  [USER_LOG_TYPE.PERFORMANCE]: USER_LOG_CATEGORY.TECHNICAL,
  [USER_LOG_TYPE.DEBUG]: USER_LOG_CATEGORY.TECHNICAL,
  [USER_LOG_TYPE.TRANSACTION]: USER_LOG_CATEGORY.BUSINESS,
  [USER_LOG_TYPE.NOTIFICATION]: USER_LOG_CATEGORY.USER,
  [USER_LOG_TYPE.PAYMENT]: USER_LOG_CATEGORY.BUSINESS,
  [USER_LOG_TYPE.API]: USER_LOG_CATEGORY.TECHNICAL,
  [USER_LOG_TYPE.WEBHOOK]: USER_LOG_CATEGORY.TECHNICAL,
};

/**
 * Get user log category from type
 */
export function getUserLogCategoryFromType(type: string): string {
  return USER_LOG_TYPE_CATEGORY_MAP[type] || USER_LOG_CATEGORY.SYSTEM;
}

/**
 * Get user log level severity score
 */
export const USER_LOG_LEVEL_SCORE: Record<string, number> = {
  [USER_LOG_LEVEL.DEBUG]: 10,
  [USER_LOG_LEVEL.INFO]: 20,
  [USER_LOG_LEVEL.WARNING]: 30,
  [USER_LOG_LEVEL.ERROR]: 40,
  [USER_LOG_LEVEL.CRITICAL]: 50,
  [USER_LOG_LEVEL.FATAL]: 60,
};

/**
 * Get user log level severity score
 */
export function getUserLogLevelScore(level: string): number {
  return USER_LOG_LEVEL_SCORE[level] || 0;
}

/**
 * Check if user log level is severe
 */
export function isUserLogLevelSevere(level: string): boolean {
  const severeLevels: string[] = [
    USER_LOG_LEVEL.ERROR,
    USER_LOG_LEVEL.CRITICAL,
    USER_LOG_LEVEL.FATAL,
  ];
  return severeLevels.includes(level);
}

/**
 * Check if user log level is warning or above
 */
export function isUserLogLevelWarningOrAbove(level: string): boolean {
  const warningAndAbove: string[] = [
    USER_LOG_LEVEL.WARNING,
    USER_LOG_LEVEL.ERROR,
    USER_LOG_LEVEL.CRITICAL,
    USER_LOG_LEVEL.FATAL,
  ];
  return warningAndAbove.includes(level);
}

/**
 * Get all user log types
 */
export function getAllUserLogTypes(): string[] {
  return Object.values(USER_LOG_TYPE);
}

/**
 * Get all user log levels
 */
export function getAllUserLogLevels(): string[] {
  return Object.values(USER_LOG_LEVEL);
}

/**
 * Get all user log statuses
 */
export function getAllUserLogStatuses(): string[] {
  return Object.values(USER_LOG_STATUS);
}

/**
 * Get all user log categories
 */
export function getAllUserLogCategories(): string[] {
  return Object.values(USER_LOG_CATEGORY);
}

/**
 * Get all user log sources
 */
export function getAllUserLogSources(): string[] {
  return Object.values(USER_LOG_SOURCE);
}

/**
 * Get user security log types
 */
export function getUserSecurityLogTypes(): string[] {
  return [USER_LOG_TYPE.AUTHENTICATION, USER_LOG_TYPE.SECURITY, USER_LOG_TYPE.AUDIT];
}

/**
 * Get user system log types
 */
export function getUserSystemLogTypes(): string[] {
  return [USER_LOG_TYPE.ACCESS, USER_LOG_TYPE.SYSTEM, USER_LOG_TYPE.PERFORMANCE];
}

/**
 * Get user business log types
 */
export function getUserBusinessLogTypes(): string[] {
  return [USER_LOG_TYPE.TRANSACTION, USER_LOG_TYPE.PAYMENT];
}

/**
 * Get user technical log types
 */
export function getUserTechnicalLogTypes(): string[] {
  return [USER_LOG_TYPE.ERROR, USER_LOG_TYPE.DEBUG, USER_LOG_TYPE.API, USER_LOG_TYPE.WEBHOOK];
}

/**
 * User log retention periods
 */
export const USER_LOG_RETENTION = {
  /** Retain for 7 days */
  SEVEN_DAYS: 7,
  /** Retain for 30 days */
  THIRTY_DAYS: 30,
  /** Retain for 90 days */
  NINETY_DAYS: 90,
  /** Retain for 180 days */
  ONE_EIGHTY_DAYS: 180,
  /** Retain for 365 days */
  ONE_YEAR: 365,
  /** Retain forever */
  FOREVER: -1,
} as const;

/**
 * User log retention labels
 */
export const USER_LOG_RETENTION_LABELS: Record<number, string> = {
  [USER_LOG_RETENTION.SEVEN_DAYS]: '7 Days',
  [USER_LOG_RETENTION.THIRTY_DAYS]: '30 Days',
  [USER_LOG_RETENTION.NINETY_DAYS]: '90 Days',
  [USER_LOG_RETENTION.ONE_EIGHTY_DAYS]: '180 Days',
  [USER_LOG_RETENTION.ONE_YEAR]: '1 Year',
  [USER_LOG_RETENTION.FOREVER]: 'Forever',
};

/**
 * Check if user log retention is valid
 */
export function isValidUserLogRetention(days: number): boolean {
  return Object.values(USER_LOG_RETENTION).includes(
    days as (typeof USER_LOG_RETENTION)[keyof typeof USER_LOG_RETENTION]
  );
}

/**
 * Get user log retention label
 */
export function getUserLogRetentionLabel(days: number): string {
  return USER_LOG_RETENTION_LABELS[days] || `${days} Days`;
}

/**
 * Get default log retention for log type
 */
export const USER_LOG_TYPE_RETENTION_MAP: Record<string, number> = {
  [USER_LOG_TYPE.AUTHENTICATION]: USER_LOG_RETENTION.NINETY_DAYS,
  [USER_LOG_TYPE.ACCESS]: USER_LOG_RETENTION.THIRTY_DAYS,
  [USER_LOG_TYPE.ACTIVITY]: USER_LOG_RETENTION.NINETY_DAYS,
  [USER_LOG_TYPE.ERROR]: USER_LOG_RETENTION.ONE_EIGHTY_DAYS,
  [USER_LOG_TYPE.SECURITY]: USER_LOG_RETENTION.ONE_YEAR,
  [USER_LOG_TYPE.AUDIT]: USER_LOG_RETENTION.ONE_YEAR,
  [USER_LOG_TYPE.SYSTEM]: USER_LOG_RETENTION.THIRTY_DAYS,
  [USER_LOG_TYPE.PERFORMANCE]: USER_LOG_RETENTION.THIRTY_DAYS,
  [USER_LOG_TYPE.DEBUG]: USER_LOG_RETENTION.SEVEN_DAYS,
  [USER_LOG_TYPE.TRANSACTION]: USER_LOG_RETENTION.ONE_EIGHTY_DAYS,
  [USER_LOG_TYPE.NOTIFICATION]: USER_LOG_RETENTION.THIRTY_DAYS,
  [USER_LOG_TYPE.PAYMENT]: USER_LOG_RETENTION.ONE_YEAR,
  [USER_LOG_TYPE.API]: USER_LOG_RETENTION.NINETY_DAYS,
  [USER_LOG_TYPE.WEBHOOK]: USER_LOG_RETENTION.NINETY_DAYS,
};

/**
 * Get user default retention for log type
 */
export function getUserLogRetentionFromType(type: string): number {
  return USER_LOG_TYPE_RETENTION_MAP[type] || USER_LOG_RETENTION.THIRTY_DAYS;
}
