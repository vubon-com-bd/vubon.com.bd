/**
 * Flash Sale Share Constants Index
 * Export all share constants and types for easy importing
 */

// Flash Sale Share Constants
export {
  FLASH_SALE_SHARE,
  flashsalesShareGetTypeLabel,
  flashsalesShareGetPlatformLabel,
  flashsalesShareGetCategoryLabel,
  flashsalesShareGetContentLabel,
  flashsalesShareGetVisibilityLabel,
  flashsalesShareGetAnalyticLabel,
  flashsalesShareIsValidType,
  flashsalesShareIsValidPlatform,
  flashsalesShareIsValidCategory,
  flashsalesShareIsValidContent,
  flashsalesShareIsSocialPlatform,
  flashsalesShareIsMessagingPlatform,
  flashsalesShareGetDefaultMaxSharesPerDay,
  flashsalesShareGetDefaultMaxSharesPerUser,
  flashsalesShareGetDefaultExpiryDays,
  flashsalesShareGetMaxSharesPerDay,
  flashsalesShareGetMaxSharesPerUser,
  flashsalesShareGetMaxMessageLength,
  flashsalesShareGetMaxImageSizeMB,
  flashsalesShareGetMaxVideoSizeMB,
} from './flash-sale-share.constants';

export type {
  FlashSaleShareType,
  FlashSaleSharePlatform,
  FlashSaleShareCategory,
  FlashSaleShareContent,
  FlashSaleShareVisibility,
  FlashSaleShareAnalytic,
} from './flash-sale-share.constants';

// Flash Sale Share Type Constants
export {
  FLASH_SALE_SHARE_TYPE,
  flashsalesShareTypeGetCategoryLabel,
  flashsalesShareTypeGetComplexityLabel,
  flashsalesShareTypeGetScopeLabel,
  flashsalesShareTypeGetFrequencyLabel,
  flashsalesShareTypeGetTriggerLabel,
  flashsalesShareTypeGetPriorityLabel,
  flashsalesShareTypeGetEngagementLabel,
  flashsalesShareTypeIsValidCategory,
  flashsalesShareTypeIsValidScope,
  flashsalesShareTypeIsValidTrigger,
  flashsalesShareTypeIsHighPriority,
  flashsalesShareTypeIsRecurring,
  flashsalesShareTypeIsViral,
} from './flash-sale-share-type.constants';

export type {
  FlashSaleShareTypeCategory,
  FlashSaleShareTypeComplexity,
  FlashSaleShareTypeScope,
  FlashSaleShareTypeFrequency,
  FlashSaleShareTypeTrigger,
  FlashSaleShareTypePriority,
  FlashSaleShareTypeEngagement,
} from './flash-sale-share-type.constants';

// Flash Sale Share Status Constants
export {
  FLASH_SALE_SHARE_STATUS,
  flashsalesShareStatusGetLabel,
  flashsalesShareStatusGetCategory,
  flashsalesShareStatusGetColor,
  flashsalesShareStatusGetPriority,
  flashsalesShareStatusIsActive,
  flashsalesShareStatusIsComplete,
  flashsalesShareStatusCanTransitionTo,
  flashsalesShareStatusGetAvailableTransitions,
  flashsalesShareStatusCanProcess,
  flashsalesShareStatusCanComplete,
  flashsalesShareStatusCanRetry,
  flashsalesShareStatusCanCancel,
  flashsalesShareStatusCanArchive,
  flashsalesShareStatusGetDeliveryStatusLabel,
  flashsalesShareStatusGetEngagementStatusLabel,
  flashsalesShareStatusIsValid,
  flashsalesShareStatusIsValidDeliveryStatus,
  flashsalesShareStatusIsValidEngagementStatus,
} from './flash-sale-share-status.constants';

export type {
  FlashSaleShareStatusType,
  FlashSaleShareStatusCategory,
  FlashSaleShareStatusColor,
  FlashSaleShareStatusPriority,
  FlashSaleShareDeliveryStatus,
  FlashSaleShareEngagementStatus,
} from './flash-sale-share-status.constants';
