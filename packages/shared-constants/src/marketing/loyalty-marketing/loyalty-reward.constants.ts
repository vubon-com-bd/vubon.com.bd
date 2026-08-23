/**
 * Loyalty Reward Constants
 * Reward configurations for loyalty programs
 */

export const MARKETINGLOYALTY_REWARD = {
  // Reward Types
  TYPES: {
    DISCOUNT: 'discount',
    PRODUCT: 'product',
    SERVICE: 'service',
    GIFT_CARD: 'gift_card',
    FREE_SHIPPING: 'free_shipping',
    UPGRADE: 'upgrade',
    SUBSCRIPTION: 'subscription',
    POINTS_BONUS: 'points_bonus',
    CASHBACK: 'cashback',
    VOUCHER: 'voucher',
    EXPERIENCE: 'experience',
    DONATION: 'donation',
    CUSTOM: 'custom',
  } as const,

  // Reward Categories
  CATEGORIES: {
    MONETARY: 'monetary',
    NON_MONETARY: 'non_monetary',
    DIGITAL: 'digital',
    PHYSICAL: 'physical',
    EXPERIENTIAL: 'experiential',
    SOCIAL: 'social',
    CHARITABLE: 'charitable',
    MEMBERSHIP: 'membership',
  } as const,

  // Reward Statuses
  STATUSES: {
    AVAILABLE: 'available',
    REDEEMED: 'redeemed',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REVERSED: 'reversed',
    ARCHIVED: 'archived',
  } as const,

  // Reward Redemption Methods
  REDEMPTION_METHODS: {
    AUTOMATIC: 'automatic',
    MANUAL: 'manual',
    POINTS_BASED: 'points_based',
    REQUEST_BASED: 'request_based',
    APPROVAL_BASED: 'approval_based',
  } as const,

  // Reward Frequency
  FREQUENCY: {
    ONE_TIME: 'one_time',
    RECURRING: 'recurring',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ANNUAL: 'annual',
    EVENT_BASED: 'event_based',
  } as const,

  // Reward Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    MEMBERS_ONLY: 'members_only',
    TIER_ONLY: 'tier_only',
    INVITE_ONLY: 'invite_only',
    EXCLUSIVE: 'exclusive',
    SEASONAL: 'seasonal',
    LIMITED: 'limited',
  } as const,

  // Reward Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'discount',
    DEFAULT_CATEGORY: 'monetary',
    DEFAULT_STATUS: 'available',
    DEFAULT_REDEMPTION_METHOD: 'automatic',
    DEFAULT_FREQUENCY: 'one_time',
    DEFAULT_VISIBILITY: 'members_only',
    DEFAULT_POINTS_REQUIRED: 100,
    DEFAULT_QUANTITY: 1,
    DEFAULT_MAX_REDEMPTIONS: 1,
    DEFAULT_EXPIRY_DAYS: 30,
  } as const,

  // Reward Limits
  LIMITS: {
    MIN_REWARD_NAME_LENGTH: 3,
    MAX_REWARD_NAME_LENGTH: 100,
    MIN_POINTS_REQUIRED: 1,
    MAX_POINTS_REQUIRED: 1000000,
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 1000,
    MIN_MAX_REDEMPTIONS: 1,
    MAX_MAX_REDEMPTIONS: 10000,
    MAX_REDEMPTIONS_PER_USER: 10,
    MAX_REDEMPTIONS_PER_DAY: 100,
    MIN_DISCOUNT_RATE: 1,
    MAX_DISCOUNT_RATE: 100,
    MIN_CASHBACK_AMOUNT: 1,
    MAX_CASHBACK_AMOUNT: 100000,
  } as const,
} as const;

// Reward Types
export type MarketingLoyaltyRewardType =
  (typeof MARKETINGLOYALTY_REWARD.TYPES)[keyof typeof MARKETINGLOYALTY_REWARD.TYPES];

// Reward Categories
export type MarketingLoyaltyRewardCategory =
  (typeof MARKETINGLOYALTY_REWARD.CATEGORIES)[keyof typeof MARKETINGLOYALTY_REWARD.CATEGORIES];

// Reward Statuses
export type MarketingLoyaltyRewardStatus =
  (typeof MARKETINGLOYALTY_REWARD.STATUSES)[keyof typeof MARKETINGLOYALTY_REWARD.STATUSES];

// Reward Redemption Methods
export type MarketingLoyaltyRewardRedemptionMethod =
  (typeof MARKETINGLOYALTY_REWARD.REDEMPTION_METHODS)[keyof typeof MARKETINGLOYALTY_REWARD.REDEMPTION_METHODS];

// Reward Frequency
export type MarketingLoyaltyRewardFrequency =
  (typeof MARKETINGLOYALTY_REWARD.FREQUENCY)[keyof typeof MARKETINGLOYALTY_REWARD.FREQUENCY];

