/**
 * Flash Sale Price Constants
 * প্রাইসিং সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট কারেন্সি
export const DEFAULT_CURRENCY = 'BDT';

// ডিফল্ট প্রাইস ফরম্যাট
export const DEFAULT_PRICE_FORMAT = {
  locale: 'bn-BD',
  currency: 'BDT',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

// মিনিমাম প্রাইস
export const MINIMUM_PRICE = 0;

// ম্যাক্সিমাম প্রাইস
export const MAXIMUM_PRICE = 9999999;

// ডিফল্ট ডিসকাউন্ট
export const DEFAULT_DISCOUNT = 0;

// প্রাইস রাউন্ডিং রুল
export const PRICE_ROUNDING_RULE = {
  decimalPlaces: 2,
  roundMode: 'round' as const,
  minDecimal: 0.01,
};

// ক্যাশ টাইমআউট (মিলিসেকেন্ডে)
export const PRICE_CACHE_TIMEOUT = 300000; // ৫ মিনিট

// ডিফল্ট পেজিনেশন
export const PRICE_PAGINATION_SIZE = 10;

// প্রাইস আপডেট ইন্টারভাল (মিলিসেকেন্ডে)
export const PRICE_UPDATE_INTERVAL = 60000; // ১ মিনিট

// ডিফল্ট সর্টিং
export const DEFAULT_PRICE_SORTING = {
  field: 'price',
  order: 'asc' as const,
};

// API রেসপন্স লিমিট
export const PRICE_API_RESPONSE_LIMIT = 100;

// ডিসকাউন্ট টাইপ
export const DISCOUNT_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
} as const;

// প্রাইস স্ট্যাটাস
export const PRICE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// প্রাইস কনফিগারেশন ইন্টারফেস
export interface FlashSalePriceConfig {
  defaultCurrency: string;
  defaultPriceFormat: {
    locale: string;
    currency: string;
    minimumFractionDigits: number;
    maximumFractionDigits: number;
  };
  minPrice: number;
  maxPrice: number;
  defaultDiscount: number;
  priceRoundingRule: {
    decimalPlaces: number;
    roundMode: 'round' | 'ceil' | 'floor';
    minDecimal: number;
  };
  cacheTimeout: number;
  paginationSize: number;
  priceUpdateInterval: number;
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
}

// ডিফল্ট প্রাইস কনফিগারেশন
export const DEFAULT_PRICE_CONFIG: FlashSalePriceConfig = {
  defaultCurrency: DEFAULT_CURRENCY,
  defaultPriceFormat: DEFAULT_PRICE_FORMAT,
  minPrice: MINIMUM_PRICE,
  maxPrice: MAXIMUM_PRICE,
  defaultDiscount: DEFAULT_DISCOUNT,
  priceRoundingRule: PRICE_ROUNDING_RULE,
  cacheTimeout: PRICE_CACHE_TIMEOUT,
  paginationSize: PRICE_PAGINATION_SIZE,
  priceUpdateInterval: PRICE_UPDATE_INTERVAL,
  defaultSorting: DEFAULT_PRICE_SORTING,
  apiResponseLimit: PRICE_API_RESPONSE_LIMIT,
};

// ডিসকাউন্ট টাইপের লেবেল
export const DISCOUNT_TYPE_LABELS: Record<
  (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE],
  string
> = {
  percentage: 'শতকরা',
  fixed: 'নির্দিষ্ট',
};

// প্রাইস স্ট্যাটাসের লেবেল
export const PRICE_STATUS_LABELS: Record<(typeof PRICE_STATUS)[keyof typeof PRICE_STATUS], string> =
  {
    active: 'সক্রিয়',
    inactive: 'নিষ্ক্রিয়',
    pending: 'অপেক্ষমান',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
  };

// প্রাইস স্ট্যাটাসের কালার
export const PRICE_STATUS_COLORS: Record<(typeof PRICE_STATUS)[keyof typeof PRICE_STATUS], string> =
  {
    active: '#22C55E',
    inactive: '#9CA3AF',
    pending: '#FCD34D',
    approved: '#34D399',
    rejected: '#F87171',
  };

// হেল্পার ফাংশন: প্রাইস ভ্যালিড কিনা চেক করুন
export const isValidPrice = (price: number): boolean => {
  return price >= MINIMUM_PRICE && price <= MAXIMUM_PRICE;
};

// হেল্পার ফাংশন: ডিসকাউন্ট ভ্যালিড কিনা চেক করুন
export const isValidDiscount = (discount: number): boolean => {
  return discount >= 0 && discount <= 100;
};

// হেল্পার ফাংশন: প্রাইস ফরম্যাট করুন
export const formatPrice = (price: number, currency: string = DEFAULT_CURRENCY): string => {
  const formatter = new Intl.NumberFormat(DEFAULT_PRICE_FORMAT.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: DEFAULT_PRICE_FORMAT.minimumFractionDigits,
    maximumFractionDigits: DEFAULT_PRICE_FORMAT.maximumFractionDigits,
  });
  return formatter.format(price);
};

// হেল্পার ফাংশন: ডিসকাউন্ট প্রাইস ক্যালকুলেট করুন
export const calculateDiscountPrice = (
  price: number,
  discount: number,
  type: (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE] = 'percentage'
): number => {
  if (!isValidPrice(price) || !isValidDiscount(discount)) {
    return price;
  }

  let discountAmount = 0;
  if (type === 'percentage') {
    discountAmount = (price * discount) / 100;
  } else {
    discountAmount = discount;
  }

  const finalPrice = price - discountAmount;
  return Math.round(finalPrice * 100) / 100;
};

// হেল্পার ফাংশন: ডিসকাউন্ট পার্সেন্টেজ ক্যালকুলেট করুন
export const calculateDiscountPercentage = (
  originalPrice: number,
  discountedPrice: number
): number => {
  if (!isValidPrice(originalPrice) || !isValidPrice(discountedPrice) || originalPrice === 0) {
    return 0;
  }

  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount * 100) / 100;
};

// হেল্পার ফাংশন: প্রাইস রাউন্ড করুন
export const roundPrice = (price: number): number => {
  const factor = Math.pow(10, PRICE_ROUNDING_RULE.decimalPlaces);
  return Math.round(price * factor) / factor;
};

// হেল্পার ফাংশন: ডিসকাউন্ট টাইপের লেবেল পান
export const getDiscountTypeLabel = (type: string): string => {
  return DISCOUNT_TYPE_LABELS[type as keyof typeof DISCOUNT_TYPE_LABELS] || type;
};

// হেল্পার ফাংশন: প্রাইস স্ট্যাটাসের লেবেল পান
export const getPriceStatusLabel = (status: string): string => {
  return PRICE_STATUS_LABELS[status as keyof typeof PRICE_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: প্রাইস স্ট্যাটাসের কালার পান
export const getPriceStatusColor = (status: string): string => {
  return PRICE_STATUS_COLORS[status as keyof typeof PRICE_STATUS_COLORS] || '#6B7280';
};
