/**
 * AI অ্যানালিটিক্স মেট্রিক এনাম
 */
export const AI_ANALYTICS_METRIC = {
  IMPRESSIONS: 'impressions',
  CLICKS: 'clicks',
  CTR: 'ctr',
  CONVERSIONS: 'conversions',
  CONVERSION_RATE: 'conversion-rate',
  REVENUE: 'revenue',
  AOV: 'aov',
  BOUNCE_RATE: 'bounce-rate',
  SESSION_DURATION: 'session-duration',
  RETENTION_RATE: 'retention-rate',
  NPS: 'nps',
  CSAT: 'csat',
} as const;

/**
 * AI_ANALYTICS_METRIC থেকে টাইপ
 */
export type AIAnalyticsMetricType = (typeof AI_ANALYTICS_METRIC)[keyof typeof AI_ANALYTICS_METRIC];

/**
 * অ্যানালিটিক্স মেট্রিক লেবেল
 */
export const AI_ANALYTICS_METRIC_LABELS: Record<AIAnalyticsMetricType, string> = {
  [AI_ANALYTICS_METRIC.IMPRESSIONS]: 'Impressions',
  [AI_ANALYTICS_METRIC.CLICKS]: 'Clicks',
  [AI_ANALYTICS_METRIC.CTR]: 'Click-Through Rate',
  [AI_ANALYTICS_METRIC.CONVERSIONS]: 'Conversions',
  [AI_ANALYTICS_METRIC.CONVERSION_RATE]: 'Conversion Rate',
  [AI_ANALYTICS_METRIC.REVENUE]: 'Revenue',
  [AI_ANALYTICS_METRIC.AOV]: 'Average Order Value',
  [AI_ANALYTICS_METRIC.BOUNCE_RATE]: 'Bounce Rate',
  [AI_ANALYTICS_METRIC.SESSION_DURATION]: 'Session Duration',
  [AI_ANALYTICS_METRIC.RETENTION_RATE]: 'Retention Rate',
  [AI_ANALYTICS_METRIC.NPS]: 'Net Promoter Score',
  [AI_ANALYTICS_METRIC.CSAT]: 'Customer Satisfaction Score',
} as const;

/**
 * অ্যানালিটিক্স মেট্রিক বিবরণ
 */
export const AI_ANALYTICS_METRIC_DESCRIPTIONS: Record<AIAnalyticsMetricType, string> = {
  [AI_ANALYTICS_METRIC.IMPRESSIONS]: 'Total number of times content is displayed or viewed',
  [AI_ANALYTICS_METRIC.CLICKS]: 'Total number of clicks on content or links',
  [AI_ANALYTICS_METRIC.CTR]: 'Ratio of clicks to impressions, measuring engagement effectiveness',
  [AI_ANALYTICS_METRIC.CONVERSIONS]: 'Number of completed desired actions or goals',
  [AI_ANALYTICS_METRIC.CONVERSION_RATE]: 'Percentage of users who complete a desired action',
  [AI_ANALYTICS_METRIC.REVENUE]: 'Total monetary value generated from activities',
  [AI_ANALYTICS_METRIC.AOV]: 'Average monetary value of each order or transaction',
  [AI_ANALYTICS_METRIC.BOUNCE_RATE]: 'Percentage of visitors who leave without interaction',
  [AI_ANALYTICS_METRIC.SESSION_DURATION]: 'Average time users spend during a session',
  [AI_ANALYTICS_METRIC.RETENTION_RATE]: 'Percentage of users who continue using the service',
  [AI_ANALYTICS_METRIC.NPS]: 'Measures customer loyalty and likelihood to recommend',
  [AI_ANALYTICS_METRIC.CSAT]: 'Measures customer satisfaction with products or services',
} as const;

/**
 * অ্যানালিটিক্স মেট্রিক আইকন
 */
export const AI_ANALYTICS_METRIC_ICONS: Record<AIAnalyticsMetricType, string> = {
  [AI_ANALYTICS_METRIC.IMPRESSIONS]: '👁️',
  [AI_ANALYTICS_METRIC.CLICKS]: '🖱️',
  [AI_ANALYTICS_METRIC.CTR]: '📊',
  [AI_ANALYTICS_METRIC.CONVERSIONS]: '🎯',
  [AI_ANALYTICS_METRIC.CONVERSION_RATE]: '📈',
  [AI_ANALYTICS_METRIC.REVENUE]: '💰',
  [AI_ANALYTICS_METRIC.AOV]: '🛒',
  [AI_ANALYTICS_METRIC.BOUNCE_RATE]: '🚪',
  [AI_ANALYTICS_METRIC.SESSION_DURATION]: '⏱️',
  [AI_ANALYTICS_METRIC.RETENTION_RATE]: '🔄',
  [AI_ANALYTICS_METRIC.NPS]: '🌟',
  [AI_ANALYTICS_METRIC.CSAT]: '😊',
} as const;

