/**
 * অ্যানালিটিক্স মডেলের জন্য কনস্ট্যান্টসমূহ
 */

// ইভেন্ট টাইপ
export const AnalyticsEventType = {
  VIEW: 'VIEW',
  PURCHASE: 'PURCHASE',
  ADD_TO_CART: 'ADD_TO_CART',
  WISHLIST: 'WISHLIST',
  COMPARE: 'COMPARE',
  SEARCH: 'SEARCH',
  CLICK: 'CLICK',
  SHARE: 'SHARE',
  REVIEW: 'REVIEW',
  RATING: 'RATING',
  ABANDON_CART: 'ABANDON_CART',
  CHECKOUT: 'CHECKOUT',
  PAYMENT: 'PAYMENT',
  REFUND: 'REFUND',
  RETURN: 'RETURN',
} as const;

export type AnalyticsEventTypeType = (typeof AnalyticsEventType)[keyof typeof AnalyticsEventType];

// টাইম ফ্রেম
export const TimeFrame = {
  LAST_DAY: 'LAST_DAY',
  LAST_WEEK: 'LAST_WEEK',
  LAST_MONTH: 'LAST_MONTH',
  LAST_YEAR: 'LAST_YEAR',
  TODAY: 'TODAY',
  YESTERDAY: 'YESTERDAY',
  THIS_WEEK: 'THIS_WEEK',
  THIS_MONTH: 'THIS_MONTH',
  THIS_QUARTER: 'THIS_QUARTER',
  THIS_YEAR: 'THIS_YEAR',
  CUSTOM: 'CUSTOM',
} as const;

export type TimeFrameType = (typeof TimeFrame)[keyof typeof TimeFrame];

// মেট্রিক্স টাইপ
export const MetricType = {
  REVENUE: 'REVENUE',
  CONVERSION: 'CONVERSION',
  TRAFFIC: 'TRAFFIC',
  ENGAGEMENT: 'ENGAGEMENT',
  SALES: 'SALES',
  ORDERS: 'ORDERS',
  CUSTOMERS: 'CUSTOMERS',
  PRODUCTS: 'PRODUCTS',
  CATEGORIES: 'CATEGORIES',
  BRANDS: 'BRANDS',
  REVIEWS: 'REVIEWS',
  RATINGS: 'RATINGS',
  CART_ABANDONMENT: 'CART_ABANDONMENT',
  BOUNCE_RATE: 'BOUNCE_RATE',
  AVERAGE_ORDER_VALUE: 'AVERAGE_ORDER_VALUE',
  CUSTOMER_LIFETIME_VALUE: 'CUSTOMER_LIFETIME_VALUE',
} as const;

export type MetricTypeType = (typeof MetricType)[keyof typeof MetricType];

// ডিফল্ট অ্যানালিটিক্স পিরিয়ড
export const DEFAULT_ANALYTICS_PERIOD = TimeFrame.LAST_MONTH;

// কনভার্সন ফানেল স্টেজ
export const ConversionFunnelStage = {
  AWARENESS: 'AWARENESS',
  INTEREST: 'INTEREST',
  CONSIDERATION: 'CONSIDERATION',
  INTENT: 'INTENT',
  PURCHASE: 'PURCHASE',
  RETENTION: 'RETENTION',
  ADVOCACY: 'ADVOCACY',
} as const;

export type ConversionFunnelStageType =
  (typeof ConversionFunnelStage)[keyof typeof ConversionFunnelStage];

// চার্ট টাইপ
export const ChartType = {
  LINE: 'LINE',
  BAR: 'BAR',
  PIE: 'PIE',
  TABLE: 'TABLE',
  AREA: 'AREA',
  SCATTER: 'SCATTER',
  HEATMAP: 'HEATMAP',
  GAUGE: 'GAUGE',
  FUNNEL: 'FUNNEL',
  RADAR: 'RADAR',
} as const;

export type ChartTypeType = (typeof ChartType)[keyof typeof ChartType];

// ডিফল্ট অ্যানালিটিক্স ভ্যালু
export const DEFAULT_EVENT_TYPE = AnalyticsEventType.VIEW;
export const DEFAULT_TIME_FRAME = TimeFrame.LAST_MONTH;
export const DEFAULT_METRIC_TYPE = MetricType.REVENUE;
export const DEFAULT_CHART_TYPE = ChartType.LINE;
export const DEFAULT_CONVERSION_STAGE = ConversionFunnelStage.AWARENESS;

