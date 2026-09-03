/**
 * User Log Constants
 * ইউজার লগ সম্পর্কিত কনস্ট্যান্টস
 */

export const USER_LOG = {
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
    USER: 'user',
    PROFILE: 'profile',
    SETTINGS: 'settings',
    PREFERENCES: 'preferences',
    SECURITY: 'security',
    PAYMENT: 'payment',
    ORDER: 'order',
    KYC: 'kyc',
    VERIFICATION: 'verification',
    ACTIVITY: 'activity',
    SYSTEM: 'system',
    API: 'api',
    DATABASE: 'database',
    CACHE: 'cache',
    QUEUE: 'queue',
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
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_FILES: 10,
    RETENTION_DAYS: 30,
  },
} as const;

export type UserLogLevel = (typeof USER_LOG.LEVELS)[keyof typeof USER_LOG.LEVELS];
export type UserLogCategory = (typeof USER_LOG.CATEGORIES)[keyof typeof USER_LOG.CATEGORIES];
export type UserLogFormat = (typeof USER_LOG.FORMATS)[keyof typeof USER_LOG.FORMATS];
