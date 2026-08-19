/**
 * রেকমেন্ডেশন সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * রেকমেন্ডেশন টাইপ
 */
export enum RecommendationType {
  PERSONALIZED = 'personalized',
  TRENDING = 'trending',
  POPULAR = 'popular',
  RECENT = 'recent',
  FREQUENTLY_BOUGHT = 'frequently_bought',
}

/**
 * রেকমেন্ডেশন টাইপ লেবেলসমূহ (বাংলায়)
 */
export const RECOMMENDATION_TYPE_LABELS_BN: Record<RecommendationType, string> = {
  [RecommendationType.PERSONALIZED]: 'ব্যক্তিগতকৃত',
  [RecommendationType.TRENDING]: 'ট্রেন্ডিং',
  [RecommendationType.POPULAR]: 'জনপ্রিয়',
  [RecommendationType.RECENT]: 'সাম্প্রতিক',
  [RecommendationType.FREQUENTLY_BOUGHT]: 'সাথে কেনা হয়েছে',
} as const;

/**
 * রেকমেন্ডেশন টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const RECOMMENDATION_TYPE_LABELS_EN: Record<RecommendationType, string> = {
  [RecommendationType.PERSONALIZED]: 'Personalized',
  [RecommendationType.TRENDING]: 'Trending',
  [RecommendationType.POPULAR]: 'Popular',
  [RecommendationType.RECENT]: 'Recent',
  [RecommendationType.FREQUENTLY_BOUGHT]: 'Frequently Bought Together',
} as const;

/**
 * রেকমেন্ডেশন টাইপ বিবরণ (বাংলায়)
 */
export const RECOMMENDATION_TYPE_DESCRIPTIONS_BN: Record<RecommendationType, string> = {
  [RecommendationType.PERSONALIZED]: 'ব্যবহারকারীর ইতিহাসের ভিত্তিতে সাজেশন',
  [RecommendationType.TRENDING]: 'বর্তমানে জনপ্রিয় আইটেম',
  [RecommendationType.POPULAR]: 'সবচেয়ে বেশি বিক্রিত আইটেম',
  [RecommendationType.RECENT]: 'সর্বশেষ দেখা বা কেনা আইটেম',
  [RecommendationType.FREQUENTLY_BOUGHT]: 'একসাথে কেনা আইটেমের সাজেশন',
} as const;

/**
 * রেকমেন্ডেশন টাইপ বিবরণ (ইংরেজিতে)
 */
export const RECOMMENDATION_TYPE_DESCRIPTIONS_EN: Record<RecommendationType, string> = {
  [RecommendationType.PERSONALIZED]: 'Suggestions based on user history',
  [RecommendationType.TRENDING]: 'Currently popular items',
  [RecommendationType.POPULAR]: 'Best selling items',
  [RecommendationType.RECENT]: 'Recently viewed or purchased items',
  [RecommendationType.FREQUENTLY_BOUGHT]: 'Frequently bought together items',
} as const;

/**
 * ডিফল্ট রেকমেন্ডেশন সংখ্যা
 */
export const DEFAULT_RECOMMENDATION_COUNT = 10;

/**
 * সর্বোচ্চ রেকমেন্ডেশন সংখ্যা
 */
export const MAX_RECOMMENDATION_COUNT = 50;

/**
 * ন্যূনতম রেকমেন্ডেশন সংখ্যা
 */
export const MIN_RECOMMENDATION_COUNT = 1;

/**
 * রেকমেন্ডেশন টাইমআউট (মিলিসেকেন্ডে)
 */
export const RECOMMENDATION_TIMEOUT_MS = 2000;

/**
 * রেকমেন্ডেশন ক্যাশের সময় (সেকেন্ডে)
 */
export const RECOMMENDATION_CACHE_TTL_SECONDS = 1800;

/**
 * ডিফল্ট রেকমেন্ডেশন টাইপ
 */
export const DEFAULT_RECOMMENDATION_TYPE = RecommendationType.PERSONALIZED;

/**
 * রেকমেন্ডেশন টাইপের ভ্যালু সমূহ
 */
export const RECOMMENDATION_TYPE_VALUES = Object.values(
  RecommendationType
) as readonly RecommendationType[];

/**
 * রেকমেন্ডেশন কনফিগারেশন টাইপ
 */
export type RecommendationConfig = {
  type: RecommendationType;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  descriptionEn: string;
  defaultCount: number;
  maxCount: number;
  timeoutMs: number;
  cacheTTL: number;
  enabled: boolean;
};

/**
 * রেকমেন্ডেশন কনফিগারেশনসমূহ
 */
