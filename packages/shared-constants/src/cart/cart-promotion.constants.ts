/**
 * কার্ট প্রমোশন কনস্ট্যান্ট
 * প্রমোশন এবং অফার সম্পর্কিত কনস্ট্যান্ট
 */

/**
 * প্রমোশন টাইপ
 */
export const PROMOTION_TYPE = {
  FLASH_SALE: 'flash_sale',
  BUNDLE_OFFER: 'bundle_offer',
  SEASONAL: 'seasonal',
  HOLIDAY: 'holiday',
} as const;

export type PromotionType = (typeof PROMOTION_TYPE)[keyof typeof PROMOTION_TYPE];

/**
 * প্রমোশনের অগ্রাধিকার
 */
export const PROMOTION_PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export type PromotionPriority = (typeof PROMOTION_PRIORITY)[keyof typeof PROMOTION_PRIORITY];

/**
 * প্রমোশন স্ট্যাটাস
 */
export const PROMOTION_STATUS = {
  SCHEDULED: 'scheduled',
  ACTIVE: 'active',
  PAUSED: 'paused',
  ENDED: 'ended',
} as const;

export type PromotionStatus = (typeof PROMOTION_STATUS)[keyof typeof PROMOTION_STATUS];

/**
 * বান্ডেল ডিসকাউন্ট টাইপ
 */
export const BUNDLE_DISCOUNT_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
  FREE_ITEM: 'free_item',
} as const;

export type BundleDiscountType = (typeof BUNDLE_DISCOUNT_TYPE)[keyof typeof BUNDLE_DISCOUNT_TYPE];

/**
 * রয়্যালটি পয়েন্ট মাল্টিপ্লায়ার
 */
export const LOYALTY_POINTS_MULTIPLIER = {
  '1X': 1,
  '2X': 2,
  '5X': 5,
} as const;

export type LoyaltyPointsMultiplier =
  (typeof LOYALTY_POINTS_MULTIPLIER)[keyof typeof LOYALTY_POINTS_MULTIPLIER];

/**
 * রিডিমের জন্য ন্যূনতম পয়েন্ট
 */
export const MIN_POINTS_TO_REDEEM = 100;
