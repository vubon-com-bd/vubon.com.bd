/**
 * ক্রস-সেলিং (সম্পর্কিত পণ্য) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ক্রস-সেল ক্যাটাগরি
 */
export enum CrossSellCategory {
  ACCESSORIES = 'accessories',
  RELATED = 'related',
  SIMILAR = 'similar',
  UPGRADE = 'upgrade',
}

/**
 * ক্রস-সেল ক্যাটাগরি লেবেলসমূহ (বাংলায়)
 */
export const CROSS_SELL_CATEGORY_LABELS_BN: Record<CrossSellCategory, string> = {
  [CrossSellCategory.ACCESSORIES]: 'অ্যাক্সেসরিজ',
  [CrossSellCategory.RELATED]: 'সম্পর্কিত',
  [CrossSellCategory.SIMILAR]: 'অনুরূপ',
  [CrossSellCategory.UPGRADE]: 'আপগ্রেড',
} as const;

/**
 * ক্রস-সেল ক্যাটাগরি লেবেলসমূহ (ইংরেজিতে)
 */
export const CROSS_SELL_CATEGORY_LABELS_EN: Record<CrossSellCategory, string> = {
  [CrossSellCategory.ACCESSORIES]: 'Accessories',
  [CrossSellCategory.RELATED]: 'Related',
  [CrossSellCategory.SIMILAR]: 'Similar',
  [CrossSellCategory.UPGRADE]: 'Upgrade',
} as const;

/**
 * ক্রস-সেল ক্যাটাগরি বিবরণ (বাংলায়)
 */
export const CROSS_SELL_CATEGORY_DESCRIPTIONS_BN: Record<CrossSellCategory, string> = {
  [CrossSellCategory.ACCESSORIES]: 'পণ্যের সাথে যুক্ত আনুষঙ্গিক পণ্য',
  [CrossSellCategory.RELATED]: 'একই ক্যাটাগরির সম্পর্কিত পণ্য',
  [CrossSellCategory.SIMILAR]: 'অনুরূপ বৈশিষ্ট্য সম্পন্ন পণ্য',
  [CrossSellCategory.UPGRADE]: 'উন্নত সংস্করণের পণ্য',
} as const;

/**
 * ক্রস-সেল ক্যাটাগরি বিবরণ (ইংরেজিতে)
 */
export const CROSS_SELL_CATEGORY_DESCRIPTIONS_EN: Record<CrossSellCategory, string> = {
  [CrossSellCategory.ACCESSORIES]: 'Accessories related to the product',
  [CrossSellCategory.RELATED]: 'Related products from same category',
  [CrossSellCategory.SIMILAR]: 'Products with similar features',
  [CrossSellCategory.UPGRADE]: 'Upgraded version of the product',
} as const;

/**
 * রিলেশনশিপ থ্রেশহোল্ড
 */
export const CROSS_SELL_RELATIONSHIP_THRESHOLD = 0.4;

/**
 * ডিফল্ট প্রদর্শন সংখ্যা
 */
export const DEFAULT_CROSS_SELL_DISPLAY_COUNT = 8;

/**
 * সর্বোচ্চ প্রদর্শন সংখ্যা
 */
export const MAX_CROSS_SELL_DISPLAY_COUNT = 20;

/**
 * ন্যূনতম প্রদর্শন সংখ্যা
 */
export const MIN_CROSS_SELL_DISPLAY_COUNT = 1;

/**
 * ক্যাশের সময় (সেকেন্ডে)
 */
export const CROSS_SELL_CACHE_TTL_SECONDS = 43200; // 12 hours

/**
 * ডিফল্ট ক্রস-সেল ক্যাটাগরি
 */
export const DEFAULT_CROSS_SELL_CATEGORY = CrossSellCategory.RELATED;

/**
 * ক্রস-সেল ক্যাটাগরির ভ্যালু সমূহ
 */
export const CROSS_SELL_CATEGORY_VALUES = Object.values(
  CrossSellCategory
) as readonly CrossSellCategory[];

/**
 * ক্রস-সেল কনফিগারেশন টাইপ
 */
export type CrossSellConfig = {
  category: CrossSellCategory;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  descriptionEn: string;
  threshold: number;
  defaultDisplayCount: number;
  maxDisplayCount: number;
  cacheTTL: number;
  enabled: boolean;
};

/**
 * ক্রস-সেল কনফিগারেশনসমূহ
 */
