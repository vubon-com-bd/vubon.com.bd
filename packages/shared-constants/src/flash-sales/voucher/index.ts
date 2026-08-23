/**
 * Flash Sale Voucher Constants Index
 * Export all voucher constants and types for easy importing
 */

// Flash Sale Voucher Constants
export {
  FLASH_SALE_VOUCHER,
  flashsalesVoucherGetTypeLabel,
  flashsalesVoucherGetCategoryLabel,
  flashsalesVoucherGetDenominationLabel,
  flashsalesVoucherGetValueTypeLabel,
  flashsalesVoucherGetRedemptionLabel,
  flashsalesVoucherGetExpiryLabel,
  flashsalesVoucherGetTransferLabel,
  flashsalesVoucherIsValidType,
  flashsalesVoucherIsValidCategory,
  flashsalesVoucherGetDefaultDenomination,
  flashsalesVoucherGetDefaultValidityDays,
  flashsalesVoucherGetDefaultCodeLength,
  flashsalesVoucherGetMaxValue,
  flashsalesVoucherGetMinValue,
  flashsalesVoucherGetMaxRedemptions,
  flashsalesVoucherGetMaxCodeLength,
  flashsalesVoucherGetMinCodeLength,
  flashsalesVoucherGetMaxBulkGeneration,
  flashsalesVoucherGenerateRandomCode,
} from './flash-sale-voucher.constants';

export type {
  FlashSaleVoucherType,
  FlashSaleVoucherCategory,
  FlashSaleVoucherDenomination,
  FlashSaleVoucherValueType,
  FlashSaleVoucherRedemption,
  FlashSaleVoucherExpiry,
  FlashSaleVoucherTransfer,
} from './flash-sale-voucher.constants';

// Flash Sale Voucher Type Constants
export {
  FLASH_SALE_VOUCHER_TYPE,
  flashsalesVoucherTypeGetCategoryLabel,
  flashsalesVoucherTypeGetComplexityLabel,
  flashsalesVoucherTypeGetScopeLabel,
  flashsalesVoucherTypeGetFrequencyLabel,
  flashsalesVoucherTypeGetTriggerLabel,
  flashsalesVoucherTypeGetUsageLabel,
  flashsalesVoucherTypeGetPriorityLabel,
  flashsalesVoucherTypeIsValidCategory,
  flashsalesVoucherTypeIsValidScope,
  flashsalesVoucherTypeIsValidTrigger,
  flashsalesVoucherTypeIsRecurring,
  flashsalesVoucherTypeIsOneTime,
  flashsalesVoucherTypeIsHighPriority,
} from './flash-sale-voucher-type.constants';

export type {
  FlashSaleVoucherTypeCategory,
  FlashSaleVoucherTypeComplexity,
  FlashSaleVoucherTypeScope,
  FlashSaleVoucherTypeFrequency,
  FlashSaleVoucherTypeTrigger,
  FlashSaleVoucherTypeUsage,
  FlashSaleVoucherTypePriority,
} from './flash-sale-voucher-type.constants';

// Flash Sale Voucher Status Constants
export {
  FLASH_SALE_VOUCHER_STATUS,
  flashsalesVoucherStatusGetLabel,
  flashsalesVoucherStatusGetCategory,
  flashsalesVoucherStatusGetColor,
  flashsalesVoucherStatusGetPriority,
  flashsalesVoucherStatusIsActive,
  flashsalesVoucherStatusIsAvailable,
  flashsalesVoucherStatusIsRedeemed,
  flashsalesVoucherStatusIsTerminated,
  flashsalesVoucherStatusCanTransitionTo,
  flashsalesVoucherStatusGetAvailableTransitions,
  flashsalesVoucherStatusCanApprove,
  flashsalesVoucherStatusCanReject,
  flashsalesVoucherStatusCanSchedule,
  flashsalesVoucherStatusCanActivate,
  flashsalesVoucherStatusCanPause,
  flashsalesVoucherStatusCanResume,
  flashsalesVoucherStatusCanRedeem,
  flashsalesVoucherStatusCanPartialRedeem,
  flashsalesVoucherStatusCanComplete,
  flashsalesVoucherStatusCanExpire,
  flashsalesVoucherStatusCanCancel,
  flashsalesVoucherStatusCanDelete,
  flashsalesVoucherStatusGetAvailabilityLabel,
  flashsalesVoucherStatusIsValid,
  flashsalesVoucherStatusIsValidAvailability,
} from './flash-sale-voucher-status.constants';

export type {
  FlashSaleVoucherStatusType,
  FlashSaleVoucherStatusCategory,
  FlashSaleVoucherStatusColor,
  FlashSaleVoucherStatusPriority,
  FlashSaleVoucherAvailability,
} from './flash-sale-voucher-status.constants';
