/**
 * কুপন টাইপ কনস্ট্যান্ট
 * কুপনের বিভিন্ন প্রকারভেদ সংক্রান্ত কনস্ট্যান্ট
 */

/**
 * কুপন টাইপ
 */
export const COUPON_TYPE = {
  CART_LEVEL: 'cart_level',
  PRODUCT_LEVEL: 'product_level',
  CATEGORY_LEVEL: 'category_level',
  BRAND_LEVEL: 'brand_level',
} as const;

export type CouponType = (typeof COUPON_TYPE)[keyof typeof COUPON_TYPE];

/**
 * প্রতিটি টাইপের ইউজার-ফ্রেন্ডলি নাম
 */
export const COUPON_TYPE_LABELS: Record<CouponType, string> = {
  [COUPON_TYPE.CART_LEVEL]: 'Cart Level Discount',
  [COUPON_TYPE.PRODUCT_LEVEL]: 'Product Level Discount',
  [COUPON_TYPE.CATEGORY_LEVEL]: 'Category Level Discount',
  [COUPON_TYPE.BRAND_LEVEL]: 'Brand Level Discount',
};

/**
 * কুপন স্কোপ
 */
export const COUPON_SCOPE = {
  GLOBAL: 'global',
  SPECIFIC_PRODUCTS: 'specific_products',
  SPECIFIC_CATEGORIES: 'specific_categories',
} as const;

export type CouponScope = (typeof COUPON_SCOPE)[keyof typeof COUPON_SCOPE];

/**
 * কুপন প্রযোজ্য
 */
export const COUPON_APPLICABLE_TO = {
  ALL_USERS: 'all_users',
  NEW_USERS: 'new_users',
  VIP_USERS: 'vip_users',
} as const;

export type CouponApplicableTo = (typeof COUPON_APPLICABLE_TO)[keyof typeof COUPON_APPLICABLE_TO];

/**
 * জেনারেশন টাইপ
 */
export const COUPON_GENERATION_TYPE = {
  AUTO_GENERATED: 'auto_generated',
  MANUAL: 'manual',
  BULK: 'bulk',
} as const;

export type CouponGenerationType =
  (typeof COUPON_GENERATION_TYPE)[keyof typeof COUPON_GENERATION_TYPE];
