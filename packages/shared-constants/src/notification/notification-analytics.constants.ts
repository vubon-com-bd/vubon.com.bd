// ============================================
// নোটিফিকেশন অ্যানালিটিক্স সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. অ্যানালিটিক্স মৌলিক কনফিগারেশন
// ============================================

/**
 * ডিফল্ট টাইম ফ্রেম (মিনিটে)
 * @default 1440 (২৪ ঘন্টা)
 */
export const NOTIFICATION_ANALYTICS_DEFAULT_TIME_FRAME = 1440;

/**
 * ন্যূনতম টাইম ফ্রেম (মিনিটে)
 * @default 5 (৫ মিনিট)
 */
export const NOTIFICATION_ANALYTICS_MIN_TIME_FRAME = 5;

/**
 * সর্বোচ্চ টাইম ফ্রেম (মিনিটে)
 * @default 43200 (৩০ দিন)
 */
export const NOTIFICATION_ANALYTICS_MAX_TIME_FRAME = 30 * 24 * 60;

/**
 * ডিফল্ট গ্রানুলারিটি (মিনিটে)
 * @default 5 (৫ মিনিট)
 */
export const NOTIFICATION_ANALYTICS_DEFAULT_GRANULARITY = 5;

/**
 * ডিফল্ট ডেটা পয়েন্ট সংখ্যা
 * @default 100
 */
export const NOTIFICATION_ANALYTICS_DEFAULT_DATA_POINTS = 100;

/**
 * ডিফল্ট থ্রেশহোল্ড
 * @default 0.9
 */
export const NOTIFICATION_ANALYTICS_DEFAULT_THRESHOLD = 0.9;

/**
 * অ্যানালিটিক্স ক্যাশ টিটিএল (মিলিসেকেন্ডে)
 * @default 300000 (৫ মিনিট)
 */
export const NOTIFICATION_ANALYTICS_CACHE_TTL = 5 * 60 * 1000;

/**
 * অ্যানালিটিক্স ক্যাশ ম্যাক্স সাইজ
 * @default 100
 */
export const NOTIFICATION_ANALYTICS_CACHE_MAX_SIZE = 100;

// ============================================
// ২. মেট্রিক টাইপ
// ============================================

/**
 * মেট্রিক টাইপ
 */
export type NotificationAnalyticsMetric =
  | typeof NOTIFICATION_ANALYTICS_METRIC_SENT
  | typeof NOTIFICATION_ANALYTICS_METRIC_DELIVERED
  | typeof NOTIFICATION_ANALYTICS_METRIC_OPENED
  | typeof NOTIFICATION_ANALYTICS_METRIC_CLICKED
  | typeof NOTIFICATION_ANALYTICS_METRIC_FAILED
  | typeof NOTIFICATION_ANALYTICS_METRIC_BOUNCED
  | typeof NOTIFICATION_ANALYTICS_METRIC_SPAM
  | typeof NOTIFICATION_ANALYTICS_METRIC_UNSUBSCRIBED
  | typeof NOTIFICATION_ANALYTICS_METRIC_COMPLAINED
  | typeof NOTIFICATION_ANALYTICS_METRIC_CONVERSION
  | typeof NOTIFICATION_ANALYTICS_METRIC_ENGAGEMENT
  | typeof NOTIFICATION_ANALYTICS_METRIC_REVENUE
  | typeof NOTIFICATION_ANALYTICS_METRIC_RESPONSE_TIME
  | typeof NOTIFICATION_ANALYTICS_METRIC_ERROR_RATE
  | typeof NOTIFICATION_ANALYTICS_METRIC_THROUGHPUT;

