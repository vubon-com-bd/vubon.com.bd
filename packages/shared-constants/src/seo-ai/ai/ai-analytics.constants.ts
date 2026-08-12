/**
 * ডিফল্ট সময় রেঞ্জ (৭ দিন)
 */
export const AI_ANALYTICS_DEFAULT_TIME_RANGE = 7 as const; // 7 days

/**
 * আপডেট ইন্টারভাল (১ ঘন্টা)
 */
export const AI_ANALYTICS_UPDATE_INTERVAL = 1 as const; // 1 hour

/**
 * ডেটা রিটেনশন সময় (৩৬৫ দিন)
 */
export const AI_ANALYTICS_MAX_RETENTION = 365 as const; // 365 days

/**
 * ব্যাচ সাইজ (১০০০)
 */
export const AI_ANALYTICS_BATCH_SIZE = 1000 as const;

/**
 * অ্যানালিটিক্স টাইপ এনাম
 */
export const AI_ANALYTICS_TYPE = {
  USER_BEHAVIOR: 'user-behavior',
  PERFORMANCE: 'performance',
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  RETENTION: 'retention',
  REVENUE: 'revenue',
  POPULARITY: 'popularity',
  TRENDING: 'trending',
  CUSTOM: 'custom',
} as const;

/**
 * AI_ANALYTICS_TYPE থেকে টাইপ
 */
export type AIAnalyticsType = (typeof AI_ANALYTICS_TYPE)[keyof typeof AI_ANALYTICS_TYPE];

/**
 * অ্যানালিটিক্স টাইপ লেবেল
 */
export const AI_ANALYTICS_TYPE_LABELS: Record<AIAnalyticsType, string> = {
  [AI_ANALYTICS_TYPE.USER_BEHAVIOR]: 'User Behavior',
  [AI_ANALYTICS_TYPE.PERFORMANCE]: 'Performance',
  [AI_ANALYTICS_TYPE.ENGAGEMENT]: 'Engagement',
  [AI_ANALYTICS_TYPE.CONVERSION]: 'Conversion',
  [AI_ANALYTICS_TYPE.RETENTION]: 'Retention',
  [AI_ANALYTICS_TYPE.REVENUE]: 'Revenue',
  [AI_ANALYTICS_TYPE.POPULARITY]: 'Popularity',
  [AI_ANALYTICS_TYPE.TRENDING]: 'Trending',
  [AI_ANALYTICS_TYPE.CUSTOM]: 'Custom',
} as const;

/**
 * অ্যানালিটিক্স টাইপ বিবরণ
 */
export const AI_ANALYTICS_TYPE_DESCRIPTIONS: Record<AIAnalyticsType, string> = {
  [AI_ANALYTICS_TYPE.USER_BEHAVIOR]: 'Analytics related to user actions and behavior patterns',
  [AI_ANALYTICS_TYPE.PERFORMANCE]: 'Analytics related to system and model performance',
  [AI_ANALYTICS_TYPE.ENGAGEMENT]: 'Analytics related to user engagement and interaction',
  [AI_ANALYTICS_TYPE.CONVERSION]: 'Analytics related to conversion rates and goals',
  [AI_ANALYTICS_TYPE.RETENTION]: 'Analytics related to user retention and churn',
  [AI_ANALYTICS_TYPE.REVENUE]: 'Analytics related to revenue and monetization',
  [AI_ANALYTICS_TYPE.POPULARITY]: 'Analytics related to popular items and content',
  [AI_ANALYTICS_TYPE.TRENDING]: 'Analytics related to trending patterns',
  [AI_ANALYTICS_TYPE.CUSTOM]: 'Custom analytics for specific use cases',
} as const;

/**
 * অ্যানালিটিক্স টাইম গ্রানুলারিটি
 */
export const AI_ANALYTICS_TIME_GRANULARITY = {
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
} as const;

/**
 * AI_ANALYTICS_TIME_GRANULARITY থেকে টাইপ
 */
export type AIAnalyticsTimeGranularity =
  (typeof AI_ANALYTICS_TIME_GRANULARITY)[keyof typeof AI_ANALYTICS_TIME_GRANULARITY];

/**
 * অ্যানালিটিক্স সময় গ্রানুলারিটি লেবেল
 */
export const AI_ANALYTICS_TIME_GRANULARITY_LABELS: Record<AIAnalyticsTimeGranularity, string> = {
  [AI_ANALYTICS_TIME_GRANULARITY.MINUTE]: 'Minute',
  [AI_ANALYTICS_TIME_GRANULARITY.HOUR]: 'Hour',
  [AI_ANALYTICS_TIME_GRANULARITY.DAY]: 'Day',
  [AI_ANALYTICS_TIME_GRANULARITY.WEEK]: 'Week',
  [AI_ANALYTICS_TIME_GRANULARITY.MONTH]: 'Month',
  [AI_ANALYTICS_TIME_GRANULARITY.QUARTER]: 'Quarter',
  [AI_ANALYTICS_TIME_GRANULARITY.YEAR]: 'Year',
} as const;

/**
 * অ্যানালিটিক্স মেট্রিক
 */
export const AI_ANALYTICS_METRIC = {
  VIEWS: 'views',
  CLICKS: 'clicks',
  CONVERSIONS: 'conversions',
  REVENUE: 'revenue',
  USERS: 'users',
  SESSIONS: 'sessions',
  BOUNCE_RATE: 'bounce-rate',
  AVG_SESSION_DURATION: 'avg-session-duration',
  RETENTION_RATE: 'retention-rate',
  CHURN_RATE: 'churn-rate',
  CTR: 'ctr',
} as const;

