/**
 * Notification Analytics Constants
 * Core notification analytics configuration and settings
 */

export const NOTIFICATIONANALYTICS = {
  // Analytics Types
  TYPES: {
    DELIVERY: 'delivery',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    PERFORMANCE: 'performance',
    USER_BEHAVIOR: 'user_behavior',
    CHANNEL: 'channel',
    TIME: 'time',
    GEOGRAPHIC: 'geographic',
    DEVICE: 'device',
    CONTENT: 'content',
    CUSTOM: 'custom',
  } as const,

  // Analytics Categories
  CATEGORIES: {
    DELIVERY: 'delivery',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    PERFORMANCE: 'performance',
    USER: 'user',
    CHANNEL: 'channel',
    CONTENT: 'content',
    CUSTOM: 'custom',
  } as const,

  // Analytics Metrics
  METRICS: {
    SENT: 'sent',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    BOUNCED: 'bounced',
    OPENED: 'opened',
    CLICKED: 'clicked',
    CONVERTED: 'converted',
    UNSUBSCRIBED: 'unsubscribed',
    COMPLAINED: 'complained',
    SPAM: 'spam',
    CTR: 'ctr',
    OPEN_RATE: 'open_rate',
    CONVERSION_RATE: 'conversion_rate',
    BOUNCE_RATE: 'bounce_rate',
    UNSUBSCRIBE_RATE: 'unsubscribe_rate',
    ENGAGEMENT_RATE: 'engagement_rate',
    REVENUE: 'revenue',
    ROI: 'roi',
    COST: 'cost',
    CPC: 'cpc',
    CPM: 'cpm',
    CPA: 'cpa',
  } as const,

  // Analytics Dimensions
  DIMENSIONS: {
    TIME: 'time',
    CHANNEL: 'channel',
    DEVICE: 'device',
    LOCATION: 'location',
    USER: 'user',
    CATEGORY: 'category',
    TYPE: 'type',
    PRIORITY: 'priority',
    STATUS: 'status',
    CUSTOM: 'custom',
  } as const,

  // Analytics Granularity
  GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    CUSTOM: 'custom',
  } as const,

  // Analytics Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'performance',
    DEFAULT_CATEGORY: 'delivery',
    DEFAULT_METRICS: ['sent', 'delivered', 'opened', 'clicked'],
    DEFAULT_DIMENSIONS: ['time', 'channel'],
    DEFAULT_GRANULARITY: 'daily',
    DEFAULT_TIMEZONE: 'Asia/Dhaka',
    DEFAULT_PAGE_SIZE: 100,
    MAX_PAGE_SIZE: 1000,
    DEFAULT_DATA_RETENTION_DAYS: 365,
    MAX_DATA_RETENTION_DAYS: 730,
    DEFAULT_REFRESH_INTERVAL: 3600,
    MIN_REFRESH_INTERVAL: 60,
    MAX_REFRESH_INTERVAL: 86400,
  } as const,

  // Analytics Limits
  LIMITS: {
    MIN_METRICS: 1,
    MAX_METRICS: 20,
    MIN_DIMENSIONS: 1,
    MAX_DIMENSIONS: 10,
    MAX_FILTERS: 20,
    MAX_DATE_RANGE_DAYS: 365,
    MAX_EXPORT_ROWS: 100000,
    MAX_CUSTOM_DIMENSIONS: 50,
    MAX_CUSTOM_METRICS: 50,
  } as const,

  // Analytics Errors
  ERRORS: {
    INVALID_METRIC: 'invalid_metric',
    INVALID_DIMENSION: 'invalid_dimension',
    INVALID_DATE_RANGE: 'invalid_date_range',
    DATA_NOT_FOUND: 'data_not_found',
    EXPORT_FAILED: 'export_failed',
    PERMISSION_DENIED: 'permission_denied',
    RATE_LIMIT: 'rate_limit',
    TIMEOUT: 'timeout',
    VALIDATION_ERROR: 'validation_error',
  } as const,
} as const;