/**
 * সেন্ট মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_SENT = 'SENT';

/**
 * ডেলিভারড মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_DELIVERED = 'DELIVERED';

/**
 * ওপেনড মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_OPENED = 'OPENED';

/**
 * ক্লিকড মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_CLICKED = 'CLICKED';

/**
 * ফেইলড মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_FAILED = 'FAILED';

/**
 * বাউন্সড মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_BOUNCED = 'BOUNCED';

/**
 * স্প্যাম মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_SPAM = 'SPAM';

/**
 * আনসাবস্ক্রাইবড মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_UNSUBSCRIBED = 'UNSUBSCRIBED';

/**
 * কমপ্লেইনড মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_COMPLAINED = 'COMPLAINED';

/**
 * কনভার্সন মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_CONVERSION = 'CONVERSION';

/**
 * এঙ্গেজমেন্ট মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_ENGAGEMENT = 'ENGAGEMENT';

/**
 * রেভিনিউ মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_REVENUE = 'REVENUE';

/**
 * রেসপন্স টাইম মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_RESPONSE_TIME = 'RESPONSE_TIME';

/**
 * এরর রেট মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_ERROR_RATE = 'ERROR_RATE';

/**
 * থ্রুপুট মেট্রিক
 */
export const NOTIFICATION_ANALYTICS_METRIC_THROUGHPUT = 'THROUGHPUT';

// ============================================
// ৩. টাইম ফ্রেম
// ============================================

/**
 * টাইম ফ্রেম টাইপ
 */
export type NotificationAnalyticsTimeFrame =
  | typeof NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_HOUR
  | typeof NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_6_HOURS
  | typeof NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_12_HOURS
  | typeof NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_24_HOURS
  | typeof NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_7_DAYS
  | typeof NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_30_DAYS
  | typeof NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_90_DAYS
  | typeof NOTIFICATION_ANALYTICS_TIME_FRAME_CUSTOM;

/**
 * শেষ ১ ঘন্টা
 */
export const NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_HOUR = 'LAST_HOUR';

/**
 * শেষ ৬ ঘন্টা
 */
export const NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_6_HOURS = 'LAST_6_HOURS';

/**
 * শেষ ১২ ঘন্টা
 */
export const NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_12_HOURS = 'LAST_12_HOURS';

/**
 * শেষ ২৪ ঘন্টা
 */
export const NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_24_HOURS = 'LAST_24_HOURS';

/**
 * শেষ ৭ দিন
 */
export const NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_7_DAYS = 'LAST_7_DAYS';

/**
 * শেষ ৩০ দিন
 */
export const NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_30_DAYS = 'LAST_30_DAYS';

/**
 * শেষ ৯০ দিন
 */
export const NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_90_DAYS = 'LAST_90_DAYS';

/**
 * কাস্টম টাইম ফ্রেম
 */
export const NOTIFICATION_ANALYTICS_TIME_FRAME_CUSTOM = 'CUSTOM';

// ============================================
// ৪. গ্রানুলারিটি
// ============================================

/**
 * গ্রানুলারিটি টাইপ
 */
export type NotificationAnalyticsGranularity =
  | typeof NOTIFICATION_ANALYTICS_GRANULARITY_MINUTE
  | typeof NOTIFICATION_ANALYTICS_GRANULARITY_5_MINUTES
  | typeof NOTIFICATION_ANALYTICS_GRANULARITY_15_MINUTES
  | typeof NOTIFICATION_ANALYTICS_GRANULARITY_HOUR
  | typeof NOTIFICATION_ANALYTICS_GRANULARITY_6_HOURS
  | typeof NOTIFICATION_ANALYTICS_GRANULARITY_12_HOURS
  | typeof NOTIFICATION_ANALYTICS_GRANULARITY_DAY
  | typeof NOTIFICATION_ANALYTICS_GRANULARITY_WEEK
  | typeof NOTIFICATION_ANALYTICS_GRANULARITY_MONTH;

/**
 * প্রতি মিনিট
 */
export const NOTIFICATION_ANALYTICS_GRANULARITY_MINUTE = 'MINUTE';

/**
 * প্রতি ৫ মিনিট
 */
export const NOTIFICATION_ANALYTICS_GRANULARITY_5_MINUTES = '5_MINUTES';

/**
 * প্রতি ১৫ মিনিট
 */
export const NOTIFICATION_ANALYTICS_GRANULARITY_15_MINUTES = '15_MINUTES';

/**
 * প্রতি ঘন্টা
 */
export const NOTIFICATION_ANALYTICS_GRANULARITY_HOUR = 'HOUR';

