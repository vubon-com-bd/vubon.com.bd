/**
 * Deal Constants
 * ডিলের মৌলিক কনফিগারেশন কনস্ট্যান্টসমূহ
 */

// ডিফল্ট ডিসকাউন্ট রেঞ্জ
export const DEFAULT_DISCOUNT_RANGE = {
  min: 5,
  max: 70,
};

// ডিলের মিনিমাম ডিউরেশন (মিনিটে)
export const MINIMUM_DEAL_DURATION = 30;

// ডিলের ম্যাক্সিমাম ডিউরেশন (মিনিটে)
export const MAXIMUM_DEAL_DURATION = 1440; // ২৪ ঘন্টা

// ডিফল্ট কোয়ান্টিটি লিমিট
export const DEFAULT_QUANTITY_LIMIT = 100;

// ক্যাশ সেটিংস
export const DEAL_CACHE_SETTINGS = {
  ttl: 300, // ৫ মিনিট
  maxSize: 1000,
  enabled: true,
};

// ডিফল্ট সর্টিং
export const DEFAULT_DEAL_SORTING = {
  field: 'createdAt',
  order: 'desc' as const,
};

// পেজিনেশন সাইজ
export const DEAL_PAGINATION_SIZE = 10;

// ডিফল্ট ডিসকাউন্ট পার্সেন্টেজ
export const DEFAULT_DISCOUNT_PERCENTAGE = 10;

// ম্যাক্সিমাম ডিসকাউন্ট পার্সেন্টেজ
export const MAXIMUM_DISCOUNT_PERCENTAGE = 90;

// মিনিমাম ডিসকাউন্ট পার্সেন্টেজ
export const MINIMUM_DISCOUNT_PERCENTAGE = 1;

// ডিফল্ট ডিল স্ট্যাটাস
export const DEAL_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  ENDED: 'ended',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

// ডিল টাইপ
export const DEAL_TYPE = {
  FLASH: 'flash',
  BUNDLE: 'bundle',
  BOGO: 'bogo',
  DISCOUNT: 'discount',
  FREE_SHIPPING: 'free_shipping',
} as const;

// ডিফল্ট ডিল লিমিট
export const DEFAULT_DEAL_LIMITS = {
  maxProducts: 50,
  maxCategories: 10,
  maxBrands: 20,
  maxItemsPerUser: 5,
};

// ক্যাশ কী প্রিফিক্স
export const DEAL_CACHE_KEY_PREFIX = 'deal:';

// API রেসপন্স লিমিট
export const DEAL_API_RESPONSE_LIMIT = 100;

// ডিফল্ট ডিল কনফিগারেশন ইন্টারফেস
export interface DealConfig {
  discountRange: {
    min: number;
    max: number;
  };
  minDuration: number;
  maxDuration: number;
  defaultQuantityLimit: number;
  cacheSettings: {
    ttl: number;
    maxSize: number;
    enabled: boolean;
  };
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  paginationSize: number;
  defaultDiscountPercentage: number;
  maxDiscountPercentage: number;
  minDiscountPercentage: number;
  defaultDealLimits: {
    maxProducts: number;
    maxCategories: number;
    maxBrands: number;
    maxItemsPerUser: number;
  };
  cacheKeyPrefix: string;
  apiResponseLimit: number;
}

// ডিফল্ট ডিল কনফিগারেশন
export const DEFAULT_DEAL_CONFIG: DealConfig = {
  discountRange: DEFAULT_DISCOUNT_RANGE,
  minDuration: MINIMUM_DEAL_DURATION,
  maxDuration: MAXIMUM_DEAL_DURATION,
  defaultQuantityLimit: DEFAULT_QUANTITY_LIMIT,
  cacheSettings: DEAL_CACHE_SETTINGS,
  defaultSorting: DEFAULT_DEAL_SORTING,
  paginationSize: DEAL_PAGINATION_SIZE,
  defaultDiscountPercentage: DEFAULT_DISCOUNT_PERCENTAGE,
  maxDiscountPercentage: MAXIMUM_DISCOUNT_PERCENTAGE,
  minDiscountPercentage: MINIMUM_DISCOUNT_PERCENTAGE,
  defaultDealLimits: DEFAULT_DEAL_LIMITS,
  cacheKeyPrefix: DEAL_CACHE_KEY_PREFIX,
  apiResponseLimit: DEAL_API_RESPONSE_LIMIT,
};

// ডিল প্রকারের লেবেল
export const DEAL_TYPE_LABELS: Record<(typeof DEAL_TYPE)[keyof typeof DEAL_TYPE], string> = {
  flash: 'ফ্ল্যাশ ডিল',
  bundle: 'বান্ডেল ডিল',
  bogo: 'এক কিনলে আরেকটি ফ্রি',
  discount: 'ডিসকাউন্ট ডিল',
  free_shipping: 'ফ্রি শিপিং',
};

// ডিল স্ট্যাটাসের লেবেল
export const DEAL_STATUS_LABELS: Record<(typeof DEAL_STATUS)[keyof typeof DEAL_STATUS], string> = {
  draft: 'খসড়া',
  active: 'সক্রিয়',
  paused: 'বিরতিপ্রাপ্ত',
  ended: 'সমাপ্ত',
  cancelled: 'বাতিলকৃত',
  expired: 'মেয়াদোত্তীর্ণ',
};

// ডিল স্ট্যাটাসের কালার
export const DEAL_STATUS_COLORS: Record<(typeof DEAL_STATUS)[keyof typeof DEAL_STATUS], string> = {
  draft: '#6B7280',
  active: '#22C55E',
  paused: '#F59E0B',
  ended: '#6B7280',
  cancelled: '#EF4444',
  expired: '#F97316',
};

// হেল্পার ফাংশন: ডিসকাউন্ট ভ্যালিড কিনা চেক করুন
export const isValidDiscount = (discount: number): boolean => {
  return discount >= MINIMUM_DISCOUNT_PERCENTAGE && discount <= MAXIMUM_DISCOUNT_PERCENTAGE;
};

// হেল্পার ফাংশন: ডিউরেশন ভ্যালিড কিনা চেক করুন
export const isValidDealDuration = (duration: number): boolean => {
  return duration >= MINIMUM_DEAL_DURATION && duration <= MAXIMUM_DEAL_DURATION;
};

// হেল্পার ফাংশন: ডিল স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidDealStatus = (
  status: string
): status is (typeof DEAL_STATUS)[keyof typeof DEAL_STATUS] => {
  return Object.values(DEAL_STATUS).includes(
    status as (typeof DEAL_STATUS)[keyof typeof DEAL_STATUS]
  );
};

// হেল্পার ফাংশন: ডিল টাইপ ভ্যালিড কিনা চেক করুন
export const isValidDealType = (
  type: string
): type is (typeof DEAL_TYPE)[keyof typeof DEAL_TYPE] => {
  return Object.values(DEAL_TYPE).includes(type as (typeof DEAL_TYPE)[keyof typeof DEAL_TYPE]);
};
