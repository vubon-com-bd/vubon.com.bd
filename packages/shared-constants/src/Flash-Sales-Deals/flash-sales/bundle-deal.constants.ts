/**
 * Bundle Deal Constants
 * বান্ডেল ডিলের কনফিগারেশন কনস্ট্যান্টসমূহ
 */

// ডিফল্ট ডিসকাউন্ট
export const DEFAULT_BUNDLE_DEAL_DISCOUNT = 15;

// মিনিমাম প্রোডাক্ট সংখ্যা
export const MINIMUM_BUNDLE_PRODUCTS = 2;

// ম্যাক্সিমাম প্রোডাক্ট সংখ্যা
export const MAXIMUM_BUNDLE_PRODUCTS = 20;

// ডিফল্ট বান্ডেল সাইজ
export const DEFAULT_BUNDLE_SIZE = 3;

// অ্যালাউড প্রোডাক্ট ক্যাটাগরি
export const ALLOWED_BUNDLE_CATEGORIES = {
  electronics: 'electronics',
  clothing: 'clothing',
  books: 'books',
  home: 'home',
  beauty: 'beauty',
  sports: 'sports',
  food: 'food',
  toys: 'toys',
};

// ডিফল্ট ডিউরেশন (মিনিটে)
export const DEFAULT_BUNDLE_DEAL_DURATION = 120;

// ক্যাশ সেটিংস
export const BUNDLE_DEAL_CACHE_SETTINGS = {
  ttl: 300,
  maxSize: 1000,
  enabled: true,
};

// পেজিনেশন সাইজ
export const BUNDLE_DEAL_PAGINATION_SIZE = 10;

// বান্ডেল টাইপ সাপোর্ট
export const BUNDLE_TYPE_SUPPORT = {
  fixed: 'fixed',
  custom: 'custom',
  mixed: 'mixed',
  premium: 'premium',
};

