/**
 * কুপন কনফিগারেশন কনস্ট্যান্ট
 * কুপন সম্পর্কিত মৌলিক কনফিগারেশন এবং সীমাবদ্ধতা
 */

/**
 * কুপন কোডের দৈর্ঘ্য
 */
export const COUPON_CODE_LENGTH = {
  MIN: 8,
  MAX: 12,
} as const;

export type CouponCodeLength = typeof COUPON_CODE_LENGTH;

/**
 * কুপন কোডের প্রিফিক্স
 */
export const COUPON_CODE_PREFIX = 'CART-';

/**
 * প্রতি কার্টে সর্বোচ্চ কুপন
 */
export const MAX_COUPONS_PER_CART = 1;

/**
 * কুপনের মেয়াদ (দিনে)
 */
export const COUPON_EXPIRY_DAYS = 30;

/**
 * কুপন প্রয়োগের জন্য ন্যূনতম অর্ডার পরিমাণ
 */
export const MIN_ORDER_AMOUNT = 500;

/**
 * সর্বোচ্চ ডিসকাউন্ট পরিমাণ
 */
export const MAX_DISCOUNT_AMOUNT = 1000;

/**
 * কুপন স্ট্যাটাস
 */
export const COUPON_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  USED: 'used',
  DISABLED: 'disabled',
} as const;

export type CouponStatus = (typeof COUPON_STATUS)[keyof typeof COUPON_STATUS];

/**
 * সর্বোচ্চ ব্যবহার সীমা (প্রতি ইউজার)
 */
export const COUPON_APPLICATION_LIMIT = 1;
