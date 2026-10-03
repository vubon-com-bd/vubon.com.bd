export const CROSS_SELL_TYPE = {
  RELATED_CATEGORY: 'related_category',
  COMPLEMENTARY: 'complementary',
  ACCESSORY: 'accessory',
  FREQUENTLY_BOUGHT: 'frequently_bought',
  RECOMMENDED: 'recommended',
  POPULAR_WITH_ITEM: 'popular_with_item',
} as const;

export const CROSS_SELL_LOCATION = {
  PRODUCT_PAGE: 'product_page',
  CART_PAGE: 'cart_page',
  CHECKOUT_PAGE: 'checkout_page',
  ORDER_CONFIRMATION: 'order_confirmation',
  EMAIL: 'email',
  HOME_PAGE: 'home_page',
} as const;

export const CROSS_SELL = {
  MAX_ITEMS: 20,
  DEFAULT_ITEMS: 6,
  MIN_AFFINITY: 0.1,
  MAX_CATEGORIES: 5,
  EXCLUDE_SAME_CATEGORY: false,
  INCLUDE_OUT_OF_STOCK: false,
  PRICE_RANGE_PERCENT: 100,
  PERSONALIZE: true,
  RETENTION_DAYS: 90,
} as const;

export type CrossSellTypeType = (typeof CROSS_SELL_TYPE)[keyof typeof CROSS_SELL_TYPE];
export type CrossSellLocationType = (typeof CROSS_SELL_LOCATION)[keyof typeof CROSS_SELL_LOCATION];