/**
 * প্রতি ৬ ঘন্টা
 */
export const NOTIFICATION_ANALYTICS_GRANULARITY_6_HOURS = '6_HOURS';

/**
 * প্রতি ১২ ঘন্টা
 */
export const NOTIFICATION_ANALYTICS_GRANULARITY_12_HOURS = '12_HOURS';

/**
 * প্রতিদিন
 */
export const NOTIFICATION_ANALYTICS_GRANULARITY_DAY = 'DAY';

/**
 * প্রতি সপ্তাহ
 */
export const NOTIFICATION_ANALYTICS_GRANULARITY_WEEK = 'WEEK';

/**
 * প্রতি মাস
 */
export const NOTIFICATION_ANALYTICS_GRANULARITY_MONTH = 'MONTH';

// ============================================
// ৫. ডেটা পয়েন্ট টাইপ
// ============================================

/**
 * ডেটা পয়েন্ট টাইপ
 */
export type NotificationAnalyticsDataPoint =
  | typeof NOTIFICATION_ANALYTICS_DATA_POINT_COUNT
  | typeof NOTIFICATION_ANALYTICS_DATA_POINT_RATE
  | typeof NOTIFICATION_ANALYTICS_DATA_POINT_PERCENTAGE
  | typeof NOTIFICATION_ANALYTICS_DATA_POINT_AVERAGE
  | typeof NOTIFICATION_ANALYTICS_DATA_POINT_MEDIAN
  | typeof NOTIFICATION_ANALYTICS_DATA_POINT_PERCENTILE
  | typeof NOTIFICATION_ANALYTICS_DATA_POINT_SUM
  | typeof NOTIFICATION_ANALYTICS_DATA_POINT_MIN
  | typeof NOTIFICATION_ANALYTICS_DATA_POINT_MAX
  | typeof NOTIFICATION_ANALYTICS_DATA_POINT_STD_DEV;

/**
 * কাউন্ট ডেটা পয়েন্ট
 */
export const NOTIFICATION_ANALYTICS_DATA_POINT_COUNT = 'COUNT';

/**
 * রেট ডেটা পয়েন্ট
 */
export const NOTIFICATION_ANALYTICS_DATA_POINT_RATE = 'RATE';

/**
 * পার্সেন্টেজ ডেটা পয়েন্ট
 */
export const NOTIFICATION_ANALYTICS_DATA_POINT_PERCENTAGE = 'PERCENTAGE';

/**
 * এভারেজ ডেটা পয়েন্ট
 */
export const NOTIFICATION_ANALYTICS_DATA_POINT_AVERAGE = 'AVERAGE';

/**
 * মিডিয়ান ডেটা পয়েন্ট
 */
export const NOTIFICATION_ANALYTICS_DATA_POINT_MEDIAN = 'MEDIAN';

/**
 * পার্সেন্টাইল ডেটা পয়েন্ট
 */
export const NOTIFICATION_ANALYTICS_DATA_POINT_PERCENTILE = 'PERCENTILE';

/**
 * সাম ডেটা পয়েন্ট
 */
export const NOTIFICATION_ANALYTICS_DATA_POINT_SUM = 'SUM';

/**
 * মিন ডেটা পয়েন্ট
 */
export const NOTIFICATION_ANALYTICS_DATA_POINT_MIN = 'MIN';

/**
 * ম্যাক্স ডেটা পয়েন্ট
 */
export const NOTIFICATION_ANALYTICS_DATA_POINT_MAX = 'MAX';

/**
 * স্ট্যান্ডার্ড ডেভিয়েশন ডেটা পয়েন্ট
 */
export const NOTIFICATION_ANALYTICS_DATA_POINT_STD_DEV = 'STD_DEV';

// ============================================
// ৬. স্ট্যাটিস্টিক্যাল মেথড
// ============================================

/**
 * স্ট্যাটিস্টিক্যাল মেথড টাইপ
 */
export type NotificationAnalyticsStatisticalMethod =
  | typeof NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_MEAN
  | typeof NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_MEDIAN
  | typeof NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_MODE
  | typeof NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_STD_DEV
  | typeof NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_VARIANCE
  | typeof NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_PERCENTILE
  | typeof NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_TREND
  | typeof NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_FORECAST
  | typeof NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_CORRELATION
  | typeof NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_REGRESSION;

