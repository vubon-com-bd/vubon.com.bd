/**
 * ডিসকাউন্ট টাইপ কনস্ট্যান্ট
 * ডিসকাউন্টের বিভিন্ন পদ্ধতি সংক্রান্ত কনস্ট্যান্ট
 */

/**
 * ডিসকাউন্ট টাইপ
 */
export const DISCOUNT_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed_amount',
  FREE_SHIPPING: 'free_shipping',
  BUY_X_GET_Y: 'buy_x_get_y',
} as const;

export type DiscountType = (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE];

/**
 * প্রতিটি টাইপের লেবেল
 */
export const DISCOUNT_TYPE_LABELS: Record<DiscountType, string> = {
  [DISCOUNT_TYPE.PERCENTAGE]: 'Percentage Discount',
  [DISCOUNT_TYPE.FIXED_AMOUNT]: 'Fixed Amount Discount',
  [DISCOUNT_TYPE.FREE_SHIPPING]: 'Free Shipping',
  [DISCOUNT_TYPE.BUY_X_GET_Y]: 'Buy X Get Y',
};

/**
 * প্রতিটি টাইপের ফরম্যাটিং রুল
 */
export const DISCOUNT_TYPE_FORMATS: Record<DiscountType, { suffix: string; prefix: string }> = {
  [DISCOUNT_TYPE.PERCENTAGE]: { suffix: '%', prefix: '' },
  [DISCOUNT_TYPE.FIXED_AMOUNT]: { suffix: '', prefix: '৳' },
  [DISCOUNT_TYPE.FREE_SHIPPING]: { suffix: '', prefix: 'Free' },
  [DISCOUNT_TYPE.BUY_X_GET_Y]: { suffix: '', prefix: 'BOGO' },
};

/**
 * পারসেন্টেজ রেঞ্জ
 */
export const PERCENTAGE_RANGE = {
  MIN: 0,
  MAX: 100,
} as const;

export type PercentageRange = typeof PERCENTAGE_RANGE;

/**
 * সর্বোচ্চ পারসেন্টেজ ডিসকাউন্ট
 */
export const MAX_PERCENTAGE_DISCOUNT = 70;

/**
 * Buy X Get Y এর জন্য ন্যূনতম কোয়ান্টিটি
 */
export const BOGO_MIN_QUANTITY = 2;
