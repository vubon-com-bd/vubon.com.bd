/**
 * User Activity Constants Index
 * Export all user activity-related constants and types
 */

// Core Activity Constants
export {
  USER_ACTIVITY,
  getSeverityLabel,
  getSeverityColor,
  getSeverityPriority,
  getActivityStatusMessage,
  isActivityActive,
  isActivityCompleted,
  isActivityFailed,
  isActivityRead,
  isActivityArchived,
  getActivityTimeframeLabel,
  getTimeframeDateRange,
  getActivityMetadataValue,
  hasActivityMetadata,
  getActivityDescription,
  shouldArchiveActivity,
  getActivitySeverityFromType,
} from './user-activity.constants';

export type {
  UserActivitySeverity,
  UserActivityTimeframe,
  UserActivityMetadataKey,
} from './user-activity.constants';

// Activity Type Constants
export {
  USER_ACTIVITY_TYPE,
  USER_ACTIVITY_TYPE_LABELS,
  USER_ACTIVITY_TYPE_CATEGORIES,
  getActivityTypeLabel,
  getActivityCategory,
  getActivityTypesByCategory,
  isAuthenticationActivity,
  isOrderActivity,
  isPaymentActivity,
  isProductActivity,
  isSocialActivity,
  isSupportActivity,
} from './user-activity-type.constants';

export type { UserActivityType, UserActivityCategory } from './user-activity-type.constants';

// Activity Status Constants
export {
  USER_ACTIVITY_STATUS,
  USER_ACTIVITY_STATUS_LABELS,
  USER_ACTIVITY_STATUS_COLORS,
  ACTIVE_ACTIVITY_STATUSES,
  COMPLETED_ACTIVITY_STATUSES,
  FAILED_ACTIVITY_STATUSES,
  ARCHIVED_ACTIVITY_STATUSES,
  ALL_ACTIVITY_STATUSES,
  isActivityActive as isActivityStatusActive,
  isActivityCompleted as isActivityStatusCompleted,
  isActivityFailed as isActivityStatusFailed,
  isActivityArchived as isActivityStatusArchived,
  isActivityFinished,
  getActivityStatusLabel,
  getActivityStatusColor,
} from './user-activity-status.constants';

export type { UserActivityStatus } from './user-activity-status.constants';