/**
 * মিন মেথড
 */
export const NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_MEAN = 'MEAN';

/**
 * মিডিয়ান মেথড
 */
export const NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_MEDIAN = 'MEDIAN';

/**
 * মোড মেথড
 */
export const NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_MODE = 'MODE';

/**
 * স্ট্যান্ডার্ড ডেভিয়েশন মেথড
 */
export const NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_STD_DEV = 'STD_DEV';

/**
 * ভ্যারিয়েন্স মেথড
 */
export const NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_VARIANCE = 'VARIANCE';

/**
 * পার্সেন্টাইল মেথড
 */
export const NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_PERCENTILE = 'PERCENTILE';

/**
 * ট্রেন্ড মেথড
 */
export const NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_TREND = 'TREND';

/**
 * ফোরকাস্ট মেথড
 */
export const NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_FORECAST = 'FORECAST';

/**
 * করিলেশন মেথড
 */
export const NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_CORRELATION = 'CORRELATION';

/**
 * রিগ্রেশন মেথড
 */
export const NOTIFICATION_ANALYTICS_STATISTICAL_METHOD_REGRESSION = 'REGRESSION';

// ============================================
// ৭. চার্ট টাইপ
// ============================================

/**
 * চার্ট টাইপ
 */
export type NotificationAnalyticsChartType =
  | typeof NOTIFICATION_ANALYTICS_CHART_TYPE_LINE
  | typeof NOTIFICATION_ANALYTICS_CHART_TYPE_BAR
  | typeof NOTIFICATION_ANALYTICS_CHART_TYPE_PIE
  | typeof NOTIFICATION_ANALYTICS_CHART_TYPE_DONUT
  | typeof NOTIFICATION_ANALYTICS_CHART_TYPE_AREA
  | typeof NOTIFICATION_ANALYTICS_CHART_TYPE_SCATTER
  | typeof NOTIFICATION_ANALYTICS_CHART_TYPE_HEATMAP
  | typeof NOTIFICATION_ANALYTICS_CHART_TYPE_FUNNEL
  | typeof NOTIFICATION_ANALYTICS_CHART_TYPE_GAUGE
  | typeof NOTIFICATION_ANALYTICS_CHART_TYPE_STACKED_BAR;

/**
 * লাইন চার্ট
 */
export const NOTIFICATION_ANALYTICS_CHART_TYPE_LINE = 'LINE';

/**
 * বার চার্ট
 */
export const NOTIFICATION_ANALYTICS_CHART_TYPE_BAR = 'BAR';

/**
 * পাই চার্ট
 */
export const NOTIFICATION_ANALYTICS_CHART_TYPE_PIE = 'PIE';

/**
 * ডোনাট চার্ট
 */
export const NOTIFICATION_ANALYTICS_CHART_TYPE_DONUT = 'DONUT';

/**
 * এরিয়া চার্ট
 */
export const NOTIFICATION_ANALYTICS_CHART_TYPE_AREA = 'AREA';

/**
 * স্ক্যাটার চার্ট
 */
export const NOTIFICATION_ANALYTICS_CHART_TYPE_SCATTER = 'SCATTER';

/**
 * হিটম্যাপ চার্ট
 */
export const NOTIFICATION_ANALYTICS_CHART_TYPE_HEATMAP = 'HEATMAP';

/**
 * ফানেল চার্ট
 */
export const NOTIFICATION_ANALYTICS_CHART_TYPE_FUNNEL = 'FUNNEL';

/**
 * গজ চার্ট
 */
export const NOTIFICATION_ANALYTICS_CHART_TYPE_GAUGE = 'GAUGE';

/**
 * স্ট্যাকড বার চার্ট
 */
export const NOTIFICATION_ANALYTICS_CHART_TYPE_STACKED_BAR = 'STACKED_BAR';

// ============================================
// ৮. মেট্রিক গ্রুপ
// ============================================

/**
 * মেট্রিক গ্রুপ
 */
