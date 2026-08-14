/**
 * Flash Sale Coupon Constants
 * কুপন সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট কুপন টাইপ
export const DEFAULT_COUPON_TYPE = {
  percentage: 'percentage',
  fixed: 'fixed',
  freeShipping: 'free_shipping',
  buyOneGetOne: 'buy_one_get_one',
};

// ডিফল্ট ডিসকাউন্ট
export const DEFAULT_COUPON_DISCOUNT = 10;

// কুপন ভ্যালিডিটি ডিউরেশন (দিনে)
export const COUPON_VALIDITY_DURATION = 30;

// মিনিমাম অর্ডার অ্যামাউন্ট
export const MINIMUM_ORDER_AMOUNT = 500;

// ম্যাক্সিমাম ডিসকাউন্ট
export const MAXIMUM_COUPON_DISCOUNT = 1000;

// ডিফল্ট ইউজ লিমিট
export const DEFAULT_USE_LIMIT = 1;

// ক্যাশ সেটিংস
export const COUPON_CACHE_SETTINGS = {
  ttl: 3600, // ১ ঘন্টা
  maxSize: 1000,
  enabled: true,
};

// ডিফল্ট পেজিনেশন
export const COUPON_PAGINATION_SIZE = 10;

// কুপন জেনারেশন ফরম্যাট
export const COUPON_GENERATION_FORMAT = {
  prefix: 'FLASH',
  length: 8,
  charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
};

// ডিফল্ট সর্টিং
export const DEFAULT_COUPON_SORTING = {
  field: 'createdAt',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const COUPON_API_RESPONSE_LIMIT = 100;

// কুপন স্ট্যাটাস
export const COUPON_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  USED: 'used',
  CANCELLED: 'cancelled',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// কুপন কনফিগারেশন ইন্টারফেস
export interface FlashSaleCouponConfig {
  defaultTypes: {
    percentage: string;
    fixed: string;
    freeShipping: string;
    buyOneGetOne: string;
  };
  defaultDiscount: number;
  validityDuration: number;
  minOrderAmount: number;
  maxDiscount: number;
  defaultUseLimit: number;
  cacheSettings: {
    ttl: number;
    maxSize: number;
    enabled: boolean;
  };
  paginationSize: number;
  generationFormat: {
    prefix: string;
    length: number;
    charset: string;
  };
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
}

// ডিফল্ট কুপন কনফিগারেশন
export const DEFAULT_COUPON_CONFIG: FlashSaleCouponConfig = {
  defaultTypes: DEFAULT_COUPON_TYPE,
  defaultDiscount: DEFAULT_COUPON_DISCOUNT,
  validityDuration: COUPON_VALIDITY_DURATION,
  minOrderAmount: MINIMUM_ORDER_AMOUNT,
  maxDiscount: MAXIMUM_COUPON_DISCOUNT,
  defaultUseLimit: DEFAULT_USE_LIMIT,
  cacheSettings: COUPON_CACHE_SETTINGS,
  paginationSize: COUPON_PAGINATION_SIZE,
  generationFormat: COUPON_GENERATION_FORMAT,
  defaultSorting: DEFAULT_COUPON_SORTING,
  apiResponseLimit: COUPON_API_RESPONSE_LIMIT,
};

// কুপন টাইপের লেবেল
export const COUPON_TYPE_LABELS: Record<
  (typeof DEFAULT_COUPON_TYPE)[keyof typeof DEFAULT_COUPON_TYPE],
  string
> = {
  percentage: 'শতকরা',
  fixed: 'নির্দিষ্ট',
  free_shipping: 'ফ্রি শিপিং',
  buy_one_get_one: 'এক কিনলে আরেকটি ফ্রি',
};

// কুপন টাইপের আইকন
export const COUPON_TYPE_ICONS: Record<
  (typeof DEFAULT_COUPON_TYPE)[keyof typeof DEFAULT_COUPON_TYPE],
  string
> = {
  percentage: 'Percent',
  fixed: 'DollarSign',
  free_shipping: 'Truck',
  buy_one_get_one: 'Gift',
};

// কুপন টাইপের কালার
export const COUPON_TYPE_COLORS: Record<
  (typeof DEFAULT_COUPON_TYPE)[keyof typeof DEFAULT_COUPON_TYPE],
  string
> = {
  percentage: '#3B82F6',
  fixed: '#22C55E',
  free_shipping: '#8B5CF6',
  buy_one_get_one: '#EC4899',
};

// কুপন স্ট্যাটাসের লেবেল
export const COUPON_STATUS_LABELS: Record<
  (typeof COUPON_STATUS)[keyof typeof COUPON_STATUS],
  string
> = {
  active: 'সক্রিয়',
  inactive: 'নিষ্ক্রিয়',
  expired: 'মেয়াদোত্তীর্ণ',
  used: 'ব্যবহৃত',
  cancelled: 'বাতিলকৃত',
  pending: 'অপেক্ষমান',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',
};

// কুপন স্ট্যাটাসের কালার
export const COUPON_STATUS_COLORS: Record<
  (typeof COUPON_STATUS)[keyof typeof COUPON_STATUS],
  string
> = {
  active: '#22C55E',
  inactive: '#9CA3AF',
  expired: '#F97316',
  used: '#3B82F6',
  cancelled: '#6B7280',
  pending: '#FCD34D',
  approved: '#34D399',
  rejected: '#F87171',
};

// হেল্পার ফাংশন: কুপন টাইপ ভ্যালিড কিনা চেক করুন
export const isValidCouponType = (
  type: string
): type is (typeof DEFAULT_COUPON_TYPE)[keyof typeof DEFAULT_COUPON_TYPE] => {
  return Object.values(DEFAULT_COUPON_TYPE).includes(
    type as (typeof DEFAULT_COUPON_TYPE)[keyof typeof DEFAULT_COUPON_TYPE]
  );
};

// হেল্পার ফাংশন: কুপন স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidCouponStatus = (
  status: string
): status is (typeof COUPON_STATUS)[keyof typeof COUPON_STATUS] => {
  return Object.values(COUPON_STATUS).includes(
    status as (typeof COUPON_STATUS)[keyof typeof COUPON_STATUS]
  );
};

// হেল্পার ফাংশন: কুপন কোড জেনারেট করুন
export const generateCouponCode = (prefix: string = COUPON_GENERATION_FORMAT.prefix): string => {
  const chars = COUPON_GENERATION_FORMAT.charset;
  const length = COUPON_GENERATION_FORMAT.length;
  let code = prefix + '-';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// হেল্পার ফাংশন: কুপন ভ্যালিডিটি চেক করুন
export const isCouponValid = (
  createdAt: Date,
  validityDuration: number = COUPON_VALIDITY_DURATION
): boolean => {
  const expiryDate = new Date(createdAt);
  expiryDate.setDate(expiryDate.getDate() + validityDuration);
  return new Date() <= expiryDate;
};

// হেল্পার ফাংশন: কুপন ডিসকাউন্ট ক্যালকুলেট করুন
export const calculateCouponDiscount = (
  amount: number,
  discount: number,
  type: (typeof DEFAULT_COUPON_TYPE)[keyof typeof DEFAULT_COUPON_TYPE]
): number => {
  if (type === 'percentage') {
    return Math.min((amount * discount) / 100, MAXIMUM_COUPON_DISCOUNT);
  }
  if (type === 'fixed') {
    return Math.min(discount, MAXIMUM_COUPON_DISCOUNT);
  }
  if (type === 'free_shipping') {
    return 0; // Shipping cost handled separately
  }
  if (type === 'buy_one_get_one') {
    return amount / 2; // Assuming BOGO gives 50% off on total
  }
  return 0;
};

// হেল্পার ফাংশন: কুপন টাইপের লেবেল পান
export const getCouponTypeLabel = (type: string): string => {
  return COUPON_TYPE_LABELS[type as keyof typeof COUPON_TYPE_LABELS] || type;
};

// হেল্পার ফাংশন: কুপন টাইপের আইকন পান
export const getCouponTypeIcon = (type: string): string => {
  return COUPON_TYPE_ICONS[type as keyof typeof COUPON_TYPE_ICONS] || 'Ticket';
};

// হেল্পার ফাংশন: কুপন টাইপের কালার পান
export const getCouponTypeColor = (type: string): string => {
  return COUPON_TYPE_COLORS[type as keyof typeof COUPON_TYPE_COLORS] || '#6B7280';
};

// হেল্পার ফাংশন: কুপন স্ট্যাটাসের লেবেল পান
export const getCouponStatusLabel = (status: string): string => {
  return COUPON_STATUS_LABELS[status as keyof typeof COUPON_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: কুপন স্ট্যাটাসের কালার পান
export const getCouponStatusColor = (status: string): string => {
  return COUPON_STATUS_COLORS[status as keyof typeof COUPON_STATUS_COLORS] || '#6B7280';
};
