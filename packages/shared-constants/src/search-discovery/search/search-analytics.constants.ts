/**
 * সার্চ অ্যানালিটিক্স সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ইভেন্ট টাইপ
 */
export enum AnalyticsEventType {
  SEARCH = 'search',
  CLICK = 'click',
  CONVERSION = 'conversion',
  ADD_TO_CART = 'add_to_cart',
  PURCHASE = 'purchase',
}

/**
 * অ্যানালিটিক্স টাইম ফ্রেম
 */
export enum AnalyticsTimeFrame {
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
}

/**
 * অ্যানালিটিক্স মেট্রিক্স
 */
export enum AnalyticsMetric {
  TOTAL_SEARCHES = 'total_searches',
  UNIQUE_SEARCHES = 'unique_searches',
  CLICK_THROUGH_RATE = 'click_through_rate',
  CONVERSION_RATE = 'conversion_rate',
  BOUNCE_RATE = 'bounce_rate',
  AVERAGE_CLICK_POSITION = 'average_click_position',
  SEARCH_SUCCESS_RATE = 'search_success_rate',
  ZERO_RESULTS_RATE = 'zero_results_rate',
  AVERAGE_SEARCH_TIME = 'average_search_time',
}

/**
 * ইভেন্ট টাইপ লেবেলসমূহ (বাংলায়)
 */
export const ANALYTICS_EVENT_LABELS: Record<AnalyticsEventType, string> = {
  [AnalyticsEventType.SEARCH]: 'সার্চ',
  [AnalyticsEventType.CLICK]: 'ক্লিক',
  [AnalyticsEventType.CONVERSION]: 'কনভার্সন',
  [AnalyticsEventType.ADD_TO_CART]: 'কার্টে যোগ',
  [AnalyticsEventType.PURCHASE]: 'ক্রয়',
} as const;

/**
 * ইভেন্ট টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const ANALYTICS_EVENT_LABELS_EN: Record<AnalyticsEventType, string> = {
  [AnalyticsEventType.SEARCH]: 'Search',
  [AnalyticsEventType.CLICK]: 'Click',
  [AnalyticsEventType.CONVERSION]: 'Conversion',
  [AnalyticsEventType.ADD_TO_CART]: 'Add to Cart',
  [AnalyticsEventType.PURCHASE]: 'Purchase',
} as const;

/**
 * অ্যানালিটিক্স টাইম ফ্রেম লেবেলসমূহ (বাংলায়)
 */
export const ANALYTICS_TIME_FRAME_LABELS: Record<AnalyticsTimeFrame, string> = {
  [AnalyticsTimeFrame.TODAY]: 'আজ',
  [AnalyticsTimeFrame.WEEK]: 'এই সপ্তাহ',
  [AnalyticsTimeFrame.MONTH]: 'এই মাস',
  [AnalyticsTimeFrame.QUARTER]: 'এই ত্রৈমাসিক',
  [AnalyticsTimeFrame.YEAR]: 'এই বছর',
} as const;

/**
 * অ্যানালিটিক্স টাইম ফ্রেম লেবেলসমূহ (ইংরেজিতে)
 */
export const ANALYTICS_TIME_FRAME_LABELS_EN: Record<AnalyticsTimeFrame, string> = {
  [AnalyticsTimeFrame.TODAY]: 'Today',
  [AnalyticsTimeFrame.WEEK]: 'This Week',
  [AnalyticsTimeFrame.MONTH]: 'This Month',
  [AnalyticsTimeFrame.QUARTER]: 'This Quarter',
  [AnalyticsTimeFrame.YEAR]: 'This Year',
} as const;

/**
 * অ্যানালিটিক্স মেট্রিক লেবেলসমূহ (বাংলায়)
 */
export const ANALYTICS_METRIC_LABELS: Record<AnalyticsMetric, string> = {
  [AnalyticsMetric.TOTAL_SEARCHES]: 'মোট সার্চ',
  [AnalyticsMetric.UNIQUE_SEARCHES]: 'ইউনিক সার্চ',
  [AnalyticsMetric.CLICK_THROUGH_RATE]: 'ক্লিক থ্রু রেট',
  [AnalyticsMetric.CONVERSION_RATE]: 'কনভার্সন রেট',
  [AnalyticsMetric.BOUNCE_RATE]: 'বাউন্স রেট',
  [AnalyticsMetric.AVERAGE_CLICK_POSITION]: 'গড় ক্লিক পজিশন',
  [AnalyticsMetric.SEARCH_SUCCESS_RATE]: 'সার্চ সাকসেস রেট',
  [AnalyticsMetric.ZERO_RESULTS_RATE]: 'জিরো রেজাল্ট রেট',
  [AnalyticsMetric.AVERAGE_SEARCH_TIME]: 'গড় সার্চ সময়',
} as const;

