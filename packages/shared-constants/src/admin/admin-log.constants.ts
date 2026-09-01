/**
 * Admin Log Constants
 * Logging definitions for admin operations
 */

import { ADMIN_ACTIVITY } from './admin-activity.constants';

/**
 * Admin log levels
 */
export const ADMIN_LOG_LEVEL = {
  DEBUG: 'debug',
  INFO: 'info',
  NOTICE: 'notice',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical',
  ALERT: 'alert',
  EMERGENCY: 'emergency',
} as const;

export type AdminLogLevel = (typeof ADMIN_LOG_LEVEL)[keyof typeof ADMIN_LOG_LEVEL];

/**
 * Admin log categories
 */
export const ADMIN_LOG_CATEGORY = {
  AUTH: 'auth',
  ACCESS: 'access',
  SECURITY: 'security',
  SYSTEM: 'system',
  APPLICATION: 'application',
  BUSINESS: 'business',
  PERFORMANCE: 'performance',
  AUDIT: 'audit',
  TRANSACTION: 'transaction',
  ERROR: 'error',
  DEBUG: 'debug',
  INFO: 'info',
} as const;

export type AdminLogCategory = (typeof ADMIN_LOG_CATEGORY)[keyof typeof ADMIN_LOG_CATEGORY];

/**
 * Log source types
 */
export const ADMIN_LOG_SOURCE = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  API: 'api',
  SERVICE: 'service',
  WORKER: 'worker',
  SCHEDULER: 'scheduler',
  WEBHOOK: 'webhook',
  QUEUE: 'queue',
  DATABASE: 'database',
  CACHE: 'cache',
  FILE: 'file',
} as const;

export type AdminLogSource = (typeof ADMIN_LOG_SOURCE)[keyof typeof ADMIN_LOG_SOURCE];

/**
 * Log format types
 */
export const ADMIN_LOG_FORMAT = {
  JSON: 'json',
  TEXT: 'text',
  CSV: 'csv',
  XML: 'xml',
  YAML: 'yaml',
} as const;

export type AdminLogFormat = (typeof ADMIN_LOG_FORMAT)[keyof typeof ADMIN_LOG_FORMAT];

/**
 * Admin log level mapping from activity
 * Uses const assertion to ensure type safety
 */
export const ADMIN_ACTIVITY_LOG_LEVEL = {
  [ADMIN_ACTIVITY.LOGIN]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.LOGOUT]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.LOGIN_FAILED]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.SESSION_START]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.SESSION_END]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.SESSION_EXPIRED]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.TOKEN_REFRESH]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.TOKEN_REVOKE]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.PROFILE_UPDATE]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.PASSWORD_CHANGE]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.PASSWORD_RESET]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.EMAIL_CHANGE]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.ADMIN_CREATE]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.ADMIN_UPDATE]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.ADMIN_DELETE]: ADMIN_LOG_LEVEL.CRITICAL,
  [ADMIN_ACTIVITY.ADMIN_SUSPEND]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.ADMIN_ROLE_CHANGE]: ADMIN_LOG_LEVEL.CRITICAL,
  [ADMIN_ACTIVITY.USER_CREATE]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.USER_UPDATE]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.USER_DELETE]: ADMIN_LOG_LEVEL.CRITICAL,
  [ADMIN_ACTIVITY.USER_SUSPEND]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.SYSTEM_MAINTENANCE]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.SYSTEM_BACKUP]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.SYSTEM_RESTORE]: ADMIN_LOG_LEVEL.CRITICAL,
  [ADMIN_ACTIVITY.MFA_ENABLE]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.MFA_DISABLE]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.OTP_FAILED]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.LOG_CLEAR]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.AUDIT_VIEW]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.REPORT_VIEW]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.REPORT_GENERATE]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.PRODUCT_APPROVE]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.PRODUCT_REJECT]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.VENDOR_VERIFY]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.VENDOR_SUSPEND]: ADMIN_LOG_LEVEL.WARNING,
  [ADMIN_ACTIVITY.ORDER_SHIP]: ADMIN_LOG_LEVEL.INFO,
  [ADMIN_ACTIVITY.PAYMENT_REFUND]: ADMIN_LOG_LEVEL.WARNING,
} as const satisfies Record<string, AdminLogLevel>;

/**
 * Log entry interface
 */
export interface LogEntry {
  timestamp: string;
  activity: string;
  adminId: string;
  level: AdminLogLevel;
  category: AdminLogCategory;
  source?: AdminLogSource;
  message?: string;
  details?: Record<string, unknown>;
  ip?: string | null;
  userAgent?: string | null;
}

/**
 * Get log level from activity
 */
