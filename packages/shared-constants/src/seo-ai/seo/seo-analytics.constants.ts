/**
 * ডিফল্ট সময় রেঞ্জ (৩০ দিন)
 */
export const SEO_ANALYTICS_DEFAULT_TIME_RANGE = 30 as const; // 30 days

/**
 * আপডেট ইন্টারভাল (১ দিন)
 */
export const SEO_ANALYTICS_UPDATE_INTERVAL = 1 as const; // 1 day

/**
 * ডেটা রিটেনশন সময় (৭৩০ দিন)
 */
export const SEO_ANALYTICS_MAX_RETENTION = 730 as const; // 730 days (2 years)

/**
 * SEO অ্যানালিটিক্স টাইপ এনাম
 */
export const SEO_ANALYTICS_TYPE = {
  TRAFFIC: 'traffic',
  KEYWORDS: 'keywords',
  BACKLINKS: 'backlinks',
  RANKINGS: 'rankings',
  CONVERSIONS: 'conversions',
  BOUNCE_RATE: 'bounce-rate',
  PAGE_VIEWS: 'page-views',
  SESSION_DURATION: 'session-duration',
  CLICK_THROUGH: 'click-through',
  IMPRESSIONS: 'impressions',
} as const;

/**
 * SEO_ANALYTICS_TYPE থেকে টাইপ
 */
export type SEOAnalyticsType = (typeof SEO_ANALYTICS_TYPE)[keyof typeof SEO_ANALYTICS_TYPE];

/**
 * SEO অ্যানালিটিক্স টাইপ লেবেল
 */
