/**
 * User Log Constants Index
 * Export all user log-related constants and types
 */

// Core Log Constants
export {
  USER_LOG,
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
} from './user-log.constants';

export type { UserLogSeverity, UserLogMetadataKey } from './user-log.constants';

// Log Type Constants
export {
  USER_LOG_TYPE,
  USER_LOG_TYPE_LABELS,
  USER_LOG_TYPE_DESCRIPTIONS,
  USER_LOG_TYPE_CATEGORIES,
  getLogTypeLabel,
  getLogTypeDescription,
  getLogCategory,
  getLogTypesByCategory,
  isOperationalLog,
} from './user-log-type.constants';

export type { UserLogType, UserLogCategory } from './user-log-type.constants';

// Log Status Constants
export {
  USER_LOG_STATUS,
  USER_LOG_STATUS_LABELS,
  USER_LOG_STATUS_COLORS,
  ACTIVE_LOG_STATUSES,
  COMPLETED_LOG_STATUSES,
  FAILED_LOG_STATUSES,
  ARCHIVED_LOG_STATUSES,
  isLogActive as isLogStatusActive,
  isLogProcessed as isLogStatusProcessed,
  isLogFailed as isLogStatusFailed,
  isLogArchived as isLogStatusArchived,
  isLogFinished,
  getLogStatusLabel,
  getLogStatusColor,
} from './user-log-status.constants';

export type { UserLogStatus } from './user-log-status.constants';

// User Error Constants
export {
  USER_ERROR,
  USER_ERROR_CODES,
  USER_ERROR_CATEGORIES,
  USER_ERROR_MESSAGES,
  USER_ERROR_HTTP_STATUS,
  USER_ERROR_SEVERITY,
  USER_ERROR_RECOVERY,
  USER_ERROR_CATEGORY_MAP,
  getUserErrorMessage,
  getUserErrorCategory,
  getHttpStatusForUserError,
  getUserErrorSeverity,
  getUserErrorRecoverySuggestion,
  isClientError as isUserClientError,
  isServerError as isUserServerError,
  isValidationError as isUserValidationError,
  isAuthenticationError as isUserAuthenticationError,
  isAuthorizationError as isUserAuthorizationError,
  isBusinessError as isUserBusinessError,
} from './user-error.constants';

export type { UserErrorCategory, UserErrorCode } from './user-error.constants';