export type NotificationAnalyticsMetricGroup =
  | typeof NOTIFICATION_ANALYTICS_METRIC_GROUP_DELIVERY
  | typeof NOTIFICATION_ANALYTICS_METRIC_GROUP_ENGAGEMENT
  | typeof NOTIFICATION_ANALYTICS_METRIC_GROUP_FAILURE
  | typeof NOTIFICATION_ANALYTICS_METRIC_GROUP_REVENUE
  | typeof NOTIFICATION_ANALYTICS_METRIC_GROUP_PERFORMANCE;

/**
 * ডেলিভারি গ্রুপ
 */
export const NOTIFICATION_ANALYTICS_METRIC_GROUP_DELIVERY = 'DELIVERY';

/**
 * এঙ্গেজমেন্ট গ্রুপ
 */
export const NOTIFICATION_ANALYTICS_METRIC_GROUP_ENGAGEMENT = 'ENGAGEMENT';

/**
 * ফেইল্যুর গ্রুপ
 */
export const NOTIFICATION_ANALYTICS_METRIC_GROUP_FAILURE = 'FAILURE';

/**
 * রেভিনিউ গ্রুপ
 */
export const NOTIFICATION_ANALYTICS_METRIC_GROUP_REVENUE = 'REVENUE';

/**
 * পারফরম্যান্স গ্রুপ
 */
export const NOTIFICATION_ANALYTICS_METRIC_GROUP_PERFORMANCE = 'PERFORMANCE';

// ============================================
// ৯. মেট্রিক টাইপ থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * মেট্রিক টাইপ থেকে গ্রুপ ম্যাপিং
 */
export const NOTIFICATION_ANALYTICS_METRIC_TO_GROUP: Record<
  NotificationAnalyticsMetric,
  NotificationAnalyticsMetricGroup
> = {
  [NOTIFICATION_ANALYTICS_METRIC_SENT]: NOTIFICATION_ANALYTICS_METRIC_GROUP_DELIVERY,
  [NOTIFICATION_ANALYTICS_METRIC_DELIVERED]: NOTIFICATION_ANALYTICS_METRIC_GROUP_DELIVERY,
  [NOTIFICATION_ANALYTICS_METRIC_OPENED]: NOTIFICATION_ANALYTICS_METRIC_GROUP_ENGAGEMENT,
  [NOTIFICATION_ANALYTICS_METRIC_CLICKED]: NOTIFICATION_ANALYTICS_METRIC_GROUP_ENGAGEMENT,
  [NOTIFICATION_ANALYTICS_METRIC_FAILED]: NOTIFICATION_ANALYTICS_METRIC_GROUP_FAILURE,
  [NOTIFICATION_ANALYTICS_METRIC_BOUNCED]: NOTIFICATION_ANALYTICS_METRIC_GROUP_FAILURE,
  [NOTIFICATION_ANALYTICS_METRIC_SPAM]: NOTIFICATION_ANALYTICS_METRIC_GROUP_FAILURE,
  [NOTIFICATION_ANALYTICS_METRIC_UNSUBSCRIBED]: NOTIFICATION_ANALYTICS_METRIC_GROUP_FAILURE,
  [NOTIFICATION_ANALYTICS_METRIC_COMPLAINED]: NOTIFICATION_ANALYTICS_METRIC_GROUP_FAILURE,
  [NOTIFICATION_ANALYTICS_METRIC_CONVERSION]: NOTIFICATION_ANALYTICS_METRIC_GROUP_REVENUE,
  [NOTIFICATION_ANALYTICS_METRIC_ENGAGEMENT]: NOTIFICATION_ANALYTICS_METRIC_GROUP_ENGAGEMENT,
  [NOTIFICATION_ANALYTICS_METRIC_REVENUE]: NOTIFICATION_ANALYTICS_METRIC_GROUP_REVENUE,
  [NOTIFICATION_ANALYTICS_METRIC_RESPONSE_TIME]: NOTIFICATION_ANALYTICS_METRIC_GROUP_PERFORMANCE,
  [NOTIFICATION_ANALYTICS_METRIC_ERROR_RATE]: NOTIFICATION_ANALYTICS_METRIC_GROUP_PERFORMANCE,
  [NOTIFICATION_ANALYTICS_METRIC_THROUGHPUT]: NOTIFICATION_ANALYTICS_METRIC_GROUP_PERFORMANCE,
};

