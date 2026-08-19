/**
 * পপুলার আইটেম সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * পপুলারিটি সময় ফ্রেম
 */
export enum PopularityTimeFrame {
  TODAY = 'today',
  THIS_WEEK = 'this_week',
  THIS_MONTH = 'this_month',
  ALL_TIME = 'all_time',
}

/**
 * পপুলারিটি মেট্রিক্স
 */
export enum PopularityMetric {
  VIEWS = 'views',
  SALES = 'sales',
  RATING = 'rating',
  REVIEWS = 'reviews',
}

/**
 * পপুলারিটি সময় ফ্রেম লেবেলসমূহ (বাংলায়)
 */
export const POPULARITY_TIME_FRAME_LABELS_BN: Record<PopularityTimeFrame, string> = {
  [PopularityTimeFrame.TODAY]: 'আজ',
  [PopularityTimeFrame.THIS_WEEK]: 'এই সপ্তাহ',
  [PopularityTimeFrame.THIS_MONTH]: 'এই মাস',
  [PopularityTimeFrame.ALL_TIME]: 'সর্বকাল',
} as const;

/**
 * পপুলারিটি সময় ফ্রেম লেবেলসমূহ (ইংরেজিতে)
 */
export const POPULARITY_TIME_FRAME_LABELS_EN: Record<PopularityTimeFrame, string> = {
  [PopularityTimeFrame.TODAY]: 'Today',
  [PopularityTimeFrame.THIS_WEEK]: 'This Week',
  [PopularityTimeFrame.THIS_MONTH]: 'This Month',
  [PopularityTimeFrame.ALL_TIME]: 'All Time',
} as const;

/**
 * পপুলারিটি মেট্রিক লেবেলসমূহ (বাংলায়)
 */
export const POPULARITY_METRIC_LABELS_BN: Record<PopularityMetric, string> = {
  [PopularityMetric.VIEWS]: 'দেখা',
  [PopularityMetric.SALES]: 'বিক্রয়',
  [PopularityMetric.RATING]: 'রেটিং',
  [PopularityMetric.REVIEWS]: 'রিভিউ',
} as const;

/**
 * পপুলারিটি মেট্রিক লেবেলসমূহ (ইংরেজিতে)
 */
export const POPULARITY_METRIC_LABELS_EN: Record<PopularityMetric, string> = {
  [PopularityMetric.VIEWS]: 'Views',
  [PopularityMetric.SALES]: 'Sales',
  [PopularityMetric.RATING]: 'Rating',
  [PopularityMetric.REVIEWS]: 'Reviews',
} as const;

/**
 * পপুলারিটি মেট্রিক ওয়েটেজ
 */
export const POPULARITY_METRIC_WEIGHTS: Record<PopularityMetric, number> = {
  [PopularityMetric.VIEWS]: 0.2,
  [PopularityMetric.SALES]: 0.4,
  [PopularityMetric.RATING]: 0.3,
  [PopularityMetric.REVIEWS]: 0.1,
} as const;

/**
 * ডিফল্ট পপুলার সংখ্যা
 */
export const DEFAULT_POPULAR_COUNT = 20;

/**
 * সর্বোচ্চ পপুলার সংখ্যা
 */
export const MAX_POPULAR_COUNT = 100;

/**
 * ন্যূনতম পপুলার সংখ্যা
 */
export const MIN_POPULAR_COUNT = 1;

/**
 * পপুলার ক্যাশের সময় (সেকেন্ডে)
 */
export const POPULAR_CACHE_TTL_SECONDS = 3600;

/**
 * ডিফল্ট পপুলারিটি সময় ফ্রেম
 */
export const DEFAULT_POPULARITY_TIME_FRAME = PopularityTimeFrame.THIS_WEEK;

/**
 * পপুলারিটি সময় ফ্রেমের ভ্যালু সমূহ
 */
export const POPULARITY_TIME_FRAME_VALUES = Object.values(
  PopularityTimeFrame
) as readonly PopularityTimeFrame[];

/**
 * পপুলারিটি মেট্রিকের ভ্যালু সমূহ
 */
export const POPULARITY_METRIC_VALUES = Object.values(
  PopularityMetric
) as readonly PopularityMetric[];

/**
 * পপুলার কনফিগারেশন টাইপ
 */
export type PopularConfig = {
  timeFrame: PopularityTimeFrame;
  labelBn: string;
  labelEn: string;
  defaultCount: number;
  maxCount: number;
  cacheTTL: number;
  metrics: PopularityMetric[];
  enabled: boolean;
};

