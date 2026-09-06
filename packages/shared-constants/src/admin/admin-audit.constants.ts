/**
 * Admin Audit Constants (EXTENDS common/types)
 * @module shared-constants/admin/admin-audit.constants
 */

import { TYPES } from '../common/types.constants';

export const ADMIN_AUDIT = {
  // Base types from common
  ...TYPES,

  // Audit types
  TYPES: {
    ACCESS: 'access',
    ACTION: 'action',
    CHANGE: 'change',
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    LOGIN: 'login',
    LOGOUT: 'logout',
    PERMISSION: 'permission',
    ROLE: 'role',
    CONFIG: 'config',
    SYSTEM: 'system',
    SECURITY: 'security',
    DATA: 'data',
    TRANSACTION: 'transaction',
    COMPLIANCE: 'compliance',
    USER_ACTION: 'user_action',
    ADMIN_ACTION: 'admin_action',
  } as const,

  // Audit status
  STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
    BLOCKED: 'blocked',
    SUSPICIOUS: 'suspicious',
    ANOMALOUS: 'anomalous',
    PENDING: 'pending',
    REVIEWED: 'reviewed',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ESCALATED: 'escalated',
  } as const,

  // Audit severity
  SEVERITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Audit categories
  CATEGORIES: {
    AUTHENTICATION: 'authentication',
    AUTHORIZATION: 'authorization',
    ACCESS_CONTROL: 'access_control',
    DATA_ACCESS: 'data_access',
    DATA_MODIFICATION: 'data_modification',
    CONFIGURATION: 'configuration',
    SYSTEM_OPERATION: 'system_operation',
    SECURITY_EVENT: 'security_event',
    COMPLIANCE: 'compliance',
    USER_MANAGEMENT: 'user_management',
    ADMIN_MANAGEMENT: 'admin_management',
    PAYMENT: 'payment',
    FINANCIAL: 'financial',
    LEGAL: 'legal',
    REGULATORY: 'regulatory',
  } as const,

  // Audit retention
  RETENTION: {
    DEFAULT_DAYS: 365,
    SECURITY_DAYS: 730,
    COMPLIANCE_DAYS: 730,
    FINANCIAL_DAYS: 730,
    LEGAL_DAYS: 1095,
    REGULATORY_DAYS: 1095,
    MINIMUM_DAYS: 90,
    MAXIMUM_DAYS: 1095,
  } as const,

  // Audit storage
  STORAGE: {
    DATABASE: 'database',
    FILE: 'file',
    ELASTICSEARCH: 'elasticsearch',
    CLOUD: 'cloud',
    S3: 's3',
    LOCAL: 'local',
  } as const,

  // Audit limits
  LIMITS: {
    MAX_ENTRIES_PER_DAY: 10000,
    MAX_ENTRIES_PER_ADMIN: 1000,
    MAX_ENTRIES_PER_USER: 500,
    MAX_FILE_SIZE_MB: 100,
    MAX_ARCHIVE_SIZE_MB: 1000,
    BATCH_SIZE: 100,
  },

  // Audit export
  EXPORT: {
    FORMATS: ['json', 'csv', 'xml', 'html', 'pdf'],
    MAX_EXPORT_SIZE_MB: 100,
    ALLOWED_EXPORT_TYPES: ['access', 'action', 'change', 'security', 'compliance'],
  },

  // Audit filtering
  FILTERS: {
    DATE_RANGE: 'date_range',
    USER_ID: 'user_id',
    ADMIN_ID: 'admin_id',
    IP_ADDRESS: 'ip_address',
    AUDIT_TYPE: 'audit_type',
    STATUS: 'status',
    SEVERITY: 'severity',
    CATEGORY: 'category',
    ACTION: 'action',
    RESOURCE: 'resource',
    KEYWORD: 'keyword',
  } as const,

  // Audit reporting
  REPORTING: {
    ENABLED: true,
    SCHEDULE: 'daily',
    FORMATS: ['pdf', 'csv', 'html', 'json'],
    RECIPIENTS: ['audit@company.com', 'compliance@company.com'],
    AUTO_GENERATE: true,
    AUTO_SEND: true,
  },

  // Default values
  DEFAULTS: {
    STATUS: 'success',
    SEVERITY: 'medium',
    CATEGORY: 'access_control',
    STORAGE: 'database',
    RETENTION_DAYS: 365,
  },
} as const;

export type AdminAuditType = (typeof ADMIN_AUDIT.TYPES)[keyof typeof ADMIN_AUDIT.TYPES];
export type AdminAuditStatus = (typeof ADMIN_AUDIT.STATUS)[keyof typeof ADMIN_AUDIT.STATUS];
export type AdminAuditSeverity = (typeof ADMIN_AUDIT.SEVERITY)[keyof typeof ADMIN_AUDIT.SEVERITY];
export type AdminAuditCategory =
  (typeof ADMIN_AUDIT.CATEGORIES)[keyof typeof ADMIN_AUDIT.CATEGORIES];
export type AdminAuditStorage = (typeof ADMIN_AUDIT.STORAGE)[keyof typeof ADMIN_AUDIT.STORAGE];
export type AdminAuditExportFormat = (typeof ADMIN_AUDIT.EXPORT.FORMATS)[number];
export type AdminAuditFilter = (typeof ADMIN_AUDIT.FILTERS)[keyof typeof ADMIN_AUDIT.FILTERS];
