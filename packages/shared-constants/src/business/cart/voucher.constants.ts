export const VOUCHER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  REDEEMED: 'redeemed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  SCHEDULED: 'scheduled',
} as const;

export const VOUCHER_TYPE = {
  GIFT_CARD: 'gift_card',
  STORE_CREDIT: 'store_credit',
  LOYALTY_REWARD: 'loyalty_reward',
  REFUND_CREDIT: 'refund_credit',
  PROMOTIONAL: 'promotional',
} as const;

export const VOUCHER_LIMIT = {
  CODE_MIN_LENGTH: 8,
  CODE_MAX_LENGTH: 32,
  MIN_AMOUNT: 0,
  MAX_AMOUNT: 1000000,
  MAX_USES: 1,
  EXPIRY_DAYS: 730,
  PARTIAL_REDEEM: true,
} as const;

// Rule 5 — Aggregate Namespace
export const VOUCHER = {
  STATUS: VOUCHER_STATUS,
  TYPE: VOUCHER_TYPE,
  LIMIT: VOUCHER_LIMIT,
} as const;

export type VoucherStatusType = (typeof VOUCHER_STATUS)[keyof typeof VOUCHER_STATUS];
export type VoucherTypeType = (typeof VOUCHER_TYPE)[keyof typeof VOUCHER_TYPE];
export type VoucherType = typeof VOUCHER;