export function getLogLevelFromActivity(activity: string): AdminLogLevel {
  return (
    ADMIN_ACTIVITY_LOG_LEVEL[activity as keyof typeof ADMIN_ACTIVITY_LOG_LEVEL] ||
    ADMIN_LOG_LEVEL.INFO
  );
}

/**
 * Activity to category mapping
 */
const ACTIVITY_CATEGORY_MAP = {
  [ADMIN_ACTIVITY.LOGIN]: ADMIN_LOG_CATEGORY.AUTH,
  [ADMIN_ACTIVITY.LOGOUT]: ADMIN_LOG_CATEGORY.AUTH,
  [ADMIN_ACTIVITY.LOGIN_FAILED]: ADMIN_LOG_CATEGORY.AUTH,
  [ADMIN_ACTIVITY.SESSION_START]: ADMIN_LOG_CATEGORY.AUTH,
  [ADMIN_ACTIVITY.SESSION_END]: ADMIN_LOG_CATEGORY.AUTH,
  [ADMIN_ACTIVITY.SESSION_EXPIRED]: ADMIN_LOG_CATEGORY.AUTH,
  [ADMIN_ACTIVITY.TOKEN_REFRESH]: ADMIN_LOG_CATEGORY.AUTH,
  [ADMIN_ACTIVITY.TOKEN_REVOKE]: ADMIN_LOG_CATEGORY.SECURITY,
  [ADMIN_ACTIVITY.PROFILE_UPDATE]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.PASSWORD_CHANGE]: ADMIN_LOG_CATEGORY.SECURITY,
  [ADMIN_ACTIVITY.PASSWORD_RESET]: ADMIN_LOG_CATEGORY.SECURITY,
  [ADMIN_ACTIVITY.EMAIL_CHANGE]: ADMIN_LOG_CATEGORY.SECURITY,
  [ADMIN_ACTIVITY.ADMIN_CREATE]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.ADMIN_UPDATE]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.ADMIN_DELETE]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.ADMIN_SUSPEND]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.ADMIN_ROLE_CHANGE]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.USER_CREATE]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.USER_UPDATE]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.USER_DELETE]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.USER_SUSPEND]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.SYSTEM_MAINTENANCE]: ADMIN_LOG_CATEGORY.SYSTEM,
  [ADMIN_ACTIVITY.SYSTEM_BACKUP]: ADMIN_LOG_CATEGORY.SYSTEM,
  [ADMIN_ACTIVITY.SYSTEM_RESTORE]: ADMIN_LOG_CATEGORY.SYSTEM,
  [ADMIN_ACTIVITY.MFA_ENABLE]: ADMIN_LOG_CATEGORY.SECURITY,
  [ADMIN_ACTIVITY.MFA_DISABLE]: ADMIN_LOG_CATEGORY.SECURITY,
  [ADMIN_ACTIVITY.OTP_FAILED]: ADMIN_LOG_CATEGORY.SECURITY,
  [ADMIN_ACTIVITY.LOG_CLEAR]: ADMIN_LOG_CATEGORY.SYSTEM,
  [ADMIN_ACTIVITY.AUDIT_VIEW]: ADMIN_LOG_CATEGORY.AUDIT,
  [ADMIN_ACTIVITY.REPORT_VIEW]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.REPORT_GENERATE]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.PRODUCT_APPROVE]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.PRODUCT_REJECT]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.VENDOR_VERIFY]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.VENDOR_SUSPEND]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.ORDER_SHIP]: ADMIN_LOG_CATEGORY.APPLICATION,
  [ADMIN_ACTIVITY.PAYMENT_REFUND]: ADMIN_LOG_CATEGORY.APPLICATION,
} as const satisfies Record<string, AdminLogCategory>;

/**
 * Get log category from activity
 */
export function getLogCategoryFromActivity(activity: string): AdminLogCategory {
  return (
    ACTIVITY_CATEGORY_MAP[activity as keyof typeof ACTIVITY_CATEGORY_MAP] || ADMIN_LOG_CATEGORY.INFO
  );
}

/**
 * Build log message
 */
export function buildLogMessage(
  activity: string,
  adminId: string,
  details: Record<string, unknown>
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    activity,
    adminId,
    level: getLogLevelFromActivity(activity),
    category: getLogCategoryFromActivity(activity),
    details,
    ip: (details.ip as string) || null,
    userAgent: (details.userAgent as string) || null,
  };
}

/**
 * Get log level priority
 */
export function getLogLevelPriority(level: AdminLogLevel): number {
  const priority: Record<AdminLogLevel, number> = {
    [ADMIN_LOG_LEVEL.DEBUG]: 0,
    [ADMIN_LOG_LEVEL.INFO]: 1,
    [ADMIN_LOG_LEVEL.NOTICE]: 2,
    [ADMIN_LOG_LEVEL.WARNING]: 3,
    [ADMIN_LOG_LEVEL.ERROR]: 4,
    [ADMIN_LOG_LEVEL.CRITICAL]: 5,
    [ADMIN_LOG_LEVEL.ALERT]: 6,
    [ADMIN_LOG_LEVEL.EMERGENCY]: 7,
  };
  return priority[level] || 0;
}

