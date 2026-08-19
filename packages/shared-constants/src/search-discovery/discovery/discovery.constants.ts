/**
 * ডিসকভারি সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ডিসকভারি টাইপ
 */
export enum DiscoveryType {
  PERSONALIZED = 'personalized',
  TRENDING = 'trending',
  POPULAR = 'popular',
  RECENT = 'recent',
  EDITORIAL = 'editorial',
}

/**
 * ডিসকভারি টাইপ লেবেলসমূহ (বাংলায়)
 */
export const DISCOVERY_TYPE_LABELS_BN: Record<DiscoveryType, string> = {
  [DiscoveryType.PERSONALIZED]: 'ব্যক্তিগতকৃত',
  [DiscoveryType.TRENDING]: 'ট্রেন্ডিং',
  [DiscoveryType.POPULAR]: 'জনপ্রিয়',
  [DiscoveryType.RECENT]: 'সাম্প্রতিক',
  [DiscoveryType.EDITORIAL]: 'সম্পাদকীয়',
} as const;

/**
 * ডিসকভারি টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const DISCOVERY_TYPE_LABELS_EN: Record<DiscoveryType, string> = {
  [DiscoveryType.PERSONALIZED]: 'Personalized',
  [DiscoveryType.TRENDING]: 'Trending',
  [DiscoveryType.POPULAR]: 'Popular',
  [DiscoveryType.RECENT]: 'Recent',
  [DiscoveryType.EDITORIAL]: 'Editorial',
} as const;

/**
 * ডিসকভারি টাইপ বিবরণ (বাংলায়)
 */
export const DISCOVERY_TYPE_DESCRIPTIONS_BN: Record<DiscoveryType, string> = {
  [DiscoveryType.PERSONALIZED]: 'ব্যবহারকারীর পছন্দ ও আচরণের ভিত্তিতে সাজেশন',
  [DiscoveryType.TRENDING]: 'বর্তমানে জনপ্রিয় আইটেমসমূহ',
  [DiscoveryType.POPULAR]: 'সর্বোচ্চ জনপ্রিয় আইটেমসমূহ',
  [DiscoveryType.RECENT]: 'সর্বশেষ যোগকৃত আইটেমসমূহ',
  [DiscoveryType.EDITORIAL]: 'সম্পাদক দ্বারা নির্বাচিত আইটেমসমূহ',
} as const;

/**
 * ডিসকভারি টাইপ বিবরণ (ইংরেজিতে)
 */
export const DISCOVERY_TYPE_DESCRIPTIONS_EN: Record<DiscoveryType, string> = {
  [DiscoveryType.PERSONALIZED]: 'Suggestions based on user preferences and behavior',
  [DiscoveryType.TRENDING]: 'Currently popular items',
  [DiscoveryType.POPULAR]: 'Most popular items',
  [DiscoveryType.RECENT]: 'Recently added items',
  [DiscoveryType.EDITORIAL]: 'Editorially selected items',
} as const;

/**
 * ডিফল্ট রেকমেন্ডেশন সংখ্যা
 */
export const DEFAULT_DISCOVERY_COUNT = 12;

/**
 * ম্যাক্সিমাম রেকমেন্ডেশন সংখ্যা
 */
export const MAX_DISCOVERY_COUNT = 50;

/**
 * ন্যূনতম রেকমেন্ডেশন সংখ্যা
 */
export const MIN_DISCOVERY_COUNT = 1;

/**
 * ডিফল্ট ডিসকভারি টাইমআউট (মিলিসেকেন্ডে)
 */
export const DEFAULT_DISCOVERY_TIMEOUT_MS = 3000;

/**
 * ডিসকভারি ক্যাশের সময় (সেকেন্ডে)
 */
export const DISCOVERY_CACHE_TTL_SECONDS = 3600;

/**
 * ডিফল্ট ডিসকভারি টাইপ
 */
export const DEFAULT_DISCOVERY_TYPE = DiscoveryType.PERSONALIZED;

/**
 * ডিসকভারি টাইপের ভ্যালু সমূহ
 */
export const DISCOVERY_TYPE_VALUES = Object.values(DiscoveryType) as readonly DiscoveryType[];

/**
 * ডিসকভারি কনফিগারেশন টাইপ
 */