// ============================================
// ১০. মেট্রিক লেবেল
// ============================================

/**
 * মেট্রিক লেবেল
 */
export const NOTIFICATION_ANALYTICS_METRIC_LABELS: Record<NotificationAnalyticsMetric, string> = {
  [NOTIFICATION_ANALYTICS_METRIC_SENT]: 'পাঠানো হয়েছে',
  [NOTIFICATION_ANALYTICS_METRIC_DELIVERED]: 'পৌঁছেছে',
  [NOTIFICATION_ANALYTICS_METRIC_OPENED]: 'খোলা হয়েছে',
  [NOTIFICATION_ANALYTICS_METRIC_CLICKED]: 'ক্লিক করা হয়েছে',
  [NOTIFICATION_ANALYTICS_METRIC_FAILED]: 'ব্যর্থ হয়েছে',
  [NOTIFICATION_ANALYTICS_METRIC_BOUNCED]: 'বাউন্স হয়েছে',
  [NOTIFICATION_ANALYTICS_METRIC_SPAM]: 'স্প্যাম',
  [NOTIFICATION_ANALYTICS_METRIC_UNSUBSCRIBED]: 'আনসাবস্ক্রাইব',
  [NOTIFICATION_ANALYTICS_METRIC_COMPLAINED]: 'অভিযোগ',
  [NOTIFICATION_ANALYTICS_METRIC_CONVERSION]: 'কনভার্সন',
  [NOTIFICATION_ANALYTICS_METRIC_ENGAGEMENT]: 'এঙ্গেজমেন্ট',
  [NOTIFICATION_ANALYTICS_METRIC_REVENUE]: 'রেভিনিউ',
  [NOTIFICATION_ANALYTICS_METRIC_RESPONSE_TIME]: 'রেসপন্স টাইম',
  [NOTIFICATION_ANALYTICS_METRIC_ERROR_RATE]: 'এরর রেট',
  [NOTIFICATION_ANALYTICS_METRIC_THROUGHPUT]: 'থ্রুপুট',
};

// ============================================
// ১১. টাইম ফ্রেম লেবেল
// ============================================

/**
 * টাইম ফ্রেম লেবেল
 */
export const NOTIFICATION_ANALYTICS_TIME_FRAME_LABELS: Record<
  NotificationAnalyticsTimeFrame,
  string
> = {
  [NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_HOUR]: 'শেষ ১ ঘন্টা',
  [NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_6_HOURS]: 'শেষ ৬ ঘন্টা',
  [NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_12_HOURS]: 'শেষ ১২ ঘন্টা',
  [NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_24_HOURS]: 'শেষ ২৪ ঘন্টা',
  [NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_7_DAYS]: 'শেষ ৭ দিন',
  [NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_30_DAYS]: 'শেষ ৩০ দিন',
  [NOTIFICATION_ANALYTICS_TIME_FRAME_LAST_90_DAYS]: 'শেষ ৯০ দিন',
  [NOTIFICATION_ANALYTICS_TIME_FRAME_CUSTOM]: 'কাস্টম',
};

// ============================================
// ১২. গ্রানুলারিটি লেবেল
// ============================================

/**
 * গ্রানুলারিটি লেবেল
 */
export const NOTIFICATION_ANALYTICS_GRANULARITY_LABELS: Record<
  NotificationAnalyticsGranularity,
  string
