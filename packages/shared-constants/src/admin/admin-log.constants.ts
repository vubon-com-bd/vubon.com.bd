/**
 * Admin Log Constants
 * অ্যাডমিন লগ সম্পর্কিত কনস্ট্যান্টস
 */

export const ADMIN_LOG = {
  // Log levels
  LEVELS: {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    CRITICAL: 'critical',
  },

  // Log categories
  CATEGORIES: {
    AUTH: 'auth',
    ADMIN: 'admin',
    USER: 'user',
    CONTENT: 'content',
    FINANCE: 'finance',
    SYSTEM: 'system',
    SECURITY: 'security',
    REPORT: 'report',
    SETTINGS: 'settings',
    API: 'api',
    DATABASE: 'database',
    CACHE: 'cache',
    QUEUE: 'queue',
    NOTIFICATION: 'notification',
  },

  // Log formats
  FORMATS: {
    JSON: 'json',
    TEXT: 'text',
    CSV: 'csv',
  },

  // Default values
  DEFAULTS: {
    LEVEL: 'info',
    FORMAT: 'json',
    MAX_SIZE: 10 * 1024 * 1024,
    MAX_FILES: 10,
    RETENTION_DAYS: 30,
  },
} as const;

export type AdminLogLevel = (typeof ADMIN_LOG.LEVELS)[keyof typeof ADMIN_LOG.LEVELS];
export type AdminLogCategory = (typeof ADMIN_LOG.CATEGORIES)[keyof typeof ADMIN_LOG.CATEGORIES];
export type AdminLogFormat = (typeof ADMIN_LOG.FORMATS)[keyof typeof ADMIN_LOG.FORMATS];
