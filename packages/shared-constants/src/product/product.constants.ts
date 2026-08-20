/**
 * প্রোডাক্ট মডেলের জন্য কনস্ট্যান্টসমূহ
 */

// প্রোডাক্ট স্ট্যাটাস
export const ProductStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
  DELETED: 'DELETED',
} as const;

export type ProductStatusType = (typeof ProductStatus)[keyof typeof ProductStatus];

// প্রোডাক্ট টাইপ
export const ProductType = {
  SIMPLE: 'SIMPLE',
  VARIABLE: 'VARIABLE',
  DIGITAL: 'DIGITAL',
  PHYSICAL: 'PHYSICAL',
} as const;

export type ProductTypeType = (typeof ProductType)[keyof typeof ProductType];

// প্রোডাক্ট ভিসিবিলিটি
export const ProductVisibility = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  HIDDEN: 'HIDDEN',
} as const;

export type ProductVisibilityType = (typeof ProductVisibility)[keyof typeof ProductVisibility];

// ডিফল্ট সাজানোর অপশন
export const ProductSortOption = {
  NEWEST: 'NEWEST',
  PRICE_LOW_TO_HIGH: 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW: 'PRICE_HIGH_TO_LOW',
  BEST_SELLING: 'BEST_SELLING',
  RATING: 'RATING',
  MOST_VIEWED: 'MOST_VIEWED',
} as const;

export type ProductSortOptionType = (typeof ProductSortOption)[keyof typeof ProductSortOption];

// প্রোডাক্ট ইমেজের সর্বোচ্চ সংখ্যা
export const MAX_PRODUCT_IMAGES = 10;

// ডিফল্ট পেজিনেশন সাইজ
export const DEFAULT_PRODUCT_PAGE_SIZE = 20;

// প্রোডাক্ট নেমের দৈর্ঘ্যের সীমা
export const PRODUCT_NAME_MIN_LENGTH = 3;
export const PRODUCT_NAME_MAX_LENGTH = 255;

// প্রোডাক্ট ডেসক্রিপশনের দৈর্ঘ্যের সীমা
export const PRODUCT_DESCRIPTION_MIN_LENGTH = 10;
export const PRODUCT_DESCRIPTION_MAX_LENGTH = 10000;

// প্রোডাক্ট SKU দৈর্ঘ্যের সীমা
export const PRODUCT_SKU_MIN_LENGTH = 3;
export const PRODUCT_SKU_MAX_LENGTH = 50;

// প্রোডাক্ট স্টক সীমা
export const PRODUCT_STOCK_MIN = 0;
export const PRODUCT_STOCK_MAX = 999999;

// প্রোডাক্ট ওয়েট সীমা (গ্রামে)
export const PRODUCT_WEIGHT_MIN = 0;
export const PRODUCT_WEIGHT_MAX = 100000;

// প্রোডাক্ট রেটিং সীমা
export const PRODUCT_RATING_MIN = 0;
export const PRODUCT_RATING_MAX = 5;

// ডিফল্ট প্রোডাক্ট ভ্যালু
export const DEFAULT_PRODUCT_STATUS = ProductStatus.DRAFT;
export const DEFAULT_PRODUCT_TYPE = ProductType.PHYSICAL;
export const DEFAULT_PRODUCT_VISIBILITY = ProductVisibility.PUBLIC;
export const DEFAULT_PRODUCT_SORT = ProductSortOption.NEWEST;

// প্রোডাক্ট ভেরিয়েন্ট কনস্ট্যান্ট
export const MAX_PRODUCT_VARIANTS = 100;
export const MIN_PRODUCT_VARIANTS = 1;

// প্রোডাক্ট ট্যাগ কনস্ট্যান্ট
export const MAX_PRODUCT_TAGS = 20;
export const PRODUCT_TAG_MIN_LENGTH = 2;
export const PRODUCT_TAG_MAX_LENGTH = 50;

// প্রোডাক্ট মেটাডাটা কনস্ট্যান্ট
export const MAX_PRODUCT_META_FIELDS = 50;
export const PRODUCT_META_KEY_MIN_LENGTH = 1;
export const PRODUCT_META_KEY_MAX_LENGTH = 100;
export const PRODUCT_META_VALUE_MAX_LENGTH = 1000;

// প্রোডাক্ট SEO কনস্ট্যান্ট
export const PRODUCT_SEO_TITLE_MIN_LENGTH = 10;
export const PRODUCT_SEO_TITLE_MAX_LENGTH = 70;
export const PRODUCT_SEO_DESCRIPTION_MIN_LENGTH = 50;
export const PRODUCT_SEO_DESCRIPTION_MAX_LENGTH = 160;

// প্রোডাক্ট ক্যাটাগরি কনস্ট্যান্ট
export const MAX_PRODUCT_CATEGORIES = 5;
export const MIN_PRODUCT_CATEGORIES = 1;

// প্রোডাক্ট কালেকশন কনস্ট্যান্ট
export const MAX_PRODUCT_COLLECTIONS = 10;
