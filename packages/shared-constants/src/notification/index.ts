/**
 * Notification Constants Index
 * Export all notification constants and types for easy importing
 */

// notification-analytics Constants
export * from './notification-analytics';

// notification-report Constants
export * from './notification-report';

// notification-rule Constants
export * from './notification-rule';

// notification-preference Constants
export * from './notification-preference';

// notification-device Constants
export * from './notification-device';

// notification-schedule Constants
export * from './notification-schedule';

// notification-broadcast Constants
export * from './notification-broadcast';

// notification-digest Constants
export * from './notification-digest';

// notification-webhook Constants
export * from './notification-webhook';

// notification-template Constants
export * from './notification-template';

// notification-in-app Constants
export * from './notification-in-app';

// email-notification Constants
export * from './email-notification';

// notification-push Constants
export * from './notification-push';

// notification-sms Constants
export * from './notification-sms';

// Notification Constants
export {
  NOTIFICATION,
  notificationGetTypeLabel,
  notificationGetCategoryLabel,
  notificationGetPriorityLabel,
  notificationGetChannelLabel,
  notificationGetStatusLabel,
  notificationGetDeliveryStatusLabel,
  notificationGetReadStatusLabel,
  notificationGetActionLabel,
  notificationGetErrorLabel,
  notificationIsDelivered,
  notificationIsActive,
  notificationIsFailed,
  notificationCanTransition,
} from './notification.constants';

export type {
  NotificationType,
  NotificationCategory,
  NotificationPriority,
  NotificationChannel,
  NotificationStatus,
  NotificationDeliveryStatus,
  NotificationReadStatus,
  NotificationAction,
  NotificationDefault,
  NotificationLimit,
  NotificationError,
} from './notification.constants';

// Notification Type Constants
export {
  NOTIFICATION_TYPE,
  notificationGetCategoryLabel as notificationTypeGetCategoryLabel,
  notificationGetSubTypeLabel,
  notificationGetFormatLabel,
  notificationGetPurposeLabel,
  notificationGetUrgencyLabel,
  notificationIsMarketingCategory,
  notificationIsTransactionalCategory,
  notificationIsOperationalCategory,
  notificationIsSocialCategory,
  notificationIsAlertCategory,
} from './notification-type.constants';

export type {
  NotificationCategoryType,
  NotificationSubType,
  NotificationFormat,
  NotificationPurpose,
  NotificationUrgency,
} from './notification-type.constants';

// Notification Channel Constants
export {
  NOTIFICATION_CHANNEL,
  notificationGetChannelLabel as notificationChannelGetChannelLabel,
  notificationGetChannelCategory,
  notificationGetChannelProvider,
  notificationIsEmailChannel,
  notificationIsSMSChannel,
  notificationIsPushChannel,
  notificationIsInAppChannel,
  notificationIsSocialChannel,
  notificationIsWebChannel,
  notificationIsMobileChannel,
  notificationGetDefaultChannel,
} from './notification-channel.constants';

export type {
  NotificationChannelType,
  NotificationChannelCategory,
  NotificationChannelProvider,
  NotificationChannelCapability,
  NotificationChannelDefault,
  NotificationChannelLimit,
} from './notification-channel.constants';

// Notification Status Constants
export {
  NOTIFICATION_STATUS,
  notificationGetStatusLabel as notificationStatusGetStatusLabel,
  notificationGetStatusColor,
  notificationGetStatusCategory,
  notificationIsDelivered as notificationStatusIsDelivered,
  notificationIsEngaged,
  notificationIsFailed as notificationStatusIsFailed,
  notificationIsPending,
  notificationIsRead,
  notificationIsTerminal,
  notificationCanTransition as notificationStatusCanTransition,
} from './notification-status.constants';

export type {
  NotificationStatusType,
  NotificationStatusColor,
  NotificationStatusCategory,
  NotificationStatusOrder,
  NotificationStatusTransition,
} from './notification-status.constants';

// Notification Priority Constants
export {
  NOTIFICATION_PRIORITY,
  notificationGetPriorityLabel as notificationPriorityGetPriorityLabel,
  notificationGetPriorityScore,
  notificationGetPriorityColor,
  notificationGetPrioritySLATarget,
  notificationIsCriticalPriority,
  notificationIsHighPriority,
  notificationIsLowPriority,
  notificationGetDefaultPriority,
  notificationGetDefaultScore,
  notificationGetPriorityFromScore,
} from './notification-priority.constants';

export type {
  NotificationPriorityLevel,
  NotificationPriorityScore,
  NotificationPriorityColor,
  NotificationPrioritySLATarget,
  NotificationPriorityDefault,
} from './notification-priority.constants';

