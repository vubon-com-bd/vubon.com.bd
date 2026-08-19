/**
 * ট্রেন্ডিং আইটেম সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ট্রেন্ডিং সময় ফ্রেম
 */
export enum TrendingTimeFrame {
  LAST_HOUR = 'last_hour',
  TODAY = 'today',
  THIS_WEEK = 'this_week',
  THIS_MONTH = 'this_month',
}

/**
 * ট্রেন্ডিং স্কোর ফ্যাক্টর
 */
export enum TrendingScoreFactor {
  VIEWS_VELOCITY = 'views_velocity',
  SALES_VELOCITY = 'sales_velocity',
  SOCIAL_MENTIONS = 'social_mentions',
}

/**
 * ট্রেন্ডিং সময় ফ্রেম লেবেলসমূহ (বাংলায়)
 */
export const TRENDING_TIME_FRAME_LABELS_BN: Record<TrendingTimeFrame, string> = {
  [TrendingTimeFrame.LAST_HOUR]: 'গত ১ ঘন্টা',
  [TrendingTimeFrame.TODAY]: 'আজ',
  [TrendingTimeFrame.THIS_WEEK]: 'এই সপ্তাহ',
  [TrendingTimeFrame.THIS_MONTH]: 'এই মাস',
} as const;

/**
 * ট্রেন্ডিং সময় ফ্রেম লেবেলসমূহ (ইংরেজিতে)
 */
export const TRENDING_TIME_FRAME_LABELS_EN: Record<TrendingTimeFrame, string> = {
  [TrendingTimeFrame.LAST_HOUR]: 'Last Hour',
  [TrendingTimeFrame.TODAY]: 'Today',
  [TrendingTimeFrame.THIS_WEEK]: 'This Week',
  [TrendingTimeFrame.THIS_MONTH]: 'This Month',
} as const;

/**
 * ট্রেন্ডিং স্কোর ফ্যাক্টর লেবেলসমূহ (বাংলায়)
 */
export const TRENDING_SCORE_FACTOR_LABELS_BN: Record<TrendingScoreFactor, string> = {
  [TrendingScoreFactor.VIEWS_VELOCITY]: 'দেখার গতি',
  [TrendingScoreFactor.SALES_VELOCITY]: 'বিক্রয় গতি',
  [TrendingScoreFactor.SOCIAL_MENTIONS]: 'সোশ্যাল মেনশন',
} as const;

/**
 * ট্রেন্ডিং স্কোর ফ্যাক্টর লেবেলসমূহ (ইংরেজিতে)
 */
export const TRENDING_SCORE_FACTOR_LABELS_EN: Record<TrendingScoreFactor, string> = {
  [TrendingScoreFactor.VIEWS_VELOCITY]: 'Views Velocity',
  [TrendingScoreFactor.SALES_VELOCITY]: 'Sales Velocity',
  [TrendingScoreFactor.SOCIAL_MENTIONS]: 'Social Mentions',
} as const;

/**
 * ট্রেন্ডিং স্কোর ফ্যাক্টর ওয়েটেজ
 */
export const TRENDING_SCORE_FACTOR_WEIGHTS: Record<TrendingScoreFactor, number> = {
  [TrendingScoreFactor.VIEWS_VELOCITY]: 0.4,
  [TrendingScoreFactor.SALES_VELOCITY]: 0.4,
  [TrendingScoreFactor.SOCIAL_MENTIONS]: 0.2,
} as const;

/**
 * ডিফল্ট ট্রেন্ডিং সংখ্যা
 */
export const DEFAULT_TRENDING_COUNT = 10;

/**
 * সর্বোচ্চ ট্রেন্ডিং সংখ্যা
 */
export const MAX_TRENDING_COUNT = 50;

/**
 * ন্যূনতম ট্রেন্ডিং সংখ্যা
 */
export const MIN_TRENDING_COUNT = 1;

/**
 * ট্রেন্ডিং ক্যাশের সময় (সেকেন্ডে)
 */
export const TRENDING_CACHE_TTL_SECONDS = 900;

/**
 * ডিফল্ট ট্রেন্ডিং সময় ফ্রেম
 */
export const DEFAULT_TRENDING_TIME_FRAME = TrendingTimeFrame.TODAY;

/**
 * ট্রেন্ডিং সময় ফ্রেমের ভ্যালু সমূহ
 */
export const TRENDING_TIME_FRAME_VALUES = Object.values(
  TrendingTimeFrame
) as readonly TrendingTimeFrame[];

/**
 * ট্রেন্ডিং স্কোর ফ্যাক্টরের ভ্যালু সমূহ
 */
export const TRENDING_SCORE_FACTOR_VALUES = Object.values(
  TrendingScoreFactor
) as readonly TrendingScoreFactor[];

/**
 * ট্রেন্ডিং কনফিগারেশন টাইপ
 */