/**
 * পপুলার কনফিগারেশনসমূহ
 */
export const POPULAR_CONFIGS: Record<PopularityTimeFrame, PopularConfig> = {
  [PopularityTimeFrame.TODAY]: {
    timeFrame: PopularityTimeFrame.TODAY,
    labelBn: POPULARITY_TIME_FRAME_LABELS_BN[PopularityTimeFrame.TODAY],
    labelEn: POPULARITY_TIME_FRAME_LABELS_EN[PopularityTimeFrame.TODAY],
    defaultCount: DEFAULT_POPULAR_COUNT,
    maxCount: MAX_POPULAR_COUNT,
    cacheTTL: POPULAR_CACHE_TTL_SECONDS,
    metrics: [PopularityMetric.VIEWS, PopularityMetric.SALES],
    enabled: true,
  },
  [PopularityTimeFrame.THIS_WEEK]: {
    timeFrame: PopularityTimeFrame.THIS_WEEK,
    labelBn: POPULARITY_TIME_FRAME_LABELS_BN[PopularityTimeFrame.THIS_WEEK],
    labelEn: POPULARITY_TIME_FRAME_LABELS_EN[PopularityTimeFrame.THIS_WEEK],
    defaultCount: DEFAULT_POPULAR_COUNT,
    maxCount: MAX_POPULAR_COUNT,
    cacheTTL: POPULAR_CACHE_TTL_SECONDS,
    metrics: [PopularityMetric.VIEWS, PopularityMetric.SALES, PopularityMetric.RATING],
    enabled: true,
  },
  [PopularityTimeFrame.THIS_MONTH]: {
    timeFrame: PopularityTimeFrame.THIS_MONTH,
    labelBn: POPULARITY_TIME_FRAME_LABELS_BN[PopularityTimeFrame.THIS_MONTH],
    labelEn: POPULARITY_TIME_FRAME_LABELS_EN[PopularityTimeFrame.THIS_MONTH],
    defaultCount: DEFAULT_POPULAR_COUNT,
    maxCount: MAX_POPULAR_COUNT,
    cacheTTL: POPULAR_CACHE_TTL_SECONDS,
    metrics: [
      PopularityMetric.VIEWS,
      PopularityMetric.SALES,
      PopularityMetric.RATING,
      PopularityMetric.REVIEWS,
    ],
    enabled: true,
  },
  [PopularityTimeFrame.ALL_TIME]: {
    timeFrame: PopularityTimeFrame.ALL_TIME,
    labelBn: POPULARITY_TIME_FRAME_LABELS_BN[PopularityTimeFrame.ALL_TIME],
    labelEn: POPULARITY_TIME_FRAME_LABELS_EN[PopularityTimeFrame.ALL_TIME],
    defaultCount: DEFAULT_POPULAR_COUNT,
    maxCount: MAX_POPULAR_COUNT,
    cacheTTL: POPULAR_CACHE_TTL_SECONDS,
    metrics: [
      PopularityMetric.VIEWS,
      PopularityMetric.SALES,
      PopularityMetric.RATING,
      PopularityMetric.REVIEWS,
    ],
    enabled: true,
  },
} as const;

/**
 * পপুলার আইটেম টাইপ
 */
export type PopularItem = {
  id: string;
  score: number;
  metrics: Record<PopularityMetric, number>;
  rank: number;
  timestamp: Date;
};

/**
 * পপুলার রেসপন্স টাইপ
 */
export type PopularResponse = {
  items: PopularItem[];
  total: number;
  timeFrame: PopularityTimeFrame;
  took: number;
  cache: boolean;
};

/**
 * পপুলার এরর মেসেজসমূহ
 */
export const POPULAR_ERROR_MESSAGES = {
  INVALID_TIME_FRAME: 'পপুলারিটি সময় ফ্রেম সঠিক নয়',
  INVALID_METRIC: 'পপুলারিটি মেট্রিক সঠিক নয়',
  INVALID_COUNT: `পপুলার সংখ্যা ${MIN_POPULAR_COUNT} থেকে ${MAX_POPULAR_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `পপুলার সংখ্যা ${MIN_POPULAR_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `পপুলার সংখ্যা ${MAX_POPULAR_COUNT} এর চেয়ে বেশি হতে পারে না`,
  CACHE_EXPIRED: 'পপুলার ক্যাশের মেয়াদ শেষ হয়েছে',
  NO_POPULAR_ITEMS: 'কোনো পপুলার আইটেম পাওয়া যায়নি',
} as const;
