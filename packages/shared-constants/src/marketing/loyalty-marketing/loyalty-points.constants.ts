/**
 * Loyalty Points Constants
 * Points configurations for loyalty programs
 */

export const MARKETINGLOYALTY_POINTS = {
  // Points Types
  TYPES: {
    EARN: 'earn',
    BURN: 'burn',
    BONUS: 'bonus',
    ADJUSTMENT: 'adjustment',
    EXPIRATION: 'expiration',
    REVERSAL: 'reversal',
    TRANSFER: 'transfer',
    GIFT: 'gift',
    PROMOTIONAL: 'promotional',
    MILESTONE: 'milestone',
  } as const,

  // Points Earning Methods
  EARNING_METHODS: {
    PURCHASE: 'purchase',
    REFERRAL: 'referral',
    REVIEW: 'review',
    SOCIAL_SHARE: 'social_share',
    SURVEY: 'survey',
    FEEDBACK: 'feedback',
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',
    SPECIAL_EVENT: 'special_event',
    CHALLENGE: 'challenge',
    MILESTONE: 'milestone',
    BONUS: 'bonus',
    PROMOTION: 'promotion',
  } as const,

  // Points Burning Methods
  BURNING_METHODS: {
    DISCOUNT: 'discount',
    PRODUCT: 'product',
    SERVICE: 'service',
    GIFT_CARD: 'gift_card',
    FREE_SHIPPING: 'free_shipping',
    UPGRADE: 'upgrade',
    SUBSCRIPTION: 'subscription',
    DONATION: 'donation',
    CASHBACK: 'cashback',
    EXPERIENCE: 'experience',
  } as const,

  // Points Statuses
  STATUSES: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    REVERSED: 'reversed',
    ON_HOLD: 'on_hold',
  } as const,

  // Points Calculation Methods
  CALCULATIONS: {
    FLAT_RATE: 'flat_rate',
    PERCENTAGE: 'percentage',
    TIERED: 'tiered',
    DYNAMIC: 'dynamic',
    SLAB: 'slab',
    CUSTOM: 'custom',
  } as const,

  // Points Validity Periods
  VALIDITY_PERIODS: {
    DAYS_7: 7,
    DAYS_15: 15,
    DAYS_30: 30,
    DAYS_60: 60,
    DAYS_90: 90,
    DAYS_180: 180,
    DAYS_365: 365,
    DAYS_730: 730,
    PERMANENT: -1,
  } as const,

  // Points Limits
  LIMITS: {
    MIN_EARN_PER_TRANSACTION: 1,
    MAX_EARN_PER_TRANSACTION: 1000,
    MIN_EARN_PER_DAY: 1,
    MAX_EARN_PER_DAY: 5000,
    MIN_EARN_PER_MONTH: 1,
    MAX_EARN_PER_MONTH: 50000,
    MIN_EARN_PER_YEAR: 1,
    MAX_EARN_PER_YEAR: 500000,
    MIN_BURN_PER_TRANSACTION: 10,
    MAX_BURN_PER_TRANSACTION: 10000,
    MIN_BURN_PER_DAY: 10,
    MAX_BURN_PER_DAY: 50000,
    MIN_POINTS_TO_EARN: 1,
    MAX_POINTS_TO_EARN: 1000000,
    MIN_POINTS_TO_BURN: 1,
    MAX_POINTS_TO_BURN: 1000000,
  } as const,

  // Points Defaults
  DEFAULTS: {
    DEFAULT_EARN_RATE: 1,
    DEFAULT_BURN_RATE: 1,
    DEFAULT_MIN_EARN: 1,
    DEFAULT_MAX_EARN: 1000,
    DEFAULT_MIN_BURN: 10,
    DEFAULT_MAX_BURN: 10000,
    DEFAULT_VALIDITY_DAYS: 365,
    DEFAULT_STATUS: 'pending',
    DEFAULT_CALCULATION: 'flat_rate',
  } as const,
} as const;

// Points Types
export type MarketingLoyaltyPointsType =
  (typeof MARKETINGLOYALTY_POINTS.TYPES)[keyof typeof MARKETINGLOYALTY_POINTS.TYPES];

// Points Earning Methods
export type MarketingLoyaltyEarningMethod =
  (typeof MARKETINGLOYALTY_POINTS.EARNING_METHODS)[keyof typeof MARKETINGLOYALTY_POINTS.EARNING_METHODS];

// Points Burning Methods
export type MarketingLoyaltyBurningMethod =
  (typeof MARKETINGLOYALTY_POINTS.BURNING_METHODS)[keyof typeof MARKETINGLOYALTY_POINTS.BURNING_METHODS];

