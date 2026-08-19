/**
 * সাবস্টিটিউট (বিকল্প) আইটেম সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সাবস্টিটিউট ক্যাটাগরি
 */
export enum SubstituteCategory {
  BRAND_ALTERNATIVE = 'brand_alternative',
  PRICE_ALTERNATIVE = 'price_alternative',
  FEATURE_ALTERNATIVE = 'feature_alternative',
}

/**
 * সাবস্টিটিউট ক্যাটাগরি লেবেলসমূহ (বাংলায়)
 */
export const SUBSTITUTE_CATEGORY_LABELS_BN: Record<SubstituteCategory, string> = {
  [SubstituteCategory.BRAND_ALTERNATIVE]: 'ব্র্যান্ড বিকল্প',
  [SubstituteCategory.PRICE_ALTERNATIVE]: 'দাম বিকল্প',
  [SubstituteCategory.FEATURE_ALTERNATIVE]: 'ফিচার বিকল্প',
} as const;

/**
 * সাবস্টিটিউট ক্যাটাগরি লেবেলসমূহ (ইংরেজিতে)
 */
export const SUBSTITUTE_CATEGORY_LABELS_EN: Record<SubstituteCategory, string> = {
  [SubstituteCategory.BRAND_ALTERNATIVE]: 'Brand Alternative',
  [SubstituteCategory.PRICE_ALTERNATIVE]: 'Price Alternative',
  [SubstituteCategory.FEATURE_ALTERNATIVE]: 'Feature Alternative',
} as const;

/**
 * সাবস্টিটিউট ক্যাটাগরি বিবরণ (বাংলায়)
 */
export const SUBSTITUTE_CATEGORY_DESCRIPTIONS_BN: Record<SubstituteCategory, string> = {
  [SubstituteCategory.BRAND_ALTERNATIVE]: 'ভিন্ন ব্র্যান্ডের অনুরূপ পণ্য',
  [SubstituteCategory.PRICE_ALTERNATIVE]: 'ভিন্ন দামের অনুরূপ পণ্য',
  [SubstituteCategory.FEATURE_ALTERNATIVE]: 'ভিন্ন ফিচারের অনুরূপ পণ্য',
} as const;

/**
 * সাবস্টিটিউট ক্যাটাগরি বিবরণ (ইংরেজিতে)
 */
export const SUBSTITUTE_CATEGORY_DESCRIPTIONS_EN: Record<SubstituteCategory, string> = {
  [SubstituteCategory.BRAND_ALTERNATIVE]: 'Similar products from different brands',
  [SubstituteCategory.PRICE_ALTERNATIVE]: 'Similar products at different prices',
  [SubstituteCategory.FEATURE_ALTERNATIVE]: 'Similar products with different features',
} as const;

/**
 * সাবস্টিটিউট ম্যাচ থ্রেশহোল্ড
 */
export const SUBSTITUTE_MATCH_THRESHOLD = 0.7;

/**
 * ডিফল্ট প্রদর্শন সংখ্যা
 */
export const DEFAULT_SUBSTITUTE_DISPLAY_COUNT = 4;

/**
 * সর্বোচ্চ প্রদর্শন সংখ্যা
 */
export const MAX_SUBSTITUTE_DISPLAY_COUNT = 10;

/**
 * ন্যূনতম প্রদর্শন সংখ্যা
 */
export const MIN_SUBSTITUTE_DISPLAY_COUNT = 1;

/**
 * ক্যাশের সময় (সেকেন্ডে)
 */
export const SUBSTITUTE_CACHE_TTL_SECONDS = 43200; // 12 hours

/**
 * ডিফল্ট সাবস্টিটিউট ক্যাটাগরি
 */
export const DEFAULT_SUBSTITUTE_CATEGORY = SubstituteCategory.BRAND_ALTERNATIVE;

/**
 * সাবস্টিটিউট ক্যাটাগরির ভ্যালু সমূহ
 */
export const SUBSTITUTE_CATEGORY_VALUES = Object.values(
  SubstituteCategory
) as readonly SubstituteCategory[];

/**
 * সাবস্টিটিউট কনফিগারেশন টাইপ
 */
export type SubstituteConfig = {
  category: SubstituteCategory;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  descriptionEn: string;
  matchThreshold: number;
  defaultDisplayCount: number;
  maxDisplayCount: number;
  cacheTTL: number;
  enabled: boolean;
};

/**
 * সাবস্টিটিউট কনফিগারেশনসমূহ
 */
