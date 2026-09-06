/**
 * Admin Log Constants (EXTENDS common/types)
 * @module shared-constants/admin/admin-log.constants
 */

import { TYPES } from '../common/types.constants';

export const ADMIN_LOG = {
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
    ADMIN_ACTION: 'admin_action',
    ADMIN_AUDIT: 'admin_audit',
    ADMIN_SECURITY: 'admin_security',
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
    ADMIN: 'admin',
    USER: 'user',
    ORDER: 'order',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    INVENTORY: 'inventory',
    SECURITY: 'security',
    SYSTEM: 'system',
    API: 'api',
    INTEGRATION: 'integration',
    MANAGEMENT: 'management',
    CONFIGURATION: 'configuration',
    MAINTENANCE: 'maintenance',
    MONITORING: 'monitoring',
    DATABASE: 'database',
    NETWORK: 'network',
    AUDIT: 'audit',
  } as const,

  // Log retention
  RETENTION: {
    DEFAULT_DAYS: 90,
    AUDIT_DAYS: 730,
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
    MAX_ENTRIES_PER_DAY: 50000,
    MAX_ENTRIES_PER_ADMIN: 5000,
    MAX_ENTRIES_PER_SESSION: 500,
    MAX_FILE_SIZE_MB: 500,
    MAX_ARCHIVE_SIZE_MB: 5000,
    BATCH_SIZE: 1000,
  },

  // Log export
  EXPORT: {
    FORMATS: ['json', 'csv', 'xml', 'html', 'txt'],
    MAX_EXPORT_SIZE_MB: 500,
    ALLOWED_EXPORT_TYPES: ['audit', 'security', 'error', 'transaction', 'admin_action'],
  },

  // Log filtering
  FILTERS: {
    DATE_RANGE: 'date_range',
    ADMIN_ID: 'admin_id',
    ADMIN_EMAIL: 'admin_email',
    IP_ADDRESS: 'ip_address',
    LOG_TYPE: 'log_type',
    LOG_LEVEL: 'log_level',
    CATEGORY: 'category',
    STATUS: 'status',
    KEYWORD: 'keyword',
    ACTION: 'action',
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

export type AdminLogType = (typeof ADMIN_LOG.TYPES)[keyof typeof ADMIN_LOG.TYPES];
export type AdminLogLevel = (typeof ADMIN_LOG.LEVELS)[keyof typeof ADMIN_LOG.LEVELS];
export type AdminLogStatus = (typeof ADMIN_LOG.STATUS)[keyof typeof ADMIN_LOG.STATUS];
export type AdminLogCategory = (typeof ADMIN_LOG.CATEGORIES)[keyof typeof ADMIN_LOG.CATEGORIES];
export type AdminLogStorage = (typeof ADMIN_LOG.STORAGE)[keyof typeof ADMIN_LOG.STORAGE];
export type AdminLogExportFormat = (typeof ADMIN_LOG.EXPORT.FORMATS)[number];
export type AdminLogFilter = (typeof ADMIN_LOG.FILTERS)[keyof typeof ADMIN_LOG.FILTERS];
