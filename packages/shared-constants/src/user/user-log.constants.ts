/**
 * User Log Constants (EXTENDS common/types)
 * @module shared-constants/user/user-log.constants
 */

import { TYPES } from '../common/types.constants';

export const USER_LOG = {
  // Base types from common
  ...TYPES,

  // Log types
  TYPES: {
    AUDIT: 'audit',
    SECURITY: 'security',
    PERFORMANCE: 'performance',
    ERROR: 'error',
    DEBUG: 'debug',
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success',
    FAILURE: 'failure',
    ACCESS: 'access',
    API: 'api',
    WEBHOOK: 'webhook',
    EVENT: 'event',
    TRANSACTION: 'transaction',
    SYSTEM: 'system',
    APPLICATION: 'application',
  } as const,

  // Log levels
  LEVELS: {
    DEBUG: 'debug',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    FATAL: 'fatal',
  } as const,

  // Log status
  STATUS: {
    LOGGED: 'logged',
    PROCESSED: 'processed',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
    FAILED: 'failed',
    PENDING: 'pending',
    COMPLETED: 'completed',
  } as const,

  // Log categories
  CATEGORIES: {
    AUTH: 'auth',
    USER: 'user',
    ORDER: 'order',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    INVENTORY: 'inventory',
    SECURITY: 'security',
    SYSTEM: 'system',
    API: 'api',
    INTEGRATION: 'integration',
    ADMIN: 'admin',
    ANALYTICS: 'analytics',
  } as const,

  // Log retention
  RETENTION: {
    DEFAULT_DAYS: 90,
    AUDIT_DAYS: 365,
    SECURITY_DAYS: 365,
    ERROR_DAYS: 180,
    DEBUG_DAYS: 30,
    TRANSACTION_DAYS: 365,
    API_DAYS: 90,
    MINIMUM_DAYS: 30,
    MAXIMUM_DAYS: 730,
  } as const,

  // Log storage
  STORAGE: {
    DATABASE: 'database',
    FILE: 'file',
    ELASTICSEARCH: 'elasticsearch',
    CLOUD: 'cloud',
    S3: 's3',
    LOCAL: 'local',
  } as const,

  // Log limits
  LIMITS: {
    MAX_ENTRIES_PER_DAY: 10000,
    MAX_ENTRIES_PER_USER: 1000,
    MAX_ENTRIES_PER_SESSION: 100,
    MAX_FILE_SIZE_MB: 100,
    MAX_ARCHIVE_SIZE_MB: 1000,
    BATCH_SIZE: 1000,
  },

  // Log export
  EXPORT: {
    FORMATS: ['json', 'csv', 'xml', 'html', 'txt'],
    MAX_EXPORT_SIZE_MB: 100,
    ALLOWED_EXPORT_TYPES: ['audit', 'security', 'error', 'transaction'],
  },

  // Log filtering
  FILTERS: {
    DATE_RANGE: 'date_range',
    USER_ID: 'user_id',
    USER_EMAIL: 'user_email',
    IP_ADDRESS: 'ip_address',
    LOG_TYPE: 'log_type',
    LOG_LEVEL: 'log_level',
    CATEGORY: 'category',
    STATUS: 'status',
    KEYWORD: 'keyword',
  } as const,

  // Default values
  DEFAULTS: {
    LEVEL: 'info',
    STATUS: 'logged',
    CATEGORY: 'system',
    STORAGE: 'database',
    RETENTION_DAYS: 90,
  },
} as const;

export type UserLogType = (typeof USER_LOG.TYPES)[keyof typeof USER_LOG.TYPES];
export type UserLogLevel = (typeof USER_LOG.LEVELS)[keyof typeof USER_LOG.LEVELS];
export type UserLogStatus = (typeof USER_LOG.STATUS)[keyof typeof USER_LOG.STATUS];
export type UserLogCategory = (typeof USER_LOG.CATEGORIES)[keyof typeof USER_LOG.CATEGORIES];
export type UserLogStorage = (typeof USER_LOG.STORAGE)[keyof typeof USER_LOG.STORAGE];
export type UserLogExportFormat = (typeof USER_LOG.EXPORT.FORMATS)[number];
export type UserLogFilter = (typeof USER_LOG.FILTERS)[keyof typeof USER_LOG.FILTERS];
