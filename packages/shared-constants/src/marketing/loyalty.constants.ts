export const LOYALTY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  EXPIRED: 'expired',
  BLOCKED: 'blocked',
} as const;

export const LOYALTY_TIER = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
  DIAMOND: 'diamond',
} as const;

export const LOYALTY_POINT_TYPE = {
  EARNED: 'earned',
  REDEEMED: 'redeemed',
  EXPIRED: 'expired',
  ADJUSTED: 'adjusted',
  BONUS: 'bonus',
  REFUNDED: 'refunded',
} as const;

export const LOYALTY_EARN_RULE = {
  PER_CURRENCY_SPENT: 'per_currency_spent',
  PER_ORDER: 'per_order',
  PER_PRODUCT: 'per_product',
  PER_CATEGORY: 'per_category',
  SIGNUP_BONUS: 'signup_bonus',
  REVIEW_BONUS: 'review_bonus',
  REFERRAL_BONUS: 'referral_bonus',
  BIRTHDAY_BONUS: 'birthday_bonus',
  ANNIVERSARY_BONUS: 'anniversary_bonus',
} as const;

export const LOYALTY = {
  STATUS: LOYALTY_STATUS,
  TIER: LOYALTY_TIER,
  POINT_TYPE: LOYALTY_POINT_TYPE,
  EARN_RULE: LOYALTY_EARN_RULE,
  POINTS_PER_CURRENCY: 1,
  POINT_VALUE: 0.01,
  MIN_REDEEM_POINTS: 100,
  MAX_REDEEM_PERCENT: 50,
  SIGNUP_BONUS: 100,
  REVIEW_BONUS: 50,
  REFERRAL_BONUS: 200,
  BIRTHDAY_BONUS: 500,
  POINT_EXPIRY_DAYS: 365,
  TIER_THRESHOLDS: {
    bronze: 0,
    silver: 1000,
    gold: 5000,
    platinum: 20000,
    diamond: 100000,
  },
  TIER_BENEFITS: {
    bronze: 1.0,
    silver: 1.25,
    gold: 1.5,
    platinum: 2.0,
    diamond: 3.0,
  },
  TIER_VALIDITY_DAYS: 365,
  RETENTION_DAYS: 730,
} as const;

export type LoyaltyStatusType = (typeof LOYALTY_STATUS)[keyof typeof LOYALTY_STATUS];
export type LoyaltyTierType = (typeof LOYALTY_TIER)[keyof typeof LOYALTY_TIER];
export type LoyaltyPointTypeType = (typeof LOYALTY_POINT_TYPE)[keyof typeof LOYALTY_POINT_TYPE];