// ডিফল্ট সর্টিং
export const DEFAULT_BUNDLE_DEAL_SORTING = {
  field: 'createdAt',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const BUNDLE_DEAL_API_RESPONSE_LIMIT = 100;

// ম্যাক্সিমাম ডিসকাউন্ট
export const MAXIMUM_BUNDLE_DEAL_DISCOUNT = 80;

// মিনিমাম ডিসকাউন্ট
export const MINIMUM_BUNDLE_DEAL_DISCOUNT = 5;

// ডিফল্ট বান্ডেল স্ট্যাটাস
export const BUNDLE_DEAL_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  ENDED: 'ended',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

// বান্ডেল ডিল কনফিগারেশন ইন্টারফেস
export interface BundleDealConfig {
  defaultDiscount: number;
  minProducts: number;
  maxProducts: number;
  defaultBundleSize: number;
  allowedCategories: {
    electronics: string;
    clothing: string;
    books: string;
    home: string;
    beauty: string;
    sports: string;
    food: string;
    toys: string;
  };
  defaultDuration: number;
  cacheSettings: {
    ttl: number;
    maxSize: number;
    enabled: boolean;
  };
  paginationSize: number;
  bundleTypeSupport: {
    fixed: string;
    custom: string;
    mixed: string;
    premium: string;
  };
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
  maxDiscount: number;
  minDiscount: number;
}

// ডিফল্ট বান্ডেল ডিল কনফিগারেশন
export const DEFAULT_BUNDLE_DEAL_CONFIG: BundleDealConfig = {
  defaultDiscount: DEFAULT_BUNDLE_DEAL_DISCOUNT,
  minProducts: MINIMUM_BUNDLE_PRODUCTS,
  maxProducts: MAXIMUM_BUNDLE_PRODUCTS,
  defaultBundleSize: DEFAULT_BUNDLE_SIZE,
  allowedCategories: ALLOWED_BUNDLE_CATEGORIES,
  defaultDuration: DEFAULT_BUNDLE_DEAL_DURATION,
  cacheSettings: BUNDLE_DEAL_CACHE_SETTINGS,
  paginationSize: BUNDLE_DEAL_PAGINATION_SIZE,
  bundleTypeSupport: BUNDLE_TYPE_SUPPORT,
  defaultSorting: DEFAULT_BUNDLE_DEAL_SORTING,
  apiResponseLimit: BUNDLE_DEAL_API_RESPONSE_LIMIT,
  maxDiscount: MAXIMUM_BUNDLE_DEAL_DISCOUNT,
  minDiscount: MINIMUM_BUNDLE_DEAL_DISCOUNT,
};

// বান্ডেল ক্যাটাগরির লেবেল
export const BUNDLE_CATEGORY_LABELS: Record<
  (typeof ALLOWED_BUNDLE_CATEGORIES)[keyof typeof ALLOWED_BUNDLE_CATEGORIES],
  string
> = {
  electronics: 'ইলেকট্রনিক্স',
  clothing: 'পোশাক',
  books: 'বই',
  home: 'গৃহস্থালি',
  beauty: 'বিউটি',
  sports: 'খেলাধুলা',
  food: 'খাদ্য',
  toys: 'খেলনা',
};

// বান্ডেল ক্যাটাগরির আইকন
export const BUNDLE_CATEGORY_ICONS: Record<
  (typeof ALLOWED_BUNDLE_CATEGORIES)[keyof typeof ALLOWED_BUNDLE_CATEGORIES],
  string
> = {
  electronics: 'Laptop',
  clothing: 'Shirt',
  books: 'Book',
  home: 'Home',
  beauty: 'Sparkles',
  sports: 'Activity',
  food: 'Utensils',
  toys: 'Gamepad',
};

// বান্ডেল ক্যাটাগরির কালার
export const BUNDLE_CATEGORY_COLORS: Record<
  (typeof ALLOWED_BUNDLE_CATEGORIES)[keyof typeof ALLOWED_BUNDLE_CATEGORIES],
  string
> = {
  electronics: '#3B82F6',
  clothing: '#EC4899',
  books: '#F59E0B',
  home: '#10B981',
  beauty: '#8B5CF6',
  sports: '#EF4444',
  food: '#F97316',
  toys: '#06B6D4',
};

// বান্ডেল টাইপের লেবেল
export const BUNDLE_TYPE_LABELS: Record<
  (typeof BUNDLE_TYPE_SUPPORT)[keyof typeof BUNDLE_TYPE_SUPPORT],
  string
> = {
  fixed: 'নির্দিষ্ট',
  custom: 'কাস্টম',
  mixed: 'মিশ্র',
  premium: 'প্রিমিয়াম',
};

// বান্ডেল টাইপের আইকন
export const BUNDLE_TYPE_ICONS: Record<
  (typeof BUNDLE_TYPE_SUPPORT)[keyof typeof BUNDLE_TYPE_SUPPORT],
  string
> = {
  fixed: 'Lock',
  custom: 'Settings',
  mixed: 'Layers',
  premium: 'Star',
};

// বান্ডেল ডিল স্ট্যাটাসের লেবেল
export const BUNDLE_DEAL_STATUS_LABELS: Record<
  (typeof BUNDLE_DEAL_STATUS)[keyof typeof BUNDLE_DEAL_STATUS],
  string
> = {
  draft: 'খসড়া',
  active: 'সক্রিয়',
  paused: 'বিরতিপ্রাপ্ত',
  ended: 'সমাপ্ত',
  cancelled: 'বাতিলকৃত',
  expired: 'মেয়াদোত্তীর্ণ',
};

// বান্ডেল ডিল স্ট্যাটাসের কালার
export const BUNDLE_DEAL_STATUS_COLORS: Record<
  (typeof BUNDLE_DEAL_STATUS)[keyof typeof BUNDLE_DEAL_STATUS],
  string
> = {
  draft: '#9CA3AF',
  active: '#22C55E',
  paused: '#F59E0B',
  ended: '#6B7280',
  cancelled: '#EF4444',
  expired: '#F97316',
};

// হেল্পার ফাংশন: বান্ডেল প্রোডাক্ট সংখ্যা ভ্যালিড কিনা চেক করুন
export const isValidBundleProductCount = (count: number): boolean => {
  return count >= MINIMUM_BUNDLE_PRODUCTS && count <= MAXIMUM_BUNDLE_PRODUCTS;
};

// হেল্পার ফাংশন: বান্ডেল ডিসকাউন্ট ভ্যালিড কিনা চেক করুন
export const isValidBundleDiscount = (discount: number): boolean => {
  return discount >= MINIMUM_BUNDLE_DEAL_DISCOUNT && discount <= MAXIMUM_BUNDLE_DEAL_DISCOUNT;
};

// হেল্পার ফাংশন: বান্ডেল ক্যাটাগরি ভ্যালিড কিনা চেক করুন
export const isValidBundleCategory = (
  category: string
): category is (typeof ALLOWED_BUNDLE_CATEGORIES)[keyof typeof ALLOWED_BUNDLE_CATEGORIES] => {
  return Object.values(ALLOWED_BUNDLE_CATEGORIES).includes(
    category as (typeof ALLOWED_BUNDLE_CATEGORIES)[keyof typeof ALLOWED_BUNDLE_CATEGORIES]
  );
};

// হেল্পার ফাংশন: বান্ডেল টাইপ ভ্যালিড কিনা চেক করুন
export const isValidBundleType = (
  type: string
): type is (typeof BUNDLE_TYPE_SUPPORT)[keyof typeof BUNDLE_TYPE_SUPPORT] => {
  return Object.values(BUNDLE_TYPE_SUPPORT).includes(
    type as (typeof BUNDLE_TYPE_SUPPORT)[keyof typeof BUNDLE_TYPE_SUPPORT]
  );
};

// হেল্পার ফাংশন: বান্ডেল ডিল স্ট্যাটাস ভ্যালিড কিনা চেক করুন
export const isValidBundleDealStatus = (
  status: string
): status is (typeof BUNDLE_DEAL_STATUS)[keyof typeof BUNDLE_DEAL_STATUS] => {
  return Object.values(BUNDLE_DEAL_STATUS).includes(
    status as (typeof BUNDLE_DEAL_STATUS)[keyof typeof BUNDLE_DEAL_STATUS]
  );
};

// হেল্পার ফাংশন: বান্ডেল ডিল ডিউরেশন ভ্যালিড কিনা চেক করুন
export const isValidBundleDealDuration = (duration: number): boolean => {
  return duration >= 30 && duration <= 1440;
};

// হেল্পার ফাংশন: বান্ডেল ক্যাটাগরির লেবেল পান
export const getBundleCategoryLabel = (category: string): string => {
  return BUNDLE_CATEGORY_LABELS[category as keyof typeof BUNDLE_CATEGORY_LABELS] || category;
};

// হেল্পার ফাংশন: বান্ডেল ক্যাটাগরির কালার পান
export const getBundleCategoryColor = (category: string): string => {
  return BUNDLE_CATEGORY_COLORS[category as keyof typeof BUNDLE_CATEGORY_COLORS] || '#6B7280';
};

// হেল্পার ফাংশন: বান্ডেল ক্যাটাগরির আইকন পান
export const getBundleCategoryIcon = (category: string): string => {
  return BUNDLE_CATEGORY_ICONS[category as keyof typeof BUNDLE_CATEGORY_ICONS] || 'Circle';
};

// হেল্পার ফাংশন: বান্ডেল টাইপের লেবেল পান
export const getBundleTypeLabel = (type: string): string => {
  return BUNDLE_TYPE_LABELS[type as keyof typeof BUNDLE_TYPE_LABELS] || type;
};
