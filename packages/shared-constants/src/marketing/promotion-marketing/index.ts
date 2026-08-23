/**
 * Promotion Marketing Constants Index
 * Export all promotion marketing constants and types for easy importing
 */

// Promotion Constants
export {
  MARKETINGPROMOTION,
  marketingpromotionGetTypeLabel,
  marketingpromotionGetScopeLabel,
  marketingpromotionGetChannelLabel,
  marketingpromotionGetDurationLabel,
  marketingpromotionGetRedemptionLimitLabel,
  marketingpromotionGetPriorityLabel,
  marketingpromotionIsStackable,
  marketingpromotionIsLimited,
  marketingpromotionGetDefaultDuration,
  marketingpromotionGetDefaultPriority,
  marketingpromotionGetDefaultUsageLimit,
} from './promotion.constants';

export type {
  MarketingPromotionType,
  MarketingPromotionScope,
  MarketingPromotionChannel,
  MarketingPromotionPriority,
  MarketingPromotionDuration,
  MarketingPromotionRedemptionLimit,
  MarketingPromotionDefault,
  MarketingPromotionLimit,
} from './promotion.constants';

// Promotion Type Constants
export {
  MARKETINGPROMOTION_TYPE,
  marketingpromotionGetCategoryLabel,
  marketingpromotionGetDiscountTypeLabel,
  marketingpromotionGetTriggerLabel,
  marketingpromotionGetFrequencyLabel,
  marketingpromotionGetMechanicLabel,
  marketingpromotionIsPriceBased,
  marketingpromotionIsProductBased,
} from './promotion-type.constants';

export type {
  MarketingPromotionCategory,
  MarketingPromotionDiscountType,
  MarketingPromotionTrigger,
  MarketingPromotionFrequency,
  MarketingPromotionMechanic,
} from './promotion-type.constants';

// Promotion Status Constants
export {
  MARKETINGPROMOTION_STATUS,
  marketingpromotionGetStatusLabel,
  marketingpromotionGetStatusColor,
  marketingpromotionGetStatusOrder,
  marketingpromotionIsActiveStatus,
  marketingpromotionIsPausedStatus,
  marketingpromotionIsEndedStatus,
  marketingpromotionIsEditableStatus,
  marketingpromotionCanTransition,
} from './promotion-status.constants';

export type {
  MarketingPromotionStatusType,
  MarketingPromotionStatusColor,
  MarketingPromotionStatusOrder,
  MarketingPromotionStatusTransition,
} from './promotion-status.constants';

// Promotion Discount Type Constants
export {
  MARKETINGPROMOTION_DISCOUNT,
  marketingpromotionGetDiscountCalculationLabel,
  marketingpromotionGetDiscountLevelLabel,
  marketingpromotionGetDiscountEligibilityLabel,
  marketingpromotionGetDiscountValidityLabel,
  marketingpromotionGetDiscountCombinationLabel,
  marketingpromotionIsPercentageDiscount,
  marketingpromotionIsFixedDiscount,
  marketingpromotionIsTieredDiscount,
  marketingpromotionGetDefaultPercentage,
  marketingpromotionGetMaxPercentage,
} from './promotion-discount-type.constants';

export type {
  MarketingPromotionDiscountTypeType,
  MarketingPromotionDiscountCalculation,
  MarketingPromotionDiscountLevel,
  MarketingPromotionDiscountEligibility,
  MarketingPromotionDiscountValidity,
  MarketingPromotionDiscountCombination,
  MarketingPromotionDiscountDefault,
} from './promotion-discount-type.constants';

// Promotion Restriction Constants
export {
  MARKETINGPROMOTION_RESTRICTION,
  marketingpromotionGetRestrictionTypeLabel,
  marketingpromotionGetRestrictionOperatorLabel,
  marketingpromotionGetRestrictionConditionLabel,
  marketingpromotionGetRestrictionActionLabel,
  marketingpromotionIsOrderRestriction,
  marketingpromotionIsProductRestriction,
  marketingpromotionIsCustomerRestriction,
  marketingpromotionIsTimeRestriction,
  marketingpromotionGetDefaultOperator,
  marketingpromotionGetDefaultCondition,
} from './promotion-restriction.constants';

export type {
  MarketingPromotionRestrictionType,
  MarketingPromotionRestrictionOperator,
  MarketingPromotionRestrictionCondition,
  MarketingPromotionRestrictionPriority,
  MarketingPromotionRestrictionAction,
  MarketingPromotionRestrictionDefault,
} from './promotion-restriction.constants';

// Promotion Target Constants
export {
  MARKETINGPROMOTION_TARGET,
  marketingpromotionGetTargetTypeLabel,
  marketingpromotionGetTargetDemographicLabel,
  marketingpromotionGetTargetGeographyLabel,
  marketingpromotionGetTargetBehaviorLabel,
  marketingpromotionGetTargetDeviceLabel,
  marketingpromotionGetTargetOSLabel,
  marketingpromotionGetTargetChannelLabel,
  marketingpromotionGetDefaultTargetType,
  marketingpromotionGetDefaultRadius,
  marketingpromotionGetMaxTargetSegments,
  marketingpromotionIsValueTarget,
  marketingpromotionIsBehaviorTarget,
} from './promotion-target.constants';

export type {
  MarketingPromotionTargetType,
  MarketingPromotionTargetDemographic,
  MarketingPromotionTargetGeography,
  MarketingPromotionTargetBehavior,
  MarketingPromotionTargetDevice,
  MarketingPromotionTargetOS,
  MarketingPromotionTargetChannel,
  MarketingPromotionTargetDefault,
} from './promotion-target.constants';
