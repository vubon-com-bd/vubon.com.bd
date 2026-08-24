/**
 * Notification Analytics Type Constants
 * Type definitions and classifications for notification analytics
 */

export const NOTIFICATIONANALYTICS_TYPE = {
  // Analytics Categories
  CATEGORIES: {
    DELIVERY: 'delivery',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    PERFORMANCE: 'performance',
    USER: 'user',
    CHANNEL: 'channel',
    CONTENT: 'content',
    TIME: 'time',
    DEVICE: 'device',
    GEOGRAPHIC: 'geographic',
    CUSTOM: 'custom',
  } as const,

  // Analytics Sub-Types
  SUB_TYPES: {
    // Delivery
    DELIVERY_RATE: 'delivery_rate',
    BOUNCE_RATE: 'bounce_rate',
    FAILURE_RATE: 'failure_rate',

    // Engagement
    OPEN_RATE: 'open_rate',
    CLICK_RATE: 'click_rate',
    CTR: 'ctr',
    ENGAGEMENT_RATE: 'engagement_rate',

    // Conversion
    CONVERSION_RATE: 'conversion_rate',
    REVENUE_PER_NOTIFICATION: 'revenue_per_notification',
    ROI: 'roi',

    // Performance
    RESPONSE_TIME: 'response_time',
    THROUGHPUT: 'throughput',
    LATENCY: 'latency',

    // User
    USER_ENGAGEMENT: 'user_engagement',
    USER_RETENTION: 'user_retention',
    USER_CHURN: 'user_churn',

    // Channel
    CHANNEL_PERFORMANCE: 'channel_performance',
    CHANNEL_EFFECTIVENESS: 'channel_effectiveness',

    // Content
    CONTENT_PERFORMANCE: 'content_performance',
    CONTENT_ENGAGEMENT: 'content_engagement',
  } as const,

  // Analytics Methods
  METHODS: {
    DESCRIPTIVE: 'descriptive',
    DIAGNOSTIC: 'diagnostic',
    PREDICTIVE: 'predictive',
    PRESCRIPTIVE: 'prescriptive',
    EXPLORATORY: 'exploratory',
    CONFIRMATORY: 'confirmatory',
  } as const,

  // Analytics Visualizations
  VISUALIZATIONS: {
    LINE_CHART: 'line_chart',
    BAR_CHART: 'bar_chart',
    PIE_CHART: 'pie_chart',
    DOUGHNUT_CHART: 'doughnut_chart',
    AREA_CHART: 'area_chart',
    SCATTER_PLOT: 'scatter_plot',
    HEATMAP: 'heatmap',
    TABLE: 'table',
    METRIC_CARD: 'metric_card',
    KPI_CARD: 'kpi_card',
    FUNNEL: 'funnel',
    SANKEY: 'sankey',
  } as const,

  // Analytics Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,
} as const;

// Analytics Categories
export type NotificationAnalyticsCategoryType =
  (typeof NOTIFICATIONANALYTICS_TYPE.CATEGORIES)[keyof typeof NOTIFICATIONANALYTICS_TYPE.CATEGORIES];

// Analytics Sub-Types
export type NotificationAnalyticsSubType =
  (typeof NOTIFICATIONANALYTICS_TYPE.SUB_TYPES)[keyof typeof NOTIFICATIONANALYTICS_TYPE.SUB_TYPES];

// Analytics Methods
export type NotificationAnalyticsMethod =
  (typeof NOTIFICATIONANALYTICS_TYPE.METHODS)[keyof typeof NOTIFICATIONANALYTICS_TYPE.METHODS];

// Analytics Visualizations
export type NotificationAnalyticsVisualization =
  (typeof NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS)[keyof typeof NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS];

// Analytics Complexity
export type NotificationAnalyticsComplexity =
  (typeof NOTIFICATIONANALYTICS_TYPE.COMPLEXITY)[keyof typeof NOTIFICATIONANALYTICS_TYPE.COMPLEXITY];

