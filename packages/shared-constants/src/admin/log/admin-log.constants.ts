/**
 * Admin Log Constants
 * Admin logging and audit trail definitions
 */

export const ADMIN_LOG = {
  // Log levels
  LEVEL: {
    DEBUG: 'debug',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
  },

  // Log categories
  CATEGORY: {
    SYSTEM: 'system',
    SECURITY: 'security',
    AUDIT: 'audit',
    PERFORMANCE: 'performance',
    ACCESS: 'access',
    BUSINESS: 'business',
    OPERATIONAL: 'operational',
    ERROR: 'error',
  },

  // Log formats
  FORMAT: {
    JSON: 'json',
    TEXT: 'text',
    CSV: 'csv',
    XML: 'xml',
  },

  // Log destinations
  DESTINATION: {
    CONSOLE: 'console',
    FILE: 'file',
    DATABASE: 'database',
    SYSLOG: 'syslog',
    REMOTE: 'remote',
  },

  // Log retention
  RETENTION: {
    DAYS_7: 7,
    DAYS_30: 30,
    DAYS_90: 90,
    DAYS_180: 180,
    DAYS_365: 365,
  },

  // Log size limits (in MB)
  SIZE_LIMIT: {
    SMALL: 10,
    MEDIUM: 50,
    LARGE: 100,
    XLARGE: 500,
  },

  // Log rotation
  ROTATION: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    SIZE_BASED: 'size_based',
  },

  // Default values
  DEFAULTS: {
    LEVEL: 'info',
    CATEGORY: 'system',
    FORMAT: 'json',
    DESTINATION: 'console',
    RETENTION: 30,
    SIZE_LIMIT: 50,
    ROTATION: 'daily',
  },
} as const;

export type AdminLogLevel = (typeof ADMIN_LOG.LEVEL)[keyof typeof ADMIN_LOG.LEVEL];
export type AdminLogCategory = (typeof ADMIN_LOG.CATEGORY)[keyof typeof ADMIN_LOG.CATEGORY];
export type AdminLogFormat = (typeof ADMIN_LOG.FORMAT)[keyof typeof ADMIN_LOG.FORMAT];
export type AdminLogDestination =
  (typeof ADMIN_LOG.DESTINATION)[keyof typeof ADMIN_LOG.DESTINATION];
export type AdminLogRetention = (typeof ADMIN_LOG.RETENTION)[keyof typeof ADMIN_LOG.RETENTION];
export type AdminLogSizeLimit = (typeof ADMIN_LOG.SIZE_LIMIT)[keyof typeof ADMIN_LOG.SIZE_LIMIT];
export type AdminLogRotation = (typeof ADMIN_LOG.ROTATION)[keyof typeof ADMIN_LOG.ROTATION];

export const ADMIN_LOG_LEVEL_LABELS: Record<AdminLogLevel, string> = {
  [ADMIN_LOG.LEVEL.DEBUG]: 'Debug',
  [ADMIN_LOG.LEVEL.INFO]: 'Info',
  [ADMIN_LOG.LEVEL.WARNING]: 'Warning',
  [ADMIN_LOG.LEVEL.ERROR]: 'Error',
  [ADMIN_LOG.LEVEL.CRITICAL]: 'Critical',
};

export const ADMIN_LOG_LEVEL_PRIORITY: Record<AdminLogLevel, number> = {
  [ADMIN_LOG.LEVEL.DEBUG]: 1,
  [ADMIN_LOG.LEVEL.INFO]: 2,
  [ADMIN_LOG.LEVEL.WARNING]: 3,
  [ADMIN_LOG.LEVEL.ERROR]: 4,
  [ADMIN_LOG.LEVEL.CRITICAL]: 5,
};

export const ADMIN_LOG_LEVEL_COLORS: Record<AdminLogLevel, string> = {
  [ADMIN_LOG.LEVEL.DEBUG]: '#6B7280',
  [ADMIN_LOG.LEVEL.INFO]: '#3B82F6',
  [ADMIN_LOG.LEVEL.WARNING]: '#F59E0B',
  [ADMIN_LOG.LEVEL.ERROR]: '#EF4444',
  [ADMIN_LOG.LEVEL.CRITICAL]: '#DC2626',
};