// Notification Category Constants
export {
  NOTIFICATION_CATEGORY,
  notificationGetCategoryLabel as notificationCategoryGetCategoryLabel,
  notificationGetCategoryGroup,
  notificationGetCategoryIcon,
  notificationGetCategoryColor,
  notificationIsMarketingCategory as notificationCategoryIsMarketingCategory,
  notificationIsTransactionalCategory as notificationCategoryIsTransactionalCategory,
  notificationIsSystemCategory,
  notificationIsSocialCategory as notificationCategoryIsSocialCategory,
  notificationGetDefaultCategory,
} from './notification-category.constants';

export type {
  NotificationCategoryType as NotificationCategoryTypeFromCategory,
  NotificationCategoryGroup,
  NotificationCategoryIcon,
  NotificationCategoryColor,
  NotificationCategoryDefault,
} from './notification-category.constants';

// Notification Delivery Status Constants
export {
  NOTIFICATION_DELIVERY_STATUS,
  notificationGetDeliveryStatusLabel as notificationDeliveryGetDeliveryStatusLabel,
  notificationGetDeliveryStatusColor,
  notificationGetDeliveryStatusCategory,
  notificationIsDeliveredStatus,
  notificationIsBouncedStatus,
  notificationIsFailedStatus as notificationDeliveryIsFailedStatus,
  notificationIsEngagedStatus,
  notificationCanTransitionDeliveryStatus,
} from './notification-delivery-status.constants';

export type {
  NotificationDeliveryStatusType,
  NotificationDeliveryStatusColor,
  NotificationDeliveryStatusCategory,
  NotificationDeliveryStatusOrder,
  NotificationDeliveryStatusTransition,
  NotificationDeliveryStatusDefault,
} from './notification-delivery-status.constants';

// Notification Read Status Constants
export {
  NOTIFICATION_READ_STATUS,
  notificationGetReadStatusLabel as notificationReadGetReadStatusLabel,
  notificationGetReadStatusColor,
  notificationGetReadStatusIcon,
  notificationIsReadStatus,
  notificationIsUnreadStatus,
  notificationIsArchivedStatus,
  notificationIsDeletedStatus,
  notificationCanTransitionReadStatus,
  notificationGetDefaultReadStatus,
} from './notification-read-status.constants';

export type {
  NotificationReadStatusType,
  NotificationReadStatusColor,
  NotificationReadStatusIcon,
  NotificationReadStatusOrder,
  NotificationReadStatusTransition,
  NotificationReadStatusDefault,
} from './notification-read-status.constants';

// Notification Action Constants
export {
  NOTIFICATION_ACTION,
  notificationGetActionLabel as notificationActionGetActionLabel,
  notificationGetActionCategory,
  notificationGetActionIcon,
  notificationGetActionColor,
  notificationIsViewAction,
  notificationIsInteractAction,
  notificationIsModifyAction,
  notificationIsSocialAction as notificationActionIsSocialAction,
  notificationGetDefaultAction,
} from './notification-action.constants';

export type {
  NotificationActionType,
  NotificationActionCategory,
  NotificationActionStatus,
  NotificationActionIcon,
  NotificationActionColor,
  NotificationActionDefault,
} from './notification-action.constants';

// Notification Error Constants
export {
  NOTIFICATION_ERROR,
  notificationerrorGetCategoryLabel,
  notificationerrorGetCodeLabel,
  notificationerrorGetSeverityLabel,
  notificationerrorGetRetryStrategyLabel,
  notificationerrorIsSystemError,
  notificationerrorIsNetworkError,
  notificationerrorIsAuthError,
  notificationerrorIsDeliveryError,
  notificationerrorIsRetryable,
  notificationerrorGetDefaultRetryAttempts,
  notificationerrorGetDefaultRetryDelay,
  notificationerrorGetDefaultTimeout,
} from './notification-error.constants';

export type {
  NotificationErrorCategory,
  NotificationErrorCode,
  NotificationErrorSeverity,
  NotificationErrorHttpStatus,
  NotificationErrorRetryStrategy,
  NotificationErrorDefault,
} from './notification-error.constants';

// Notification Permission Constants
export {
  NOTIFICATION_PERMISSION,
  notificationpermissionGetTypeLabel,
  notificationpermissionGetResourceLabel,
  notificationpermissionGetActionLabel,
  notificationpermissionGetLevelLabel,
  notificationpermissionGetScopeLabel,
  notificationpermissionGetStatusLabel,
  notificationpermissionIsAdmin,
  notificationpermissionIsManage,
  notificationpermissionIsWrite,
  notificationpermissionIsRead,
  notificationpermissionIsGranted,
  notificationpermissionIsPending,
  notificationpermissionGetDefaultLevel,
  notificationpermissionGetDefaultResource,
  notificationpermissionGetDefaultAction,
} from './notification-permission.constants';

export type {
  NotificationPermissionType,
  NotificationPermissionResource,
  NotificationPermissionAction,
  NotificationPermissionLevel,
  NotificationPermissionScope,
  NotificationPermissionStatus,
  NotificationPermissionDefault,
  NotificationPermissionLimit,
} from './notification-permission.constants';
