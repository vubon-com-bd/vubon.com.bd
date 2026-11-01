export const UPSELL_TYPE = {
  HIGHER_PRICE: 'higher_price',
  PREMIUM: 'premium',
  BETTER_FEATURES: 'better_features',
  NEWER_VERSION: 'newer_version',
  LARGER_SIZE: 'larger_size',
  EXTENDED_WARRANTY: 'extended_warranty',
} as const;

export const UPSELL = {
  MAX_ITEMS: 10,
  DEFAULT_ITEMS: 4,
  MIN_PRICE_INCREASE_PERCENT: 10,
  MAX_PRICE_INCREASE_PERCENT: 200,
  MIN_RATING: 3.5,
  SAME_CATEGORY_REQUIRED: true,
  PREFER_SAME_BRAND: true,
  INCLUDE_OUT_OF_STOCK: false,
  PERSONALIZE: true,
  RETENTION_DAYS: 90,
} as const;

export type UpsellTypeType = (typeof UPSELL_TYPE)[keyof typeof UPSELL_TYPE];