> = {
  [NOTIFICATION_ANALYTICS_GRANULARITY_MINUTE]: 'প্রতি মিনিট',
  [NOTIFICATION_ANALYTICS_GRANULARITY_5_MINUTES]: 'প্রতি ৫ মিনিট',
  [NOTIFICATION_ANALYTICS_GRANULARITY_15_MINUTES]: 'প্রতি ১৫ মিনিট',
  [NOTIFICATION_ANALYTICS_GRANULARITY_HOUR]: 'প্রতি ঘন্টা',
  [NOTIFICATION_ANALYTICS_GRANULARITY_6_HOURS]: 'প্রতি ৬ ঘন্টা',
  [NOTIFICATION_ANALYTICS_GRANULARITY_12_HOURS]: 'প্রতি ১২ ঘন্টা',
  [NOTIFICATION_ANALYTICS_GRANULARITY_DAY]: 'প্রতিদিন',
  [NOTIFICATION_ANALYTICS_GRANULARITY_WEEK]: 'প্রতি সপ্তাহ',
  [NOTIFICATION_ANALYTICS_GRANULARITY_MONTH]: 'প্রতি মাস',
};

// ============================================
// ১৩. চার্ট টাইপ লেবেল
// ============================================

/**
 * চার্ট টাইপ লেবেল
 */
export const NOTIFICATION_ANALYTICS_CHART_TYPE_LABELS: Record<
  NotificationAnalyticsChartType,
  string
> = {
  [NOTIFICATION_ANALYTICS_CHART_TYPE_LINE]: 'লাইন চার্ট',
  [NOTIFICATION_ANALYTICS_CHART_TYPE_BAR]: 'বার চার্ট',
  [NOTIFICATION_ANALYTICS_CHART_TYPE_PIE]: 'পাই চার্ট',
  [NOTIFICATION_ANALYTICS_CHART_TYPE_DONUT]: 'ডোনাট চার্ট',
  [NOTIFICATION_ANALYTICS_CHART_TYPE_AREA]: 'এরিয়া চার্ট',
  [NOTIFICATION_ANALYTICS_CHART_TYPE_SCATTER]: 'স্ক্যাটার চার্ট',
  [NOTIFICATION_ANALYTICS_CHART_TYPE_HEATMAP]: 'হিটম্যাপ',
  [NOTIFICATION_ANALYTICS_CHART_TYPE_FUNNEL]: 'ফানেল চার্ট',
  [NOTIFICATION_ANALYTICS_CHART_TYPE_GAUGE]: 'গজ চার্ট',
  [NOTIFICATION_ANALYTICS_CHART_TYPE_STACKED_BAR]: 'স্ট্যাকড বার চার্ট',
};

// ============================================
// ১৪. অ্যানালিটিক্স কনফিগারেশন
// ============================================

/**
 * অ্যানালিটিক্স কনফিগারেশন ইন্টারফেস
 */
export interface NotificationAnalyticsConfig {
  /** ডিফল্ট টাইম ফ্রেম */
  defaultTimeFrame: number;
  /** ন্যূনতম টাইম ফ্রেম */
  minTimeFrame: number;
  /** সর্বোচ্চ টাইম ফ্রেম */
  maxTimeFrame: number;
  /** ডিফল্ট গ্রানুলারিটি */
  defaultGranularity: number;
  /** ডিফল্ট ডেটা পয়েন্ট */
  defaultDataPoints: number;
  /** ডিফল্ট থ্রেশহোল্ড */
  defaultThreshold: number;
  /** ক্যাশ টিটিএল */
  cacheTtl: number;
  /** ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
}

/**
 * ডিফল্ট অ্যানালিটিক্স কনফিগারেশন
 */
export const NOTIFICATION_ANALYTICS_DEFAULT_CONFIG: NotificationAnalyticsConfig = {
  defaultTimeFrame: NOTIFICATION_ANALYTICS_DEFAULT_TIME_FRAME,
  minTimeFrame: NOTIFICATION_ANALYTICS_MIN_TIME_FRAME,
  maxTimeFrame: NOTIFICATION_ANALYTICS_MAX_TIME_FRAME,
  defaultGranularity: NOTIFICATION_ANALYTICS_DEFAULT_GRANULARITY,
  defaultDataPoints: NOTIFICATION_ANALYTICS_DEFAULT_DATA_POINTS,
  defaultThreshold: NOTIFICATION_ANALYTICS_DEFAULT_THRESHOLD,
  cacheTtl: NOTIFICATION_ANALYTICS_CACHE_TTL,
  cacheMaxSize: NOTIFICATION_ANALYTICS_CACHE_MAX_SIZE,
};