/**
 * অ্যানালিটিক্স মেট্রিক ফরম্যাট
 */
export const AI_ANALYTICS_METRIC_FORMAT = {
  [AI_ANALYTICS_METRIC.IMPRESSIONS]: 'number',
  [AI_ANALYTICS_METRIC.CLICKS]: 'number',
  [AI_ANALYTICS_METRIC.CTR]: 'percentage',
  [AI_ANALYTICS_METRIC.CONVERSIONS]: 'number',
  [AI_ANALYTICS_METRIC.CONVERSION_RATE]: 'percentage',
  [AI_ANALYTICS_METRIC.REVENUE]: 'currency',
  [AI_ANALYTICS_METRIC.AOV]: 'currency',
  [AI_ANALYTICS_METRIC.BOUNCE_RATE]: 'percentage',
  [AI_ANALYTICS_METRIC.SESSION_DURATION]: 'duration',
  [AI_ANALYTICS_METRIC.RETENTION_RATE]: 'percentage',
  [AI_ANALYTICS_METRIC.NPS]: 'number',
  [AI_ANALYTICS_METRIC.CSAT]: 'number',
} as const;

/**
 * অ্যানালিটিক্স মেট্রিক ডিফল্ট থ্রেশহোল্ড
 */
export const AI_ANALYTICS_METRIC_THRESHOLDS: Record<
  AIAnalyticsMetricType,
  { good: number; warning: number; danger: number }
> = {
  [AI_ANALYTICS_METRIC.IMPRESSIONS]: { good: 10000, warning: 1000, danger: 100 },
  [AI_ANALYTICS_METRIC.CLICKS]: { good: 1000, warning: 100, danger: 10 },
  [AI_ANALYTICS_METRIC.CTR]: { good: 5, warning: 2, danger: 0.5 },
  [AI_ANALYTICS_METRIC.CONVERSIONS]: { good: 100, warning: 10, danger: 1 },
  [AI_ANALYTICS_METRIC.CONVERSION_RATE]: { good: 10, warning: 3, danger: 1 },
  [AI_ANALYTICS_METRIC.REVENUE]: { good: 10000, warning: 1000, danger: 100 },
  [AI_ANALYTICS_METRIC.AOV]: { good: 100, warning: 50, danger: 10 },
  [AI_ANALYTICS_METRIC.BOUNCE_RATE]: { good: 30, warning: 50, danger: 70 },
  [AI_ANALYTICS_METRIC.SESSION_DURATION]: { good: 180, warning: 60, danger: 30 },
  [AI_ANALYTICS_METRIC.RETENTION_RATE]: { good: 70, warning: 40, danger: 20 },
  [AI_ANALYTICS_METRIC.NPS]: { good: 70, warning: 30, danger: 0 },
  [AI_ANALYTICS_METRIC.CSAT]: { good: 80, warning: 60, danger: 40 },
} as const;

/**
 * অ্যানালিটিক্স মেট্রিক কনফিগারেশন
 */
export interface AIAnalyticsMetricConfig {
  metric: AIAnalyticsMetricType;
  label: string;
  description: string;
  icon: string;
  format: string;
  thresholds: { good: number; warning: number; danger: number };
  isPercentage: boolean;
  isMonetary: boolean;
  isHigherBetter: boolean;
}

/**
 * অ্যানালিটিক্স মেট্রিক মেটাডেটা
 */