export const SUBSTITUTE_CONFIGS: Record<SubstituteCategory, SubstituteConfig> = {
  [SubstituteCategory.BRAND_ALTERNATIVE]: {
    category: SubstituteCategory.BRAND_ALTERNATIVE,
    labelBn: SUBSTITUTE_CATEGORY_LABELS_BN[SubstituteCategory.BRAND_ALTERNATIVE],
    labelEn: SUBSTITUTE_CATEGORY_LABELS_EN[SubstituteCategory.BRAND_ALTERNATIVE],
    descriptionBn: SUBSTITUTE_CATEGORY_DESCRIPTIONS_BN[SubstituteCategory.BRAND_ALTERNATIVE],
    descriptionEn: SUBSTITUTE_CATEGORY_DESCRIPTIONS_EN[SubstituteCategory.BRAND_ALTERNATIVE],
    matchThreshold: SUBSTITUTE_MATCH_THRESHOLD,
    defaultDisplayCount: DEFAULT_SUBSTITUTE_DISPLAY_COUNT,
    maxDisplayCount: MAX_SUBSTITUTE_DISPLAY_COUNT,
    cacheTTL: SUBSTITUTE_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [SubstituteCategory.PRICE_ALTERNATIVE]: {
    category: SubstituteCategory.PRICE_ALTERNATIVE,
    labelBn: SUBSTITUTE_CATEGORY_LABELS_BN[SubstituteCategory.PRICE_ALTERNATIVE],
    labelEn: SUBSTITUTE_CATEGORY_LABELS_EN[SubstituteCategory.PRICE_ALTERNATIVE],
    descriptionBn: SUBSTITUTE_CATEGORY_DESCRIPTIONS_BN[SubstituteCategory.PRICE_ALTERNATIVE],
    descriptionEn: SUBSTITUTE_CATEGORY_DESCRIPTIONS_EN[SubstituteCategory.PRICE_ALTERNATIVE],
    matchThreshold: SUBSTITUTE_MATCH_THRESHOLD,
    defaultDisplayCount: DEFAULT_SUBSTITUTE_DISPLAY_COUNT,
    maxDisplayCount: MAX_SUBSTITUTE_DISPLAY_COUNT,
    cacheTTL: SUBSTITUTE_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [SubstituteCategory.FEATURE_ALTERNATIVE]: {
    category: SubstituteCategory.FEATURE_ALTERNATIVE,
    labelBn: SUBSTITUTE_CATEGORY_LABELS_BN[SubstituteCategory.FEATURE_ALTERNATIVE],
    labelEn: SUBSTITUTE_CATEGORY_LABELS_EN[SubstituteCategory.FEATURE_ALTERNATIVE],
    descriptionBn: SUBSTITUTE_CATEGORY_DESCRIPTIONS_BN[SubstituteCategory.FEATURE_ALTERNATIVE],
    descriptionEn: SUBSTITUTE_CATEGORY_DESCRIPTIONS_EN[SubstituteCategory.FEATURE_ALTERNATIVE],
    matchThreshold: SUBSTITUTE_MATCH_THRESHOLD,
    defaultDisplayCount: DEFAULT_SUBSTITUTE_DISPLAY_COUNT,
    maxDisplayCount: MAX_SUBSTITUTE_DISPLAY_COUNT,
    cacheTTL: SUBSTITUTE_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * সাবস্টিটিউট আইটেম টাইপ
 */
export type SubstituteItem = {
  id: string;
  category: SubstituteCategory;
  matchScore: number;
  priceDifference?: number;
  featureDifference?: string[];
  metadata?: Record<string, unknown>;
};

/**
 * সাবস্টিটিউট রেসপন্স টাইপ
 */
export type SubstituteResponse = {
  items: SubstituteItem[];
  total: number;
  category: SubstituteCategory;
  took: number;
  cache: boolean;
};

/**
 * সাবস্টিটিউট এরর মেসেজসমূহ
 */
export const SUBSTITUTE_ERROR_MESSAGES = {
  INVALID_CATEGORY: 'সাবস্টিটিউট ক্যাটাগরি সঠিক নয়',
  INVALID_THRESHOLD: 'ম্যাচ থ্রেশহোল্ড ০ থেকে ১ এর মধ্যে হতে হবে',
  INVALID_COUNT: `প্রদর্শন সংখ্যা ${MIN_SUBSTITUTE_DISPLAY_COUNT} থেকে ${MAX_SUBSTITUTE_DISPLAY_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `প্রদর্শন সংখ্যা ${MIN_SUBSTITUTE_DISPLAY_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `প্রদর্শন সংখ্যা ${MAX_SUBSTITUTE_DISPLAY_COUNT} এর চেয়ে বেশি হতে পারে না`,
  NO_SUBSTITUTES_FOUND: 'কোনো সাবস্টিটিউট আইটেম পাওয়া যায়নি',
  CACHE_EXPIRED: 'সাবস্টিটিউট ক্যাশের মেয়াদ শেষ হয়েছে',
} as const;