// Analytics Types
export type NotificationAnalyticsType =
  (typeof NOTIFICATIONANALYTICS.TYPES)[keyof typeof NOTIFICATIONANALYTICS.TYPES];

// Analytics Categories
export type NotificationAnalyticsCategory =
  (typeof NOTIFICATIONANALYTICS.CATEGORIES)[keyof typeof NOTIFICATIONANALYTICS.CATEGORIES];

// Analytics Metrics
export type NotificationAnalyticsMetric =
  (typeof NOTIFICATIONANALYTICS.METRICS)[keyof typeof NOTIFICATIONANALYTICS.METRICS];

// Analytics Dimensions
export type NotificationAnalyticsDimension =
  (typeof NOTIFICATIONANALYTICS.DIMENSIONS)[keyof typeof NOTIFICATIONANALYTICS.DIMENSIONS];

// Analytics Granularity
export type NotificationAnalyticsGranularity =
  (typeof NOTIFICATIONANALYTICS.GRANULARITY)[keyof typeof NOTIFICATIONANALYTICS.GRANULARITY];

// Analytics Defaults
export type NotificationAnalyticsDefault =
  (typeof NOTIFICATIONANALYTICS.DEFAULTS)[keyof typeof NOTIFICATIONANALYTICS.DEFAULTS];

// Analytics Limits
export type NotificationAnalyticsLimit =
  (typeof NOTIFICATIONANALYTICS.LIMITS)[keyof typeof NOTIFICATIONANALYTICS.LIMITS];

// Analytics Errors
export type NotificationAnalyticsError =
  (typeof NOTIFICATIONANALYTICS.ERRORS)[keyof typeof NOTIFICATIONANALYTICS.ERRORS];

// Utility Functions
export function notificationanalyticsGetTypeLabel(type: NotificationAnalyticsType): string {
  const labels: Record<NotificationAnalyticsType, string> = {
    [NOTIFICATIONANALYTICS.TYPES.DELIVERY]: 'Delivery Analytics',
    [NOTIFICATIONANALYTICS.TYPES.ENGAGEMENT]: 'Engagement Analytics',
    [NOTIFICATIONANALYTICS.TYPES.CONVERSION]: 'Conversion Analytics',
    [NOTIFICATIONANALYTICS.TYPES.PERFORMANCE]: 'Performance Analytics',
    [NOTIFICATIONANALYTICS.TYPES.USER_BEHAVIOR]: 'User Behavior Analytics',
    [NOTIFICATIONANALYTICS.TYPES.CHANNEL]: 'Channel Analytics',
    [NOTIFICATIONANALYTICS.TYPES.TIME]: 'Time Analytics',
    [NOTIFICATIONANALYTICS.TYPES.GEOGRAPHIC]: 'Geographic Analytics',
    [NOTIFICATIONANALYTICS.TYPES.DEVICE]: 'Device Analytics',
    [NOTIFICATIONANALYTICS.TYPES.CONTENT]: 'Content Analytics',
    [NOTIFICATIONANALYTICS.TYPES.CUSTOM]: 'Custom Analytics',
  };
  return labels[type] || 'Unknown Analytics Type';
}

