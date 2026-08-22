/**
 * Admin Log Constants
 * Admin logging and audit trail definitions
 */

export const ADMIN_LOG = {
  // Log levels
  LEVELS: {
    DEBUG: 'debug',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    EMERGENCY: 'emergency',
    ALERT: 'alert',
    NOTICE: 'notice',
  },

  // Log categories
  CATEGORIES: {
    SYSTEM: 'system',
    SECURITY: 'security',
    ACCESS: 'access',
    AUDIT: 'audit',
    PERFORMANCE: 'performance',
    ERROR: 'error',
    DEBUG: 'debug',
    INFO: 'info',
    WARNING: 'warning',
    CRITICAL: 'critical',
    APPLICATION: 'application',
    DATABASE: 'database',
    CACHE: 'cache',
    QUEUE: 'queue',
    API: 'api',
    WEB: 'web',
    MOBILE: 'mobile',
    AUTH: 'auth',
    USER: 'user',
    ADMIN: 'admin',
    PAYMENT: 'payment',
    ORDER: 'order',
    PRODUCT: 'product',
    SHIPPING: 'shipping',
    NOTIFICATION: 'notification',
    REPORT: 'report',
    ANALYTICS: 'analytics',
    BACKUP: 'backup',
    MAINTENANCE: 'maintenance',
  },

  // Log formats
  FORMATS: {
    JSON: 'json',
    TEXT: 'text',
    CSV: 'csv',
    XML: 'xml',
    HTML: 'html',
    PLAIN: 'plain',
  },

  // Log destinations
  DESTINATIONS: {
    FILE: 'file',
    CONSOLE: 'console',
    DATABASE: 'database',
    ELASTICSEARCH: 'elasticsearch',
    LOGSTASH: 'logstash',
    GRAYLOG: 'graylog',
    PAPERTRAIL: 'papertrail',
    S3: 's3',
    CLOUDWATCH: 'cloudwatch',
    STACKDRIVER: 'stackdriver',
    SENTRY: 'sentry',
    SLACK: 'slack',
    EMAIL: 'email',
    WEBHOOK: 'webhook',
  },

  // Log retention
  RETENTION: {
    DAYS_7: 7,
    DAYS_14: 14,
    DAYS_30: 30,
    DAYS_60: 60,
    DAYS_90: 90,
    DAYS_180: 180,
    DAYS_365: 365,
    FOREVER: -1,
  },

  // Log size limits (in bytes)
  SIZE_LIMITS: {
    KB: 1024,
    MB: 1048576,
    GB: 1073741824,
    MB_5: 5242880,
    MB_10: 10485760,
    MB_50: 52428800,
    MB_100: 104857600,
    MB_500: 524288000,
    GB_1: 1073741824,
  },

  // Log rotation
  ROTATION: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    SIZE_BASED: 'size_based',
    NEVER: 'never',
  },
} as const;

export type AdminLogLevel = (typeof ADMIN_LOG.LEVELS)[keyof typeof ADMIN_LOG.LEVELS];
export type AdminLogCategory = (typeof ADMIN_LOG.CATEGORIES)[keyof typeof ADMIN_LOG.CATEGORIES];
export type AdminLogFormat = (typeof ADMIN_LOG.FORMATS)[keyof typeof ADMIN_LOG.FORMATS];
export type AdminLogDestination =
  (typeof ADMIN_LOG.DESTINATIONS)[keyof typeof ADMIN_LOG.DESTINATIONS];
export type AdminLogRetention = (typeof ADMIN_LOG.RETENTION)[keyof typeof ADMIN_LOG.RETENTION];
export type AdminLogSizeLimit = (typeof ADMIN_LOG.SIZE_LIMITS)[keyof typeof ADMIN_LOG.SIZE_LIMITS];
export type AdminLogRotation = (typeof ADMIN_LOG.ROTATION)[keyof typeof ADMIN_LOG.ROTATION];

export const ADMIN_LOG_LEVEL_LABELS: Record<AdminLogLevel, string> = {
  [ADMIN_LOG.LEVELS.DEBUG]: 'Debug',
  [ADMIN_LOG.LEVELS.INFO]: 'Info',
  [ADMIN_LOG.LEVELS.WARNING]: 'Warning',
  [ADMIN_LOG.LEVELS.ERROR]: 'Error',
  [ADMIN_LOG.LEVELS.CRITICAL]: 'Critical',
  [ADMIN_LOG.LEVELS.EMERGENCY]: 'Emergency',
  [ADMIN_LOG.LEVELS.ALERT]: 'Alert',
  [ADMIN_LOG.LEVELS.NOTICE]: 'Notice',
};

export const ADMIN_LOG_LEVEL_PRIORITY: Record<AdminLogLevel, number> = {
  [ADMIN_LOG.LEVELS.DEBUG]: 1,
  [ADMIN_LOG.LEVELS.INFO]: 2,
  [ADMIN_LOG.LEVELS.NOTICE]: 3,
  [ADMIN_LOG.LEVELS.WARNING]: 4,
  [ADMIN_LOG.LEVELS.ERROR]: 5,
  [ADMIN_LOG.LEVELS.CRITICAL]: 6,
  [ADMIN_LOG.LEVELS.ALERT]: 7,
  [ADMIN_LOG.LEVELS.EMERGENCY]: 8,
};

