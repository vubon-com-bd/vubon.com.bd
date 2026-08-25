/**
 * Flash Sales Constants Index
 * Export all flash sales constants and types for easy importing
 */

// Flash Sale Constants
export {
  FLASH_SALE,
  flashSaleGetTypeLabel,
  flashSaleGetStatusLabel,
  flashSaleGetPriorityLabel,
  flashSaleGetTimeframeLabel,
  flashSaleGetFrequencyLabel,
  flashSaleGetVisibilityLabel,
  flashSaleGetFeatureLabel,
  flashSaleGetConditionLabel,
  flashSaleIsValidType,
  flashSaleIsValidStatus,
  flashSaleIsValidPriority,
  flashSaleIsActive,
  flashSaleIsScheduled,
  flashSaleIsComplete,
  flashSaleGetTimeframeMinutes,
  flashSaleGetDefaultDuration,
  flashSaleGetMaxProducts,
  flashSaleGetMaxDiscount,
} from './flash-sale.constants';

export type {
  FlashSaleType,
  FlashSaleStatus,
  FlashSalePriority,
  FlashSaleTimeframe,
  FlashSaleFrequency,
  FlashSaleVisibility,
  FlashSaleFeature,
  FlashSaleCondition,
} from './flash-sale.constants';

// Flash Sale Status Constants
export {
  FLASH_SALE_STATUS,
  flashSaleStatusGetLabel,
  flashSaleStatusGetCategory,
  flashSaleStatusGetColor,
  flashSaleStatusGetPriority,
  flashSaleStatusIsActive,
  flashSaleStatusIsScheduled,
  flashSaleStatusIsComplete,
  flashSaleStatusCanTransitionTo,
  flashSaleStatusGetAvailableTransitions,
  flashSaleStatusCanStart,
  flashSaleStatusCanPause,
  flashSaleStatusCanResume,
  flashSaleStatusCanEnd,
  flashSaleStatusCanCancel,
  flashSaleStatusIsValid,
} from './flash-sale-status.constants';

export type {
  FlashSaleStatusType,
  FlashSaleStatusCategory,
  FlashSaleStatusColor,
  FlashSaleStatusPriority,
} from './flash-sale-status.constants';

// Flash Sale Type Constants
export {
  FLASH_SALE_TYPE,
  flashSaleTypeGetCategoryLabel,
  flashSaleTypeGetComplexityLabel,
  flashSaleTypeGetScopeLabel,
  flashSaleTypeGetAudienceLabel,
  flashSaleTypeGetChannelLabel,
  flashSaleTypeGetTriggerLabel,
  flashSaleTypeGetEngagementLabel,
  flashSaleTypeGetPerformanceLabel,
  flashSaleTypeIsValidCategory,
  flashSaleTypeIsValidAudience,
} from './flash-sale-type.constants';

export type {
  FlashSaleTypeCategory,
  FlashSaleTypeComplexity,
  FlashSaleTypeScope,
  FlashSaleTypeAudience,
  FlashSaleTypeChannel,
  FlashSaleTypeTrigger,
  FlashSaleTypeEngagement,
  FlashSaleTypePerformance,
} from './flash-sale-type.constants';

// Flash Sale Priority Constants
export {
  FLASH_SALE_PRIORITY,
  flashSalePriorityGetLevelLabel,
  flashSalePriorityGetScore,
  flashSalePriorityGetColor,
  flashSalePriorityGetSLATarget,
  flashSalePriorityGetResourceAllocation,
  flashSalePriorityGetWeight,
  flashSalePriorityGetEscalation,
  flashSalePriorityIsUrgent,
  flashSalePriorityIsHigh,
  flashSalePriorityIsLow,
  flashSalePriorityIsValid,
  flashSalePriorityGetPriorityFromScore,
} from './flash-sale-priority.constants';

export type {
  FlashSalePriorityLevel,
  FlashSalePriorityScore,
  FlashSalePriorityColor,
  FlashSalePrioritySLATarget,
  FlashSalePriorityResourceAllocation,
  FlashSalePriorityWeight,
  FlashSalePriorityEscalation,
} from './flash-sale-priority.constants';

export {
  FLASH_SALE_ERROR,
  flashsalesErrorGetMessage,
  flashsalesErrorGetHttpStatus,
  flashsalesErrorGetCategory,
  flashsalesErrorGetSeverity,
  flashsalesErrorGetRetryType,
  flashsalesErrorIsRetryable,
  flashsalesErrorIsCritical,
  flashsalesErrorIsClientError,
  flashsalesErrorIsServerError,
} from './flash-sale-error.constants';

export type {
  FlashSaleErrorCategory,
  FlashSaleErrorCode,
  FlashSaleErrorSeverity,
  FlashSaleErrorRetry,
} from './flash-sale-error.constants';

// bundle-deal Constants
export * from './bundle-deal';

// deal Constants
export * from './deal';

// coupon Constants
export * from './coupon';

// inventory Constants
export * from './inventory';

// notification Constants
export * from './notification';

// participant Constants
export * from './participant';

// product-deal Constants
export * from './product-deal';

// rule Constants
export * from './rule';

// schedule Constants
export * from './schedule';

// share Constants
export * from './share';

// voucher Constants
export * from './voucher';

// wishlist Constants
export * from './wishlist';
