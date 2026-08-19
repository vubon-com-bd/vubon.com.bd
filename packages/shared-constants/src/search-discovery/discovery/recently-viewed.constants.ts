/**
 * রিসেন্টলি ভিউড (সম্প্রতি দেখা) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * রিসেন্টলি ভিউড আইটেম টাইপ
 */
export enum RecentlyViewedItemType {
  PRODUCT = 'product',
  CATEGORY = 'category',
  BRAND = 'brand',
}

/**
 * রিসেন্টলি ভিউড আইটেম টাইপ লেবেলসমূহ (বাংলায়)
 */
export const RECENTLY_VIEWED_ITEM_TYPE_LABELS_BN: Record<RecentlyViewedItemType, string> = {
  [RecentlyViewedItemType.PRODUCT]: 'পণ্য',
  [RecentlyViewedItemType.CATEGORY]: 'ক্যাটাগরি',
  [RecentlyViewedItemType.BRAND]: 'ব্র্যান্ড',
} as const;

/**
 * রিসেন্টলি ভিউড আইটেম টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const RECENTLY_VIEWED_ITEM_TYPE_LABELS_EN: Record<RecentlyViewedItemType, string> = {
  [RecentlyViewedItemType.PRODUCT]: 'Product',
  [RecentlyViewedItemType.CATEGORY]: 'Category',
  [RecentlyViewedItemType.BRAND]: 'Brand',
} as const;

/**
 * ম্যাক্সিমাম হিস্ট্রি আকার
 */
export const MAX_HISTORY_SIZE = 50;

/**
 * ন্যূনতম হিস্ট্রি আকার
 */
export const MIN_HISTORY_SIZE = 1;

/**
 * ডিফল্ট হিস্ট্রি আকার
 */
export const DEFAULT_HISTORY_SIZE = 20;

/**
 * ডিফল্ট প্রদর্শন সংখ্যা
 */
export const DEFAULT_DISPLAY_COUNT = 5;

/**
 * সর্বোচ্চ প্রদর্শন সংখ্যা
 */
export const MAX_DISPLAY_COUNT = 20;

/**
 * ন্যূনতম প্রদর্শন সংখ্যা
 */
export const MIN_DISPLAY_COUNT = 1;

/**
 * হিস্ট্রি টাইমআউট (দিনে)
 */
export const HISTORY_TIMEOUT_DAYS = 30;

/**
 * হিস্ট্রি টাইমআউট (মিলিসেকেন্ডে)
 */
export const HISTORY_TIMEOUT_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * ক্যাশের সময় (সেকেন্ডে)
 */
export const RECENTLY_VIEWED_CACHE_TTL_SECONDS = 600;

/**
 * ডিফল্ট রিসেন্টলি ভিউড আইটেম টাইপ
 */
export const DEFAULT_RECENTLY_VIEWED_ITEM_TYPE = RecentlyViewedItemType.PRODUCT;

/**
 * রিসেন্টলি ভিউড আইটেম টাইপের ভ্যালু সমূহ
 */
export const RECENTLY_VIEWED_ITEM_TYPE_VALUES = Object.values(
  RecentlyViewedItemType
) as readonly RecentlyViewedItemType[];

/**
 * রিসেন্টলি ভিউড কনফিগারেশন টাইপ
 */
export type RecentlyViewedConfig = {
  itemType: RecentlyViewedItemType;
  labelBn: string;
  labelEn: string;
  maxHistorySize: number;
  defaultDisplayCount: number;
  maxDisplayCount: number;
  timeoutDays: number;
  cacheTTL: number;
  enabled: boolean;
};

/**
 * রিসেন্টলি ভিউড কনফিগারেশনসমূহ
 */