/**
 * অ্যানালিটিক্স মেট্রিক লেবেলসমূহ (ইংরেজিতে)
 */
export const ANALYTICS_METRIC_LABELS_EN: Record<AnalyticsMetric, string> = {
  [AnalyticsMetric.TOTAL_SEARCHES]: 'Total Searches',
  [AnalyticsMetric.UNIQUE_SEARCHES]: 'Unique Searches',
  [AnalyticsMetric.CLICK_THROUGH_RATE]: 'Click Through Rate',
  [AnalyticsMetric.CONVERSION_RATE]: 'Conversion Rate',
  [AnalyticsMetric.BOUNCE_RATE]: 'Bounce Rate',
  [AnalyticsMetric.AVERAGE_CLICK_POSITION]: 'Average Click Position',
  [AnalyticsMetric.SEARCH_SUCCESS_RATE]: 'Search Success Rate',
  [AnalyticsMetric.ZERO_RESULTS_RATE]: 'Zero Results Rate',
  [AnalyticsMetric.AVERAGE_SEARCH_TIME]: 'Average Search Time',
} as const;

/**
 * ডিফল্ট অ্যানালিটিক্স পিরিয়ড (দিনে)
 */
export const DEFAULT_ANALYTICS_PERIOD_DAYS = 30;

/**
 * ডিফল্ট অ্যানালিটিক্স টাইম ফ্রেম
 */
export const DEFAULT_ANALYTICS_TIME_FRAME = AnalyticsTimeFrame.MONTH;

/**
 * অ্যানালিটিক্স ডেটা রিটেনশন (দিনে)
 */
export const ANALYTICS_DATA_RETENTION_DAYS = 365;

/**
 * অ্যানালিটিক্স রেট লিমিট
 */
export const ANALYTICS_RATE_LIMIT = {
  maxEventsPerSecond: 1000,
  maxEventsPerMinute: 60000,
  maxEventsPerHour: 3600000,
} as const;

/**
 * অ্যানালিটিক্স ক্যাশে টাইমআউট (সেকেন্ডে)
 */
export const ANALYTICS_CACHE_TIMEOUT_SECONDS = 300;

/**
 * অ্যানালিটিক্স ইভেন্টের জন্য ডিফল্ট ওয়েটিং টাইম (মিলিসেকেন্ডে)
 */
export const ANALYTICS_DEFAULT_WAIT_TIME_MS = 100;

/**
 * অ্যানালিটিক্স কনফিগারেশন টাইপ
 */
export type AnalyticsConfig = {
  eventTypes: AnalyticsEventType[];
  timeFrame: AnalyticsTimeFrame;
  metrics: AnalyticsMetric[];
  retentionDays: number;
  rateLimit: {
    maxEventsPerSecond: number;
    maxEventsPerMinute: number;
    maxEventsPerHour: number;
  };
};

/**
 * ডিফল্ট অ্যানালিটিক্স কনফিগারেশন
 */
export const DEFAULT_ANALYTICS_CONFIG: AnalyticsConfig = {
  eventTypes: Object.values(AnalyticsEventType),
  timeFrame: DEFAULT_ANALYTICS_TIME_FRAME,
  metrics: [
    AnalyticsMetric.TOTAL_SEARCHES,
    AnalyticsMetric.UNIQUE_SEARCHES,
    AnalyticsMetric.CLICK_THROUGH_RATE,
    AnalyticsMetric.CONVERSION_RATE,
  ],
  retentionDays: ANALYTICS_DATA_RETENTION_DAYS,
  rateLimit: ANALYTICS_RATE_LIMIT,
} as const;

/**
 * অ্যানালিটিক্স এরর মেসেজসমূহ
 */
export const ANALYTICS_ERROR_MESSAGES = {
  INVALID_EVENT_TYPE: 'ইভেন্ট টাইপ সঠিক নয়',
  INVALID_TIME_FRAME: 'টাইম ফ্রেম সঠিক নয়',
  INVALID_METRIC: 'মেট্রিক সঠিক নয়',
  RATE_LIMIT_EXCEEDED: 'রেট লিমিট অতিক্রম করা হয়েছে',
  DATA_RETENTION_EXCEEDED: `ডেটা রিটেনশন ${ANALYTICS_DATA_RETENTION_DAYS} দিন অতিক্রম করা হয়েছে`,
  INVALID_PERIOD: 'পিরিয়ড সঠিক নয়',
} as const;