export function notificationanalyticsGetCategoryLabel(
  category: NotificationAnalyticsCategory
): string {
  const labels: Record<NotificationAnalyticsCategory, string> = {
    [NOTIFICATIONANALYTICS.CATEGORIES.DELIVERY]: 'Delivery',
    [NOTIFICATIONANALYTICS.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [NOTIFICATIONANALYTICS.CATEGORIES.CONVERSION]: 'Conversion',
    [NOTIFICATIONANALYTICS.CATEGORIES.PERFORMANCE]: 'Performance',
    [NOTIFICATIONANALYTICS.CATEGORIES.USER]: 'User',
    [NOTIFICATIONANALYTICS.CATEGORIES.CHANNEL]: 'Channel',
    [NOTIFICATIONANALYTICS.CATEGORIES.CONTENT]: 'Content',
    [NOTIFICATIONANALYTICS.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationanalyticsGetMetricLabel(metric: NotificationAnalyticsMetric): string {
  const labels: Record<NotificationAnalyticsMetric, string> = {
    [NOTIFICATIONANALYTICS.METRICS.SENT]: 'Sent',
    [NOTIFICATIONANALYTICS.METRICS.DELIVERED]: 'Delivered',
    [NOTIFICATIONANALYTICS.METRICS.FAILED]: 'Failed',
    [NOTIFICATIONANALYTICS.METRICS.BOUNCED]: 'Bounced',
    [NOTIFICATIONANALYTICS.METRICS.OPENED]: 'Opened',
    [NOTIFICATIONANALYTICS.METRICS.CLICKED]: 'Clicked',
    [NOTIFICATIONANALYTICS.METRICS.CONVERTED]: 'Converted',
    [NOTIFICATIONANALYTICS.METRICS.UNSUBSCRIBED]: 'Unsubscribed',
    [NOTIFICATIONANALYTICS.METRICS.COMPLAINED]: 'Complained',
    [NOTIFICATIONANALYTICS.METRICS.SPAM]: 'Spam',
    [NOTIFICATIONANALYTICS.METRICS.CTR]: 'Click-Through Rate',
    [NOTIFICATIONANALYTICS.METRICS.OPEN_RATE]: 'Open Rate',
    [NOTIFICATIONANALYTICS.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [NOTIFICATIONANALYTICS.METRICS.BOUNCE_RATE]: 'Bounce Rate',
    [NOTIFICATIONANALYTICS.METRICS.UNSUBSCRIBE_RATE]: 'Unsubscribe Rate',
    [NOTIFICATIONANALYTICS.METRICS.ENGAGEMENT_RATE]: 'Engagement Rate',
    [NOTIFICATIONANALYTICS.METRICS.REVENUE]: 'Revenue',
    [NOTIFICATIONANALYTICS.METRICS.ROI]: 'ROI',
    [NOTIFICATIONANALYTICS.METRICS.COST]: 'Cost',
    [NOTIFICATIONANALYTICS.METRICS.CPC]: 'Cost Per Click',
    [NOTIFICATIONANALYTICS.METRICS.CPM]: 'Cost Per Mille',
    [NOTIFICATIONANALYTICS.METRICS.CPA]: 'Cost Per Acquisition',
  };
  return labels[metric] || 'Unknown Metric';
}

export function notificationanalyticsGetDimensionLabel(
  dimension: NotificationAnalyticsDimension
): string {
  const labels: Record<NotificationAnalyticsDimension, string> = {
    [NOTIFICATIONANALYTICS.DIMENSIONS.TIME]: 'Time',
    [NOTIFICATIONANALYTICS.DIMENSIONS.CHANNEL]: 'Channel',
    [NOTIFICATIONANALYTICS.DIMENSIONS.DEVICE]: 'Device',
    [NOTIFICATIONANALYTICS.DIMENSIONS.LOCATION]: 'Location',
    [NOTIFICATIONANALYTICS.DIMENSIONS.USER]: 'User',
    [NOTIFICATIONANALYTICS.DIMENSIONS.CATEGORY]: 'Category',
    [NOTIFICATIONANALYTICS.DIMENSIONS.TYPE]: 'Type',
    [NOTIFICATIONANALYTICS.DIMENSIONS.PRIORITY]: 'Priority',
    [NOTIFICATIONANALYTICS.DIMENSIONS.STATUS]: 'Status',
    [NOTIFICATIONANALYTICS.DIMENSIONS.CUSTOM]: 'Custom',
  };
  return labels[dimension] || 'Unknown Dimension';
}

export function notificationanalyticsGetGranularityLabel(
  granularity: NotificationAnalyticsGranularity
): string {
  const labels: Record<NotificationAnalyticsGranularity, string> = {
    [NOTIFICATIONANALYTICS.GRANULARITY.HOURLY]: 'Hourly',
    [NOTIFICATIONANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [NOTIFICATIONANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [NOTIFICATIONANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [NOTIFICATIONANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [NOTIFICATIONANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
    [NOTIFICATIONANALYTICS.GRANULARITY.CUSTOM]: 'Custom',
  };
  return labels[granularity] || 'Unknown Granularity';
}

export function notificationanalyticsGetErrorLabel(error: NotificationAnalyticsError): string {
  const labels: Record<NotificationAnalyticsError, string> = {
    [NOTIFICATIONANALYTICS.ERRORS.INVALID_METRIC]: 'Invalid Metric',
    [NOTIFICATIONANALYTICS.ERRORS.INVALID_DIMENSION]: 'Invalid Dimension',
    [NOTIFICATIONANALYTICS.ERRORS.INVALID_DATE_RANGE]: 'Invalid Date Range',
    [NOTIFICATIONANALYTICS.ERRORS.DATA_NOT_FOUND]: 'Data Not Found',
    [NOTIFICATIONANALYTICS.ERRORS.EXPORT_FAILED]: 'Export Failed',
    [NOTIFICATIONANALYTICS.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [NOTIFICATIONANALYTICS.ERRORS.RATE_LIMIT]: 'Rate Limit',
    [NOTIFICATIONANALYTICS.ERRORS.TIMEOUT]: 'Timeout',
    [NOTIFICATIONANALYTICS.ERRORS.VALIDATION_ERROR]: 'Validation Error',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationanalyticsGetDefaultMetrics(): string[] {
  return [...NOTIFICATIONANALYTICS.DEFAULTS.DEFAULT_METRICS];
}

export function notificationanalyticsIsDeliveryMetric(
  metric: NotificationAnalyticsMetric
): boolean {
  const deliveryMetrics: NotificationAnalyticsMetric[] = [
    NOTIFICATIONANALYTICS.METRICS.SENT,
    NOTIFICATIONANALYTICS.METRICS.DELIVERED,
    NOTIFICATIONANALYTICS.METRICS.FAILED,
    NOTIFICATIONANALYTICS.METRICS.BOUNCED,
  ];
  return deliveryMetrics.includes(metric);
}

export function notificationanalyticsIsEngagementMetric(
  metric: NotificationAnalyticsMetric
): boolean {
  const engagementMetrics: NotificationAnalyticsMetric[] = [
    NOTIFICATIONANALYTICS.METRICS.OPENED,
    NOTIFICATIONANALYTICS.METRICS.CLICKED,
    NOTIFICATIONANALYTICS.METRICS.OPEN_RATE,
    NOTIFICATIONANALYTICS.METRICS.CTR,
    NOTIFICATIONANALYTICS.METRICS.ENGAGEMENT_RATE,
  ];
  return engagementMetrics.includes(metric);
}

export function notificationanalyticsIsConversionMetric(
  metric: NotificationAnalyticsMetric
): boolean {
  const conversionMetrics: NotificationAnalyticsMetric[] = [
    NOTIFICATIONANALYTICS.METRICS.CONVERTED,
    NOTIFICATIONANALYTICS.METRICS.CONVERSION_RATE,
    NOTIFICATIONANALYTICS.METRICS.REVENUE,
    NOTIFICATIONANALYTICS.METRICS.ROI,
    NOTIFICATIONANALYTICS.METRICS.CPA,
  ];
  return conversionMetrics.includes(metric);
}

export function notificationanalyticsGetDefaultDataRetentionDays(): number {
  return NOTIFICATIONANALYTICS.DEFAULTS.DEFAULT_DATA_RETENTION_DAYS;
}

export function notificationanalyticsGetDefaultPageSize(): number {
  return NOTIFICATIONANALYTICS.DEFAULTS.DEFAULT_PAGE_SIZE;
}
