/**
 * Deal Constants Index
 * Export all deal constants and types for easy importing
 */

// Deal Constants
export {
  DEAL,
  flashsalesDealGetTypeLabel,
  flashsalesDealGetCategoryLabel,
  flashsalesDealGetChannelLabel,
  flashsalesDealIsValidType,
  flashsalesDealIsValidCategory,
  flashsalesDealGetDefaultMaxUses,
  flashsalesDealGetDefaultMaxUsesPerUser,
  flashsalesDealGetMaxDiscountPercentage,
  flashsalesDealGetMaxFixedAmount,
} from './deal.constants';

export type { DealType, DealCategory, DealChannel } from './deal.constants';

// Deal Type Constants
export {
  DEAL_TYPE,
  flashsalesDealTypeGetCategoryLabel,
  flashsalesDealTypeGetComplexityLabel,
  flashsalesDealTypeGetScopeLabel,
  flashsalesDealTypeGetFrequencyLabel,
  flashsalesDealTypeGetTriggerLabel,
  flashsalesDealTypeGetDurationLabel,
  flashsalesDealTypeGetDurationHours,
  flashsalesDealTypeIsValidCategory,
  flashsalesDealTypeIsValidScope,
} from './deal-type.constants';

export type {
  DealTypeCategory,
  DealTypeComplexity,
  DealTypeScope,
  DealTypeFrequency,
  DealTypeTrigger,
  DealTypeDuration,
} from './deal-type.constants';

// Deal Status Constants
export {
  DEAL_STATUS,
  flashsalesDealStatusGetLabel,
  flashsalesDealStatusGetCategory,
  flashsalesDealStatusGetColor,
  flashsalesDealStatusGetPriority,
  flashsalesDealStatusIsActive,
  flashsalesDealStatusIsScheduled,
  flashsalesDealStatusIsComplete,
  flashsalesDealStatusCanTransitionTo,
  flashsalesDealStatusGetAvailableTransitions,
  flashsalesDealStatusIsValid,
} from './deal-status.constants';

export type {
  DealStatusType,
  DealStatusCategory,
  DealStatusColor,
  DealStatusPriority,
} from './deal-status.constants';

// Deal Priority Constants
export {
  DEAL_PRIORITY,
  flashsalesDealPriorityGetLevelLabel,
  flashsalesDealPriorityGetScore,
  flashsalesDealPriorityGetColor,
  flashsalesDealPriorityGetSLATarget,
  flashsalesDealPriorityGetResourceAllocation,
  flashsalesDealPriorityGetWeight,
  flashsalesDealPriorityIsUrgent,
  flashsalesDealPriorityIsHigh,
  flashsalesDealPriorityIsLow,
  flashsalesDealPriorityIsValid,
  flashsalesDealPriorityGetPriorityFromScore,
} from './deal-priority.constants';

export type {
  DealPriorityLevel,
  DealPriorityScore,
  DealPriorityColor,
  DealPrioritySLATarget,
  DealPriorityResourceAllocation,
  DealPriorityWeight,
} from './deal-priority.constants';

// Deal Discount Type Constants
export {
  DEAL_DISCOUNT_TYPE,
  flashsalesDealDiscountTypeGetTypeLabel,
  flashsalesDealDiscountTypeGetCalculationLabel,
  flashsalesDealDiscountTypeGetApplicationLabel,
  flashsalesDealDiscountTypeGetTierTypeLabel,
  flashsalesDealDiscountTypeIsValidType,
  flashsalesDealDiscountTypeIsValidApplication,
} from './deal-discount-type.constants';

export type {
  DealDiscountTypeType,
  DealDiscountCalculation,
  DealDiscountApplication,
  DealDiscountTierType,
} from './deal-discount-type.constants';

// Deal Restriction Constants
export {
  DEAL_RESTRICTION,
  flashsalesDealRestrictionGetTypeLabel,
  flashsalesDealRestrictionGetConditionLabel,
  flashsalesDealRestrictionGetOperatorLabel,
  flashsalesDealRestrictionGetValidationLabel,
  flashsalesDealRestrictionIsValidType,
  flashsalesDealRestrictionIsValidOperator,
} from './deal-restriction.constants';

export type {
  DealRestrictionType,
  DealRestrictionCondition,
  DealRestrictionOperator,
  DealRestrictionValidation,
} from './deal-restriction.constants';

// Deal Target Constants
export {
  DEAL_TARGET,
  flashsalesDealTargetGetTypeLabel,
  flashsalesDealTargetGetSegmentLabel,
  flashsalesDealTargetGetCriteriaLabel,
  flashsalesDealTargetGetPriorityLabel,
  flashsalesDealTargetIsValidType,
  flashsalesDealTargetIsValidSegment,
  flashsalesDealTargetIsHighValue,
  flashsalesDealTargetIsNewCustomer,
} from './deal-target.constants';

export type {
  DealTargetType,
  DealTargetSegment,
  DealTargetCriteria,
  DealTargetPriority,
} from './deal-target.constants';
