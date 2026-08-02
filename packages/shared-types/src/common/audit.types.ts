/**
 * Audit log-related type definitions for the monorepo
 * All audit types are centralized here for consistent audit trail management
 */

/**
 * Audit action types
 * Represents the types of actions that can be audited
 */
export type AuditAction =
  | 'LOGIN'
  | 'LOGOUT'
  | 'REGISTER'
  | 'PASSWORD_CHANGE'
  | 'PASSWORD_RESET'
  | 'EMAIL_CHANGE'
  | 'PHONE_CHANGE'
  | 'PROFILE_UPDATE'
  | 'ACCOUNT_DELETE'
  | 'ACCOUNT_SUSPEND'
  | 'ACCOUNT_ACTIVATE'
  | 'ROLE_ASSIGN'
  | 'ROLE_REVOKE'
  | 'PERMISSION_GRANT'
  | 'PERMISSION_REVOKE'
  | 'MFA_ENABLE'
  | 'MFA_DISABLE'
  | 'MFA_VERIFY'
  | 'SESSION_CREATE'
  | 'SESSION_REVOKE'
  | 'SESSION_EXPIRE'
  | 'DEVICE_REGISTER'
  | 'DEVICE_VERIFY'
  | 'DEVICE_TRUST'
  | 'DEVICE_BLOCK'
  | 'API_ACCESS'
  | 'DATA_EXPORT'
  | 'DATA_IMPORT'
  | 'SETTINGS_CHANGE'
  | 'SYSTEM_UPDATE'
  | 'BACKUP_CREATE'
  | 'BACKUP_RESTORE'
  | 'ADMIN_ACTION'
  | 'SECURITY_ALERT'
  | 'PAYMENT_PROCESS'
  | 'ORDER_CREATE'
  | 'ORDER_UPDATE'
  | 'ORDER_CANCEL'
  | 'CONTENT_CREATE'
  | 'CONTENT_UPDATE'
  | 'CONTENT_DELETE'
  | 'PRODUCT_CREATE'
  | 'PRODUCT_UPDATE'
  | 'PRODUCT_DELETE'
  | 'UNKNOWN';

/**
 * Audit severity levels
 * Represents the severity of an audit event
 */
export type AuditSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

/**
 * Audit status types
 * Represents the status of an audit event
 */
export type AuditStatus = 'SUCCESS' | 'FAILURE' | 'PARTIAL' | 'PENDING';

/**
 * Audit log entry interface
 * Represents a single audit log entry
 */
export interface AuditLogEntry {
  /** Unique identifier for the audit entry */
  id: string;
  /** Timestamp when the event occurred */
  timestamp: Date;
  /** Action that was performed */
  action: AuditAction;
  /** Status of the action */
  status: AuditStatus;
  /** Severity level of the event */
  severity: AuditSeverity;
  /** User ID who performed the action (null for system actions) */
  userId: string | null;
  /** User email who performed the action */
  userEmail?: string;
  /** User IP address */
  ipAddress: string;
  /** User agent string */
  userAgent: string;
  /** Session ID if applicable */
  sessionId?: string;
  /** Device ID if applicable */
  deviceId?: string;
  /** Resource that was affected */
  resource?: string;
  /** Resource ID that was affected */
  resourceId?: string;
  /** Details of the action */
  details: AuditDetails;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** Source of the event (api, web, cli, system) */
  source: 'api' | 'web' | 'cli' | 'system';
}

/**
 * Audit details interface
 * Contains detailed information about the audit event
 */
export interface AuditDetails {
  /** Description of the action */
  description: string;
  /** Before state (for updates) */
  before?: Record<string, unknown>;
  /** After state (for updates) */
  after?: Record<string, unknown>;
  /** Error message if action failed */
  error?: string;
  /** Error code if action failed */
  errorCode?: string;
  /** Additional details */
  additional?: Record<string, unknown>;
}

/**
 * Audit filter interface
 * Used for filtering audit logs in lists
 */
export interface AuditFilter {
  /** Filter by user ID */
  userId?: string;
  /** Filter by user email */
  userEmail?: string;
  /** Filter by action */
  action?: AuditAction;
  /** Filter by status */
  status?: AuditStatus;
  /** Filter by severity */
  severity?: AuditSeverity;
  /** Filter by source */
  source?: 'api' | 'web' | 'cli' | 'system';
  /** Filter by resource */
  resource?: string;
  /** Filter by resource ID */
  resourceId?: string;
  /** Filter by IP address */
  ipAddress?: string;
  /** Filter by date range - from */
  fromDate?: Date;
  /** Filter by date range - to */
  toDate?: Date;
  /** Search term for description or details */
  search?: string;
}

/**
 * Audit list response interface
 * Paginated list of audit logs
 */