// অ্যানালিটিক্স টাইম রেঞ্জ কনস্ট্যান্ট
export const ANALYTICS_TIME_RANGES = {
  [TimeFrame.LAST_DAY]: { days: 1, label: 'Last 24 Hours' },
  [TimeFrame.LAST_WEEK]: { days: 7, label: 'Last 7 Days' },
  [TimeFrame.LAST_MONTH]: { days: 30, label: 'Last 30 Days' },
  [TimeFrame.LAST_YEAR]: { days: 365, label: 'Last 365 Days' },
  [TimeFrame.TODAY]: { days: 0, label: 'Today' },
  [TimeFrame.YESTERDAY]: { days: 1, label: 'Yesterday' },
  [TimeFrame.THIS_WEEK]: { days: 7, label: 'This Week' },
  [TimeFrame.THIS_MONTH]: { days: 30, label: 'This Month' },
  [TimeFrame.THIS_QUARTER]: { days: 90, label: 'This Quarter' },
  [TimeFrame.THIS_YEAR]: { days: 365, label: 'This Year' },
} as const;

// অ্যানালিটিক্স ডেটা রিটেনশন
export const ANALYTICS_DATA_RETENTION_DAYS = 730; // 2 years
export const ANALYTICS_RAW_DATA_RETENTION_DAYS = 90;

// অ্যানালিটিক্স থ্রেশহোল্ড
export const ANALYTICS_THRESHOLDS = {
  HIGH_CONVERSION_RATE: 5, // percentage
  MEDIUM_CONVERSION_RATE: 2.5, // percentage
  LOW_CONVERSION_RATE: 1, // percentage
  HIGH_BOUNCE_RATE: 60, // percentage
  MEDIUM_BOUNCE_RATE: 40, // percentage
  HIGH_ABANDONMENT_RATE: 70, // percentage
  MEDIUM_ABANDONMENT_RATE: 50, // percentage
} as const;

// অ্যানালিটিক্স সেগমেন্ট টাইপ
export const SegmentType = {
  DEMOGRAPHIC: 'DEMOGRAPHIC',
  GEOGRAPHIC: 'GEOGRAPHIC',
  BEHAVIORAL: 'BEHAVIORAL',
  PSYCHOGRAPHIC: 'PSYCHOGRAPHIC',
  TECHNOLOGICAL: 'TECHNOLOGICAL',
} as const;

export type SegmentTypeType = (typeof SegmentType)[keyof typeof SegmentType];

// অ্যানালিটিক্স ফিল্টার টাইপ
export const AnalyticsFilterType = {
  DATE_RANGE: 'DATE_RANGE',
  CATEGORY: 'CATEGORY',
  BRAND: 'BRAND',
  VENDOR: 'VENDOR',
  PRICE_RANGE: 'PRICE_RANGE',
  RATING: 'RATING',
  STATUS: 'STATUS',
} as const;

export type AnalyticsFilterTypeType =
  (typeof AnalyticsFilterType)[keyof typeof AnalyticsFilterType];

// অ্যানালিটিক্স রিপোর্ট টাইপ
export const AnalyticsReportType = {
  SALES: 'SALES',
  PRODUCTS: 'PRODUCTS',
  CUSTOMERS: 'CUSTOMERS',
  MARKETING: 'MARKETING',
  OPERATIONS: 'OPERATIONS',
  FINANCIAL: 'FINANCIAL',
  COMPETITIVE: 'COMPETITIVE',
  MARKET: 'MARKET',
} as const;

export type AnalyticsReportTypeType =
  (typeof AnalyticsReportType)[keyof typeof AnalyticsReportType];

// ডিফল্ট রিপোর্ট টাইপ
export const DEFAULT_REPORT_TYPE = AnalyticsReportType.SALES;

// অ্যানালিটিক্স ড্যাশবোর্ড উইজেট টাইপ
export const DashboardWidgetType = {
  CHART: 'CHART',
  TABLE: 'TABLE',
  METRIC: 'METRIC',
  GAUGE: 'GAUGE',
  MAP: 'MAP',
  LIST: 'LIST',
  COUNTER: 'COUNTER',
} as const;

export type DashboardWidgetTypeType =
  (typeof DashboardWidgetType)[keyof typeof DashboardWidgetType];

// অ্যানালিটিক্স ক্যালকুলেশন কনস্ট্যান্ট
export const ANALYTICS_CALCULATION_PRECISION = 2;
export const ANALYTICS_PERCENTAGE_PRECISION = 1;

// অ্যানালিটিক্স ক্যাশে কনস্ট্যান্ট
export const ANALYTICS_CACHE_TTL_SECONDS = 300; // 5 minutes
export const ANALYTICS_CACHE_MAX_SIZE = 100;

// অ্যানালিটিক্স এক্সপোর্ট কনস্ট্যান্ট
export const ANALYTICS_EXPORT_MAX_ROWS = 100000;
export const ANALYTICS_EXPORT_ALLOWED_FORMATS = ['csv', 'json', 'xlsx', 'pdf'] as const;

export type AnalyticsExportFormatType = (typeof ANALYTICS_EXPORT_ALLOWED_FORMATS)[number];

// অ্যানালিটিক্স মেটাডাটা কনস্ট্যান্ট
export const MAX_ANALYTICS_META_FIELDS = 20;
export const ANALYTICS_META_KEY_MAX_LENGTH = 100;
export const ANALYTICS_META_VALUE_MAX_LENGTH = 1000;