// Utility Functions
export function notificationanalyticsGetCategoryLabel(
  category: NotificationAnalyticsCategoryType
): string {
  const labels: Record<NotificationAnalyticsCategoryType, string> = {
    [NOTIFICATIONANALYTICS_TYPE.CATEGORIES.DELIVERY]: 'Delivery',
    [NOTIFICATIONANALYTICS_TYPE.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [NOTIFICATIONANALYTICS_TYPE.CATEGORIES.CONVERSION]: 'Conversion',
    [NOTIFICATIONANALYTICS_TYPE.CATEGORIES.PERFORMANCE]: 'Performance',
    [NOTIFICATIONANALYTICS_TYPE.CATEGORIES.USER]: 'User',
    [NOTIFICATIONANALYTICS_TYPE.CATEGORIES.CHANNEL]: 'Channel',
    [NOTIFICATIONANALYTICS_TYPE.CATEGORIES.CONTENT]: 'Content',
    [NOTIFICATIONANALYTICS_TYPE.CATEGORIES.TIME]: 'Time',
    [NOTIFICATIONANALYTICS_TYPE.CATEGORIES.DEVICE]: 'Device',
    [NOTIFICATIONANALYTICS_TYPE.CATEGORIES.GEOGRAPHIC]: 'Geographic',
    [NOTIFICATIONANALYTICS_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationanalyticsGetSubTypeLabel(
  subType: NotificationAnalyticsSubType
): string {
  const labels: Record<NotificationAnalyticsSubType, string> = {
    // Delivery
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.DELIVERY_RATE]: 'Delivery Rate',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.BOUNCE_RATE]: 'Bounce Rate',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.FAILURE_RATE]: 'Failure Rate',

    // Engagement
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.OPEN_RATE]: 'Open Rate',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.CLICK_RATE]: 'Click Rate',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.CTR]: 'Click-Through Rate',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.ENGAGEMENT_RATE]: 'Engagement Rate',

    // Conversion
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.CONVERSION_RATE]: 'Conversion Rate',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.REVENUE_PER_NOTIFICATION]: 'Revenue Per Notification',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.ROI]: 'ROI',

    // Performance
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.RESPONSE_TIME]: 'Response Time',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.THROUGHPUT]: 'Throughput',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.LATENCY]: 'Latency',

    // User
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.USER_ENGAGEMENT]: 'User Engagement',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.USER_RETENTION]: 'User Retention',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.USER_CHURN]: 'User Churn',

    // Channel
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.CHANNEL_PERFORMANCE]: 'Channel Performance',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.CHANNEL_EFFECTIVENESS]: 'Channel Effectiveness',

    // Content
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.CONTENT_PERFORMANCE]: 'Content Performance',
    [NOTIFICATIONANALYTICS_TYPE.SUB_TYPES.CONTENT_ENGAGEMENT]: 'Content Engagement',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function notificationanalyticsGetMethodLabel(method: NotificationAnalyticsMethod): string {
  const labels: Record<NotificationAnalyticsMethod, string> = {
    [NOTIFICATIONANALYTICS_TYPE.METHODS.DESCRIPTIVE]: 'Descriptive',
    [NOTIFICATIONANALYTICS_TYPE.METHODS.DIAGNOSTIC]: 'Diagnostic',
    [NOTIFICATIONANALYTICS_TYPE.METHODS.PREDICTIVE]: 'Predictive',
    [NOTIFICATIONANALYTICS_TYPE.METHODS.PRESCRIPTIVE]: 'Prescriptive',
    [NOTIFICATIONANALYTICS_TYPE.METHODS.EXPLORATORY]: 'Exploratory',
    [NOTIFICATIONANALYTICS_TYPE.METHODS.CONFIRMATORY]: 'Confirmatory',
  };
  return labels[method] || 'Unknown Method';
}

export function notificationanalyticsGetVisualizationLabel(
  visualization: NotificationAnalyticsVisualization
): string {
  const labels: Record<NotificationAnalyticsVisualization, string> = {
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.LINE_CHART]: 'Line Chart',
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.BAR_CHART]: 'Bar Chart',
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.PIE_CHART]: 'Pie Chart',
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.DOUGHNUT_CHART]: 'Doughnut Chart',
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.AREA_CHART]: 'Area Chart',
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.SCATTER_PLOT]: 'Scatter Plot',
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.HEATMAP]: 'Heatmap',
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.TABLE]: 'Table',
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.METRIC_CARD]: 'Metric Card',
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.KPI_CARD]: 'KPI Card',
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.FUNNEL]: 'Funnel',
    [NOTIFICATIONANALYTICS_TYPE.VISUALIZATIONS.SANKEY]: 'Sankey',
  };
  return labels[visualization] || 'Unknown Visualization';
}

export function notificationanalyticsGetComplexityLabel(
  complexity: NotificationAnalyticsComplexity
): string {
  const labels: Record<NotificationAnalyticsComplexity, string> = {
    [NOTIFICATIONANALYTICS_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [NOTIFICATIONANALYTICS_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [NOTIFICATIONANALYTICS_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [NOTIFICATIONANALYTICS_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function notificationanalyticsIsDeliveryCategory(
  category: NotificationAnalyticsCategoryType
): boolean {
  return category === NOTIFICATIONANALYTICS_TYPE.CATEGORIES.DELIVERY;
}

export function notificationanalyticsIsEngagementCategory(
  category: NotificationAnalyticsCategoryType
): boolean {
  return category === NOTIFICATIONANALYTICS_TYPE.CATEGORIES.ENGAGEMENT;
}

export function notificationanalyticsIsConversionCategory(
  category: NotificationAnalyticsCategoryType
): boolean {
  return category === NOTIFICATIONANALYTICS_TYPE.CATEGORIES.CONVERSION;
}

export function notificationanalyticsIsPerformanceCategory(
  category: NotificationAnalyticsCategoryType
): boolean {
  return category === NOTIFICATIONANALYTICS_TYPE.CATEGORIES.PERFORMANCE;
}