export const RECENTLY_VIEWED_CONFIGS: Record<RecentlyViewedItemType, RecentlyViewedConfig> = {
  [RecentlyViewedItemType.PRODUCT]: {
    itemType: RecentlyViewedItemType.PRODUCT,
    labelBn: RECENTLY_VIEWED_ITEM_TYPE_LABELS_BN[RecentlyViewedItemType.PRODUCT],
    labelEn: RECENTLY_VIEWED_ITEM_TYPE_LABELS_EN[RecentlyViewedItemType.PRODUCT],
    maxHistorySize: MAX_HISTORY_SIZE,
    defaultDisplayCount: DEFAULT_DISPLAY_COUNT,
    maxDisplayCount: MAX_DISPLAY_COUNT,
    timeoutDays: HISTORY_TIMEOUT_DAYS,
    cacheTTL: RECENTLY_VIEWED_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [RecentlyViewedItemType.CATEGORY]: {
    itemType: RecentlyViewedItemType.CATEGORY,
    labelBn: RECENTLY_VIEWED_ITEM_TYPE_LABELS_BN[RecentlyViewedItemType.CATEGORY],
    labelEn: RECENTLY_VIEWED_ITEM_TYPE_LABELS_EN[RecentlyViewedItemType.CATEGORY],
    maxHistorySize: MAX_HISTORY_SIZE,
    defaultDisplayCount: DEFAULT_DISPLAY_COUNT,
    maxDisplayCount: MAX_DISPLAY_COUNT,
    timeoutDays: HISTORY_TIMEOUT_DAYS,
    cacheTTL: RECENTLY_VIEWED_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [RecentlyViewedItemType.BRAND]: {
    itemType: RecentlyViewedItemType.BRAND,
    labelBn: RECENTLY_VIEWED_ITEM_TYPE_LABELS_BN[RecentlyViewedItemType.BRAND],
    labelEn: RECENTLY_VIEWED_ITEM_TYPE_LABELS_EN[RecentlyViewedItemType.BRAND],
    maxHistorySize: MAX_HISTORY_SIZE,
    defaultDisplayCount: DEFAULT_DISPLAY_COUNT,
    maxDisplayCount: MAX_DISPLAY_COUNT,
    timeoutDays: HISTORY_TIMEOUT_DAYS,
    cacheTTL: RECENTLY_VIEWED_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * রিসেন্টলি ভিউড আইটেম টাইপ
 */
export type RecentlyViewedItem = {
  id: string;
  type: RecentlyViewedItemType;
  viewedAt: Date;
  metadata?: Record<string, unknown>;
};

/**
 * রিসেন্টলি ভিউড হিস্ট্রি টাইপ
 */
export type RecentlyViewedHistory = {
  userId: string;
  items: RecentlyViewedItem[];
  total: number;
  updatedAt: Date;
};

/**
 * রিসেন্টলি ভিউড রেসপন্স টাইপ
 */
export type RecentlyViewedResponse = {
  items: RecentlyViewedItem[];
  total: number;
  displayCount: number;
  took: number;
  cache: boolean;
};

/**
 * রিসেন্টলি ভিউড এরর মেসেজসমূহ
 */
export const RECENTLY_VIEWED_ERROR_MESSAGES = {
  INVALID_ITEM_TYPE: 'আইটেম টাইপ সঠিক নয়',
  INVALID_HISTORY_SIZE: `হিস্ট্রি আকার ${MIN_HISTORY_SIZE} থেকে ${MAX_HISTORY_SIZE} এর মধ্যে হতে হবে`,
  HISTORY_TOO_LARGE: `হিস্ট্রি আকার ${MAX_HISTORY_SIZE} এর বেশি হতে পারে না`,
  HISTORY_TOO_SMALL: `হিস্ট্রি আকার ${MIN_HISTORY_SIZE} এর কম হতে পারে না`,
  INVALID_DISPLAY_COUNT: `প্রদর্শন সংখ্যা ${MIN_DISPLAY_COUNT} থেকে ${MAX_DISPLAY_COUNT} এর মধ্যে হতে হবে`,
  DISPLAY_COUNT_TOO_LOW: `প্রদর্শন সংখ্যা ${MIN_DISPLAY_COUNT} এর চেয়ে কম হতে পারে না`,
  DISPLAY_COUNT_TOO_HIGH: `প্রদর্শন সংখ্যা ${MAX_DISPLAY_COUNT} এর চেয়ে বেশি হতে পারে না`,
  TIMEOUT_EXCEEDED: `হিস্ট্রি টাইমআউট (${HISTORY_TIMEOUT_DAYS} দিন) অতিক্রম করা হয়েছে`,
  CACHE_EXPIRED: 'রিসেন্টলি ভিউড ক্যাশের মেয়াদ শেষ হয়েছে',
  HISTORY_NOT_FOUND: 'হিস্ট্রি পাওয়া যায়নি',
  ITEM_NOT_FOUND: 'আইটেম পাওয়া যায়নি',
} as const;
