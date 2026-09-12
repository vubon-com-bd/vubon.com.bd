export const BASE_CONSTANTS = {
  APP_NAME: 'Shared Kernel',
  VERSION: '1.0.0',
  ENV: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TEST: 'test',
  },
  DEFAULT_PORT: 3000,
  DEFAULT_API_PREFIX: 'api',
  TIMEZONE: 'Asia/Dhaka',
} as const;

export const CACHE_CONSTANTS = {
  TTL: {
    SHORT: 60, // 1 minute
    MEDIUM: 300, // 5 minutes
    LONG: 3600, // 1 hour
    DAY: 86400, // 24 hours
  },
  PREFIX: {
    USER: 'user:',
    SESSION: 'session:',
    PRODUCT: 'product:',
    ORDER: 'order:',
  },
} as const;

export const QUEUE_CONSTANTS = {
  NAMES: {
    EMAIL: 'email-queue',
    SMS: 'sms-queue',
    NOTIFICATION: 'notification-queue',
    PAYMENT: 'payment-queue',
    ORDER: 'order-queue',
  },
  PRIORITY: {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
  },
} as const;
