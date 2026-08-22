/**
 * Admin Log Constants Index
 * Export all admin log constants for easy importing
 */

// Admin Log Core Constants
export {
  ADMIN_LOG,
  ADMIN_LOG_LEVEL_LABELS,
  ADMIN_LOG_LEVEL_PRIORITY,
  ADMIN_LOG_LEVEL_COLORS,
  ADMIN_LOG_CATEGORY_LABELS,
  getAdminLogLevelLabel,
  getAdminLogLevelPriority,
  getAdminLogLevelColor,
  getAdminLogCategoryLabel,
  isCriticalLevel,
  isErrorLevel,
  isWarningLevel,
  isInfoLevel,
  isDebugLevel,
  shouldLogLevel,
  getLogRetentionDays,
  getLogSizeLimit,
  getLogRotationLabel,
  isAdminAuditLog,
  isAdminPerformanceLog,
  isAdminSecurityLog,
  isAdminSystemLog,
} from './admin-log.constants';

export type {
  AdminLogLevel,
  AdminLogCategory,
  AdminLogFormat,
  AdminLogDestination,
  AdminLogRetention,
  AdminLogSizeLimit,
  AdminLogRotation,
} from './admin-log.constants';

// Admin Log Type Constants
export {
  ADMIN_LOG_TYPE,
  ADMIN_LOG_TYPE_CATEGORIES,
  ADMIN_LOG_TYPE_LABELS_DETAIL,
  getAdminLogTypeCategory,
  getAdminLogTypeLabel,
  isSecurityLog,
  isSystemLog,
  isAuditLog,
  isPerformanceLog,
  isAccessLog,
} from './admin-log-type.constants';

export type { AdminLogTypeDetail } from './admin-log-type.constants';

// Admin Log Status Constants
export {
  ADMIN_LOG_STATUS,
  ADMIN_LOG_STATUS_LABELS_DETAIL,
  ADMIN_LOG_STATUS_COLORS_DETAIL,
  ADMIN_LOG_STATUS_GROUPS,
  getAdminLogStatusLabel,
  getAdminLogStatusColor,
  isSuccessStatus,
  isFailureStatus,
  isPendingStatus,
  isIntermediateStatus,
  isTerminalStatus,
  isActiveStatus,
  getStatusPriority,
  getAdminLogStatuses,
  getSuccessStatuses,
  getFailureStatuses,
  getPendingStatuses,
  getIntermediateStatuses,
} from './admin-log-status.constants';

export type { AdminLogStatusDetail } from './admin-log-status.constants';
