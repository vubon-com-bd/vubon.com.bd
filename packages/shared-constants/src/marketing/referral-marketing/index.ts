/**
 * Referral Marketing Constants Index
 * Export all referral marketing constants and types for easy importing
 */

// Referral Constants
export {
  MARKETINGREFERRAL,
  marketingreferralGetTypeLabel,
  marketingreferralGetSourceLabel,
  marketingreferralGetProgramLabel,
  marketingreferralGetMethodLabel,
  marketingreferralGetTierLabel,
  marketingreferralGetDefaultExpiryDays,
  marketingreferralGetDefaultCookieDuration,
  marketingreferralIsCompleted,
  marketingreferralIsActive,
  marketingreferralIsValidReferral,
} from './referral.constants';

export type {
  MarketingReferralType,
  MarketingReferralSource,
  MarketingReferralProgram,
  MarketingReferralMethod,
  MarketingReferralStatus,
  MarketingReferralTier,
  MarketingReferralDefault,
  MarketingReferralLimit,
} from './referral.constants';

// Referral Status Constants
export {
  MARKETINGREFERRAL_STATUS,
  marketingreferralGetStatusColor,
  marketingreferralGetStatusCategory,
  marketingreferralIsCompletedStatus,
  marketingreferralIsInProgressStatus,
  marketingreferralIsFailedStatus,
  marketingreferralCanTransition,
} from './referral-status.constants';

export type {
  MarketingReferralStatusType,
  MarketingReferralStatusColor,
  MarketingReferralStatusCategory,
  MarketingReferralStatusOrder,
  MarketingReferralStatusTransition,
} from './referral-status.constants';

// Referral Type Constants
export {
  MARKETINGREFERRAL_TYPE,
  marketingreferralGetCategoryLabel,
  marketingreferralGetSubTypeLabel,
  marketingreferralGetRelationshipLabel,
  marketingreferralGetIntentionLabel,
  marketingreferralGetChannelLabel,
  marketingreferralIsCustomerCategory,
  marketingreferralIsBusinessCategory,
  marketingreferralIsProfessionalCategory,
} from './referral-type.constants';

export type {
  MarketingReferralCategory,
  MarketingReferralSubType,
  MarketingReferralRelationship,
  MarketingReferralIntention,
  MarketingReferralChannel,
} from './referral-type.constants';

// Referral Reward Constants
export {
  MARKETINGREFERRAL_REWARD,
  marketingreferralGetRewardTypeLabel,
  marketingreferralGetRewardStructureLabel,
  marketingreferralGetRewardTriggerLabel,
  marketingreferralGetRewardLevelLabel,
  marketingreferralGetRewardRedemptionLabel,
  marketingreferralGetRewardEligibilityLabel,
  marketingreferralGetRewardStatusLabel,
  marketingreferralGetDefaultPercentage,
  marketingreferralGetDefaultPoints,
  marketingreferralIsCashReward,
  marketingreferralIsDiscountReward,
  marketingreferralIsPointsReward,
  marketingreferralCalculateReward,
} from './referral-reward.constants';

export type {
  MarketingReferralRewardType,
  MarketingReferralRewardStructure,
  MarketingReferralRewardTrigger,
  MarketingReferralRewardLevel,
  MarketingReferralRewardRedemption,
  MarketingReferralRewardEligibility,
  MarketingReferralRewardStatus,
  MarketingReferralRewardDefault,
  MarketingReferralRewardLimit,
} from './referral-reward.constants';

// Note: marketingreferralGetStatusLabel and marketingreferralGetDefaultRewardAmount
// are exported from referral.constants to avoid duplication
