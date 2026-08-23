/**
 * In-App Notification Constants Index
 * Export all in-app notification constants and types for easy importing
 */

// In-App Constants
export {
  NOTIFICATIONINAPP,
  notificationinappGetTypeLabel,
  notificationinappGetCategoryLabel,
  notificationinappGetPositionLabel,
  notificationinappGetAnimationLabel,
  notificationinappGetErrorLabel,
  notificationinappGetDefaultDuration,
  notificationinappGetDefaultMaxStack,
  notificationinappIsBannerType,
  notificationinappIsModalType,
} from './in-app.constants';

export type {
  NotificationInAppType,
  NotificationInAppCategory,
  NotificationInAppPosition,
  NotificationInAppAnimation,
  NotificationInAppDefault,
  NotificationInAppLimit,
  NotificationInAppError,
} from './in-app.constants';

// In-App Status Constants
export {
  NOTIFICATIONINAPP_STATUS,
  notificationinappGetStatusLabel,
  notificationinappGetStatusColor,
  notificationinappGetStatusCategory,
  notificationinappIsDisplayed,
  notificationinappIsEngaged,
  notificationinappIsFailed,
  notificationinappIsPending,
  notificationinappCanTransition,
} from './in-app-status.constants';

export type {
  NotificationInAppStatusType,
  NotificationInAppStatusColor,
  NotificationInAppStatusCategory,
  NotificationInAppStatusOrder,
  NotificationInAppStatusTransition,
} from './in-app-status.constants';
