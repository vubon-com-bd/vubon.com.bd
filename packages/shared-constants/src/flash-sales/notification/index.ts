/**
 * Flash Sale Notification Constants Index
 * Export all notification constants and types for easy importing
 */

// Flash Sale Notification Constants
export {
  FLASH_SALE_NOTIFICATION,
  flashsalesNotificationGetTypeLabel,
  flashsalesNotificationGetChannelLabel,
  flashsalesNotificationGetPriorityLabel,
  flashsalesNotificationGetTemplateLabel,
  flashsalesNotificationGetTimingLabel,
  flashsalesNotificationGetFrequencyLabel,
  flashsalesNotificationGetAudienceLabel,
  flashsalesNotificationIsValidType,
  flashsalesNotificationIsValidChannel,
  flashsalesNotificationIsValidPriority,
  flashsalesNotificationIsHighPriority,
  flashsalesNotificationIsLowPriority,
  flashsalesNotificationGetDefaultChannel,
  flashsalesNotificationGetDefaultPriority,
  flashsalesNotificationGetMaxRecipients,
  flashsalesNotificationGetMaxRetries,
  flashsalesNotificationGetMaxNotificationsPerDay,
  flashsalesNotificationGetMinSubjectLength,
  flashsalesNotificationGetMaxSubjectLength,
  flashsalesNotificationGetMinBodyLength,
  flashsalesNotificationGetMaxBodyLength,
} from './flash-sale-notification.constants';

export type {
  FlashSaleNotificationType,
  FlashSaleNotificationChannel,
  FlashSaleNotificationPriority,
  FlashSaleNotificationTemplate,
  FlashSaleNotificationTiming,
  FlashSaleNotificationFrequency,
  FlashSaleNotificationAudience,
} from './flash-sale-notification.constants';

// Flash Sale Notification Type Constants
export {
  FLASH_SALE_NOTIFICATION_TYPE,
  flashsalesNotificationTypeGetCategoryLabel,
  flashsalesNotificationTypeGetComplexityLabel,
  flashsalesNotificationTypeGetScopeLabel,
  flashsalesNotificationTypeGetDeliveryLabel,
  flashsalesNotificationTypeGetLanguageLabel,
  flashsalesNotificationTypeGetFormatLabel,
  flashsalesNotificationTypeGetActionLabel,
  flashsalesNotificationTypeIsValidCategory,
  flashsalesNotificationTypeIsValidScope,
  flashsalesNotificationTypeIsValidLanguage,
  flashsalesNotificationTypeIsValidFormat,
  flashsalesNotificationTypeIsUrgent,
  flashsalesNotificationTypeIsPromotional,
} from './flash-sale-notification-type.constants';

export type {
  FlashSaleNotificationTypeCategory,
  FlashSaleNotificationTypeComplexity,
  FlashSaleNotificationTypeScope,
  FlashSaleNotificationTypeDelivery,
  FlashSaleNotificationTypeLanguage,
  FlashSaleNotificationTypeFormat,
  FlashSaleNotificationTypeAction,
} from './flash-sale-notification-type.constants';

// Flash Sale Notification Status Constants
export {
  FLASH_SALE_NOTIFICATION_STATUS,
  flashsalesNotificationStatusGetLabel,
  flashsalesNotificationStatusGetCategory,
  flashsalesNotificationStatusGetColor,
  flashsalesNotificationStatusGetPriority,
  flashsalesNotificationStatusIsActive,
  flashsalesNotificationStatusIsDelivered,
  flashsalesNotificationStatusIsFailed,
  flashsalesNotificationStatusCanTransitionTo,
  flashsalesNotificationStatusGetAvailableTransitions,
  flashsalesNotificationStatusCanApprove,
  flashsalesNotificationStatusCanReject,
  flashsalesNotificationStatusCanSchedule,
  flashsalesNotificationStatusCanQueue,
  flashsalesNotificationStatusCanProcess,
  flashsalesNotificationStatusCanSend,
  flashsalesNotificationStatusCanRetry,
  flashsalesNotificationStatusCanCancel,
  flashsalesNotificationStatusCanArchive,
  flashsalesNotificationStatusGetDeliveryStatusLabel,
  flashsalesNotificationStatusIsValid,
  flashsalesNotificationStatusIsValidDeliveryStatus,
} from './flash-sale-notification-status.constants';

export type {
  FlashSaleNotificationStatusType,
  FlashSaleNotificationStatusCategory,
  FlashSaleNotificationStatusColor,
  FlashSaleNotificationStatusPriority,
  FlashSaleNotificationDeliveryStatus,
} from './flash-sale-notification-status.constants';