export const ADMIN_LOG_LEVEL_COLORS: Record<AdminLogLevel, string> = {
  [ADMIN_LOG.LEVELS.DEBUG]: '#808080',
  [ADMIN_LOG.LEVELS.INFO]: '#3498DB',
  [ADMIN_LOG.LEVELS.NOTICE]: '#8E44AD',
  [ADMIN_LOG.LEVELS.WARNING]: '#F39C12',
  [ADMIN_LOG.LEVELS.ERROR]: '#E74C3C',
  [ADMIN_LOG.LEVELS.CRITICAL]: '#C0392B',
  [ADMIN_LOG.LEVELS.ALERT]: '#D35400',
  [ADMIN_LOG.LEVELS.EMERGENCY]: '#8B0000',
};

export const ADMIN_LOG_CATEGORY_LABELS: Record<AdminLogCategory, string> = {
  [ADMIN_LOG.CATEGORIES.SYSTEM]: 'System',
  [ADMIN_LOG.CATEGORIES.SECURITY]: 'Security',
  [ADMIN_LOG.CATEGORIES.ACCESS]: 'Access',
  [ADMIN_LOG.CATEGORIES.AUDIT]: 'Audit',
  [ADMIN_LOG.CATEGORIES.PERFORMANCE]: 'Performance',
  [ADMIN_LOG.CATEGORIES.ERROR]: 'Error',
  [ADMIN_LOG.CATEGORIES.DEBUG]: 'Debug',
  [ADMIN_LOG.CATEGORIES.INFO]: 'Info',
  [ADMIN_LOG.CATEGORIES.WARNING]: 'Warning',
  [ADMIN_LOG.CATEGORIES.CRITICAL]: 'Critical',
  [ADMIN_LOG.CATEGORIES.APPLICATION]: 'Application',
  [ADMIN_LOG.CATEGORIES.DATABASE]: 'Database',
  [ADMIN_LOG.CATEGORIES.CACHE]: 'Cache',
  [ADMIN_LOG.CATEGORIES.QUEUE]: 'Queue',
  [ADMIN_LOG.CATEGORIES.API]: 'API',
  [ADMIN_LOG.CATEGORIES.WEB]: 'Web',
  [ADMIN_LOG.CATEGORIES.MOBILE]: 'Mobile',
  [ADMIN_LOG.CATEGORIES.AUTH]: 'Auth',
  [ADMIN_LOG.CATEGORIES.USER]: 'User',
  [ADMIN_LOG.CATEGORIES.ADMIN]: 'Admin',
  [ADMIN_LOG.CATEGORIES.PAYMENT]: 'Payment',
  [ADMIN_LOG.CATEGORIES.ORDER]: 'Order',
  [ADMIN_LOG.CATEGORIES.PRODUCT]: 'Product',
  [ADMIN_LOG.CATEGORIES.SHIPPING]: 'Shipping',
  [ADMIN_LOG.CATEGORIES.NOTIFICATION]: 'Notification',
  [ADMIN_LOG.CATEGORIES.REPORT]: 'Report',
  [ADMIN_LOG.CATEGORIES.ANALYTICS]: 'Analytics',
  [ADMIN_LOG.CATEGORIES.BACKUP]: 'Backup',
  [ADMIN_LOG.CATEGORIES.MAINTENANCE]: 'Maintenance',
};

export function getAdminLogLevelLabel(level: AdminLogLevel): string {
  return ADMIN_LOG_LEVEL_LABELS[level] || 'Unknown Level';
}

export function getAdminLogLevelPriority(level: AdminLogLevel): number {
  return ADMIN_LOG_LEVEL_PRIORITY[level] || 0;
}

export function getAdminLogLevelColor(level: AdminLogLevel): string {
  return ADMIN_LOG_LEVEL_COLORS[level] || '#808080';
}

export function getAdminLogCategoryLabel(category: AdminLogCategory): string {
  return ADMIN_LOG_CATEGORY_LABELS[category] || 'Unknown Category';
}

export function isCriticalLevel(level: AdminLogLevel): boolean {
  return (
    level === ADMIN_LOG.LEVELS.CRITICAL ||
    level === ADMIN_LOG.LEVELS.EMERGENCY ||
    level === ADMIN_LOG.LEVELS.ALERT
  );
}

export function isErrorLevel(level: AdminLogLevel): boolean {
  return level === ADMIN_LOG.LEVELS.ERROR || level === ADMIN_LOG.LEVELS.CRITICAL;
}

export function isWarningLevel(level: AdminLogLevel): boolean {
  return level === ADMIN_LOG.LEVELS.WARNING;
}

export function isInfoLevel(level: AdminLogLevel): boolean {
  return level === ADMIN_LOG.LEVELS.INFO || level === ADMIN_LOG.LEVELS.NOTICE;
}

export function isDebugLevel(level: AdminLogLevel): boolean {
  return level === ADMIN_LOG.LEVELS.DEBUG;
}

export function shouldLogLevel(level: AdminLogLevel, minLevel: AdminLogLevel): boolean {
  return getAdminLogLevelPriority(level) >= getAdminLogLevelPriority(minLevel);
}

export function getLogRetentionDays(retention: AdminLogRetention): number {
  return retention;
}

export function getLogSizeLimit(limit: AdminLogSizeLimit): number {
  return limit;
}

export function getLogRotationLabel(rotation: AdminLogRotation): string {
  const labels: Record<AdminLogRotation, string> = {
    [ADMIN_LOG.ROTATION.DAILY]: 'Daily',
    [ADMIN_LOG.ROTATION.WEEKLY]: 'Weekly',
    [ADMIN_LOG.ROTATION.MONTHLY]: 'Monthly',
    [ADMIN_LOG.ROTATION.SIZE_BASED]: 'Size Based',
    [ADMIN_LOG.ROTATION.NEVER]: 'Never',
  };
  return labels[rotation] || 'Unknown Rotation';
}
