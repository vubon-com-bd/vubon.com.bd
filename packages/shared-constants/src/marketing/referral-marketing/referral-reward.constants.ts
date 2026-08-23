/**
 * Referral Reward Constants
 * Reward configurations for referrals
 */

export const MARKETINGREFERRAL_REWARD = {
  // Reward Types
  TYPES: {
    CASH: 'cash',
    DISCOUNT: 'discount',
    POINTS: 'points',
    GIFT_CARD: 'gift_card',
    PRODUCT: 'product',
    SERVICE: 'service',
    FREE_SHIPPING: 'free_shipping',
    UPGRADE: 'upgrade',
    SUBSCRIPTION: 'subscription',
    BONUS: 'bonus',
    CASHBACK: 'cashback',
    VOUCHER: 'voucher',
    LOYALTY_POINTS: 'loyalty_points',
    CUSTOM: 'custom',
  } as const,

  // Reward Structures
  STRUCTURES: {
    FLAT: 'flat',
    TIERED: 'tiered',
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    GRADUATED: 'graduated',
    PERFORMANCE: 'performance',
    CUSTOM: 'custom',
  } as const,

  // Reward Triggers
  TRIGGERS: {
    REGISTRATION: 'registration',
    FIRST_PURCHASE: 'first_purchase',
    FIRST_ORDER: 'first_order',
    MINIMUM_ORDER: 'minimum_order',
    QUALIFICATION: 'qualification',
    CONVERSION: 'conversion',
    COMPLETION: 'completion',
    MULTIPLE_REFERRALS: 'multiple_referrals',
    TIER_ACHIEVEMENT: 'tier_achievement',
    MILESTONE: 'milestone',
    BONUS: 'bonus',
  } as const,

  // Reward Levels
  LEVELS: {
    BRONZE: 'bronze',
    SILVER: 'silver',
    GOLD: 'gold',
    PLATINUM: 'platinum',
    DIAMOND: 'diamond',
    ELITE: 'elite',
  } as const,

  // Reward Redemption
  REDEMPTION: {
    IMMEDIATE: 'immediate',
    SCHEDULED: 'scheduled',
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    POINTS_BASED: 'points_based',
    REQUEST_BASED: 'request_based',
  } as const,

  // Reward Eligibility
  ELIGIBILITY: {
    ALL_USERS: 'all_users',
    NEW_USERS: 'new_users',
    EXISTING_USERS: 'existing_users',
    VIP_USERS: 'vip_users',
    LOYALTY_MEMBERS: 'loyalty_members',
    REFERRAL_SOURCE: 'referral_source',
    REFERRAL_TARGET: 'referral_target',
  } as const,

  // Reward Statuses
  STATUSES: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    ON_HOLD: 'on_hold',
    REVERSED: 'reversed',
  } as const,

  // Reward Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'discount',
    DEFAULT_STRUCTURE: 'flat',
    DEFAULT_AMOUNT: 100,
    DEFAULT_PERCENTAGE: 10,
    DEFAULT_POINTS: 100,
    DEFAULT_MINIMUM_REWARDS: 1,
    DEFAULT_MAXIMUM_REWARDS: 10,
    DEFAULT_EXPIRY_DAYS: 30,
    DEFAULT_REDEMPTION: 'automatic',
    DEFAULT_ELIGIBILITY: 'all_users',
  } as const,

  // Reward Limits
  LIMITS: {
    MIN_AMOUNT: 1,
    MAX_AMOUNT: 100000,
    MIN_PERCENTAGE: 1,
    MAX_PERCENTAGE: 100,
    MIN_POINTS: 1,
    MAX_POINTS: 10000,
    MAX_REWARDS_PER_REFERRAL: 5,
    MAX_REWARDS_PER_USER: 100,
  } as const,
} as const;

// Reward Types
export type MarketingReferralRewardType =
  (typeof MARKETINGREFERRAL_REWARD.TYPES)[keyof typeof MARKETINGREFERRAL_REWARD.TYPES];

// Reward Structures
export type MarketingReferralRewardStructure =
  (typeof MARKETINGREFERRAL_REWARD.STRUCTURES)[keyof typeof MARKETINGREFERRAL_REWARD.STRUCTURES];

