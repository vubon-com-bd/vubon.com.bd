/**
 * Product Deal Constants
 * প্রোডাক্ট ডিলের কনফিগারেশন কনস্ট্যান্টসমূহ
 */

// ডিফল্ট ডিসকাউন্ট
export const DEFAULT_PRODUCT_DEAL_DISCOUNT = 10;

// মিনিমাম কোয়ান্টিটি
export const MINIMUM_PRODUCT_QUANTITY = 1;

// ম্যাক্সিমাম কোয়ান্টিটি
export const MAXIMUM_PRODUCT_QUANTITY = 100;

// ডিফল্ট স্টক
export const DEFAULT_PRODUCT_STOCK = 50;

// অ্যালাউড প্রোডাক্ট টাইপ
export const ALLOWED_PRODUCT_TYPES = {
  physical: 'physical',
  digital: 'digital',
  virtual: 'virtual',
  service: 'service',
  subscription: 'subscription',
};

// ডিফল্ট ডিউরেশন (মিনিটে)
export const DEFAULT_PRODUCT_DEAL_DURATION = 60;

// ক্যাশ সেটিংস
export const PRODUCT_DEAL_CACHE_SETTINGS = {
  ttl: 300,
  maxSize: 1000,
  enabled: true,
};

// পেজিনেশন সাইজ
export const PRODUCT_DEAL_PAGINATION_SIZE = 10;

// ভ্যারিয়েন্ট সাপোর্ট
export const VARIANT_SUPPORT = {
  enabled: true,
  maxVariants: 50,
  defaultVariantLimit: 10,
};

// ব্যাচ সাইজ
export const PRODUCT_DEAL_BATCH_SIZE = 100;

