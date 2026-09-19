export const COUPON_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  SCHEDULED: 'scheduled',
  EXHAUSTED: 'exhausted',
  DISABLED: 'disabled',
} as const;

export const COUPON_LIMIT = {
  CODE_MIN_LENGTH: 4,
  CODE_MAX_LENGTH: 32,
  MAX_USES: 100000,
  MAX_USES_PER_USER: 1,
  MIN_ORDER_AMOUNT: 0,
  MAX_DISCOUNT_AMOUNT: 100000,
  EXPIRY_DAYS: 365,
} as const;

// Rule 5 — Aggregate Namespace
export const COUPON = {
  STATUS: COUPON_STATUS,
  LIMIT: COUPON_LIMIT,
} as const;

export type CouponStatusType = (typeof COUPON_STATUS)[keyof typeof COUPON_STATUS];
export type CouponType = typeof COUPON;
