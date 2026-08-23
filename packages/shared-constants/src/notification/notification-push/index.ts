/**
 * Push Notification Constants Index
 * Export all push notification constants and types for easy importing
 */

// Push Constants
export {
  NOTIFICATIONPUSH,
  notificationpushGetTypeLabel,
  notificationpushGetCategoryLabel,
  notificationpushGetPriorityLabel,
  notificationpushGetPlatformLabel,
  notificationpushGetProviderLabel,
  notificationpushGetFormatLabel,
  notificationpushGetErrorLabel,
  notificationpushGetDefaultTTL,
  notificationpushGetMaxPayloadSizeKB,
  notificationpushGetMaxTitleLength,
  notificationpushGetMaxBodyLength,
  notificationpushIsTransactional,
  notificationpushIsMarketing,
  notificationpushIsUrgent,
  notificationpushIsAndroidPlatform,
  notificationpushIsIOSPlatform,
  notificationpushIsWebPlatform,
} from './push.constants';

export type {
  NotificationPushType,
  NotificationPushCategory,
  NotificationPushPriority,
  NotificationPushPlatform,
  NotificationPushProvider,
  NotificationPushFormat,
  NotificationPushDefault,
  NotificationPushLimit,
  NotificationPushError,
} from './push.constants';

// Push Status Constants
export {
  NOTIFICATIONPUSH_STATUS,
  notificationpushGetStatusLabel,
  notificationpushGetStatusColor,
  notificationpushGetStatusCategory,
  notificationpushIsDelivered,
  notificationpushIsEngaged,
  notificationpushIsFailed,
  notificationpushIsPending,
  notificationpushIsSent,
  notificationpushCanTransition,
} from './push-status.constants';

export type {
  NotificationPushStatusType,
  NotificationPushStatusColor,
  NotificationPushStatusCategory,
  NotificationPushStatusOrder,
  NotificationPushStatusTransition,
} from './push-status.constants';
