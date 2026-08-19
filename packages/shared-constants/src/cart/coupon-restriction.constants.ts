/**
 * কুপন রেস্ট্রিকশন কনস্ট্যান্ট
 * কুপন প্রয়োগের শর্তাবলী এবং বিধিনিষেধ
 */

/**
 * রেস্ট্রিকশন টাইপ
 */
export const RESTRICTION_TYPE = {
  MIN_ORDER: 'min_order',
  MAX_DISCOUNT: 'max_discount',
  USER_LIMIT: 'user_limit',
  DATE_RANGE: 'date_range',
} as const;

export type RestrictionType = (typeof RESTRICTION_TYPE)[keyof typeof RESTRICTION_TYPE];

/**
 * ইউজার রেস্ট্রিকশন
 */
export const USER_RESTRICTION_TYPE = {
  ALL: 'all',
  NEW_ONLY: 'new_only',
  VIP_ONLY: 'vip_only',
  SPECIFIC: 'specific',
} as const;

export type UserRestrictionType =
  (typeof USER_RESTRICTION_TYPE)[keyof typeof USER_RESTRICTION_TYPE];

/**
 * প্রোডাক্ট রেস্ট্রিকশন
 */
export const PRODUCT_RESTRICTION_TYPE = {
  ALL: 'all',
  SPECIFIC: 'specific',
  CATEGORY: 'category',
  BRAND: 'brand',
} as const;

export type ProductRestrictionType =
  (typeof PRODUCT_RESTRICTION_TYPE)[keyof typeof PRODUCT_RESTRICTION_TYPE];

/**
 * কোন দিনে প্রযোজ্য
 */
export const DAY_RESTRICTION = {
  WEEKDAYS: 'weekdays',
  WEEKENDS: 'weekends',
  SPECIFIC: 'specific',
} as const;

export type DayRestriction = (typeof DAY_RESTRICTION)[keyof typeof DAY_RESTRICTION];

/**
 * কোন সময়ে প্রযোজ্য
 */
export const TIME_RESTRICTION = {
  STORE_HOURS: 'store_hours',
  '24_7': '24_7',
  SPECIFIC: 'specific',
} as const;

export type TimeRestriction = (typeof TIME_RESTRICTION)[keyof typeof TIME_RESTRICTION];
