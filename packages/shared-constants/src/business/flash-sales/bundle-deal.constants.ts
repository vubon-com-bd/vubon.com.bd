export const BUNDLE_DEAL_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SCHEDULED: 'scheduled',
  SOLD_OUT: 'sold_out',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;

export const BUNDLE_DEAL_TYPE = {
  FIXED_PRICE: 'fixed_price',
  PERCENTAGE_OFF: 'percentage_off',
  BUY_MORE_SAVE_MORE: 'buy_more_save_more',
  MIX_AND_MATCH: 'mix_and_match',
} as const;

export const BUNDLE_DEAL = {
  MIN_ITEMS: 2,
  MAX_ITEMS: 20,
  MIN_DISCOUNT_PERCENT: 1,
  MAX_DISCOUNT_PERCENT: 90,
  ALLOW_MIX_CATEGORIES: true,
  PER_USER_LIMIT: 5,
} as const;

export type BundleDealStatusType = (typeof BUNDLE_DEAL_STATUS)[keyof typeof BUNDLE_DEAL_STATUS];
export type BundleDealTypeType = (typeof BUNDLE_DEAL_TYPE)[keyof typeof BUNDLE_DEAL_TYPE];
