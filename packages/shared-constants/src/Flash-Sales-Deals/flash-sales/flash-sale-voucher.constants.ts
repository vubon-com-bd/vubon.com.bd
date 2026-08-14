/**
 * Flash Sale Voucher Constants
 * ভাউচার সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট ভাউচার টাইপ
export const DEFAULT_VOUCHER_TYPE = {
  percentage: 'percentage',
  fixed: 'fixed',
  freeShipping: 'free_shipping',
  giftCard: 'gift_card',
  cashback: 'cashback',
};

// ডিফল্ট ভ্যালিউ
export const DEFAULT_VOUCHER_VALUE = 100;

// ভাউচার ভ্যালিডিটি ডিউরেশন (দিনে)
export const VOUCHER_VALIDITY_DURATION = 60;

// মিনিমাম অর্ডার অ্যামাউন্ট
export const MINIMUM_VOUCHER_ORDER_AMOUNT = 1000;

// ম্যাক্সিমাম ভ্যালিউ
export const MAXIMUM_VOUCHER_VALUE = 5000;

// ডিফল্ট ইউজ লিমিট
export const DEFAULT_VOUCHER_USE_LIMIT = 1;

// ক্যাশ সেটিংস
export const VOUCHER_CACHE_SETTINGS = {
  ttl: 3600, // ১ ঘন্টা
  maxSize: 1000,
  enabled: true,
};

// ডিফল্ট পেজিনেশন
export const VOUCHER_PAGINATION_SIZE = 10;

// ভাউচার জেনারেশন ফরম্যাট
export const VOUCHER_GENERATION_FORMAT = {
  prefix: 'VCH',
  length: 10,
  charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
};

// ডিফল্ট সর্টিং
export const DEFAULT_VOUCHER_SORTING = {
  field: 'createdAt',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const VOUCHER_API_RESPONSE_LIMIT = 100;

// ভাউচার স্ট্যাটাস
export const VOUCHER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  USED: 'used',
  CANCELLED: 'cancelled',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// ভাউচার কনফিগারেশন ইন্টারফেস
export interface FlashSaleVoucherConfig {
  defaultTypes: {
    percentage: string;
    fixed: string;
    freeShipping: string;
    giftCard: string;
    cashback: string;
  };
  defaultValue: number;
  validityDuration: number;
  minOrderAmount: number;
  maxValue: number;
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

// ডিফল্ট ভাউচার কনফিগারেশন
export const DEFAULT_VOUCHER_CONFIG: FlashSaleVoucherConfig = {
  defaultTypes: DEFAULT_VOUCHER_TYPE,
  defaultValue: DEFAULT_VOUCHER_VALUE,
  validityDuration: VOUCHER_VALIDITY_DURATION,
  minOrderAmount: MINIMUM_VOUCHER_ORDER_AMOUNT,
  maxValue: MAXIMUM_VOUCHER_VALUE,
  defaultUseLimit: DEFAULT_VOUCHER_USE_LIMIT,
  cacheSettings: VOUCHER_CACHE_SETTINGS,
  paginationSize: VOUCHER_PAGINATION_SIZE,
  generationFormat: VOUCHER_GENERATION_FORMAT,
  defaultSorting: DEFAULT_VOUCHER_SORTING,
  apiResponseLimit: VOUCHER_API_RESPONSE_LIMIT,
};

// ভাউচার টাইপের লেবেল
export const VOUCHER_TYPE_LABELS: Record<
  (typeof DEFAULT_VOUCHER_TYPE)[keyof typeof DEFAULT_VOUCHER_TYPE],
  string
> = {
  percentage: 'শতকরা',
  fixed: 'নির্দিষ্ট',
  free_shipping: 'ফ্রি শিপিং',
  gift_card: 'গিফট কার্ড',
  cashback: 'ক্যাশব্যাক',
};

// ভাউচার টাইপের আইকন
export const VOUCHER_TYPE_ICONS: Record<
  (typeof DEFAULT_VOUCHER_TYPE)[keyof typeof DEFAULT_VOUCHER_TYPE],
  string
> = {
  percentage: 'Percent',
  fixed: 'DollarSign',
  free_shipping: 'Truck',
  gift_card: 'Gift',
  cashback: 'Wallet',
};

// ভাউচার টাইপের কালার
export const VOUCHER_TYPE_COLORS: Record<
  (typeof DEFAULT_VOUCHER_TYPE)[keyof typeof DEFAULT_VOUCHER_TYPE],
  string
> = {
  percentage: '#3B82F6',
  fixed: '#22C55E',
  free_shipping: '#8B5CF6',
  gift_card: '#EC4899',
  cashback: '#F59E0B',
};

// ভাউচার স্ট্যাটাসের লেবেল
export const VOUCHER_STATUS_LABELS: Record<
  (typeof VOUCHER_STATUS)[keyof typeof VOUCHER_STATUS],
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

// ভাউচার স্ট্যাটাসের কালার
export const VOUCHER_STATUS_COLORS: Record<
  (typeof VOUCHER_STATUS)[keyof typeof VOUCHER_STATUS],
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

// হেল্পার ফাংশন: ভাউচার টাইপ ভ্যালিড কিনা চেক করুন
export const isValidVoucherType = (
  type: string
): type is (typeof DEFAULT_VOUCHER_TYPE)[keyof typeof DEFAULT_VOUCHER_TYPE] => {
  return Object.values(DEFAULT_VOUCHER_TYPE).includes(
    type as (typeof DEFAULT_VOUCHER_TYPE)[keyof typeof DEFAULT_VOUCHER_TYPE]
  );
};

// হেল্পার ফাংশন: ভাউচার স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidVoucherStatus = (
  status: string
): status is (typeof VOUCHER_STATUS)[keyof typeof VOUCHER_STATUS] => {
  return Object.values(VOUCHER_STATUS).includes(
    status as (typeof VOUCHER_STATUS)[keyof typeof VOUCHER_STATUS]
  );
};

// হেল্পার ফাংশন: ভাউচার কোড জেনারেট করুন
export const generateVoucherCode = (prefix: string = VOUCHER_GENERATION_FORMAT.prefix): string => {
  const chars = VOUCHER_GENERATION_FORMAT.charset;
  const length = VOUCHER_GENERATION_FORMAT.length;
  let code = prefix + '-';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// হেল্পার ফাংশন: ভাউচার ভ্যালিডিটি চেক করুন
export const isVoucherValid = (
  createdAt: Date,
  validityDuration: number = VOUCHER_VALIDITY_DURATION
): boolean => {
  const expiryDate = new Date(createdAt);
  expiryDate.setDate(expiryDate.getDate() + validityDuration);
  return new Date() <= expiryDate;
};

// হেল্পার ফাংশন: ভাউচার ডিসকাউন্ট ক্যালকুলেট করুন
export const calculateVoucherDiscount = (
  amount: number,
  value: number,
  type: (typeof DEFAULT_VOUCHER_TYPE)[keyof typeof DEFAULT_VOUCHER_TYPE]
): number => {
  if (type === 'percentage') {
    return Math.min((amount * value) / 100, MAXIMUM_VOUCHER_VALUE);
  }
  if (type === 'fixed') {
    return Math.min(value, MAXIMUM_VOUCHER_VALUE);
  }
  if (type === 'free_shipping' || type === 'gift_card' || type === 'cashback') {
    return value;
  }
  return 0;
};

// হেল্পার ফাংশন: ভাউচার টাইপের লেবেল পান
export const getVoucherTypeLabel = (type: string): string => {
  return VOUCHER_TYPE_LABELS[type as keyof typeof VOUCHER_TYPE_LABELS] || type;
};

// হেল্পার ফাংশন: ভাউচার টাইপের আইকন পান
export const getVoucherTypeIcon = (type: string): string => {
  return VOUCHER_TYPE_ICONS[type as keyof typeof VOUCHER_TYPE_ICONS] || 'Ticket';
};

// হেল্পার ফাংশন: ভাউচার টাইপের কালার পান
export const getVoucherTypeColor = (type: string): string => {
  return VOUCHER_TYPE_COLORS[type as keyof typeof VOUCHER_TYPE_COLORS] || '#6B7280';
};

// হেল্পার ফাংশন: ভাউচার স্ট্যাটাসের লেবেল পান
export const getVoucherStatusLabel = (status: string): string => {
  return VOUCHER_STATUS_LABELS[status as keyof typeof VOUCHER_STATUS_LABELS] || status;
};

// হেল্পার ফাংশন: ভাউচার স্ট্যাটাসের কালার পান
export const getVoucherStatusColor = (status: string): string => {
  return VOUCHER_STATUS_COLORS[status as keyof typeof VOUCHER_STATUS_COLORS] || '#6B7280';
};