// Reward Visibility
export type MarketingLoyaltyRewardVisibility =
  (typeof MARKETINGLOYALTY_REWARD.VISIBILITY)[keyof typeof MARKETINGLOYALTY_REWARD.VISIBILITY];

// Reward Defaults
export type MarketingLoyaltyRewardDefault =
  (typeof MARKETINGLOYALTY_REWARD.DEFAULTS)[keyof typeof MARKETINGLOYALTY_REWARD.DEFAULTS];

// Reward Limits
export type MarketingLoyaltyRewardLimit =
  (typeof MARKETINGLOYALTY_REWARD.LIMITS)[keyof typeof MARKETINGLOYALTY_REWARD.LIMITS];

// Utility Functions
export function marketingloyaltyGetRewardTypeLabel(rewardType: MarketingLoyaltyRewardType): string {
  const labels: Record<MarketingLoyaltyRewardType, string> = {
    [MARKETINGLOYALTY_REWARD.TYPES.DISCOUNT]: 'Discount',
    [MARKETINGLOYALTY_REWARD.TYPES.PRODUCT]: 'Product',
    [MARKETINGLOYALTY_REWARD.TYPES.SERVICE]: 'Service',
    [MARKETINGLOYALTY_REWARD.TYPES.GIFT_CARD]: 'Gift Card',
    [MARKETINGLOYALTY_REWARD.TYPES.FREE_SHIPPING]: 'Free Shipping',
    [MARKETINGLOYALTY_REWARD.TYPES.UPGRADE]: 'Upgrade',
    [MARKETINGLOYALTY_REWARD.TYPES.SUBSCRIPTION]: 'Subscription',
    [MARKETINGLOYALTY_REWARD.TYPES.POINTS_BONUS]: 'Points Bonus',
    [MARKETINGLOYALTY_REWARD.TYPES.CASHBACK]: 'Cashback',
    [MARKETINGLOYALTY_REWARD.TYPES.VOUCHER]: 'Voucher',
    [MARKETINGLOYALTY_REWARD.TYPES.EXPERIENCE]: 'Experience',
    [MARKETINGLOYALTY_REWARD.TYPES.DONATION]: 'Donation',
    [MARKETINGLOYALTY_REWARD.TYPES.CUSTOM]: 'Custom Reward',
  };
  return labels[rewardType] || 'Unknown Reward Type';
}

