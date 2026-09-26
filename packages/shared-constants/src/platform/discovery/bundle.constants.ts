export const BUNDLE_TYPE = {
  FIXED: 'fixed',
  DYNAMIC: 'dynamic',
  MIX_MATCH: 'mix_match',
  BUY_MORE_SAVE_MORE: 'buy_more_save_more',
  FREQUENTLY_BOUGHT: 'frequently_bought',
} as const;

export const BUNDLE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  EXPIRED: 'expired',
} as const;

export const BUNDLE_PRICING = {
  FIXED_PRICE: 'fixed_price',
  PERCENTAGE_DISCOUNT: 'percentage_discount',
  FIXED_DISCOUNT: 'fixed_discount',
  TIERED_DISCOUNT: 'tiered_discount',
} as const;

export const BUNDLE = {
  TYPE: BUNDLE_TYPE,
  STATUS: BUNDLE_STATUS,
  PRICING: BUNDLE_PRICING,
  MIN_ITEMS: 2,
  MAX_ITEMS: 20,
  MAX_BUNDLES: 1000,
  MIN_DISCOUNT_PERCENT: 1,
  MAX_DISCOUNT_PERCENT: 80,
  AUTO_GENERATE: false,
  PERSONALIZE: true,
  RETENTION_DAYS: 90,
} as const;

export type BundleTypeType = (typeof BUNDLE_TYPE)[keyof typeof BUNDLE_TYPE];
export type BundleStatusType = (typeof BUNDLE_STATUS)[keyof typeof BUNDLE_STATUS];
