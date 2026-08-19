/**
 * সার্চ বুস্টিং (রিলেভেন্স বাড়ানো) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * বুস্ট ফ্যাক্টরসমূহ
 */
export const BOOST_FACTORS = {
  TITLE_BOOST: 5.0,
  DESCRIPTION_BOOST: 2.0,
  CATEGORY_BOOST: 3.0,
  BRAND_BOOST: 4.0,
  TAG_BOOST: 1.5,
  SKU_BOOST: 1.0,
  PRICE_BOOST: 0.5,
  RATING_BOOST: 2.0,
  POPULARITY_BOOST: 1.8,
} as const;

/**
 * বুস্ট ফ্যাক্টর লেবেলসমূহ (বাংলায়)
 */
export const BOOST_FACTOR_LABELS: Record<keyof typeof BOOST_FACTORS, string> = {
  TITLE_BOOST: 'শিরোনাম বুস্ট',
  DESCRIPTION_BOOST: 'বিবরণ বুস্ট',
  CATEGORY_BOOST: 'ক্যাটাগরি বুস্ট',
  BRAND_BOOST: 'ব্র্যান্ড বুস্ট',
  TAG_BOOST: 'ট্যাগ বুস্ট',
  SKU_BOOST: 'SKU বুস্ট',
  PRICE_BOOST: 'দাম বুস্ট',
  RATING_BOOST: 'রেটিং বুস্ট',
  POPULARITY_BOOST: 'জনপ্রিয়তা বুস্ট',
} as const;

/**
 * বুস্ট ফ্যাক্টর লেবেলসমূহ (ইংরেজিতে)
 */
export const BOOST_FACTOR_LABELS_EN: Record<keyof typeof BOOST_FACTORS, string> = {
  TITLE_BOOST: 'Title Boost',
  DESCRIPTION_BOOST: 'Description Boost',
  CATEGORY_BOOST: 'Category Boost',
  BRAND_BOOST: 'Brand Boost',
  TAG_BOOST: 'Tag Boost',
  SKU_BOOST: 'SKU Boost',
  PRICE_BOOST: 'Price Boost',
  RATING_BOOST: 'Rating Boost',
  POPULARITY_BOOST: 'Popularity Boost',
} as const;

/**
 * ডিফল্ট বুস্ট ভ্যালু
 */
export const DEFAULT_BOOST = 1.0;

/**
 * মিনিমাম বুস্ট লিমিট
 */
export const MIN_BOOST_LIMIT = 0.1;

/**
 * ম্যাক্সিমাম বুস্ট লিমিট
 */
export const MAX_BOOST_LIMIT = 10.0;

/**
 * সিজনাল বুস্ট ফ্যাক্টরসমূহ
 */
export const SEASONAL_BOOST_FACTORS = {
  NEW_YEAR: 1.2,
  EID: 1.5,
  POHELA_BOISHAKH: 1.3,
  BLACK_FRIDAY: 1.8,
  CHRISTMAS: 1.6,
  VALENTINES_DAY: 1.4,
  SUMMER_SALE: 1.3,
  WINTER_SALE: 1.2,
} as const;

/**
 * সিজনাল বুস্ট লেবেলসমূহ (বাংলায়)
 */
export const SEASONAL_BOOST_LABELS: Record<keyof typeof SEASONAL_BOOST_FACTORS, string> = {
  NEW_YEAR: 'নববর্ষ',
  EID: 'ঈদ',
  POHELA_BOISHAKH: 'পহেলা বৈশাখ',
  BLACK_FRIDAY: 'ব্ল্যাক ফ্রাইডে',
  CHRISTMAS: 'ক্রিসমাস',
  VALENTINES_DAY: 'ভ্যালেন্টাইনস ডে',
  SUMMER_SALE: 'গ্রীষ্মকালীন সেল',
  WINTER_SALE: 'শীতকালীন সেল',
} as const;

/**
 * বুস্ট কনফিগারেশন টাইপ
 */
export type BoostConfig = {
  factor: number;
  label: string;
  description: string;
  minLimit: number;
  maxLimit: number;
};

/**
 * বুস্ট কনফিগারেশনসমূহ
 */