export function marketingloyaltyGetRewardCategoryLabel(
  category: MarketingLoyaltyRewardCategory
): string {
  const labels: Record<MarketingLoyaltyRewardCategory, string> = {
    [MARKETINGLOYALTY_REWARD.CATEGORIES.MONETARY]: 'Monetary',
    [MARKETINGLOYALTY_REWARD.CATEGORIES.NON_MONETARY]: 'Non-Monetary',
    [MARKETINGLOYALTY_REWARD.CATEGORIES.DIGITAL]: 'Digital',
    [MARKETINGLOYALTY_REWARD.CATEGORIES.PHYSICAL]: 'Physical',
    [MARKETINGLOYALTY_REWARD.CATEGORIES.EXPERIENTIAL]: 'Experiential',
    [MARKETINGLOYALTY_REWARD.CATEGORIES.SOCIAL]: 'Social',
    [MARKETINGLOYALTY_REWARD.CATEGORIES.CHARITABLE]: 'Charitable',
    [MARKETINGLOYALTY_REWARD.CATEGORIES.MEMBERSHIP]: 'Membership',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingloyaltyGetRewardStatusLabel(status: MarketingLoyaltyRewardStatus): string {
  const labels: Record<MarketingLoyaltyRewardStatus, string> = {
    [MARKETINGLOYALTY_REWARD.STATUSES.AVAILABLE]: 'Available',
    [MARKETINGLOYALTY_REWARD.STATUSES.REDEEMED]: 'Redeemed',
    [MARKETINGLOYALTY_REWARD.STATUSES.EXPIRED]: 'Expired',
    [MARKETINGLOYALTY_REWARD.STATUSES.CANCELLED]: 'Cancelled',
    [MARKETINGLOYALTY_REWARD.STATUSES.PENDING]: 'Pending',
    [MARKETINGLOYALTY_REWARD.STATUSES.PROCESSING]: 'Processing',
    [MARKETINGLOYALTY_REWARD.STATUSES.COMPLETED]: 'Completed',
    [MARKETINGLOYALTY_REWARD.STATUSES.FAILED]: 'Failed',
    [MARKETINGLOYALTY_REWARD.STATUSES.REVERSED]: 'Reversed',
    [MARKETINGLOYALTY_REWARD.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function marketingloyaltyGetRewardRedemptionMethodLabel(
  method: MarketingLoyaltyRewardRedemptionMethod
): string {
  const labels: Record<MarketingLoyaltyRewardRedemptionMethod, string> = {
    [MARKETINGLOYALTY_REWARD.REDEMPTION_METHODS.AUTOMATIC]: 'Automatic',
    [MARKETINGLOYALTY_REWARD.REDEMPTION_METHODS.MANUAL]: 'Manual',
    [MARKETINGLOYALTY_REWARD.REDEMPTION_METHODS.POINTS_BASED]: 'Points Based',
    [MARKETINGLOYALTY_REWARD.REDEMPTION_METHODS.REQUEST_BASED]: 'Request Based',
    [MARKETINGLOYALTY_REWARD.REDEMPTION_METHODS.APPROVAL_BASED]: 'Approval Based',
  };
  return labels[method] || 'Unknown Redemption Method';
}

export function marketingloyaltyGetRewardFrequencyLabel(
  frequency: MarketingLoyaltyRewardFrequency
): string {
  const labels: Record<MarketingLoyaltyRewardFrequency, string> = {
    [MARKETINGLOYALTY_REWARD.FREQUENCY.ONE_TIME]: 'One Time',
    [MARKETINGLOYALTY_REWARD.FREQUENCY.RECURRING]: 'Recurring',
    [MARKETINGLOYALTY_REWARD.FREQUENCY.DAILY]: 'Daily',
    [MARKETINGLOYALTY_REWARD.FREQUENCY.WEEKLY]: 'Weekly',
    [MARKETINGLOYALTY_REWARD.FREQUENCY.MONTHLY]: 'Monthly',
    [MARKETINGLOYALTY_REWARD.FREQUENCY.QUARTERLY]: 'Quarterly',
    [MARKETINGLOYALTY_REWARD.FREQUENCY.ANNUAL]: 'Annual',
    [MARKETINGLOYALTY_REWARD.FREQUENCY.EVENT_BASED]: 'Event Based',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function marketingloyaltyGetRewardVisibilityLabel(
  visibility: MarketingLoyaltyRewardVisibility
): string {
  const labels: Record<MarketingLoyaltyRewardVisibility, string> = {
    [MARKETINGLOYALTY_REWARD.VISIBILITY.PUBLIC]: 'Public',
    [MARKETINGLOYALTY_REWARD.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [MARKETINGLOYALTY_REWARD.VISIBILITY.TIER_ONLY]: 'Tier Only',
    [MARKETINGLOYALTY_REWARD.VISIBILITY.INVITE_ONLY]: 'Invite Only',
    [MARKETINGLOYALTY_REWARD.VISIBILITY.EXCLUSIVE]: 'Exclusive',
    [MARKETINGLOYALTY_REWARD.VISIBILITY.SEASONAL]: 'Seasonal',
    [MARKETINGLOYALTY_REWARD.VISIBILITY.LIMITED]: 'Limited',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function marketingloyaltyGetDefaultPointsRequired(): number {
  return MARKETINGLOYALTY_REWARD.DEFAULTS.DEFAULT_POINTS_REQUIRED;
}

export function marketingloyaltyGetDefaultExpiryDays(): number {
  return MARKETINGLOYALTY_REWARD.DEFAULTS.DEFAULT_EXPIRY_DAYS;
}

export function marketingloyaltyIsDiscountReward(rewardType: MarketingLoyaltyRewardType): boolean {
  const discountRewards: MarketingLoyaltyRewardType[] = [
    MARKETINGLOYALTY_REWARD.TYPES.DISCOUNT,
    MARKETINGLOYALTY_REWARD.TYPES.VOUCHER,
    MARKETINGLOYALTY_REWARD.TYPES.GIFT_CARD,
    MARKETINGLOYALTY_REWARD.TYPES.CASHBACK,
  ];
  return discountRewards.includes(rewardType);
}

export function marketingloyaltyIsPhysicalReward(
  category: MarketingLoyaltyRewardCategory
): boolean {
  return category === MARKETINGLOYALTY_REWARD.CATEGORIES.PHYSICAL;
}

export function marketingloyaltyIsDigitalReward(category: MarketingLoyaltyRewardCategory): boolean {
  const digitalCategories: MarketingLoyaltyRewardCategory[] = [
    MARKETINGLOYALTY_REWARD.CATEGORIES.DIGITAL,
    MARKETINGLOYALTY_REWARD.CATEGORIES.EXPERIENTIAL,
  ];
  return digitalCategories.includes(category);
}

export function marketingloyaltyCalculatePointsToRedeem(
  rewardValue: number,
  pointsPerUnit: number
): number {
  return rewardValue * pointsPerUnit;
}
