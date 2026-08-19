/**
 * কার্ট আইটেম কনফিগারেশন কনস্ট্যান্ট
 * কার্ট আইটেম সম্পর্কিত কনফিগারেশন এবং সীমাবদ্ধতা
 */

/**
 * ন্যূনতম কোয়ান্টিটি
 */
export const MIN_QUANTITY = 1;

/**
 * সর্বোচ্চ কোয়ান্টিটি
 */
export const MAX_QUANTITY = 999;

/**
 * ডিফল্ট কোয়ান্টিটি
 */
export const DEFAULT_QUANTITY = 1;

/**
 * কোয়ান্টিটি স্টেপ সাইজ
 */
export const QUANTITY_STEP = 1;

/**
 * সর্বোচ্চ আইটেম ওজন (কেজি)
 */
export const MAX_ITEM_WEIGHT = 50;

/**
 * সর্বোচ্চ আইটেম সাইজ (সেমি)
 */
export const MAX_ITEM_DIMENSIONS = {
  LENGTH: 100,
  WIDTH: 100,
  HEIGHT: 100,
} as const;

export type MaxItemDimensions = typeof MAX_ITEM_DIMENSIONS;

/**
 * আইটেমের স্ট্যাটাস
 */
export const ITEM_STATUS = {
  AVAILABLE: 'available',
  OUT_OF_STOCK: 'out_of_stock',
  DISCONTINUED: 'discontinued',
} as const;

export type ItemStatus = (typeof ITEM_STATUS)[keyof typeof ITEM_STATUS];

/**
 * আইটেমের ধরন
 */
export const ITEM_TYPE = {
  PHYSICAL: 'physical',
  DIGITAL: 'digital',
  SERVICE: 'service',
} as const;

export type ItemType = (typeof ITEM_TYPE)[keyof typeof ITEM_TYPE];
