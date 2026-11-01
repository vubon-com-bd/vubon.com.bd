export const VENDOR_RATING = {
  MIN: 1,
  MAX: 5,
  DEFAULT: 0,
  DECIMAL_PLACES: 1,
  MIN_REVIEWS_FOR_DISPLAY: 5,
  WEIGHTED_AVERAGE: true,
  RECENT_WEIGHT_DAYS: 90,
  RECENT_WEIGHT_FACTOR: 1.5,
  AUTO_HIDE_BELOW: 2,
  AUTO_FLAG_BELOW: 3,
} as const;

export const VENDOR_RATING_CATEGORY = {
  PRODUCT_QUALITY: 'product_quality',
  SHIPPING_SPEED: 'shipping_speed',
  CUSTOMER_SERVICE: 'customer_service',
  COMMUNICATION: 'communication',
  VALUE_FOR_MONEY: 'value_for_money',
  PACKAGING: 'packaging',
} as const;

export type VendorRatingCategoryType =
  (typeof VENDOR_RATING_CATEGORY)[keyof typeof VENDOR_RATING_CATEGORY];
