export const PROMOTION_TYPE = {
  PERCENTAGE_DISCOUNT: 'percentage_discount',
  FIXED_DISCOUNT: 'fixed_discount',
  BUY_ONE_GET_ONE: 'buy_one_get_one',
  BUY_X_GET_Y: 'buy_x_get_y',
  FREE_SHIPPING: 'free_shipping',
  BUNDLE: 'bundle',
  TIERED: 'tiered',
  CASHBACK: 'cashback',
  GIFT: 'gift',
  LOYALTY_REWARD: 'loyalty_reward',
} as const;

export const PROMOTION_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  ACTIVE: 'active',
  PAUSED: 'paused',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived',
} as const;

export const PROMOTION_APPLIES_TO = {
  ALL: 'all',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  COLLECTIONS: 'collections',
  CUSTOMERS: 'customers',
  CART: 'cart',
  SHIPPING: 'shipping',
} as const;

export const PROMOTION = {
  TYPE: PROMOTION_TYPE,
  STATUS: PROMOTION_STATUS,
  APPLIES_TO: PROMOTION_APPLIES_TO,
  NAME_MAX_LENGTH: 150,
  DESCRIPTION_MAX_LENGTH: 1000,
  MIN_DISCOUNT_PERCENT: 1,
  MAX_DISCOUNT_PERCENT: 90,
  MIN_DISCOUNT_AMOUNT: 1,
  MAX_DISCOUNT_AMOUNT: 1000000,
  MIN_ORDER_AMOUNT: 0,
  MAX_USES: 1000000,
  MAX_USES_PER_USER: 100,
  STACKABLE: false,
  PRIORITY_MIN: 1,
  PRIORITY_MAX: 100,
  DEFAULT_DURATION_DAYS: 30,
  MAX_DURATION_DAYS: 365,
} as const;

export type PromotionTypeType = (typeof PROMOTION_TYPE)[keyof typeof PROMOTION_TYPE];
export type PromotionStatusType = (typeof PROMOTION_STATUS)[keyof typeof PROMOTION_STATUS];