// Reward Triggers
export type MarketingReferralRewardTrigger =
  (typeof MARKETINGREFERRAL_REWARD.TRIGGERS)[keyof typeof MARKETINGREFERRAL_REWARD.TRIGGERS];

// Reward Levels
export type MarketingReferralRewardLevel =
  (typeof MARKETINGREFERRAL_REWARD.LEVELS)[keyof typeof MARKETINGREFERRAL_REWARD.LEVELS];

// Reward Redemption
export type MarketingReferralRewardRedemption =
  (typeof MARKETINGREFERRAL_REWARD.REDEMPTION)[keyof typeof MARKETINGREFERRAL_REWARD.REDEMPTION];

// Reward Eligibility
export type MarketingReferralRewardEligibility =
  (typeof MARKETINGREFERRAL_REWARD.ELIGIBILITY)[keyof typeof MARKETINGREFERRAL_REWARD.ELIGIBILITY];

// Reward Statuses
export type MarketingReferralRewardStatus =
  (typeof MARKETINGREFERRAL_REWARD.STATUSES)[keyof typeof MARKETINGREFERRAL_REWARD.STATUSES];

// Reward Defaults
export type MarketingReferralRewardDefault =
  (typeof MARKETINGREFERRAL_REWARD.DEFAULTS)[keyof typeof MARKETINGREFERRAL_REWARD.DEFAULTS];

// Reward Limits
export type MarketingReferralRewardLimit =
  (typeof MARKETINGREFERRAL_REWARD.LIMITS)[keyof typeof MARKETINGREFERRAL_REWARD.LIMITS];

// Utility Functions
export function marketingreferralGetRewardTypeLabel(
  rewardType: MarketingReferralRewardType
): string {
  const labels: Record<MarketingReferralRewardType, string> = {
    [MARKETINGREFERRAL_REWARD.TYPES.CASH]: 'Cash',
    [MARKETINGREFERRAL_REWARD.TYPES.DISCOUNT]: 'Discount',
    [MARKETINGREFERRAL_REWARD.TYPES.POINTS]: 'Points',
    [MARKETINGREFERRAL_REWARD.TYPES.GIFT_CARD]: 'Gift Card',
    [MARKETINGREFERRAL_REWARD.TYPES.PRODUCT]: 'Product',
    [MARKETINGREFERRAL_REWARD.TYPES.SERVICE]: 'Service',
    [MARKETINGREFERRAL_REWARD.TYPES.FREE_SHIPPING]: 'Free Shipping',
    [MARKETINGREFERRAL_REWARD.TYPES.UPGRADE]: 'Upgrade',
    [MARKETINGREFERRAL_REWARD.TYPES.SUBSCRIPTION]: 'Subscription',
    [MARKETINGREFERRAL_REWARD.TYPES.BONUS]: 'Bonus',
    [MARKETINGREFERRAL_REWARD.TYPES.CASHBACK]: 'Cashback',
    [MARKETINGREFERRAL_REWARD.TYPES.VOUCHER]: 'Voucher',
    [MARKETINGREFERRAL_REWARD.TYPES.LOYALTY_POINTS]: 'Loyalty Points',
    [MARKETINGREFERRAL_REWARD.TYPES.CUSTOM]: 'Custom Reward',
  };
  return labels[rewardType] || 'Unknown Reward Type';
}

export function marketingreferralGetRewardStructureLabel(
  structure: MarketingReferralRewardStructure
): string {
  const labels: Record<MarketingReferralRewardStructure, string> = {
    [MARKETINGREFERRAL_REWARD.STRUCTURES.FLAT]: 'Flat',
    [MARKETINGREFERRAL_REWARD.STRUCTURES.TIERED]: 'Tiered',
    [MARKETINGREFERRAL_REWARD.STRUCTURES.PERCENTAGE]: 'Percentage',
    [MARKETINGREFERRAL_REWARD.STRUCTURES.FIXED_AMOUNT]: 'Fixed Amount',
    [MARKETINGREFERRAL_REWARD.STRUCTURES.GRADUATED]: 'Graduated',
    [MARKETINGREFERRAL_REWARD.STRUCTURES.PERFORMANCE]: 'Performance Based',
    [MARKETINGREFERRAL_REWARD.STRUCTURES.CUSTOM]: 'Custom',
  };
  return labels[structure] || 'Unknown Structure';
}

