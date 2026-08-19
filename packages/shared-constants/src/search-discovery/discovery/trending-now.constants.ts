/**
 * ট্রেন্ডিং নাও (বর্তমানে ট্রেন্ডিং) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ট্রেন্ডিং মেট্রিক্স
 */
export enum TrendingMetric {
  VELOCITY = 'velocity',
  VOLUME = 'volume',
  ENGAGEMENT = 'engagement',
}

/**
 * ট্রেন্ডিং মেট্রিক লেবেলসমূহ (বাংলায়)
 */
export const TRENDING_METRIC_LABELS_BN: Record<TrendingMetric, string> = {
  [TrendingMetric.VELOCITY]: 'গতি',
  [TrendingMetric.VOLUME]: 'ভলিউম',
  [TrendingMetric.ENGAGEMENT]: 'এনগেজমেন্ট',
} as const;

/**
 * ট্রেন্ডিং মেট্রিক লেবেলসমূহ (ইংরেজিতে)
 */
export const TRENDING_METRIC_LABELS_EN: Record<TrendingMetric, string> = {
  [TrendingMetric.VELOCITY]: 'Velocity',
  [TrendingMetric.VOLUME]: 'Volume',
  [TrendingMetric.ENGAGEMENT]: 'Engagement',
} as const;

/**
 * ট্রেন্ডিং মেট্রিক বিবরণ (বাংলায়)
 */
export const TRENDING_METRIC_DESCRIPTIONS_BN: Record<TrendingMetric, string> = {
  [TrendingMetric.VELOCITY]: 'আইটেমের জনপ্রিয়তা বৃদ্ধির হার',
  [TrendingMetric.VOLUME]: 'আইটেমের মোট ইন্টারঅ্যাকশন সংখ্যা',
  [TrendingMetric.ENGAGEMENT]: 'আইটেমের সাথে ইউজার এনগেজমেন্ট লেভেল',
} as const;

/**
 * ট্রেন্ডিং মেট্রিক বিবরণ (ইংরেজিতে)
 */
export const TRENDING_METRIC_DESCRIPTIONS_EN: Record<TrendingMetric, string> = {
  [TrendingMetric.VELOCITY]: 'Rate of popularity increase',
  [TrendingMetric.VOLUME]: 'Total interactions count',
  [TrendingMetric.ENGAGEMENT]: 'User engagement level',
} as const;

/**
 * ট্রেন্ডিং মেট্রিক ওয়েটেজ
 */
export const TRENDING_METRIC_WEIGHTS: Record<TrendingMetric, number> = {
  [TrendingMetric.VELOCITY]: 0.5,
  [TrendingMetric.VOLUME]: 0.3,
  [TrendingMetric.ENGAGEMENT]: 0.2,
} as const;

/**
 * ট্রেন্ডিং আপডেট ইন্টারভাল (মিনিটে)
 */
export const TRENDING_UPDATE_INTERVAL_MINUTES = 5;

/**
 * ট্রেন্ডিং আপডেট ইন্টারভাল (মিলিসেকেন্ডে)
 */
export const TRENDING_UPDATE_INTERVAL_MS = 5 * 60 * 1000;

/**
 * ডিফল্ট প্রদর্শন সংখ্যা
 */
export const DEFAULT_TRENDING_NOW_DISPLAY_COUNT = 10;

/**
 * সর্বোচ্চ প্রদর্শন সংখ্যা
 */
export const MAX_TRENDING_NOW_DISPLAY_COUNT = 30;

/**
 * ন্যূনতম প্রদর্শন সংখ্যা
 */
export const MIN_TRENDING_NOW_DISPLAY_COUNT = 1;

/**
 * ক্যাশের সময় (সেকেন্ডে)
 */
export const TRENDING_NOW_CACHE_TTL_SECONDS = 300;

/**
 * ডিফল্ট ট্রেন্ডিং মেট্রিক
 */
export const DEFAULT_TRENDING_METRIC = TrendingMetric.VELOCITY;

/**
 * ট্রেন্ডিং মেট্রিকের ভ্যালু সমূহ
 */
export const TRENDING_METRIC_VALUES = Object.values(TrendingMetric) as readonly TrendingMetric[];

/**
 * ট্রেন্ডিং নাও কনফিগারেশন টাইপ
 */
export type TrendingNowConfig = {
  metric: TrendingMetric;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  descriptionEn: string;
  weight: number;
  updateIntervalMinutes: number;
  defaultDisplayCount: number;
  maxDisplayCount: number;
  cacheTTL: number;
  enabled: boolean;
};

/**
 * ট্রেন্ডিং নাও কনফিগারেশনসমূহ
 */
