/**
 * Notification Broadcast Constants Index
 * Export all notification broadcast constants and types for easy importing
 */

// Notification Broadcast Constants
export {
  NOTIFICATIONBROADCAST,
  notificationbroadcastGetTypeLabel,
  notificationbroadcastGetCategoryLabel,
  notificationbroadcastGetPriorityLabel,
  notificationbroadcastGetChannelLabel,
  notificationbroadcastGetErrorLabel,
  notificationbroadcastGetDefaultBatchSize,
  notificationbroadcastIsAllUsers,
  notificationbroadcastIsSegmented,
  notificationbroadcastIsTargeted,
  notificationbroadcastIsMultiChannel,
} from './notification-broadcast.constants';

export type {
  NotificationBroadcastType,
  NotificationBroadcastCategory,
  NotificationBroadcastPriority,
  NotificationBroadcastChannel,
  NotificationBroadcastDefault,
  NotificationBroadcastLimit,
  NotificationBroadcastError,
} from './notification-broadcast.constants';

// Notification Broadcast Status Constants
export {
  NOTIFICATIONBROADCAST_STATUS,
  notificationbroadcastGetStatusLabel,
  notificationbroadcastGetStatusColor,
  notificationbroadcastGetStatusCategory,
  notificationbroadcastIsActive,
  notificationbroadcastIsCompleted,
  notificationbroadcastIsFailed,
  notificationbroadcastIsEditable,
  notificationbroadcastCanTransition,
} from './notification-broadcast-status.constants';

export type {
  NotificationBroadcastStatusType,
  NotificationBroadcastStatusColor,
  NotificationBroadcastStatusCategory,
  NotificationBroadcastStatusOrder,
  NotificationBroadcastStatusTransition,
} from './notification-broadcast-status.constants';

// Notification Broadcast Type Constants
export {
  NOTIFICATIONBROADCAST_TYPE,
  notificationbroadcastGetCategoryLabel as notificationBroadcastTypeGetCategoryLabel,
  notificationbroadcastGetSubTypeLabel,
  notificationbroadcastGetComplexityLabel,
  notificationbroadcastGetScopeLabel,
  notificationbroadcastGetPurposeLabel,
  notificationbroadcastIsMarketingCategory,
  notificationbroadcastIsTransactionalCategory,
  notificationbroadcastIsSystemCategory,
  notificationbroadcastIsAnnouncementCategory,
} from './notification-broadcast-type.constants';

export type {
  NotificationBroadcastCategoryType,
  NotificationBroadcastSubType,
  NotificationBroadcastComplexity,
  NotificationBroadcastScope,
  NotificationBroadcastPurpose,
} from './notification-broadcast-type.constants';