export function marketingreferralGetRewardTriggerLabel(
  trigger: MarketingReferralRewardTrigger
): string {
  const labels: Record<MarketingReferralRewardTrigger, string> = {
    [MARKETINGREFERRAL_REWARD.TRIGGERS.REGISTRATION]: 'Registration',
    [MARKETINGREFERRAL_REWARD.TRIGGERS.FIRST_PURCHASE]: 'First Purchase',
    [MARKETINGREFERRAL_REWARD.TRIGGERS.FIRST_ORDER]: 'First Order',
    [MARKETINGREFERRAL_REWARD.TRIGGERS.MINIMUM_ORDER]: 'Minimum Order',
    [MARKETINGREFERRAL_REWARD.TRIGGERS.QUALIFICATION]: 'Qualification',
    [MARKETINGREFERRAL_REWARD.TRIGGERS.CONVERSION]: 'Conversion',
    [MARKETINGREFERRAL_REWARD.TRIGGERS.COMPLETION]: 'Completion',
    [MARKETINGREFERRAL_REWARD.TRIGGERS.MULTIPLE_REFERRALS]: 'Multiple Referrals',
    [MARKETINGREFERRAL_REWARD.TRIGGERS.TIER_ACHIEVEMENT]: 'Tier Achievement',
    [MARKETINGREFERRAL_REWARD.TRIGGERS.MILESTONE]: 'Milestone',
    [MARKETINGREFERRAL_REWARD.TRIGGERS.BONUS]: 'Bonus',
  };
  return labels[trigger] || 'Unknown Trigger';
}

export function marketingreferralGetRewardLevelLabel(level: MarketingReferralRewardLevel): string {
  const labels: Record<MarketingReferralRewardLevel, string> = {
    [MARKETINGREFERRAL_REWARD.LEVELS.BRONZE]: 'Bronze',
    [MARKETINGREFERRAL_REWARD.LEVELS.SILVER]: 'Silver',
    [MARKETINGREFERRAL_REWARD.LEVELS.GOLD]: 'Gold',
    [MARKETINGREFERRAL_REWARD.LEVELS.PLATINUM]: 'Platinum',
    [MARKETINGREFERRAL_REWARD.LEVELS.DIAMOND]: 'Diamond',
    [MARKETINGREFERRAL_REWARD.LEVELS.ELITE]: 'Elite',
  };
  return labels[level] || 'Unknown Level';
}

export function marketingreferralGetRewardRedemptionLabel(
  redemption: MarketingReferralRewardRedemption
): string {
  const labels: Record<MarketingReferralRewardRedemption, string> = {
    [MARKETINGREFERRAL_REWARD.REDEMPTION.IMMEDIATE]: 'Immediate',
    [MARKETINGREFERRAL_REWARD.REDEMPTION.SCHEDULED]: 'Scheduled',
    [MARKETINGREFERRAL_REWARD.REDEMPTION.MANUAL]: 'Manual',
    [MARKETINGREFERRAL_REWARD.REDEMPTION.AUTOMATIC]: 'Automatic',
    [MARKETINGREFERRAL_REWARD.REDEMPTION.POINTS_BASED]: 'Points Based',
    [MARKETINGREFERRAL_REWARD.REDEMPTION.REQUEST_BASED]: 'Request Based',
  };
  return labels[redemption] || 'Unknown Redemption';
}

export function marketingreferralGetRewardEligibilityLabel(
  eligibility: MarketingReferralRewardEligibility
): string {
  const labels: Record<MarketingReferralRewardEligibility, string> = {
    [MARKETINGREFERRAL_REWARD.ELIGIBILITY.ALL_USERS]: 'All Users',
    [MARKETINGREFERRAL_REWARD.ELIGIBILITY.NEW_USERS]: 'New Users',
    [MARKETINGREFERRAL_REWARD.ELIGIBILITY.EXISTING_USERS]: 'Existing Users',
    [MARKETINGREFERRAL_REWARD.ELIGIBILITY.VIP_USERS]: 'VIP Users',
    [MARKETINGREFERRAL_REWARD.ELIGIBILITY.LOYALTY_MEMBERS]: 'Loyalty Members',
    [MARKETINGREFERRAL_REWARD.ELIGIBILITY.REFERRAL_SOURCE]: 'Referral Source',
    [MARKETINGREFERRAL_REWARD.ELIGIBILITY.REFERRAL_TARGET]: 'Referral Target',
  };
  return labels[eligibility] || 'Unknown Eligibility';
}

