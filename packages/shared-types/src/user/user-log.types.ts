/**
 * User Log Types
 * Type definitions for user logs based on shared-constants
 * @module UserLogTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user log
// ============================================================
import {
  // Core Log Constants
  USER_LOG,
  UserLogSeverity,
  UserLogMetadataKey,
  getLogSeverityLabel,
  getLogSeverityColor,
  getLogSeverityPriority,
  getLogStatusMessage,
  isLogActive,
  isLogProcessed,
  isLogFailed,
  isLogArchived,
  getLogMetadataValue,
  hasLogMetadata,
  formatLogMessage,
  getLogMessageForType,
  shouldArchiveLog,
  getLogSeverityFromType,
  isUserAuditLog,
  isUserPerformanceLog,
  isUserSecurityLog,
  isUserSystemLog,
  // Log Type Constants
  USER_LOG_TYPE,
  USER_LOG_TYPE_LABELS,
  USER_LOG_TYPE_DESCRIPTIONS,
  USER_LOG_TYPE_CATEGORIES,
  UserLogType,
  UserLogCategory,
  getLogTypeLabel,
  getLogTypeDescription,
  getLogCategory,
  getLogTypesByCategory,
  isOperationalLog,
  // Log Status Constants
  USER_LOG_STATUS,
  USER_LOG_STATUS_LABELS,
  USER_LOG_STATUS_COLORS,
  ACTIVE_LOG_STATUSES,
  COMPLETED_LOG_STATUSES,
  FAILED_LOG_STATUSES,
  ARCHIVED_LOG_STATUSES,
  UserLogStatus,
  isLogStatusActive,
  isLogStatusProcessed,
  isLogStatusFailed,
  isLogStatusArchived,
  isLogFinished,
  getLogStatusLabel,
  getLogStatusColor,
  // User Error Constants
  USER_ERROR,
  USER_ERROR_CODES,
  USER_ERROR_CATEGORIES,
  USER_ERROR_MESSAGES,
  USER_ERROR_HTTP_STATUS,
  USER_ERROR_SEVERITY,
  USER_ERROR_RECOVERY,
  USER_ERROR_CATEGORY_MAP,
  UserErrorCategory,
  UserErrorCode,
  getUserErrorMessage,
  getUserErrorCategory,
  getHttpStatusForUserError,
  getUserErrorSeverity,
  getUserErrorRecoverySuggestion,
  isUserClientError,
  isUserServerError,
  isUserValidationError,
  isUserAuthenticationError,
  isUserAuthorizationError,
  isUserBusinessError,
} from '@vubon/shared-constants';

// ============================================================
// User Log Extended Types
// ============================================================

/**
 * User log with additional metadata
 */
export interface UserLogExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserLogType;
  status: UserLogStatus;
  severity: UserLogSeverity;
  category: UserLogCategory;
  message: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  isActive: boolean;
  isProcessed: boolean;
  isFailed: boolean;
  isArchived: boolean;
  isFinished: boolean;
  isAuditLog: boolean;
  isPerformanceLog: boolean;
  isSecurityLog: boolean;
  isSystemLog: boolean;
  isOperational: boolean;
  shouldArchive: boolean;
}

/**
 * User log filter
 */
export interface UserLogFilter {
  userIds?: ID[];
  types?: UserLogType[];
  statuses?: UserLogStatus[];
  severities?: UserLogSeverity[];
  categories?: UserLogCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isProcessed?: boolean;
  isFailed?: boolean;
  isArchived?: boolean;
  isFinished?: boolean;
  isAuditLog?: boolean;
  isPerformanceLog?: boolean;
  isSecurityLog?: boolean;
  isSystemLog?: boolean;
  isOperational?: boolean;
  searchTerm?: string;
}

/**
 * User log statistics
 */
export interface UserLogStatistics {
  userId: ID;
  totalLogs: number;
  activeLogs: number;
  processedLogs: number;
  failedLogs: number;
  archivedLogs: number;
  finishedLogs: number;
  byType: Record<UserLogType, number>;
  byStatus: Record<UserLogStatus, number>;
  bySeverity: Record<UserLogSeverity, number>;
  byCategory: Record<UserLogCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageLogDuration: number;
  mostFrequentType: UserLogType;
  mostFrequentCategory: UserLogCategory;
  mostFrequentSeverity: UserLogSeverity;
}

/**
 * User log summary
 */
