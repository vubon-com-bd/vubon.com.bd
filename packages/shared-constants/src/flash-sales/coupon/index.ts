/**
 * Flash Sale Coupon Constants Index
 * Export all coupon constants and types for easy importing
 */

// Flash Sale Coupon Constants
export {
  FLASH_SALE_COUPON,
  flashsalesCouponGetTypeLabel,
  flashsalesCouponGetCategoryLabel,
  flashsalesCouponGetGenerationLabel,
  flashsalesCouponGetFormatLabel,
  flashsalesCouponGetApplicationLabel,
  flashsalesCouponGetRestrictionLabel,
  flashsalesCouponIsValidType,
  flashsalesCouponIsValidCategory,
  flashsalesCouponIsValidFormat,
  flashsalesCouponGetDefaultDiscountPercentage,
  flashsalesCouponGetDefaultMaxUses,
  flashsalesCouponGetDefaultMaxUsesPerUser,
  flashsalesCouponGetDefaultDurationDays,
  flashsalesCouponGetDefaultCodeLength,
  flashsalesCouponGetMaxDiscountPercentage,
  flashsalesCouponGetMaxFixedAmount,
  flashsalesCouponGetMaxUses,
  flashsalesCouponGetMaxCodeLength,
  flashsalesCouponGetMinCodeLength,
  flashsalesCouponGetMaxBulkGeneration,
  flashsalesCouponGenerateRandomCode,
} from './flash-sale-coupon.constants';

export type {
  FlashSaleCouponType,
  FlashSaleCouponCategory,
  FlashSaleCouponGeneration,
  FlashSaleCouponFormat,
  FlashSaleCouponApplication,
  FlashSaleCouponRestriction,
} from './flash-sale-coupon.constants';

// Flash Sale Coupon Type Constants
export {
  FLASH_SALE_COUPON_TYPE,
  flashsalesCouponTypeGetCategoryLabel,
  flashsalesCouponTypeGetComplexityLabel,
  flashsalesCouponTypeGetScopeLabel,
  flashsalesCouponTypeGetFrequencyLabel,
  flashsalesCouponTypeGetTriggerLabel,
  flashsalesCouponTypeGetPriorityLabel,
  flashsalesCouponTypeGetStackingLabel,
  flashsalesCouponTypeIsValidCategory,
  flashsalesCouponTypeIsValidScope,
  flashsalesCouponTypeIsValidTrigger,
  flashsalesCouponTypeIsStackable,
  flashsalesCouponTypeIsExclusive,
  flashsalesCouponTypeIsHighPriority,
} from './flash-sale-coupon-type.constants';

export type {
  FlashSaleCouponTypeCategory,
  FlashSaleCouponTypeComplexity,
  FlashSaleCouponTypeScope,
  FlashSaleCouponTypeFrequency,
  FlashSaleCouponTypeTrigger,
  FlashSaleCouponTypePriority,
  FlashSaleCouponTypeStacking,
} from './flash-sale-coupon-type.constants';

// Flash Sale Coupon Status Constants
export {
  FLASH_SALE_COUPON_STATUS,
  flashsalesCouponStatusGetLabel,
  flashsalesCouponStatusGetCategory,
  flashsalesCouponStatusGetColor,
  flashsalesCouponStatusGetPriority,
  flashsalesCouponStatusIsActive,
  flashsalesCouponStatusIsAvailable,
  flashsalesCouponStatusIsTerminated,
  flashsalesCouponStatusCanTransitionTo,
  flashsalesCouponStatusGetAvailableTransitions,
  flashsalesCouponStatusCanApprove,
  flashsalesCouponStatusCanReject,
  flashsalesCouponStatusCanSchedule,
  flashsalesCouponStatusCanActivate,
  flashsalesCouponStatusCanPause,
  flashsalesCouponStatusCanResume,
  flashsalesCouponStatusCanComplete,
  flashsalesCouponStatusCanExpire,
  flashsalesCouponStatusCanCancel,
  flashsalesCouponStatusCanDelete,
  flashsalesCouponStatusGetAvailabilityLabel,
  flashsalesCouponStatusIsValid,
  flashsalesCouponStatusIsValidAvailability,
} from './flash-sale-coupon-status.constants';

export type {
  FlashSaleCouponStatusType,
  FlashSaleCouponStatusCategory,
  FlashSaleCouponStatusColor,
  FlashSaleCouponStatusPriority,
  FlashSaleCouponAvailability,
} from './flash-sale-coupon-status.constants';