// Points Statuses
export type MarketingLoyaltyPointsStatus =
  (typeof MARKETINGLOYALTY_POINTS.STATUSES)[keyof typeof MARKETINGLOYALTY_POINTS.STATUSES];

// Points Calculation Methods
export type MarketingLoyaltyPointsCalculation =
  (typeof MARKETINGLOYALTY_POINTS.CALCULATIONS)[keyof typeof MARKETINGLOYALTY_POINTS.CALCULATIONS];

// Points Validity Periods
export type MarketingLoyaltyPointsValidity =
  (typeof MARKETINGLOYALTY_POINTS.VALIDITY_PERIODS)[keyof typeof MARKETINGLOYALTY_POINTS.VALIDITY_PERIODS];

// Points Limits
export type MarketingLoyaltyPointsLimit =
  (typeof MARKETINGLOYALTY_POINTS.LIMITS)[keyof typeof MARKETINGLOYALTY_POINTS.LIMITS];

// Points Defaults
export type MarketingLoyaltyPointsDefault =
  (typeof MARKETINGLOYALTY_POINTS.DEFAULTS)[keyof typeof MARKETINGLOYALTY_POINTS.DEFAULTS];

// Utility Functions
export function marketingloyaltyGetPointsTypeLabel(pointsType: MarketingLoyaltyPointsType): string {
  const labels: Record<MarketingLoyaltyPointsType, string> = {
    [MARKETINGLOYALTY_POINTS.TYPES.EARN]: 'Earn',
    [MARKETINGLOYALTY_POINTS.TYPES.BURN]: 'Burn',
    [MARKETINGLOYALTY_POINTS.TYPES.BONUS]: 'Bonus',
    [MARKETINGLOYALTY_POINTS.TYPES.ADJUSTMENT]: 'Adjustment',
    [MARKETINGLOYALTY_POINTS.TYPES.EXPIRATION]: 'Expiration',
    [MARKETINGLOYALTY_POINTS.TYPES.REVERSAL]: 'Reversal',
    [MARKETINGLOYALTY_POINTS.TYPES.TRANSFER]: 'Transfer',
    [MARKETINGLOYALTY_POINTS.TYPES.GIFT]: 'Gift',
    [MARKETINGLOYALTY_POINTS.TYPES.PROMOTIONAL]: 'Promotional',
    [MARKETINGLOYALTY_POINTS.TYPES.MILESTONE]: 'Milestone',
  };
  return labels[pointsType] || 'Unknown Points Type';
}

export function marketingloyaltyGetEarningMethodLabel(
  method: MarketingLoyaltyEarningMethod
): string {
  const labels: Record<MarketingLoyaltyEarningMethod, string> = {
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.PURCHASE]: 'Purchase',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.REFERRAL]: 'Referral',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.REVIEW]: 'Review',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.SOCIAL_SHARE]: 'Social Share',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.SURVEY]: 'Survey',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.FEEDBACK]: 'Feedback',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.BIRTHDAY]: 'Birthday',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.ANNIVERSARY]: 'Anniversary',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.SPECIAL_EVENT]: 'Special Event',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.CHALLENGE]: 'Challenge',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.MILESTONE]: 'Milestone',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.BONUS]: 'Bonus',
    [MARKETINGLOYALTY_POINTS.EARNING_METHODS.PROMOTION]: 'Promotion',
  };
  return labels[method] || 'Unknown Earning Method';
}

export function marketingloyaltyGetBurningMethodLabel(
  method: MarketingLoyaltyBurningMethod
): string {
  const labels: Record<MarketingLoyaltyBurningMethod, string> = {
    [MARKETINGLOYALTY_POINTS.BURNING_METHODS.DISCOUNT]: 'Discount',
    [MARKETINGLOYALTY_POINTS.BURNING_METHODS.PRODUCT]: 'Product',
    [MARKETINGLOYALTY_POINTS.BURNING_METHODS.SERVICE]: 'Service',
    [MARKETINGLOYALTY_POINTS.BURNING_METHODS.GIFT_CARD]: 'Gift Card',
    [MARKETINGLOYALTY_POINTS.BURNING_METHODS.FREE_SHIPPING]: 'Free Shipping',
    [MARKETINGLOYALTY_POINTS.BURNING_METHODS.UPGRADE]: 'Upgrade',
    [MARKETINGLOYALTY_POINTS.BURNING_METHODS.SUBSCRIPTION]: 'Subscription',
    [MARKETINGLOYALTY_POINTS.BURNING_METHODS.DONATION]: 'Donation',
    [MARKETINGLOYALTY_POINTS.BURNING_METHODS.CASHBACK]: 'Cashback',
    [MARKETINGLOYALTY_POINTS.BURNING_METHODS.EXPERIENCE]: 'Experience',
  };
  return labels[method] || 'Unknown Burning Method';
}