/**
 * AI_ANALYTICS_METRIC থেকে টাইপ
 */
export type AIAnalyticsMetric = (typeof AI_ANALYTICS_METRIC)[keyof typeof AI_ANALYTICS_METRIC];

/**
 * অ্যানালিটিক্স মেট্রিক লেবেল
 */
export const AI_ANALYTICS_METRIC_LABELS: Record<AIAnalyticsMetric, string> = {
  [AI_ANALYTICS_METRIC.VIEWS]: 'Views',
  [AI_ANALYTICS_METRIC.CLICKS]: 'Clicks',
  [AI_ANALYTICS_METRIC.CONVERSIONS]: 'Conversions',
  [AI_ANALYTICS_METRIC.REVENUE]: 'Revenue',
  [AI_ANALYTICS_METRIC.USERS]: 'Users',
  [AI_ANALYTICS_METRIC.SESSIONS]: 'Sessions',
  [AI_ANALYTICS_METRIC.BOUNCE_RATE]: 'Bounce Rate',
  [AI_ANALYTICS_METRIC.AVG_SESSION_DURATION]: 'Avg Session Duration',
  [AI_ANALYTICS_METRIC.RETENTION_RATE]: 'Retention Rate',
  [AI_ANALYTICS_METRIC.CHURN_RATE]: 'Churn Rate',
  [AI_ANALYTICS_METRIC.CTR]: 'Click-Through Rate',
} as const;

/**
 * অ্যানালিটিক্স ফিল্টার
 */
export interface AIAnalyticsFilter {
  type?: AIAnalyticsType;
  metric?: AIAnalyticsMetric;
  timeGranularity?: AIAnalyticsTimeGranularity;
  startDate?: Date;
  endDate?: Date;
  userIds?: string[];
  sessionIds?: string[];
  categories?: string[];
  tags?: string[];
  limit?: number;
  offset?: number;
}

/**
 * অ্যানালিটিক্স কনফিগারেশন
 */
export interface AIAnalyticsConfig {
  defaultTimeRange: number;
  updateInterval: number;
  maxRetention: number;
  batchSize: number;
  type: AIAnalyticsType;
  timeGranularity: AIAnalyticsTimeGranularity;
  enableRealTime: boolean;
  enableBatchProcessing: boolean;
  enableCaching: boolean;
  cacheTTL: number;
}

/**
 * অ্যানালিটিক্স ডিফল্ট কনফিগারেশন
 */
export const AI_ANALYTICS_DEFAULT_CONFIG: AIAnalyticsConfig = {
  defaultTimeRange: AI_ANALYTICS_DEFAULT_TIME_RANGE,
  updateInterval: AI_ANALYTICS_UPDATE_INTERVAL,
  maxRetention: AI_ANALYTICS_MAX_RETENTION,
  batchSize: AI_ANALYTICS_BATCH_SIZE,
  type: AI_ANALYTICS_TYPE.PERFORMANCE,
  timeGranularity: AI_ANALYTICS_TIME_GRANULARITY.DAY,
  enableRealTime: false,
  enableBatchProcessing: true,
  enableCaching: true,
  cacheTTL: 3600,
} as const;

/**
 * অ্যানালিটিক্স রেসপন্স
 */
export interface AIAnalyticsResponse {
  data: Record<string, unknown>[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  timeGranularity: AIAnalyticsTimeGranularity;
  startDate: Date;
  endDate: Date;
  metrics: AIAnalyticsMetric[];
  summary: Record<string, unknown>;
}

/**
 * অ্যানালিটিক্স টাইপ গ্রুপ
 */
export const AI_ANALYTICS_TYPE_GROUPS = {
  USER_FOCUSED: [
    AI_ANALYTICS_TYPE.USER_BEHAVIOR,
    AI_ANALYTICS_TYPE.ENGAGEMENT,
    AI_ANALYTICS_TYPE.RETENTION,
  ] as const,
  BUSINESS_FOCUSED: [AI_ANALYTICS_TYPE.CONVERSION, AI_ANALYTICS_TYPE.REVENUE] as const,
  CONTENT_FOCUSED: [AI_ANALYTICS_TYPE.POPULARITY, AI_ANALYTICS_TYPE.TRENDING] as const,
  SYSTEM_FOCUSED: [AI_ANALYTICS_TYPE.PERFORMANCE] as const,
} as const;

/**
 * অ্যানালিটিক্স টাইপ গ্রুপ লেবেল
 */
export const AI_ANALYTICS_TYPE_GROUP_LABELS = {
  USER_FOCUSED: 'User Focused',
  BUSINESS_FOCUSED: 'Business Focused',
  CONTENT_FOCUSED: 'Content Focused',
  SYSTEM_FOCUSED: 'System Focused',
} as const;

/**
 * অ্যানালিটিক্স সময় গ্রানুলারিটি অর্ডার
 */
export const AI_ANALYTICS_TIME_GRANULARITY_ORDER: Record<AIAnalyticsTimeGranularity, number> = {
  [AI_ANALYTICS_TIME_GRANULARITY.MINUTE]: 0,
  [AI_ANALYTICS_TIME_GRANULARITY.HOUR]: 1,
  [AI_ANALYTICS_TIME_GRANULARITY.DAY]: 2,
  [AI_ANALYTICS_TIME_GRANULARITY.WEEK]: 3,
  [AI_ANALYTICS_TIME_GRANULARITY.MONTH]: 4,
  [AI_ANALYTICS_TIME_GRANULARITY.QUARTER]: 5,
  [AI_ANALYTICS_TIME_GRANULARITY.YEAR]: 6,
} as const;