export function marketingreferralGetRewardStatusLabel(
  status: MarketingReferralRewardStatus
): string {
  const labels: Record<MarketingReferralRewardStatus, string> = {
    [MARKETINGREFERRAL_REWARD.STATUSES.PENDING]: 'Pending',
    [MARKETINGREFERRAL_REWARD.STATUSES.APPROVED]: 'Approved',
    [MARKETINGREFERRAL_REWARD.STATUSES.REJECTED]: 'Rejected',
    [MARKETINGREFERRAL_REWARD.STATUSES.PROCESSING]: 'Processing',
    [MARKETINGREFERRAL_REWARD.STATUSES.COMPLETED]: 'Completed',
    [MARKETINGREFERRAL_REWARD.STATUSES.FAILED]: 'Failed',
    [MARKETINGREFERRAL_REWARD.STATUSES.CANCELLED]: 'Cancelled',
    [MARKETINGREFERRAL_REWARD.STATUSES.EXPIRED]: 'Expired',
    [MARKETINGREFERRAL_REWARD.STATUSES.ON_HOLD]: 'On Hold',
    [MARKETINGREFERRAL_REWARD.STATUSES.REVERSED]: 'Reversed',
  };
  return labels[status] || 'Unknown Status';
}

export function marketingreferralGetDefaultRewardAmount(): number {
  return MARKETINGREFERRAL_REWARD.DEFAULTS.DEFAULT_AMOUNT;
}

export function marketingreferralGetDefaultPercentage(): number {
  return MARKETINGREFERRAL_REWARD.DEFAULTS.DEFAULT_PERCENTAGE;
}

export function marketingreferralGetDefaultPoints(): number {
  return MARKETINGREFERRAL_REWARD.DEFAULTS.DEFAULT_POINTS;
}

export function marketingreferralIsCashReward(rewardType: MarketingReferralRewardType): boolean {
  const cashRewards: MarketingReferralRewardType[] = [
    MARKETINGREFERRAL_REWARD.TYPES.CASH,
    MARKETINGREFERRAL_REWARD.TYPES.CASHBACK,
  ];
  return cashRewards.includes(rewardType);
}

export function marketingreferralIsDiscountReward(
  rewardType: MarketingReferralRewardType
): boolean {
  const discountRewards: MarketingReferralRewardType[] = [
    MARKETINGREFERRAL_REWARD.TYPES.DISCOUNT,
    MARKETINGREFERRAL_REWARD.TYPES.VOUCHER,
    MARKETINGREFERRAL_REWARD.TYPES.GIFT_CARD,
  ];
  return discountRewards.includes(rewardType);
}

export function marketingreferralIsPointsReward(rewardType: MarketingReferralRewardType): boolean {
  const pointsRewards: MarketingReferralRewardType[] = [
    MARKETINGREFERRAL_REWARD.TYPES.POINTS,
    MARKETINGREFERRAL_REWARD.TYPES.LOYALTY_POINTS,
  ];
  return pointsRewards.includes(rewardType);
}

export function marketingreferralCalculateReward(
  baseAmount: number,
  rewardType: MarketingReferralRewardType,
  rate: number
): number {
  if (rewardType === MARKETINGREFERRAL_REWARD.TYPES.CASH) {
    return baseAmount * (rate / 100);
  }
  if (rewardType === MARKETINGREFERRAL_REWARD.TYPES.DISCOUNT) {
    return baseAmount * (rate / 100);
  }
  if (rewardType === MARKETINGREFERRAL_REWARD.TYPES.POINTS) {
    return baseAmount * rate;
  }
  return 0;
}
