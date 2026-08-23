/**
 * Notification Digest Constants Index
 * Export all notification digest constants and types for easy importing
 */

// Notification Digest Constants
export {
  NOTIFICATIONDIGEST,
  notificationdigestGetTypeLabel,
  notificationdigestGetCategoryLabel,
  notificationdigestGetFormatLabel,
  notificationdigestGetPriorityLabel,
  notificationdigestGetErrorLabel,
  notificationdigestGetDefaultMaxItems,
  notificationdigestGetDefaultSendTime,
  notificationdigestIsDaily,
  notificationdigestIsWeekly,
  notificationdigestIsMonthly,
  notificationdigestIsEmailFormat,
  notificationdigestIsPDFFormat,
} from './notification-digest.constants';

export type {
  NotificationDigestType,
  NotificationDigestCategory,
  NotificationDigestFormat,
  NotificationDigestPriority,
  NotificationDigestDefault,
  NotificationDigestLimit,
  NotificationDigestError,
} from './notification-digest.constants';

// Notification Digest Type Constants
export {
  NOTIFICATIONDIGEST_TYPE,
  notificationdigestGetCategoryLabel as notificationDigestTypeGetCategoryLabel,
  notificationdigestGetSubTypeLabel,
  notificationdigestGetComplexityLabel,
  notificationdigestGetScopeLabel,
  notificationdigestGetPurposeLabel,
  notificationdigestIsMarketingCategory,
  notificationdigestIsTransactionalCategory,
  notificationdigestIsSystemCategory,
  notificationdigestIsSummaryCategory,
  notificationdigestIsReportsCategory,
} from './notification-digest-type.constants';

export type {
  NotificationDigestCategoryType,
  NotificationDigestSubType,
  NotificationDigestComplexity,
  NotificationDigestScope,
  NotificationDigestPurpose,
} from './notification-digest-type.constants';

// Notification Digest Status Constants
export {
  NOTIFICATIONDIGEST_STATUS,
  notificationdigestGetStatusLabel,
  notificationdigestGetStatusColor,
  notificationdigestGetStatusCategory,
  notificationdigestIsActive,
  notificationdigestIsCompleted,
  notificationdigestIsFailed,
  notificationdigestIsEditable,
  notificationdigestCanTransition,
} from './notification-digest-status.constants';

export type {
  NotificationDigestStatusType,
  NotificationDigestStatusColor,
  NotificationDigestStatusCategory,
  NotificationDigestStatusOrder,
  NotificationDigestStatusTransition,
} from './notification-digest-status.constants';