export interface AuditListResponse {
  /** Array of audit entries */
  entries: AuditLogEntry[];
  /** Total number of entries */
  total: number;
  /** Current page number */
  page: number;
  /** Number of entries per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Audit statistics interface
 * Statistical data about audit logs
 */
export interface AuditStatistics {
  /** Total number of audit entries */
  totalEntries: number;
  /** Entries by action */
  entriesByAction: Record<AuditAction, number>;
  /** Entries by status */
  entriesByStatus: Record<AuditStatus, number>;
  /** Entries by severity */
  entriesBySeverity: Record<AuditSeverity, number>;
  /** Entries by source */
  entriesBySource: Record<'api' | 'web' | 'cli' | 'system', number>;
  /** Top users by activity */
  topUsers: Array<{
    userId: string;
    userEmail: string;
    count: number;
  }>;
  /** Top IP addresses */
  topIpAddresses: Array<{
    ipAddress: string;
    count: number;
  }>;
  /** Error rate */
  errorRate: number;
  /** Timestamp when statistics were calculated */
  calculatedAt: Date;
}

/**
 * Audit configuration interface
 * Configuration for audit logging
 */
export interface AuditConfig {
  /** Whether audit logging is enabled */
  enabled: boolean;
  /** Log level for audit events */
  logLevel: 'info' | 'debug' | 'warn' | 'error';
  /** Retention period for logs in days */
  retentionDays: number;
  /** Whether to log all actions */
  logAllActions: boolean;
  /** Actions to log (empty means all) */
  includedActions: AuditAction[];
  /** Actions to exclude from logging */
  excludedActions: AuditAction[];
  /** Whether to log successful actions */
  logSuccess: boolean;
  /** Whether to log failed actions */
  logFailure: boolean;
  /** Whether to log user agent */
  logUserAgent: boolean;
  /** Whether to log IP address */
  logIpAddress: boolean;
  /** Whether to anonymize IP addresses */
  anonymizeIp: boolean;
  /** Whether to log request/response data */
  logRequestResponse: boolean;
  /** Whether to log database changes */
  logDatabaseChanges: boolean;
}

/**
 * Audit event interface
 * Used for audit event emissions
 */
export interface AuditEvent {
  /** Audit action */
  action: AuditAction;
  /** Status of the action */
  status: AuditStatus;
  /** Severity of the event */
  severity: AuditSeverity;
  /** User ID */
  userId: string | null;
  /** User email */
  userEmail?: string;
  /** IP address */
  ipAddress: string;
  /** User agent */
  userAgent: string;
  /** Session ID */
  sessionId?: string;
  /** Device ID */
  deviceId?: string;
  /** Resource */
  resource?: string;
  /** Resource ID */
  resourceId?: string;
  /** Details */
  details: AuditDetails;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** Source of the event */
  source: 'api' | 'web' | 'cli' | 'system';
}

/**
 * Audit summary interface
 * Summary of audit data
 */
export interface AuditSummary {
  /** Date range for the summary */
  dateRange: {
    from: Date;
    to: Date;
  };
  /** Total actions performed */
  totalActions: number;
  /** Most common action */
  mostCommonAction: AuditAction;
  /** Most active user */
  mostActiveUser: string;
  /** Activity by hour */
  activityByHour: Record<number, number>;
  /** Activity by day */
  activityByDay: Record<string, number>;
  /** Success rate */
  successRate: number;
}

/**
 * Audit retention policy interface
 * Policy for audit log retention
 */
export interface AuditRetentionPolicy {
  /** Retention period in days */
  retentionDays: number;
  /** Whether to archive before deletion */
  archiveBeforeDelete: boolean;
  /** Archive storage location */
  archiveLocation?: string;
  /** Whether to compress archives */
  compressArchives: boolean;
  /** Maximum archive size in MB */
  maxArchiveSizeMB: number;
  /** Retention period for archives in days */
  archiveRetentionDays: number;
}

/**
 * Audit search request interface
 * Used for advanced audit search
 */
export interface AuditSearchRequest {
  /** Search query */
  query: string;
  /** Filter by action */
  action?: AuditAction;
  /** Filter by user ID */
  userId?: string;
  /** Filter by user email */
  userEmail?: string;
  /** Filter by IP address */
  ipAddress?: string;
  /** Filter by date range */
  dateRange?: {
    from: Date;
    to: Date;
  };
  /** Filter by severity */
  severity?: AuditSeverity;
  /** Filter by status */
  status?: AuditStatus;
  /** Filter by source */
  source?: 'api' | 'web' | 'cli' | 'system';
  /** Page number */
  page?: number;
  /** Items per page */
  limit?: number;
}

/**
 * Audit export request interface
 * Used for exporting audit data
 */
export interface AuditExportRequest {
  /** Date range for export */
  dateRange: {
    from: Date;
    to: Date;
  };
  /** Export format */
  format: 'csv' | 'json' | 'pdf' | 'excel';
  /** Filters to apply */
  filters?: AuditFilter;
  /** Fields to include in export */
  fields?: (keyof AuditLogEntry)[];
  /** Whether to include metadata */
  includeMetadata?: boolean;
}

/**
 * Audit export response interface
 * Response for audit export
 */
export interface AuditExportResponse {
  /** Whether export was successful */
  success: boolean;
  /** Export file URL */
  fileUrl?: string;
  /** Download file name */
  fileName?: string;
  /** File size in bytes */
  fileSize?: number;
  /** Number of records exported */
  recordCount: number;
  /** Export job ID */
  jobId?: string;
  /** Estimated completion time */
  estimatedTimeSeconds?: number;
}

/**
 * Audit alert rule interface
 * Rule for generating alerts from audit logs
 */
export interface AuditAlertRule {
  /** Rule ID */
  id: string;
  /** Rule name */
  name: string;
  /** Rule description */
  description: string;
  /** Actions that trigger the alert */
  actions: AuditAction[];
  /** Severity threshold */
  severityThreshold: AuditSeverity;
  /** Time window in minutes */
  timeWindowMinutes: number;
  /** Minimum count to trigger alert */
  minCount: number;
  /** Whether the rule is enabled */
  enabled: boolean;
  /** Alert channels (email, slack, webhook) */
  channels: ('email' | 'slack' | 'webhook')[];
  /** Recipients for the alert */
  recipients: string[];
}
