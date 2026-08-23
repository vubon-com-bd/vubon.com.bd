/**
 * Loyalty Marketing Constants Index
 * Export all loyalty marketing constants and types for easy importing
 */

// Loyalty Constants
export {
  MARKETINGLOYALTY,
  marketingloyaltyGetProgramLabel,
  marketingloyaltyGetTypeLabel,
  marketingloyaltyGetSourceLabel,
  marketingloyaltyGetDefaultPointsPerPurchase,
  marketingloyaltyGetDefaultPointsExpiryDays,
  marketingloyaltyGetDefaultInactivityDays,
  marketingloyaltyIsInactiveStatus,
} from './loyalty.constants';

export type {
  MarketingLoyaltyProgram,
  MarketingLoyaltyType,
  MarketingLoyaltyStatus,
  MarketingLoyaltySource,
  MarketingLoyaltyDefault,
  MarketingLoyaltyLimit,
} from './loyalty.constants';

// Loyalty Status Constants
export {
  MARKETINGLOYALTY_STATUS,
  marketingloyaltyGetStatusColor,
  marketingloyaltyGetStatusCategory,
  marketingloyaltyIsPendingStatus,
  marketingloyaltyCanTransition,
} from './loyalty-status.constants';

export type {
  MarketingLoyaltyStatusType,
  MarketingLoyaltyStatusColor,
  MarketingLoyaltyStatusCategory,
  MarketingLoyaltyStatusOrder,
  MarketingLoyaltyStatusTransition,
} from './loyalty-status.constants';

// Loyalty Type Constants
export {
  MARKETINGLOYALTY_TYPE,
  marketingloyaltyGetCategoryLabel,
  marketingloyaltyGetSubTypeLabel,
  marketingloyaltyGetModelLabel,
  marketingloyaltyGetEngagementLevelLabel,
  marketingloyaltyGetParticipationTypeLabel,
  marketingloyaltyIsPointsBased,
  marketingloyaltyIsTierBased,
  marketingloyaltyIsCashbackBased,
  marketingloyaltyIsMembershipBased,
} from './loyalty-type.constants';

export type {
  MarketingLoyaltyCategory,
  MarketingLoyaltySubType,
  MarketingLoyaltyModel,
  MarketingLoyaltyEngagementLevel,
  MarketingLoyaltyParticipationType,
} from './loyalty-type.constants';

// Loyalty Points Constants
export {
  MARKETINGLOYALTY_POINTS,
  marketingloyaltyGetPointsTypeLabel,
  marketingloyaltyGetEarningMethodLabel,
  marketingloyaltyGetBurningMethodLabel,
  marketingloyaltyGetPointsStatusLabel,
  marketingloyaltyGetPointsCalculationLabel,
  marketingloyaltyGetPointsValidityLabel,
  marketingloyaltyGetDefaultEarnRate,
  marketingloyaltyGetDefaultBurnRate,
  marketingloyaltyGetDefaultValidityDays,
  marketingloyaltyCalculateEarnPoints,
  marketingloyaltyIsPointsEarning,
  marketingloyaltyIsPointsBurning,
} from './loyalty-points.constants';

export type {
  MarketingLoyaltyPointsType,
  MarketingLoyaltyEarningMethod,
  MarketingLoyaltyBurningMethod,
  MarketingLoyaltyPointsStatus,
  MarketingLoyaltyPointsCalculation,
  MarketingLoyaltyPointsValidity,
  MarketingLoyaltyPointsLimit,
  MarketingLoyaltyPointsDefault,
} from './loyalty-points.constants';

// Loyalty Tier Constants
export {
  MARKETINGLOYALTY_TIER,
  marketingloyaltyGetTierLevelLabel,
  marketingloyaltyGetTierTypeLabel,
  marketingloyaltyGetTierRequirementLabel,
  marketingloyaltyGetTierBenefitLabel,
  marketingloyaltyGetTierStatusLabel,
  marketingloyaltyGetTierColor,
  marketingloyaltyGetTierByPoints,
  marketingloyaltyIsTopTier,
  marketingloyaltyIsMidTier,
} from './loyalty-tier.constants';

export type {
  MarketingLoyaltyTierLevel,
  MarketingLoyaltyTierType,
  MarketingLoyaltyTierRequirement,
  MarketingLoyaltyTierBenefit,
  MarketingLoyaltyTierStatus,
  MarketingLoyaltyTierColor,
  MarketingLoyaltyTierDefault,
  MarketingLoyaltyTierLimit,
} from './loyalty-tier.constants';

// Loyalty Reward Constants
export {
  MARKETINGLOYALTY_REWARD,
  marketingloyaltyGetRewardTypeLabel,
  marketingloyaltyGetRewardCategoryLabel,
  marketingloyaltyGetRewardStatusLabel,
  marketingloyaltyGetRewardRedemptionMethodLabel,
  marketingloyaltyGetRewardFrequencyLabel,
  marketingloyaltyGetRewardVisibilityLabel,
  marketingloyaltyGetDefaultPointsRequired,
  marketingloyaltyGetDefaultExpiryDays,
  marketingloyaltyIsDiscountReward,
  marketingloyaltyIsPhysicalReward,
  marketingloyaltyIsDigitalReward,
  marketingloyaltyCalculatePointsToRedeem,
} from './loyalty-reward.constants';

export type {
  MarketingLoyaltyRewardType,
  MarketingLoyaltyRewardCategory,
  MarketingLoyaltyRewardStatus,
  MarketingLoyaltyRewardRedemptionMethod,
  MarketingLoyaltyRewardFrequency,
  MarketingLoyaltyRewardVisibility,
  MarketingLoyaltyRewardDefault,
  MarketingLoyaltyRewardLimit,
} from './loyalty-reward.constants';

// Note: MarketingLoyaltyStatus, MarketingLoyaltyStatusLabel,
// marketingloyaltyGetStatusLabel, marketingloyaltyIsActiveStatus,
// marketingloyaltyIsTerminatedStatus are already exported from loyalty.constants
// To avoid duplicate export, we don't re-export them here