export type DiscoveryConfig = {
  type: DiscoveryType;
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
 * ডিসকভারি কনফিগারেশনসমূহ
 */
export const DISCOVERY_CONFIGS: Record<DiscoveryType, DiscoveryConfig> = {
  [DiscoveryType.PERSONALIZED]: {
    type: DiscoveryType.PERSONALIZED,
    labelBn: DISCOVERY_TYPE_LABELS_BN[DiscoveryType.PERSONALIZED],
    labelEn: DISCOVERY_TYPE_LABELS_EN[DiscoveryType.PERSONALIZED],
    descriptionBn: DISCOVERY_TYPE_DESCRIPTIONS_BN[DiscoveryType.PERSONALIZED],
    descriptionEn: DISCOVERY_TYPE_DESCRIPTIONS_EN[DiscoveryType.PERSONALIZED],
    defaultCount: DEFAULT_DISCOVERY_COUNT,
    maxCount: MAX_DISCOVERY_COUNT,
    timeoutMs: DEFAULT_DISCOVERY_TIMEOUT_MS,
    cacheTTL: DISCOVERY_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [DiscoveryType.TRENDING]: {
    type: DiscoveryType.TRENDING,
    labelBn: DISCOVERY_TYPE_LABELS_BN[DiscoveryType.TRENDING],
    labelEn: DISCOVERY_TYPE_LABELS_EN[DiscoveryType.TRENDING],
    descriptionBn: DISCOVERY_TYPE_DESCRIPTIONS_BN[DiscoveryType.TRENDING],
    descriptionEn: DISCOVERY_TYPE_DESCRIPTIONS_EN[DiscoveryType.TRENDING],
    defaultCount: DEFAULT_DISCOVERY_COUNT,
    maxCount: MAX_DISCOVERY_COUNT,
    timeoutMs: DEFAULT_DISCOVERY_TIMEOUT_MS,
    cacheTTL: DISCOVERY_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [DiscoveryType.POPULAR]: {
    type: DiscoveryType.POPULAR,
    labelBn: DISCOVERY_TYPE_LABELS_BN[DiscoveryType.POPULAR],
    labelEn: DISCOVERY_TYPE_LABELS_EN[DiscoveryType.POPULAR],
    descriptionBn: DISCOVERY_TYPE_DESCRIPTIONS_BN[DiscoveryType.POPULAR],
    descriptionEn: DISCOVERY_TYPE_DESCRIPTIONS_EN[DiscoveryType.POPULAR],
    defaultCount: DEFAULT_DISCOVERY_COUNT,
    maxCount: MAX_DISCOVERY_COUNT,
    timeoutMs: DEFAULT_DISCOVERY_TIMEOUT_MS,
    cacheTTL: DISCOVERY_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [DiscoveryType.RECENT]: {
    type: DiscoveryType.RECENT,
    labelBn: DISCOVERY_TYPE_LABELS_BN[DiscoveryType.RECENT],
    labelEn: DISCOVERY_TYPE_LABELS_EN[DiscoveryType.RECENT],
    descriptionBn: DISCOVERY_TYPE_DESCRIPTIONS_BN[DiscoveryType.RECENT],
    descriptionEn: DISCOVERY_TYPE_DESCRIPTIONS_EN[DiscoveryType.RECENT],
    defaultCount: DEFAULT_DISCOVERY_COUNT,
    maxCount: MAX_DISCOVERY_COUNT,
    timeoutMs: DEFAULT_DISCOVERY_TIMEOUT_MS,
    cacheTTL: DISCOVERY_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [DiscoveryType.EDITORIAL]: {
    type: DiscoveryType.EDITORIAL,
    labelBn: DISCOVERY_TYPE_LABELS_BN[DiscoveryType.EDITORIAL],
    labelEn: DISCOVERY_TYPE_LABELS_EN[DiscoveryType.EDITORIAL],
    descriptionBn: DISCOVERY_TYPE_DESCRIPTIONS_BN[DiscoveryType.EDITORIAL],
    descriptionEn: DISCOVERY_TYPE_DESCRIPTIONS_EN[DiscoveryType.EDITORIAL],
    defaultCount: DEFAULT_DISCOVERY_COUNT,
    maxCount: MAX_DISCOVERY_COUNT,
    timeoutMs: DEFAULT_DISCOVERY_TIMEOUT_MS,
    cacheTTL: DISCOVERY_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * ডিসকভারি রেসপন্স টাইপ
 */
export type DiscoveryResponse = {
  items: unknown[];
  total: number;
  type: DiscoveryType;
  took: number;
  cache: boolean;
};

/**
 * ডিসকভারি এরর মেসেজসমূহ
 */
export const DISCOVERY_ERROR_MESSAGES = {
  INVALID_TYPE: 'ডিসকভারি টাইপ সঠিক নয়',
  INVALID_COUNT: `ডিসকভারি সংখ্যা ${MIN_DISCOVERY_COUNT} থেকে ${MAX_DISCOVERY_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `ডিসকভারি সংখ্যা ${MIN_DISCOVERY_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `ডিসকভারি সংখ্যা ${MAX_DISCOVERY_COUNT} এর চেয়ে বেশি হতে পারে না`,
  TIMEOUT_OCCURRED: `ডিসকভারি টাইমআউট হয়েছে (${DEFAULT_DISCOVERY_TIMEOUT_MS}ms)`,
  CACHE_EXPIRED: 'ডিসকভারি ক্যাশের মেয়াদ শেষ হয়েছে',
  NO_ITEMS_FOUND: 'কোনো আইটেম পাওয়া যায়নি',
} as const;