export const BOOST_CONFIGS: Record<keyof typeof BOOST_FACTORS, BoostConfig> = {
  TITLE_BOOST: {
    factor: BOOST_FACTORS.TITLE_BOOST,
    label: BOOST_FACTOR_LABELS.TITLE_BOOST,
    description: 'শিরোনামের ভিত্তিতে রিলেভেন্স বাড়ায়',
    minLimit: MIN_BOOST_LIMIT,
    maxLimit: MAX_BOOST_LIMIT,
  },
  DESCRIPTION_BOOST: {
    factor: BOOST_FACTORS.DESCRIPTION_BOOST,
    label: BOOST_FACTOR_LABELS.DESCRIPTION_BOOST,
    description: 'বিবরণের ভিত্তিতে রিলেভেন্স বাড়ায়',
    minLimit: MIN_BOOST_LIMIT,
    maxLimit: MAX_BOOST_LIMIT,
  },
  CATEGORY_BOOST: {
    factor: BOOST_FACTORS.CATEGORY_BOOST,
    label: BOOST_FACTOR_LABELS.CATEGORY_BOOST,
    description: 'ক্যাটাগরির ভিত্তিতে রিলেভেন্স বাড়ায়',
    minLimit: MIN_BOOST_LIMIT,
    maxLimit: MAX_BOOST_LIMIT,
  },
  BRAND_BOOST: {
    factor: BOOST_FACTORS.BRAND_BOOST,
    label: BOOST_FACTOR_LABELS.BRAND_BOOST,
    description: 'ব্র্যান্ডের ভিত্তিতে রিলেভেন্স বাড়ায়',
    minLimit: MIN_BOOST_LIMIT,
    maxLimit: MAX_BOOST_LIMIT,
  },
  TAG_BOOST: {
    factor: BOOST_FACTORS.TAG_BOOST,
    label: BOOST_FACTOR_LABELS.TAG_BOOST,
    description: 'ট্যাগের ভিত্তিতে রিলেভেন্স বাড়ায়',
    minLimit: MIN_BOOST_LIMIT,
    maxLimit: MAX_BOOST_LIMIT,
  },
  SKU_BOOST: {
    factor: BOOST_FACTORS.SKU_BOOST,
    label: BOOST_FACTOR_LABELS.SKU_BOOST,
    description: 'SKU-এর ভিত্তিতে রিলেভেন্স বাড়ায়',
    minLimit: MIN_BOOST_LIMIT,
    maxLimit: MAX_BOOST_LIMIT,
  },
  PRICE_BOOST: {
    factor: BOOST_FACTORS.PRICE_BOOST,
    label: BOOST_FACTOR_LABELS.PRICE_BOOST,
    description: 'দামের ভিত্তিতে রিলেভেন্স বাড়ায়',
    minLimit: MIN_BOOST_LIMIT,
    maxLimit: MAX_BOOST_LIMIT,
  },
  RATING_BOOST: {
    factor: BOOST_FACTORS.RATING_BOOST,
    label: BOOST_FACTOR_LABELS.RATING_BOOST,
    description: 'রেটিংয়ের ভিত্তিতে রিলেভেন্স বাড়ায়',
    minLimit: MIN_BOOST_LIMIT,
    maxLimit: MAX_BOOST_LIMIT,
  },
  POPULARITY_BOOST: {
    factor: BOOST_FACTORS.POPULARITY_BOOST,
    label: BOOST_FACTOR_LABELS.POPULARITY_BOOST,
    description: 'জনপ্রিয়তার ভিত্তিতে রিলেভেন্স বাড়ায়',
    minLimit: MIN_BOOST_LIMIT,
    maxLimit: MAX_BOOST_LIMIT,
  },
} as const;

/**
 * বুস্ট এরর মেসেজসমূহ
 */
export const BOOST_ERROR_MESSAGES = {
  INVALID_FACTOR: `বুস্ট ফ্যাক্টর ${MIN_BOOST_LIMIT} থেকে ${MAX_BOOST_LIMIT} এর মধ্যে হতে হবে`,
  FACTOR_TOO_LOW: `বুস্ট ফ্যাক্টর ${MIN_BOOST_LIMIT} এর চেয়ে কম হতে পারে না`,
  FACTOR_TOO_HIGH: `বুস্ট ফ্যাক্টর ${MAX_BOOST_LIMIT} এর চেয়ে বেশি হতে পারে না`,
} as const;