export const CROSS_SELL_CONFIGS: Record<CrossSellCategory, CrossSellConfig> = {
  [CrossSellCategory.ACCESSORIES]: {
    category: CrossSellCategory.ACCESSORIES,
    labelBn: CROSS_SELL_CATEGORY_LABELS_BN[CrossSellCategory.ACCESSORIES],
    labelEn: CROSS_SELL_CATEGORY_LABELS_EN[CrossSellCategory.ACCESSORIES],
    descriptionBn: CROSS_SELL_CATEGORY_DESCRIPTIONS_BN[CrossSellCategory.ACCESSORIES],
    descriptionEn: CROSS_SELL_CATEGORY_DESCRIPTIONS_EN[CrossSellCategory.ACCESSORIES],
    threshold: CROSS_SELL_RELATIONSHIP_THRESHOLD,
    defaultDisplayCount: DEFAULT_CROSS_SELL_DISPLAY_COUNT,
    maxDisplayCount: MAX_CROSS_SELL_DISPLAY_COUNT,
    cacheTTL: CROSS_SELL_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [CrossSellCategory.RELATED]: {
    category: CrossSellCategory.RELATED,
    labelBn: CROSS_SELL_CATEGORY_LABELS_BN[CrossSellCategory.RELATED],
    labelEn: CROSS_SELL_CATEGORY_LABELS_EN[CrossSellCategory.RELATED],
    descriptionBn: CROSS_SELL_CATEGORY_DESCRIPTIONS_BN[CrossSellCategory.RELATED],
    descriptionEn: CROSS_SELL_CATEGORY_DESCRIPTIONS_EN[CrossSellCategory.RELATED],
    threshold: CROSS_SELL_RELATIONSHIP_THRESHOLD,
    defaultDisplayCount: DEFAULT_CROSS_SELL_DISPLAY_COUNT,
    maxDisplayCount: MAX_CROSS_SELL_DISPLAY_COUNT,
    cacheTTL: CROSS_SELL_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [CrossSellCategory.SIMILAR]: {
    category: CrossSellCategory.SIMILAR,
    labelBn: CROSS_SELL_CATEGORY_LABELS_BN[CrossSellCategory.SIMILAR],
    labelEn: CROSS_SELL_CATEGORY_LABELS_EN[CrossSellCategory.SIMILAR],
    descriptionBn: CROSS_SELL_CATEGORY_DESCRIPTIONS_BN[CrossSellCategory.SIMILAR],
    descriptionEn: CROSS_SELL_CATEGORY_DESCRIPTIONS_EN[CrossSellCategory.SIMILAR],
    threshold: CROSS_SELL_RELATIONSHIP_THRESHOLD,
    defaultDisplayCount: DEFAULT_CROSS_SELL_DISPLAY_COUNT,
    maxDisplayCount: MAX_CROSS_SELL_DISPLAY_COUNT,
    cacheTTL: CROSS_SELL_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [CrossSellCategory.UPGRADE]: {
    category: CrossSellCategory.UPGRADE,
    labelBn: CROSS_SELL_CATEGORY_LABELS_BN[CrossSellCategory.UPGRADE],
    labelEn: CROSS_SELL_CATEGORY_LABELS_EN[CrossSellCategory.UPGRADE],
    descriptionBn: CROSS_SELL_CATEGORY_DESCRIPTIONS_BN[CrossSellCategory.UPGRADE],
    descriptionEn: CROSS_SELL_CATEGORY_DESCRIPTIONS_EN[CrossSellCategory.UPGRADE],
    threshold: CROSS_SELL_RELATIONSHIP_THRESHOLD,
    defaultDisplayCount: DEFAULT_CROSS_SELL_DISPLAY_COUNT,
    maxDisplayCount: MAX_CROSS_SELL_DISPLAY_COUNT,
    cacheTTL: CROSS_SELL_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * ক্রস-সেল আইটেম টাইপ
 */
export type CrossSellItem = {
  id: string;
  category: CrossSellCategory;
  relationshipScore: number;
  metadata?: Record<string, unknown>;
};

/**
 * ক্রস-সেল রেসপন্স টাইপ
 */
export type CrossSellResponse = {
  items: CrossSellItem[];
  total: number;
  category: CrossSellCategory;
  took: number;
  cache: boolean;
};

/**
 * ক্রস-সেল এরর মেসেজসমূহ
 */
export const CROSS_SELL_ERROR_MESSAGES = {
  INVALID_CATEGORY: 'ক্রস-সেল ক্যাটাগরি সঠিক নয়',
  INVALID_THRESHOLD: 'রিলেশনশিপ থ্রেশহোল্ড ০ থেকে ১ এর মধ্যে হতে হবে',
  INVALID_COUNT: `প্রদর্শন সংখ্যা ${MIN_CROSS_SELL_DISPLAY_COUNT} থেকে ${MAX_CROSS_SELL_DISPLAY_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `প্রদর্শন সংখ্যা ${MIN_CROSS_SELL_DISPLAY_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `প্রদর্শন সংখ্যা ${MAX_CROSS_SELL_DISPLAY_COUNT} এর চেয়ে বেশি হতে পারে না`,
  NO_ITEMS_FOUND: 'কোনো ক্রস-সেল আইটেম পাওয়া যায়নি',
  CACHE_EXPIRED: 'ক্রস-সেল ক্যাশের মেয়াদ শেষ হয়েছে',
} as const;