export const ADMIN_LOG_CATEGORY_LABELS: Record<AdminLogCategory, string> = {
  [ADMIN_LOG.CATEGORY.SYSTEM]: 'System',
  [ADMIN_LOG.CATEGORY.SECURITY]: 'Security',
  [ADMIN_LOG.CATEGORY.AUDIT]: 'Audit',
  [ADMIN_LOG.CATEGORY.PERFORMANCE]: 'Performance',
  [ADMIN_LOG.CATEGORY.ACCESS]: 'Access',
  [ADMIN_LOG.CATEGORY.BUSINESS]: 'Business',
  [ADMIN_LOG.CATEGORY.OPERATIONAL]: 'Operational',
  [ADMIN_LOG.CATEGORY.ERROR]: 'Error',
};

export function getAdminLogLevelLabel(level: AdminLogLevel): string {
  return ADMIN_LOG_LEVEL_LABELS[level] || 'Unknown Level';
}

export function getAdminLogLevelPriority(level: AdminLogLevel): number {
  return ADMIN_LOG_LEVEL_PRIORITY[level] || 0;
}

export function getAdminLogLevelColor(level: AdminLogLevel): string {
  return ADMIN_LOG_LEVEL_COLORS[level] || '#6B7280';
}

export function getAdminLogCategoryLabel(category: AdminLogCategory): string {
  return ADMIN_LOG_CATEGORY_LABELS[category] || 'Unknown Category';
}

export function isCriticalLevel(level: AdminLogLevel): boolean {
  return level === ADMIN_LOG.LEVEL.CRITICAL;
}

export function isErrorLevel(level: AdminLogLevel): boolean {
  return level === ADMIN_LOG.LEVEL.ERROR || level === ADMIN_LOG.LEVEL.CRITICAL;
}

export function isWarningLevel(level: AdminLogLevel): boolean {
  return level === ADMIN_LOG.LEVEL.WARNING;
}

export function isInfoLevel(level: AdminLogLevel): boolean {
  return level === ADMIN_LOG.LEVEL.INFO;
}

export function isDebugLevel(level: AdminLogLevel): boolean {
  return level === ADMIN_LOG.LEVEL.DEBUG;
}

export function shouldLogLevel(level: AdminLogLevel, minLevel: AdminLogLevel): boolean {
  return ADMIN_LOG_LEVEL_PRIORITY[level] >= ADMIN_LOG_LEVEL_PRIORITY[minLevel];
}

export function getLogRetentionDays(retention: AdminLogRetention): number {
  return retention;
}

export function getLogSizeLimit(sizeLimit: AdminLogSizeLimit): number {
  return sizeLimit;
}

export function getLogRotationLabel(rotation: AdminLogRotation): string {
  const labels: Record<AdminLogRotation, string> = {
    [ADMIN_LOG.ROTATION.DAILY]: 'Daily',
    [ADMIN_LOG.ROTATION.WEEKLY]: 'Weekly',
    [ADMIN_LOG.ROTATION.MONTHLY]: 'Monthly',
    [ADMIN_LOG.ROTATION.SIZE_BASED]: 'Size Based',
  };
  return labels[rotation] || 'Unknown';
}

// অ্যাডমিন স্পেসিফিক লগ ফাংশন (ইউজারের সাথে কনফ্লিক্ট করবে না)
export function isAdminAuditLog(category: AdminLogCategory): boolean {
  return category === ADMIN_LOG.CATEGORY.AUDIT;
}

export function isAdminPerformanceLog(category: AdminLogCategory): boolean {
  return category === ADMIN_LOG.CATEGORY.PERFORMANCE;
}

export function isAdminSecurityLog(category: AdminLogCategory): boolean {
  return category === ADMIN_LOG.CATEGORY.SECURITY;
}

export function isAdminSystemLog(category: AdminLogCategory): boolean {
  return category === ADMIN_LOG.CATEGORY.SYSTEM;
}