export interface UserLogSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  processed: number;
  failed: number;
  archived: number;
  finished: number;
  byType: Record<UserLogType, number>;
  byStatus: Record<UserLogStatus, number>;
  bySeverity: Record<UserLogSeverity, number>;
  byCategory: Record<UserLogCategory, number>;
  logTrend: {
    date: Date;
    total: number;
    active: number;
    processed: number;
  }[];
  topTypes: {
    type: UserLogType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: UserLogCategory;
    count: number;
    label: string;
  }[];
}

/**
 * User log configuration
 */
export interface UserLogConfiguration {
  enabled: boolean;
  logAllTypes: boolean;
  logAudit: boolean;
  logPerformance: boolean;
  logSecurity: boolean;
  logSystem: boolean;
  logOperational: boolean;
  retentionDays: number;
  archiveAfterDays: number;
  autoArchive: boolean;
  maxLogSizeMB: number;
  notificationOnFailed: boolean;
  notificationOnSecurity: boolean;
  alertConfig?: UserLogAlertConfig;
}

/**
 * User log alert configuration
 */
export interface UserLogAlertConfig {
  enabled: boolean;
  failedLogAlert: boolean;
  securityLogAlert: boolean;
  suspiciousActivityAlert: boolean;
  highSeverityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'push' | 'in_app')[];
  cooldownMinutes: number;
  failedLogThreshold: number;
}

/**
 * User log history
 */
export interface UserLogHistory extends BaseEntity, Timestamp {
  id: ID;
  logId: ID;
  userId: ID;
  action: 'create' | 'update' | 'process' | 'fail' | 'archive' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * User log export
 */
export interface UserLogExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'txt';
  filter: UserLogFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * User error log
 */
export interface UserErrorLog extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  code: UserErrorCode;
  category: UserErrorCategory;
  message: string;
  details?: Record<string, unknown>;
  stackTrace?: string;
  httpStatus: number;
  severity: UserLogSeverity;
  isClientError: boolean;
  isServerError: boolean;
  isValidationError: boolean;
  isAuthenticationError: boolean;
  isAuthorizationError: boolean;
  isBusinessError: boolean;
  recoverySuggestion?: string;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Log Constants
  USER_LOG,
  UserLogSeverity,
  UserLogMetadataKey,
  getLogSeverityLabel,
  getLogSeverityColor,
  getLogSeverityPriority,
  getLogStatusMessage,
  isLogActive,
  isLogProcessed,
  isLogFailed,
  isLogArchived,
  getLogMetadataValue,
  hasLogMetadata,
  formatLogMessage,
  getLogMessageForType,
  shouldArchiveLog,
  getLogSeverityFromType,
  isUserAuditLog,
  isUserPerformanceLog,
  isUserSecurityLog,
  isUserSystemLog,
  // Log Type Constants
  USER_LOG_TYPE,
  USER_LOG_TYPE_LABELS,
  USER_LOG_TYPE_DESCRIPTIONS,
  USER_LOG_TYPE_CATEGORIES,
  UserLogType,
  UserLogCategory,
  getLogTypeLabel,
  getLogTypeDescription,
  getLogCategory,
  getLogTypesByCategory,
  isOperationalLog,
  // Log Status Constants
  USER_LOG_STATUS,
  USER_LOG_STATUS_LABELS,
  USER_LOG_STATUS_COLORS,
  ACTIVE_LOG_STATUSES,
  COMPLETED_LOG_STATUSES,
  FAILED_LOG_STATUSES,
  ARCHIVED_LOG_STATUSES,
  UserLogStatus,
  isLogStatusActive,
  isLogStatusProcessed,
  isLogStatusFailed,
  isLogStatusArchived,
  isLogFinished,
  getLogStatusLabel,
  getLogStatusColor,
  // User Error Constants
  USER_ERROR,
  USER_ERROR_CODES,
  USER_ERROR_CATEGORIES,
  USER_ERROR_MESSAGES,
  USER_ERROR_HTTP_STATUS,
  USER_ERROR_SEVERITY,
  USER_ERROR_RECOVERY,
  USER_ERROR_CATEGORY_MAP,
  UserErrorCategory,
  UserErrorCode,
  getUserErrorMessage,
  getUserErrorCategory,
  getHttpStatusForUserError,
  getUserErrorSeverity,
  getUserErrorRecoverySuggestion,
  isUserClientError,
  isUserServerError,
  isUserValidationError,
  isUserAuthenticationError,
  isUserAuthorizationError,
  isUserBusinessError,
};