export const TRENDING_NOW_CONFIGS: Record<TrendingMetric, TrendingNowConfig> = {
  [TrendingMetric.VELOCITY]: {
    metric: TrendingMetric.VELOCITY,
    labelBn: TRENDING_METRIC_LABELS_BN[TrendingMetric.VELOCITY],
    labelEn: TRENDING_METRIC_LABELS_EN[TrendingMetric.VELOCITY],
    descriptionBn: TRENDING_METRIC_DESCRIPTIONS_BN[TrendingMetric.VELOCITY],
    descriptionEn: TRENDING_METRIC_DESCRIPTIONS_EN[TrendingMetric.VELOCITY],
    weight: TRENDING_METRIC_WEIGHTS[TrendingMetric.VELOCITY],
    updateIntervalMinutes: TRENDING_UPDATE_INTERVAL_MINUTES,
    defaultDisplayCount: DEFAULT_TRENDING_NOW_DISPLAY_COUNT,
    maxDisplayCount: MAX_TRENDING_NOW_DISPLAY_COUNT,
    cacheTTL: TRENDING_NOW_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [TrendingMetric.VOLUME]: {
    metric: TrendingMetric.VOLUME,
    labelBn: TRENDING_METRIC_LABELS_BN[TrendingMetric.VOLUME],
    labelEn: TRENDING_METRIC_LABELS_EN[TrendingMetric.VOLUME],
    descriptionBn: TRENDING_METRIC_DESCRIPTIONS_BN[TrendingMetric.VOLUME],
    descriptionEn: TRENDING_METRIC_DESCRIPTIONS_EN[TrendingMetric.VOLUME],
    weight: TRENDING_METRIC_WEIGHTS[TrendingMetric.VOLUME],
    updateIntervalMinutes: TRENDING_UPDATE_INTERVAL_MINUTES,
    defaultDisplayCount: DEFAULT_TRENDING_NOW_DISPLAY_COUNT,
    maxDisplayCount: MAX_TRENDING_NOW_DISPLAY_COUNT,
    cacheTTL: TRENDING_NOW_CACHE_TTL_SECONDS,
    enabled: true,
  },
  [TrendingMetric.ENGAGEMENT]: {
    metric: TrendingMetric.ENGAGEMENT,
    labelBn: TRENDING_METRIC_LABELS_BN[TrendingMetric.ENGAGEMENT],
    labelEn: TRENDING_METRIC_LABELS_EN[TrendingMetric.ENGAGEMENT],
    descriptionBn: TRENDING_METRIC_DESCRIPTIONS_BN[TrendingMetric.ENGAGEMENT],
    descriptionEn: TRENDING_METRIC_DESCRIPTIONS_EN[TrendingMetric.ENGAGEMENT],
    weight: TRENDING_METRIC_WEIGHTS[TrendingMetric.ENGAGEMENT],
    updateIntervalMinutes: TRENDING_UPDATE_INTERVAL_MINUTES,
    defaultDisplayCount: DEFAULT_TRENDING_NOW_DISPLAY_COUNT,
    maxDisplayCount: MAX_TRENDING_NOW_DISPLAY_COUNT,
    cacheTTL: TRENDING_NOW_CACHE_TTL_SECONDS,
    enabled: true,
  },
} as const;

/**
 * ট্রেন্ডিং নাও আইটেম টাইপ
 */
export type TrendingNowItem = {
  id: string;
  score: number;
  metrics: Record<TrendingMetric, number>;
  rank: number;
  timestamp: Date;
  metadata?: Record<string, unknown>;
};

/**
 * ট্রেন্ডিং নাও রেসপন্স টাইপ
 */
export type TrendingNowResponse = {
  items: TrendingNowItem[];
  total: number;
  metric: TrendingMetric;
  updatedAt: Date;
  took: number;
  cache: boolean;
};

/**
 * ট্রেন্ডিং নাও এরর মেসেজসমূহ
 */
export const TRENDING_NOW_ERROR_MESSAGES = {
  INVALID_METRIC: 'ট্রেন্ডিং মেট্রিক সঠিক নয়',
  INVALID_WEIGHT: 'মেট্রিক ওয়েটেজ ০ থেকে ১ এর মধ্যে হতে হবে',
  INVALID_COUNT: `প্রদর্শন সংখ্যা ${MIN_TRENDING_NOW_DISPLAY_COUNT} থেকে ${MAX_TRENDING_NOW_DISPLAY_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `প্রদর্শন সংখ্যা ${MIN_TRENDING_NOW_DISPLAY_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `প্রদর্শন সংখ্যা ${MAX_TRENDING_NOW_DISPLAY_COUNT} এর চেয়ে বেশি হতে পারে না`,
  NO_TRENDING_ITEMS: 'কোনো ট্রেন্ডিং আইটেম পাওয়া যায়নি',
  CACHE_EXPIRED: 'ট্রেন্ডিং নাও ক্যাশের মেয়াদ শেষ হয়েছে',
  UPDATE_INTERVAL_INVALID: 'আপডেট ইন্টারভাল ১ মিনিটের কম হতে পারে না',
} as const;