export const SEO_ANALYTICS_TYPE_LABELS: Record<SEOAnalyticsType, string> = {
  [SEO_ANALYTICS_TYPE.TRAFFIC]: 'Traffic',
  [SEO_ANALYTICS_TYPE.KEYWORDS]: 'Keywords',
  [SEO_ANALYTICS_TYPE.BACKLINKS]: 'Backlinks',
  [SEO_ANALYTICS_TYPE.RANKINGS]: 'Rankings',
  [SEO_ANALYTICS_TYPE.CONVERSIONS]: 'Conversions',
  [SEO_ANALYTICS_TYPE.BOUNCE_RATE]: 'Bounce Rate',
  [SEO_ANALYTICS_TYPE.PAGE_VIEWS]: 'Page Views',
  [SEO_ANALYTICS_TYPE.SESSION_DURATION]: 'Session Duration',
  [SEO_ANALYTICS_TYPE.CLICK_THROUGH]: 'Click Through',
  [SEO_ANALYTICS_TYPE.IMPRESSIONS]: 'Impressions',
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ আইকন
 */
export const SEO_ANALYTICS_TYPE_ICONS: Record<SEOAnalyticsType, string> = {
  [SEO_ANALYTICS_TYPE.TRAFFIC]: '📊',
  [SEO_ANALYTICS_TYPE.KEYWORDS]: '🔑',
  [SEO_ANALYTICS_TYPE.BACKLINKS]: '🔗',
  [SEO_ANALYTICS_TYPE.RANKINGS]: '🎯',
  [SEO_ANALYTICS_TYPE.CONVERSIONS]: '💰',
  [SEO_ANALYTICS_TYPE.BOUNCE_RATE]: '🏃',
  [SEO_ANALYTICS_TYPE.PAGE_VIEWS]: '👁️',
  [SEO_ANALYTICS_TYPE.SESSION_DURATION]: '⏱️',
  [SEO_ANALYTICS_TYPE.CLICK_THROUGH]: '👆',
  [SEO_ANALYTICS_TYPE.IMPRESSIONS]: '👀',
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ কালার (হেক্স কোড)
 */
export const SEO_ANALYTICS_TYPE_COLORS: Record<SEOAnalyticsType, string> = {
  [SEO_ANALYTICS_TYPE.TRAFFIC]: '#3b82f6', // Blue-500
  [SEO_ANALYTICS_TYPE.KEYWORDS]: '#8b5cf6', // Violet-500
  [SEO_ANALYTICS_TYPE.BACKLINKS]: '#22c55e', // Green-500
  [SEO_ANALYTICS_TYPE.RANKINGS]: '#f59e0b', // Amber-500
  [SEO_ANALYTICS_TYPE.CONVERSIONS]: '#22d3ee', // Cyan-400
  [SEO_ANALYTICS_TYPE.BOUNCE_RATE]: '#dc2626', // Red-600
  [SEO_ANALYTICS_TYPE.PAGE_VIEWS]: '#06b6d4', // Cyan-500
  [SEO_ANALYTICS_TYPE.SESSION_DURATION]: '#f97316', // Orange-500
  [SEO_ANALYTICS_TYPE.CLICK_THROUGH]: '#ec4899', // Pink-500
  [SEO_ANALYTICS_TYPE.IMPRESSIONS]: '#94a3b8', // Slate-400
} as const;

/**
 * SEO অ্যানালিটিক্স টাইম রেঞ্জ
 */
export const SEO_ANALYTICS_TIME_RANGE = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last-7-days',
  LAST_30_DAYS: 'last-30-days',
  LAST_90_DAYS: 'last-90-days',
  LAST_365_DAYS: 'last-365-days',
  CUSTOM: 'custom',
} as const;

/**
 * SEO_ANALYTICS_TIME_RANGE থেকে টাইপ
 */
export type SEOAnalyticsTimeRange =
  (typeof SEO_ANALYTICS_TIME_RANGE)[keyof typeof SEO_ANALYTICS_TIME_RANGE];

/**
 * SEO অ্যানালিটিক্স টাইম রেঞ্জ লেবেল
 */
export const SEO_ANALYTICS_TIME_RANGE_LABELS: Record<SEOAnalyticsTimeRange, string> = {
  [SEO_ANALYTICS_TIME_RANGE.TODAY]: 'Today',
  [SEO_ANALYTICS_TIME_RANGE.YESTERDAY]: 'Yesterday',
  [SEO_ANALYTICS_TIME_RANGE.LAST_7_DAYS]: 'Last 7 Days',
  [SEO_ANALYTICS_TIME_RANGE.LAST_30_DAYS]: 'Last 30 Days',
  [SEO_ANALYTICS_TIME_RANGE.LAST_90_DAYS]: 'Last 90 Days',
  [SEO_ANALYTICS_TIME_RANGE.LAST_365_DAYS]: 'Last 365 Days',
  [SEO_ANALYTICS_TIME_RANGE.CUSTOM]: 'Custom Range',
} as const;

/**
 * SEO অ্যানালিটিক্স টাইম রেঞ্জ দিনের সংখ্যা
 */
export const SEO_ANALYTICS_TIME_RANGE_DAYS: Record<SEOAnalyticsTimeRange, number> = {
  [SEO_ANALYTICS_TIME_RANGE.TODAY]: 1,
  [SEO_ANALYTICS_TIME_RANGE.YESTERDAY]: 1,
  [SEO_ANALYTICS_TIME_RANGE.LAST_7_DAYS]: 7,
  [SEO_ANALYTICS_TIME_RANGE.LAST_30_DAYS]: 30,
  [SEO_ANALYTICS_TIME_RANGE.LAST_90_DAYS]: 90,
  [SEO_ANALYTICS_TIME_RANGE.LAST_365_DAYS]: 365,
  [SEO_ANALYTICS_TIME_RANGE.CUSTOM]: 0,
} as const;

/**
 * SEO অ্যানালিটিক্স ক্যাটাগরি
 */
export const SEO_ANALYTICS_CATEGORY = {
  TRAFFIC: 'traffic',
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  TECHNICAL: 'technical',
} as const;

/**
 * SEO_ANALYTICS_CATEGORY থেকে টাইপ
 */
export type SEOAnalyticsCategory =
  (typeof SEO_ANALYTICS_CATEGORY)[keyof typeof SEO_ANALYTICS_CATEGORY];

/**
 * SEO অ্যানালিটিক্স ক্যাটাগরি লেবেল
 */
export const SEO_ANALYTICS_CATEGORY_LABELS: Record<SEOAnalyticsCategory, string> = {
  [SEO_ANALYTICS_CATEGORY.TRAFFIC]: 'Traffic',
  [SEO_ANALYTICS_CATEGORY.ENGAGEMENT]: 'Engagement',
  [SEO_ANALYTICS_CATEGORY.CONVERSION]: 'Conversion',
  [SEO_ANALYTICS_CATEGORY.TECHNICAL]: 'Technical',
} as const;

/**
 * SEO অ্যানালিটিক্স ক্যাটাগরি ম্যাপিং
 */
export const SEO_ANALYTICS_CATEGORY_MAP: Record<SEOAnalyticsType, SEOAnalyticsCategory> = {
  [SEO_ANALYTICS_TYPE.TRAFFIC]: SEO_ANALYTICS_CATEGORY.TRAFFIC,
  [SEO_ANALYTICS_TYPE.KEYWORDS]: SEO_ANALYTICS_CATEGORY.TRAFFIC,
  [SEO_ANALYTICS_TYPE.BACKLINKS]: SEO_ANALYTICS_CATEGORY.TECHNICAL,
  [SEO_ANALYTICS_TYPE.RANKINGS]: SEO_ANALYTICS_CATEGORY.TRAFFIC,
  [SEO_ANALYTICS_TYPE.CONVERSIONS]: SEO_ANALYTICS_CATEGORY.CONVERSION,
  [SEO_ANALYTICS_TYPE.BOUNCE_RATE]: SEO_ANALYTICS_CATEGORY.ENGAGEMENT,
  [SEO_ANALYTICS_TYPE.PAGE_VIEWS]: SEO_ANALYTICS_CATEGORY.ENGAGEMENT,
  [SEO_ANALYTICS_TYPE.SESSION_DURATION]: SEO_ANALYTICS_CATEGORY.ENGAGEMENT,
  [SEO_ANALYTICS_TYPE.CLICK_THROUGH]: SEO_ANALYTICS_CATEGORY.CONVERSION,
  [SEO_ANALYTICS_TYPE.IMPRESSIONS]: SEO_ANALYTICS_CATEGORY.TRAFFIC,
} as const;

/**
 * SEO অ্যানালিটিক্স কনফিগারেশন
 */
export interface SEOAnalyticsConfig {
  defaultTimeRange: number;
  updateInterval: number;
  maxRetention: number;
  enableTracking: boolean;
  enableReporting: boolean;
  enableAlerts: boolean;
}

/**
 * SEO অ্যানালিটিক্স ডিফল্ট কনফিগারেশন
 */
export const SEO_ANALYTICS_DEFAULT_CONFIG: SEOAnalyticsConfig = {
  defaultTimeRange: SEO_ANALYTICS_DEFAULT_TIME_RANGE,
  updateInterval: SEO_ANALYTICS_UPDATE_INTERVAL,
  maxRetention: SEO_ANALYTICS_MAX_RETENTION,
  enableTracking: true,
  enableReporting: true,
  enableAlerts: false,
} as const;

/**
 * SEO অ্যানালিটিক্স ডেটা
 */
export interface SEOAnalyticsData {
  type: SEOAnalyticsType;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

/**
 * SEO অ্যানালিটিক্স ট্রেন্ড
 */
export const SEO_ANALYTICS_TREND = {
  UP: 'up',
  DOWN: 'down',
  STABLE: 'stable',
} as const;

/**
 * SEO_ANALYTICS_TREND থেকে টাইপ
 */
export type SEOAnalyticsTrend = (typeof SEO_ANALYTICS_TREND)[keyof typeof SEO_ANALYTICS_TREND];

/**
 * SEO অ্যানালিটিক্স ট্রেন্ড লেবেল
 */
export const SEO_ANALYTICS_TREND_LABELS: Record<SEOAnalyticsTrend, string> = {
  [SEO_ANALYTICS_TREND.UP]: 'Up',
  [SEO_ANALYTICS_TREND.DOWN]: 'Down',
  [SEO_ANALYTICS_TREND.STABLE]: 'Stable',
} as const;

/**
 * SEO অ্যানালিটিক্স ট্রেন্ড আইকন
 */
export const SEO_ANALYTICS_TREND_ICONS: Record<SEOAnalyticsTrend, string> = {
  [SEO_ANALYTICS_TREND.UP]: '📈',
  [SEO_ANALYTICS_TREND.DOWN]: '📉',
  [SEO_ANALYTICS_TREND.STABLE]: '➡️',
} as const;

/**
 * SEO অ্যানালিটিক্স ট্রেন্ড কালার
 */
export const SEO_ANALYTICS_TREND_COLORS: Record<SEOAnalyticsTrend, string> = {
  [SEO_ANALYTICS_TREND.UP]: '#22c55e', // Green-500
  [SEO_ANALYTICS_TREND.DOWN]: '#dc2626', // Red-600
  [SEO_ANALYTICS_TREND.STABLE]: '#3b82f6', // Blue-500
} as const;

/**
 * SEO অ্যানালিটিক্স ফিল্টার
 */
export interface SEOAnalyticsFilter {
  type?: SEOAnalyticsType;
  category?: SEOAnalyticsCategory;
  timeRange?: SEOAnalyticsTimeRange;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

/**
 * SEO অ্যানালিটিক্স রেসপন্স
 */
export interface SEOAnalyticsResponse {
  data: SEOAnalyticsData[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * SEO অ্যানালিটিক্স স্ট্যাটাস
 */
export const SEO_ANALYTICS_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

/**
 * SEO_ANALYTICS_STATUS থেকে টাইপ
 */
export type SEOAnalyticsStatus = (typeof SEO_ANALYTICS_STATUS)[keyof typeof SEO_ANALYTICS_STATUS];

/**
 * SEO অ্যানালিটিক্স স্ট্যাটাস লেবেল
 */
export const SEO_ANALYTICS_STATUS_LABELS: Record<SEOAnalyticsStatus, string> = {
  [SEO_ANALYTICS_STATUS.PENDING]: 'Pending',
  [SEO_ANALYTICS_STATUS.PROCESSING]: 'Processing',
  [SEO_ANALYTICS_STATUS.COMPLETED]: 'Completed',
  [SEO_ANALYTICS_STATUS.FAILED]: 'Failed',
} as const;

/**
 * SEO অ্যানালিটিক্স স্ট্যাটাস কালার
 */
export const SEO_ANALYTICS_STATUS_COLORS: Record<SEOAnalyticsStatus, string> = {
  [SEO_ANALYTICS_STATUS.PENDING]: '#94a3b8', // Slate-400
  [SEO_ANALYTICS_STATUS.PROCESSING]: '#3b82f6', // Blue-500
  [SEO_ANALYTICS_STATUS.COMPLETED]: '#22c55e', // Green-500
  [SEO_ANALYTICS_STATUS.FAILED]: '#dc2626', // Red-600
} as const;
