export const REFERRAL_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  FRAUDULENT: 'fraudulent',
} as const;

export const REFERRAL_TYPE = {
  CUSTOMER_REFERS_CUSTOMER: 'customer_refers_customer',
  CUSTOMER_REFERS_FRIEND: 'customer_refers_friend',
  VENDOR_REFERS_VENDOR: 'vendor_refers_vendor',
  AFFILIATE_REFERS: 'affiliate_refers',
  EMPLOYEE_REFERS: 'employee_refers',
} as const;

export const REFERRAL_REWARD_TYPE = {
  FIXED_AMOUNT: 'fixed_amount',
  PERCENTAGE: 'percentage',
  CREDIT: 'credit',
  COUPON: 'coupon',
  FREE_PRODUCT: 'free_product',
  FREE_SHIPPING: 'free_shipping',
  POINTS: 'points',
  TIERED: 'tiered',
} as const;

export const REFERRAL = {
  STATUS: REFERRAL_STATUS,
  TYPE: REFERRAL_TYPE,
  REWARD_TYPE: REFERRAL_REWARD_TYPE,
  CODE_LENGTH: 8,
  CODE_MIN_LENGTH: 6,
  CODE_MAX_LENGTH: 16,
  MAX_REFERRALS_PER_USER: 100,
  MAX_REWARDS_PER_USER: 50,
  REFERRER_REWARD_AMOUNT: 100,
  REFEREE_REWARD_AMOUNT: 50,
  REFERRER_REWARD_PERCENT: 10,
  REFEREE_REWARD_PERCENT: 5,
  MIN_ORDER_AMOUNT: 500,
  QUALIFYING_DAYS: 30,
  REWARD_EXPIRY_DAYS: 90,
  FRAUD_CHECK_ENABLED: true,
  REQUIRE_FIRST_PURCHASE: true,
} as const;

export type ReferralStatusType = (typeof REFERRAL_STATUS)[keyof typeof REFERRAL_STATUS];
export type ReferralTypeType = (typeof REFERRAL_TYPE)[keyof typeof REFERRAL_TYPE];
export type ReferralRewardTypeType =
  (typeof REFERRAL_REWARD_TYPE)[keyof typeof REFERRAL_REWARD_TYPE];