export const RECOMMENDATION_CONFIGS: Record<RecommendationType, RecommendationConfig> = {
  [RecommendationType.PERSONALIZED]: {
    type: RecommendationType.PERSONALIZED,
    labelBn: RECOMMENDATION_TYPE_LABELS_BN[RecommendationType.PERSONALIZED],
    labelEn: RECOMMENDATION_TYPE_LABELS_EN[RecommendationType.PERSONALIZED],
    descriptionBn: RECOMMENDATION_TYPE_DESCRIPTIONS_BN[RecommendationType.PERSONALIZED],
    descriptionEn: RECOMMENDATION_TYPE_DESCRIPTIONS_EN[RecommendationType.PERSONALIZED],
    defaultCount: DEFAULT_RECOMMENDATION_COUNT,
    maxCount: MAX_RECOMMENDATION_COUNT,
    timeoutMs: RECOMMENDATION_TIMEOUT_MS,
    cacheTTL: RECOMMENDATION_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [RecommendationType.TRENDING]: {
    type: RecommendationType.TRENDING,
    labelBn: RECOMMENDATION_TYPE_LABELS_BN[RecommendationType.TRENDING],
    labelEn: RECOMMENDATION_TYPE_LABELS_EN[RecommendationType.TRENDING],
    descriptionBn: RECOMMENDATION_TYPE_DESCRIPTIONS_BN[RecommendationType.TRENDING],
    descriptionEn: RECOMMENDATION_TYPE_DESCRIPTIONS_EN[RecommendationType.TRENDING],
    defaultCount: DEFAULT_RECOMMENDATION_COUNT,
    maxCount: MAX_RECOMMENDATION_COUNT,
    timeoutMs: RECOMMENDATION_TIMEOUT_MS,
    cacheTTL: RECOMMENDATION_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [RecommendationType.POPULAR]: {
    type: RecommendationType.POPULAR,
    labelBn: RECOMMENDATION_TYPE_LABELS_BN[RecommendationType.POPULAR],
    labelEn: RECOMMENDATION_TYPE_LABELS_EN[RecommendationType.POPULAR],
    descriptionBn: RECOMMENDATION_TYPE_DESCRIPTIONS_BN[RecommendationType.POPULAR],
    descriptionEn: RECOMMENDATION_TYPE_DESCRIPTIONS_EN[RecommendationType.POPULAR],
    defaultCount: DEFAULT_RECOMMENDATION_COUNT,
    maxCount: MAX_RECOMMENDATION_COUNT,
    timeoutMs: RECOMMENDATION_TIMEOUT_MS,
    cacheTTL: RECOMMENDATION_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [RecommendationType.RECENT]: {
    type: RecommendationType.RECENT,
    labelBn: RECOMMENDATION_TYPE_LABELS_BN[RecommendationType.RECENT],
    labelEn: RECOMMENDATION_TYPE_LABELS_EN[RecommendationType.RECENT],
    descriptionBn: RECOMMENDATION_TYPE_DESCRIPTIONS_BN[RecommendationType.RECENT],
    descriptionEn: RECOMMENDATION_TYPE_DESCRIPTIONS_EN[RecommendationType.RECENT],
    defaultCount: DEFAULT_RECOMMENDATION_COUNT,
    maxCount: MAX_RECOMMENDATION_COUNT,
    timeoutMs: RECOMMENDATION_TIMEOUT_MS,
    cacheTTL: RECOMMENDATION_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [RecommendationType.FREQUENTLY_BOUGHT]: {
    type: RecommendationType.FREQUENTLY_BOUGHT,
    labelBn: RECOMMENDATION_TYPE_LABELS_BN[RecommendationType.FREQUENTLY_BOUGHT],
    labelEn: RECOMMENDATION_TYPE_LABELS_EN[RecommendationType.FREQUENTLY_BOUGHT],
    descriptionBn: RECOMMENDATION_TYPE_DESCRIPTIONS_BN[RecommendationType.FREQUENTLY_BOUGHT],
    descriptionEn: RECOMMENDATION_TYPE_DESCRIPTIONS_EN[RecommendationType.FREQUENTLY_BOUGHT],
    defaultCount: DEFAULT_RECOMMENDATION_COUNT,
    maxCount: MAX_RECOMMENDATION_COUNT,
    timeoutMs: RECOMMENDATION_TIMEOUT_MS,
    cacheTTL: RECOMMENDATION_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * রেকমেন্ডেশন রেসপন্স টাইপ
 */
export type RecommendationResponse = {
  items: unknown[];
  total: number;
  type: RecommendationType;
  took: number;
  cache: boolean;
};

/**
 * রেকমেন্ডেশন এরর মেসেজসমূহ
 */
export const RECOMMENDATION_ERROR_MESSAGES = {
  INVALID_TYPE: 'রেকমেন্ডেশন টাইপ সঠিক নয়',
  INVALID_COUNT: `রেকমেন্ডেশন সংখ্যা ${MIN_RECOMMENDATION_COUNT} থেকে ${MAX_RECOMMENDATION_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `রেকমেন্ডেশন সংখ্যা ${MIN_RECOMMENDATION_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `রেকমেন্ডেশন সংখ্যা ${MAX_RECOMMENDATION_COUNT} এর চেয়ে বেশি হতে পারে না`,
  TIMEOUT_OCCURRED: `রেকমেন্ডেশন টাইমআউট হয়েছে (${RECOMMENDATION_TIMEOUT_MS}ms)`,
  CACHE_EXPIRED: 'রেকমেন্ডেশন ক্যাশের মেয়াদ শেষ হয়েছে',
  NO_ITEMS_FOUND: 'কোনো রেকমেন্ডেশন পাওয়া যায়নি',
} as const;