// ডিফল্ট সর্টিং
export const DEFAULT_PRODUCT_DEAL_SORTING = {
  field: 'createdAt',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const PRODUCT_DEAL_API_RESPONSE_LIMIT = 100;

// ম্যাক্সিমাম ডিসকাউন্ট
export const MAXIMUM_PRODUCT_DEAL_DISCOUNT = 90;

// মিনিমাম ডিসকাউন্ট
export const MINIMUM_PRODUCT_DEAL_DISCOUNT = 1;

// ডিফল্ট প্রোডাক্ট স্ট্যাটাস
export const PRODUCT_DEAL_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  ENDED: 'ended',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

// প্রোডাক্ট ডিল কনফিগারেশন ইন্টারফেস
export interface ProductDealConfig {
  defaultDiscount: number;
  minQuantity: number;
  maxQuantity: number;
  defaultStock: number;
  allowedProductTypes: {
    physical: string;
    digital: string;
    virtual: string;
    service: string;
    subscription: string;
  };
  defaultDuration: number;
  cacheSettings: {
    ttl: number;
    maxSize: number;
    enabled: boolean;
  };
  paginationSize: number;
  variantSupport: {
    enabled: boolean;
    maxVariants: number;
    defaultVariantLimit: number;
  };
  batchSize: number;
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
  maxDiscount: number;
  minDiscount: number;
}

// ডিফল্ট প্রোডাক্ট ডিল কনফিগারেশন
export const DEFAULT_PRODUCT_DEAL_CONFIG: ProductDealConfig = {
  defaultDiscount: DEFAULT_PRODUCT_DEAL_DISCOUNT,
  minQuantity: MINIMUM_PRODUCT_QUANTITY,
  maxQuantity: MAXIMUM_PRODUCT_QUANTITY,
  defaultStock: DEFAULT_PRODUCT_STOCK,
  allowedProductTypes: ALLOWED_PRODUCT_TYPES,
  defaultDuration: DEFAULT_PRODUCT_DEAL_DURATION,
  cacheSettings: PRODUCT_DEAL_CACHE_SETTINGS,
  paginationSize: PRODUCT_DEAL_PAGINATION_SIZE,
  variantSupport: VARIANT_SUPPORT,
  batchSize: PRODUCT_DEAL_BATCH_SIZE,
  defaultSorting: DEFAULT_PRODUCT_DEAL_SORTING,
  apiResponseLimit: PRODUCT_DEAL_API_RESPONSE_LIMIT,
  maxDiscount: MAXIMUM_PRODUCT_DEAL_DISCOUNT,
  minDiscount: MINIMUM_PRODUCT_DEAL_DISCOUNT,
};

// প্রোডাক্ট টাইপের লেবেল
export const PRODUCT_TYPE_LABELS: Record<
  (typeof ALLOWED_PRODUCT_TYPES)[keyof typeof ALLOWED_PRODUCT_TYPES],
  string
> = {
  physical: 'ভৌত পণ্য',
  digital: 'ডিজিটাল পণ্য',
  virtual: 'ভার্চুয়াল পণ্য',
  service: 'সেবা',
  subscription: 'সাবস্ক্রিপশন',
};

// প্রোডাক্ট টাইপের আইকন
export const PRODUCT_TYPE_ICONS: Record<
  (typeof ALLOWED_PRODUCT_TYPES)[keyof typeof ALLOWED_PRODUCT_TYPES],
  string
> = {
  physical: 'Package',
  digital: 'Download',
  virtual: 'Globe',
  service: 'Briefcase',
  subscription: 'Repeat',
};

// প্রোডাক্ট টাইপের কালার
export const PRODUCT_TYPE_COLORS: Record<
  (typeof ALLOWED_PRODUCT_TYPES)[keyof typeof ALLOWED_PRODUCT_TYPES],
  string
> = {
  physical: '#3B82F6',
  digital: '#8B5CF6',
  virtual: '#06B6D4',
  service: '#F59E0B',
  subscription: '#EC4899',
};

// প্রোডাক্ট ডিল স্ট্যাটাসের লেবেল
export const PRODUCT_DEAL_STATUS_LABELS: Record<
  (typeof PRODUCT_DEAL_STATUS)[keyof typeof PRODUCT_DEAL_STATUS],
  string
> = {
  draft: 'খসড়া',
  active: 'সক্রিয়',
  paused: 'বিরতিপ্রাপ্ত',
  ended: 'সমাপ্ত',
  cancelled: 'বাতিলকৃত',
  expired: 'মেয়াদোত্তীর্ণ',
};

// প্রোডাক্ট ডিল স্ট্যাটাসের কালার
export const PRODUCT_DEAL_STATUS_COLORS: Record<
  (typeof PRODUCT_DEAL_STATUS)[keyof typeof PRODUCT_DEAL_STATUS],
  string
> = {
  draft: '#9CA3AF',
  active: '#22C55E',
  paused: '#F59E0B',
  ended: '#6B7280',
  cancelled: '#EF4444',
  expired: '#F97316',
};

// হেল্পার ফাংশন: প্রোডাক্ট কোয়ান্টিটি ভ্যালিড কিনা চেক করুন
export const isValidProductQuantity = (quantity: number): boolean => {
  return quantity >= MINIMUM_PRODUCT_QUANTITY && quantity <= MAXIMUM_PRODUCT_QUANTITY;
};

// হেল্পার ফাংশন: প্রোডাক্ট ডিসকাউন্ট ভ্যালিড কিনা চেক করুন
export const isValidProductDiscount = (discount: number): boolean => {
  return discount >= MINIMUM_PRODUCT_DEAL_DISCOUNT && discount <= MAXIMUM_PRODUCT_DEAL_DISCOUNT;
};

// হেল্পার ফাংশন: প্রোডাক্ট টাইপ ভ্যালিড কিনা চেক করুন
export const isValidProductType = (
  type: string
): type is (typeof ALLOWED_PRODUCT_TYPES)[keyof typeof ALLOWED_PRODUCT_TYPES] => {
  return Object.values(ALLOWED_PRODUCT_TYPES).includes(
    type as (typeof ALLOWED_PRODUCT_TYPES)[keyof typeof ALLOWED_PRODUCT_TYPES]
  );
};

// হেল্পার ফাংশন: প্রোডাক্ট ডিল স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidProductDealStatus = (
  status: string
): status is (typeof PRODUCT_DEAL_STATUS)[keyof typeof PRODUCT_DEAL_STATUS] => {
  return Object.values(PRODUCT_DEAL_STATUS).includes(
    status as (typeof PRODUCT_DEAL_STATUS)[keyof typeof PRODUCT_DEAL_STATUS]
  );
};

// হেল্পার ফাংশন: প্রোডাক্ট ডিল ডিউরেশন ভ্যালিড কিনা চেক করুন
export const isValidProductDealDuration = (duration: number): boolean => {
  return duration >= 30 && duration <= 1440;
};

// হেল্পার ফাংশন: প্রোডাক্ট টাইপের লেবেল পান
export const getProductTypeLabel = (type: string): string => {
  return PRODUCT_TYPE_LABELS[type as keyof typeof PRODUCT_TYPE_LABELS] || type;
};

// হেল্পার ফাংশন: প্রোডাক্ট টাইপের কালার পান
export const getProductTypeColor = (type: string): string => {
  return PRODUCT_TYPE_COLORS[type as keyof typeof PRODUCT_TYPE_COLORS] || '#6B7280';
};

// হেল্পার ফাংশন: প্রোডাক্ট টাইপের আইকন পান
export const getProductTypeIcon = (type: string): string => {
  return PRODUCT_TYPE_ICONS[type as keyof typeof PRODUCT_TYPE_ICONS] || 'Circle';
};