export const AI_ANALYTICS_METRIC_METADATA: Record<AIAnalyticsMetricType, AIAnalyticsMetricConfig> =
  {
    [AI_ANALYTICS_METRIC.IMPRESSIONS]: {
      metric: AI_ANALYTICS_METRIC.IMPRESSIONS,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.IMPRESSIONS],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.IMPRESSIONS],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.IMPRESSIONS],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.IMPRESSIONS],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.IMPRESSIONS],
      isPercentage: false,
      isMonetary: false,
      isHigherBetter: true,
    },
    [AI_ANALYTICS_METRIC.CLICKS]: {
      metric: AI_ANALYTICS_METRIC.CLICKS,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.CLICKS],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.CLICKS],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.CLICKS],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.CLICKS],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.CLICKS],
      isPercentage: false,
      isMonetary: false,
      isHigherBetter: true,
    },
    [AI_ANALYTICS_METRIC.CTR]: {
      metric: AI_ANALYTICS_METRIC.CTR,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.CTR],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.CTR],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.CTR],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.CTR],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.CTR],
      isPercentage: true,
      isMonetary: false,
      isHigherBetter: true,
    },
    [AI_ANALYTICS_METRIC.CONVERSIONS]: {
      metric: AI_ANALYTICS_METRIC.CONVERSIONS,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.CONVERSIONS],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.CONVERSIONS],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.CONVERSIONS],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.CONVERSIONS],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.CONVERSIONS],
      isPercentage: false,
      isMonetary: false,
      isHigherBetter: true,
    },
    [AI_ANALYTICS_METRIC.CONVERSION_RATE]: {
      metric: AI_ANALYTICS_METRIC.CONVERSION_RATE,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.CONVERSION_RATE],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.CONVERSION_RATE],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.CONVERSION_RATE],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.CONVERSION_RATE],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.CONVERSION_RATE],
      isPercentage: true,
      isMonetary: false,
      isHigherBetter: true,
    },
    [AI_ANALYTICS_METRIC.REVENUE]: {
      metric: AI_ANALYTICS_METRIC.REVENUE,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.REVENUE],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.REVENUE],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.REVENUE],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.REVENUE],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.REVENUE],
      isPercentage: false,
      isMonetary: true,
      isHigherBetter: true,
    },
    [AI_ANALYTICS_METRIC.AOV]: {
      metric: AI_ANALYTICS_METRIC.AOV,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.AOV],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.AOV],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.AOV],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.AOV],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.AOV],
      isPercentage: false,
      isMonetary: true,
      isHigherBetter: true,
    },
    [AI_ANALYTICS_METRIC.BOUNCE_RATE]: {
      metric: AI_ANALYTICS_METRIC.BOUNCE_RATE,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.BOUNCE_RATE],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.BOUNCE_RATE],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.BOUNCE_RATE],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.BOUNCE_RATE],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.BOUNCE_RATE],
      isPercentage: true,
      isMonetary: false,
      isHigherBetter: false,
    },
    [AI_ANALYTICS_METRIC.SESSION_DURATION]: {
      metric: AI_ANALYTICS_METRIC.SESSION_DURATION,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.SESSION_DURATION],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.SESSION_DURATION],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.SESSION_DURATION],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.SESSION_DURATION],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.SESSION_DURATION],
      isPercentage: false,
      isMonetary: false,
      isHigherBetter: true,
    },
    [AI_ANALYTICS_METRIC.RETENTION_RATE]: {
      metric: AI_ANALYTICS_METRIC.RETENTION_RATE,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.RETENTION_RATE],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.RETENTION_RATE],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.RETENTION_RATE],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.RETENTION_RATE],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.RETENTION_RATE],
      isPercentage: true,
      isMonetary: false,
      isHigherBetter: true,
    },
    [AI_ANALYTICS_METRIC.NPS]: {
      metric: AI_ANALYTICS_METRIC.NPS,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.NPS],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.NPS],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.NPS],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.NPS],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.NPS],
      isPercentage: false,
      isMonetary: false,
      isHigherBetter: true,
    },
    [AI_ANALYTICS_METRIC.CSAT]: {
      metric: AI_ANALYTICS_METRIC.CSAT,
      label: AI_ANALYTICS_METRIC_LABELS[AI_ANALYTICS_METRIC.CSAT],
      description: AI_ANALYTICS_METRIC_DESCRIPTIONS[AI_ANALYTICS_METRIC.CSAT],
      icon: AI_ANALYTICS_METRIC_ICONS[AI_ANALYTICS_METRIC.CSAT],
      format: AI_ANALYTICS_METRIC_FORMAT[AI_ANALYTICS_METRIC.CSAT],
      thresholds: AI_ANALYTICS_METRIC_THRESHOLDS[AI_ANALYTICS_METRIC.CSAT],
      isPercentage: false,
      isMonetary: false,
      isHigherBetter: true,
    },
  } as const;

/**
 * অ্যানালিটিক্স মেট্রিক ক্যাটাগরি
 */
export const AI_ANALYTICS_METRIC_CATEGORIES = {
  ENGAGEMENT: [
    AI_ANALYTICS_METRIC.IMPRESSIONS,
    AI_ANALYTICS_METRIC.CLICKS,
    AI_ANALYTICS_METRIC.CTR,
    AI_ANALYTICS_METRIC.SESSION_DURATION,
  ] as const,
  CONVERSION: [AI_ANALYTICS_METRIC.CONVERSIONS, AI_ANALYTICS_METRIC.CONVERSION_RATE] as const,
  REVENUE: [AI_ANALYTICS_METRIC.REVENUE, AI_ANALYTICS_METRIC.AOV] as const,
  RETENTION: [AI_ANALYTICS_METRIC.RETENTION_RATE, AI_ANALYTICS_METRIC.BOUNCE_RATE] as const,
  SATISFACTION: [AI_ANALYTICS_METRIC.NPS, AI_ANALYTICS_METRIC.CSAT] as const,
} as const;

/**
 * অ্যানালিটিক্স মেট্রিক ক্যাটাগরি লেবেল
 */
export const AI_ANALYTICS_METRIC_CATEGORY_LABELS = {
  ENGAGEMENT: 'Engagement',
  CONVERSION: 'Conversion',
  REVENUE: 'Revenue',
  RETENTION: 'Retention',
  SATISFACTION: 'Satisfaction',
} as const;
