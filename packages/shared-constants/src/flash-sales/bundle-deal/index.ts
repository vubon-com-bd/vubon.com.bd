/**
 * Bundle Deal Constants Index
 * Export all bundle deal constants and types for easy importing
 */

// Bundle Deal Constants
export {
  BUNDLE_DEAL,
  flashsalesBundleDealGetTypeLabel,
  flashsalesBundleDealGetCategoryLabel,
  flashsalesBundleDealGetCompositionLabel,
  flashsalesBundleDealGetPricingLabel,
  flashsalesBundleDealGetRuleLabel,
  flashsalesBundleDealIsValidType,
  flashsalesBundleDealIsValidCategory,
  flashsalesBundleDealGetDefaultMaxItems,
  flashsalesBundleDealGetDefaultMinItems,
  flashsalesBundleDealGetDefaultDiscount,
  flashsalesBundleDealGetMaxDiscount,
  flashsalesBundleDealGetMaxItemsLimit,
} from './bundle-deal.constants';

export type {
  BundleDealType,
  BundleDealCategory,
  BundleDealComposition,
  BundleDealPricing,
  BundleDealRule,
} from './bundle-deal.constants';

// Bundle Deal Type Constants
export {
  BUNDLE_DEAL_TYPE,
  flashsalesBundleDealTypeGetCategoryLabel,
  flashsalesBundleDealTypeGetComplexityLabel,
  flashsalesBundleDealTypeGetScopeLabel,
  flashsalesBundleDealTypeGetAudienceLabel,
  flashsalesBundleDealTypeGetFrequencyLabel,
  flashsalesBundleDealTypeGetTriggerLabel,
  flashsalesBundleDealTypeGetDurationLabel,
  flashsalesBundleDealTypeGetDurationHours,
  flashsalesBundleDealTypeIsValidCategory,
  flashsalesBundleDealTypeIsValidAudience,
} from './bundle-deal-type.constants';

export type {
  BundleDealTypeCategory,
  BundleDealTypeComplexity,
  BundleDealTypeScope,
  BundleDealTypeAudience,
  BundleDealTypeFrequency,
  BundleDealTypeTrigger,
  BundleDealTypeDuration,
} from './bundle-deal-type.constants';

// Bundle Deal Status Constants
export {
  BUNDLE_DEAL_STATUS,
  flashsalesBundleDealStatusGetLabel,
  flashsalesBundleDealStatusGetCategory,
  flashsalesBundleDealStatusGetColor,
  flashsalesBundleDealStatusGetPriority,
  flashsalesBundleDealStatusIsActive,
  flashsalesBundleDealStatusIsScheduled,
  flashsalesBundleDealStatusIsComplete,
  flashsalesBundleDealStatusCanTransitionTo,
  flashsalesBundleDealStatusGetAvailableTransitions,
  flashsalesBundleDealStatusCanStart,
  flashsalesBundleDealStatusCanPause,
  flashsalesBundleDealStatusCanResume,
  flashsalesBundleDealStatusCanEnd,
  flashsalesBundleDealStatusCanCancel,
  flashsalesBundleDealStatusIsValid,
} from './bundle-deal-status.constants';

export type {
  BundleDealStatusType,
  BundleDealStatusCategory,
  BundleDealStatusColor,
  BundleDealStatusPriority,
} from './bundle-deal-status.constants';