export function marketingloyaltyGetPointsStatusLabel(status: MarketingLoyaltyPointsStatus): string {
  const labels: Record<MarketingLoyaltyPointsStatus, string> = {
    [MARKETINGLOYALTY_POINTS.STATUSES.PENDING]: 'Pending',
    [MARKETINGLOYALTY_POINTS.STATUSES.APPROVED]: 'Approved',
    [MARKETINGLOYALTY_POINTS.STATUSES.REJECTED]: 'Rejected',
    [MARKETINGLOYALTY_POINTS.STATUSES.PROCESSING]: 'Processing',
    [MARKETINGLOYALTY_POINTS.STATUSES.COMPLETED]: 'Completed',
    [MARKETINGLOYALTY_POINTS.STATUSES.CANCELLED]: 'Cancelled',
    [MARKETINGLOYALTY_POINTS.STATUSES.EXPIRED]: 'Expired',
    [MARKETINGLOYALTY_POINTS.STATUSES.REVERSED]: 'Reversed',
    [MARKETINGLOYALTY_POINTS.STATUSES.ON_HOLD]: 'On Hold',
  };
  return labels[status] || 'Unknown Points Status';
}

export function marketingloyaltyGetPointsCalculationLabel(
  calculation: MarketingLoyaltyPointsCalculation
): string {
  const labels: Record<MarketingLoyaltyPointsCalculation, string> = {
    [MARKETINGLOYALTY_POINTS.CALCULATIONS.FLAT_RATE]: 'Flat Rate',
    [MARKETINGLOYALTY_POINTS.CALCULATIONS.PERCENTAGE]: 'Percentage',
    [MARKETINGLOYALTY_POINTS.CALCULATIONS.TIERED]: 'Tiered',
    [MARKETINGLOYALTY_POINTS.CALCULATIONS.DYNAMIC]: 'Dynamic',
    [MARKETINGLOYALTY_POINTS.CALCULATIONS.SLAB]: 'Slab',
    [MARKETINGLOYALTY_POINTS.CALCULATIONS.CUSTOM]: 'Custom',
  };
  return labels[calculation] || 'Unknown Calculation';
}

export function marketingloyaltyGetPointsValidityLabel(
  validity: MarketingLoyaltyPointsValidity
): string {
  if (validity === MARKETINGLOYALTY_POINTS.VALIDITY_PERIODS.PERMANENT) {
    return 'Permanent';
  }
  return `${validity} Days`;
}

export function marketingloyaltyGetDefaultEarnRate(): number {
  return MARKETINGLOYALTY_POINTS.DEFAULTS.DEFAULT_EARN_RATE;
}

export function marketingloyaltyGetDefaultBurnRate(): number {
  return MARKETINGLOYALTY_POINTS.DEFAULTS.DEFAULT_BURN_RATE;
}

export function marketingloyaltyGetDefaultValidityDays(): number {
  return MARKETINGLOYALTY_POINTS.DEFAULTS.DEFAULT_VALIDITY_DAYS;
}

export function marketingloyaltyCalculateEarnPoints(
  amount: number,
  rate: number,
  calculation: MarketingLoyaltyPointsCalculation
): number {
  if (calculation === MARKETINGLOYALTY_POINTS.CALCULATIONS.FLAT_RATE) {
    return amount * rate;
  }
  if (calculation === MARKETINGLOYALTY_POINTS.CALCULATIONS.PERCENTAGE) {
    return (amount * rate) / 100;
  }
  return amount * rate;
}

export function marketingloyaltyIsPointsEarning(type: MarketingLoyaltyPointsType): boolean {
  const earningTypes: MarketingLoyaltyPointsType[] = [
    MARKETINGLOYALTY_POINTS.TYPES.EARN,
    MARKETINGLOYALTY_POINTS.TYPES.BONUS,
    MARKETINGLOYALTY_POINTS.TYPES.PROMOTIONAL,
    MARKETINGLOYALTY_POINTS.TYPES.MILESTONE,
    MARKETINGLOYALTY_POINTS.TYPES.GIFT,
    MARKETINGLOYALTY_POINTS.TYPES.TRANSFER,
  ];
  return earningTypes.includes(type);
}

export function marketingloyaltyIsPointsBurning(type: MarketingLoyaltyPointsType): boolean {
  return type === MARKETINGLOYALTY_POINTS.TYPES.BURN;
}