/**
 * Check if log level is high priority
 */
export function isHighPriorityLog(level: AdminLogLevel): boolean {
  const highPriority: AdminLogLevel[] = [
    ADMIN_LOG_LEVEL.ERROR,
    ADMIN_LOG_LEVEL.CRITICAL,
    ADMIN_LOG_LEVEL.ALERT,
    ADMIN_LOG_LEVEL.EMERGENCY,
  ];
  return highPriority.includes(level);
}

/**
 * Get log level label
 */
export function getLogLevelLabel(level: AdminLogLevel): string {
  const labels: Record<AdminLogLevel, string> = {
    [ADMIN_LOG_LEVEL.DEBUG]: 'Debug',
    [ADMIN_LOG_LEVEL.INFO]: 'Info',
    [ADMIN_LOG_LEVEL.NOTICE]: 'Notice',
    [ADMIN_LOG_LEVEL.WARNING]: 'Warning',
    [ADMIN_LOG_LEVEL.ERROR]: 'Error',
    [ADMIN_LOG_LEVEL.CRITICAL]: 'Critical',
    [ADMIN_LOG_LEVEL.ALERT]: 'Alert',
    [ADMIN_LOG_LEVEL.EMERGENCY]: 'Emergency',
  };
  return labels[level] || level;
}

/**
 * Get log level color
 */
export function getLogLevelColor(level: AdminLogLevel): string {
  const colors: Record<AdminLogLevel, string> = {
    [ADMIN_LOG_LEVEL.DEBUG]: '#6C757D',
    [ADMIN_LOG_LEVEL.INFO]: '#17A2B8',
    [ADMIN_LOG_LEVEL.NOTICE]: '#007BFF',
    [ADMIN_LOG_LEVEL.WARNING]: '#FFC107',
    [ADMIN_LOG_LEVEL.ERROR]: '#DC3545',
    [ADMIN_LOG_LEVEL.CRITICAL]: '#FD7E14',
    [ADMIN_LOG_LEVEL.ALERT]: '#FF6B6B',
    [ADMIN_LOG_LEVEL.EMERGENCY]: '#FF0000',
  };
  return colors[level] || '#6C757D';
}

/**
 * Get log category label
 */
export function getLogCategoryLabel(category: AdminLogCategory): string {
  const labels: Record<AdminLogCategory, string> = {
    [ADMIN_LOG_CATEGORY.AUTH]: 'Authentication',
    [ADMIN_LOG_CATEGORY.ACCESS]: 'Access Control',
    [ADMIN_LOG_CATEGORY.SECURITY]: 'Security',
    [ADMIN_LOG_CATEGORY.SYSTEM]: 'System',
    [ADMIN_LOG_CATEGORY.APPLICATION]: 'Application',
    [ADMIN_LOG_CATEGORY.BUSINESS]: 'Business',
    [ADMIN_LOG_CATEGORY.PERFORMANCE]: 'Performance',
    [ADMIN_LOG_CATEGORY.AUDIT]: 'Audit',
    [ADMIN_LOG_CATEGORY.TRANSACTION]: 'Transaction',
    [ADMIN_LOG_CATEGORY.ERROR]: 'Error',
    [ADMIN_LOG_CATEGORY.DEBUG]: 'Debug',
    [ADMIN_LOG_CATEGORY.INFO]: 'Info',
  };
  return labels[category] || category;
}

/**
 * Check if log level is valid
 */
export function isValidLogLevel(level: string): level is AdminLogLevel {
  return (Object.values(ADMIN_LOG_LEVEL) as string[]).includes(level);
}

/**
 * Check if log category is valid
 */
export function isValidLogCategory(category: string): category is AdminLogCategory {
  return (Object.values(ADMIN_LOG_CATEGORY) as string[]).includes(category);
}

/**
 * Get log level options for dropdown
 */
export function getLogLevelOptions(): Array<{
  value: AdminLogLevel;
  label: string;
}> {
  return (Object.values(ADMIN_LOG_LEVEL) as AdminLogLevel[]).map((level) => ({
    value: level,
    label: getLogLevelLabel(level),
  }));
}

/**
 * Get log category options for dropdown
 */
export function getLogCategoryOptions(): Array<{
  value: AdminLogCategory;
  label: string;
}> {
  return (Object.values(ADMIN_LOG_CATEGORY) as AdminLogCategory[]).map((category) => ({
    value: category,
    label: getLogCategoryLabel(category),
  }));
}
