/**
 * Product Deal Constants Index
 * Export all product deal constants and types for easy importing
 */

// Product Deal Constants
export {
  PRODUCT_DEAL,
  flashsalesProductDealGetTypeLabel,
  flashsalesProductDealGetCategoryLabel,
  flashsalesProductDealGetScopeLabel,
  flashsalesProductDealGetApplicationLabel,
  flashsalesProductDealGetConditionLabel,
  flashsalesProductDealIsValidType,
  flashsalesProductDealIsValidScope,
  flashsalesProductDealGetDefaultMaxDiscount,
  flashsalesProductDealGetDefaultMaxFixedAmount,
  flashsalesProductDealGetMaxProducts,
  flashsalesProductDealGetMaxVariants,
} from './product-deal.constants';

export type {
  ProductDealType,
  ProductDealCategory,
  ProductDealScope,
  ProductDealApplication,
  ProductDealCondition,
} from './product-deal.constants';

// Product Deal Status Constants
export {
  PRODUCT_DEAL_STATUS,
  flashsalesProductDealStatusGetLabel,
  flashsalesProductDealStatusGetCategory,
  flashsalesProductDealStatusGetColor,
  flashsalesProductDealStatusGetPriority,
  flashsalesProductDealStatusIsActive,
  flashsalesProductDealStatusIsScheduled,
  flashsalesProductDealStatusIsComplete,
  flashsalesProductDealStatusCanTransitionTo,
  flashsalesProductDealStatusGetAvailableTransitions,
  flashsalesProductDealStatusCanStart,
  flashsalesProductDealStatusCanPause,
  flashsalesProductDealStatusCanResume,
  flashsalesProductDealStatusCanEnd,
  flashsalesProductDealStatusCanCancel,
  flashsalesProductDealStatusIsValid,
} from './product-deal-status.constants';

export type {
  ProductDealStatusType,
  ProductDealStatusCategory,
  ProductDealStatusColor,
  ProductDealStatusPriority,
} from './product-deal-status.constants';