export type TrendingConfig = {
  timeFrame: TrendingTimeFrame;
  labelBn: string;
  labelEn: string;
  defaultCount: number;
  maxCount: number;
  cacheTTL: number;
  factors: TrendingScoreFactor[];
  enabled: boolean;
};

/**
 * ট্রেন্ডিং কনফিগারেশনসমূহ
 */
export const TRENDING_CONFIGS: Record<TrendingTimeFrame, TrendingConfig> = {
  [TrendingTimeFrame.LAST_HOUR]: {
    timeFrame: TrendingTimeFrame.LAST_HOUR,
    labelBn: TRENDING_TIME_FRAME_LABELS_BN[TrendingTimeFrame.LAST_HOUR],
    labelEn: TRENDING_TIME_FRAME_LABELS_EN[TrendingTimeFrame.LAST_HOUR],
    defaultCount: DEFAULT_TRENDING_COUNT,
    maxCount: MAX_TRENDING_COUNT,
    cacheTTL: TRENDING_CACHE_TTL_SECONDS,
    factors: [TrendingScoreFactor.VIEWS_VELOCITY, TrendingScoreFactor.SOCIAL_MENTIONS],
    enabled: true,
  },
  [TrendingTimeFrame.TODAY]: {
    timeFrame: TrendingTimeFrame.TODAY,
    labelBn: TRENDING_TIME_FRAME_LABELS_BN[TrendingTimeFrame.TODAY],
    labelEn: TRENDING_TIME_FRAME_LABELS_EN[TrendingTimeFrame.TODAY],
    defaultCount: DEFAULT_TRENDING_COUNT,
    maxCount: MAX_TRENDING_COUNT,
    cacheTTL: TRENDING_CACHE_TTL_SECONDS,
    factors: [
      TrendingScoreFactor.VIEWS_VELOCITY,
      TrendingScoreFactor.SALES_VELOCITY,
      TrendingScoreFactor.SOCIAL_MENTIONS,
    ],
    enabled: true,
  },
  [TrendingTimeFrame.THIS_WEEK]: {
    timeFrame: TrendingTimeFrame.THIS_WEEK,
    labelBn: TRENDING_TIME_FRAME_LABELS_BN[TrendingTimeFrame.THIS_WEEK],
    labelEn: TRENDING_TIME_FRAME_LABELS_EN[TrendingTimeFrame.THIS_WEEK],
    defaultCount: DEFAULT_TRENDING_COUNT,
    maxCount: MAX_TRENDING_COUNT,
    cacheTTL: TRENDING_CACHE_TTL_SECONDS,
    factors: [TrendingScoreFactor.VIEWS_VELOCITY, TrendingScoreFactor.SALES_VELOCITY],
    enabled: true,
  },
  [TrendingTimeFrame.THIS_MONTH]: {
    timeFrame: TrendingTimeFrame.THIS_MONTH,
    labelBn: TRENDING_TIME_FRAME_LABELS_BN[TrendingTimeFrame.THIS_MONTH],
    labelEn: TRENDING_TIME_FRAME_LABELS_EN[TrendingTimeFrame.THIS_MONTH],
    defaultCount: DEFAULT_TRENDING_COUNT,
    maxCount: MAX_TRENDING_COUNT,
    cacheTTL: TRENDING_CACHE_TTL_SECONDS,
    factors: [TrendingScoreFactor.VIEWS_VELOCITY, TrendingScoreFactor.SALES_VELOCITY],
    enabled: true,
  },
} as const;

/**
 * ট্রেন্ডিং আইটেম টাইপ
 */
export type TrendingItem = {
  id: string;
  score: number;
  factors: Record<TrendingScoreFactor, number>;
  rank: number;
  timestamp: Date;
};

/**
 * ট্রেন্ডিং রেসপন্স টাইপ
 */
export type TrendingResponse = {
  items: TrendingItem[];
  total: number;
  timeFrame: TrendingTimeFrame;
  took: number;
  cache: boolean;
};

/**
 * ট্রেন্ডিং এরর মেসেজসমূহ
 */
export const TRENDING_ERROR_MESSAGES = {
  INVALID_TIME_FRAME: 'ট্রেন্ডিং সময় ফ্রেম সঠিক নয়',
  INVALID_FACTOR: 'ট্রেন্ডিং ফ্যাক্টর সঠিক নয়',
  INVALID_COUNT: `ট্রেন্ডিং সংখ্যা ${MIN_TRENDING_COUNT} থেকে ${MAX_TRENDING_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `ট্রেন্ডিং সংখ্যা ${MIN_TRENDING_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `ট্রেন্ডিং সংখ্যা ${MAX_TRENDING_COUNT} এর চেয়ে বেশি হতে পারে না`,
  CACHE_EXPIRED: 'ট্রেন্ডিং ক্যাশের মেয়াদ শেষ হয়েছে',
  NO_TRENDING_ITEMS: 'কোনো ট্রেন্ডিং আইটেম পাওয়া যায়নি',
} as const;
