/**
 * Search Analytics Constants
 * Analytics configurations for search
 */

export const SEARCH_ANALYTICS = {
  // Analytics Types
  TYPES: {
    QUERY: 'query',
    CLICK: 'click',
    CONVERSION: 'conversion',
    ABANDONMENT: 'abandonment',
    SESSION: 'session',
    USER: 'user',
    PERFORMANCE: 'performance',
    RELEVANCE: 'relevance',
    POPULARITY: 'popularity',
    TREND: 'trend',
    CUSTOM: 'custom',
  } as const,

  // Analytics Metrics
  METRICS: {
    QUERY_COUNT: 'query_count',
    UNIQUE_QUERIES: 'unique_queries',
    CLICK_THROUGH_RATE: 'click_through_rate',
    CONVERSION_RATE: 'conversion_rate',
    ABANDONMENT_RATE: 'abandonment_rate',
    AVERAGE_CLICK_POSITION: 'average_click_position',
    ZERO_RESULTS_RATE: 'zero_results_rate',
    QUERY_LENGTH_AVG: 'query_length_avg',
    SESSION_DURATION: 'session_duration',
    USER_RETENTION: 'user_retention',
    RELEVANCE_SCORE: 'relevance_score',
    RESPONSE_TIME: 'response_time',
    SUCCESS_RATE: 'success_rate',
  } as const,

  // Analytics Dimensions
  DIMENSIONS: {
    DATE: 'date',
    HOUR: 'hour',
    DEVICE: 'device',
    LOCATION: 'location',
    USER_TYPE: 'user_type',
    QUERY_TYPE: 'query_type',
    RESULT_TYPE: 'result_type',
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
  } as const,

  // Analytics Timeframes
  TIMEFRAMES: {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_90_DAYS: 'last_90_days',
    LAST_365_DAYS: 'last_365_days',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    THIS_QUARTER: 'this_quarter',
    LAST_QUARTER: 'last_quarter',
    THIS_YEAR: 'this_year',
    LAST_YEAR: 'last_year',
    CUSTOM: 'custom',
  } as const,

  // Analytics Aggregations
  AGGREGATIONS: {
    SUM: 'sum',
    AVG: 'avg',
    MIN: 'min',
    MAX: 'max',
    COUNT: 'count',
    PERCENTILE: 'percentile',
    RATE: 'rate',
    TREND: 'trend',
    CUMULATIVE: 'cumulative',
  } as const,

  // Analytics Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'query',
    DEFAULT_TIMEFRAME: 'last_30_days',
    DEFAULT_AGGREGATION: 'count',
    MAX_METRICS: 20,
    MAX_DIMENSIONS: 10,
    AUTO_REFRESH: true,
    REFRESH_INTERVAL: 300,
    DATA_RETENTION_DAYS: 365,
  } as const,

  // Analytics Limits
  LIMITS: {
    MAX_METRICS: 20,
    MAX_DIMENSIONS: 10,
    MAX_AGGREGATIONS: 10,
    MAX_TIME_RANGE_DAYS: 730,
    MAX_EXPORT_ROWS: 100000,
    MIN_REFRESH_INTERVAL: 60,
    MAX_REFRESH_INTERVAL: 3600,
  } as const,
} as const;

// Analytics Types
export type SearchAnalyticsType =
  (typeof SEARCH_ANALYTICS.TYPES)[keyof typeof SEARCH_ANALYTICS.TYPES];

// Analytics Metrics
export type SearchAnalyticsMetric =
  (typeof SEARCH_ANALYTICS.METRICS)[keyof typeof SEARCH_ANALYTICS.METRICS];

// Analytics Dimensions
export type SearchAnalyticsDimension =
  (typeof SEARCH_ANALYTICS.DIMENSIONS)[keyof typeof SEARCH_ANALYTICS.DIMENSIONS];

// Analytics Timeframes
export type SearchAnalyticsTimeframe =
  (typeof SEARCH_ANALYTICS.TIMEFRAMES)[keyof typeof SEARCH_ANALYTICS.TIMEFRAMES];

// Analytics Aggregations
export type SearchAnalyticsAggregation =
  (typeof SEARCH_ANALYTICS.AGGREGATIONS)[keyof typeof SEARCH_ANALYTICS.AGGREGATIONS];

// Analytics Defaults
export type SearchAnalyticsDefault =
  (typeof SEARCH_ANALYTICS.DEFAULTS)[keyof typeof SEARCH_ANALYTICS.DEFAULTS];

// Analytics Limits
export type SearchAnalyticsLimit =
  (typeof SEARCH_ANALYTICS.LIMITS)[keyof typeof SEARCH_ANALYTICS.LIMITS];

// Utility Functions
export function searchAnalyticsGetTypeLabel(type: SearchAnalyticsType): string {
  const labels: Record<SearchAnalyticsType, string> = {
    [SEARCH_ANALYTICS.TYPES.QUERY]: 'Query',
    [SEARCH_ANALYTICS.TYPES.CLICK]: 'Click',
    [SEARCH_ANALYTICS.TYPES.CONVERSION]: 'Conversion',
    [SEARCH_ANALYTICS.TYPES.ABANDONMENT]: 'Abandonment',
    [SEARCH_ANALYTICS.TYPES.SESSION]: 'Session',
    [SEARCH_ANALYTICS.TYPES.USER]: 'User',
    [SEARCH_ANALYTICS.TYPES.PERFORMANCE]: 'Performance',
    [SEARCH_ANALYTICS.TYPES.RELEVANCE]: 'Relevance',
    [SEARCH_ANALYTICS.TYPES.POPULARITY]: 'Popularity',
    [SEARCH_ANALYTICS.TYPES.TREND]: 'Trend',
    [SEARCH_ANALYTICS.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Analytics Type';
}

export function searchAnalyticsGetMetricLabel(metric: SearchAnalyticsMetric): string {
  const labels: Record<SearchAnalyticsMetric, string> = {
    [SEARCH_ANALYTICS.METRICS.QUERY_COUNT]: 'Query Count',
    [SEARCH_ANALYTICS.METRICS.UNIQUE_QUERIES]: 'Unique Queries',
    [SEARCH_ANALYTICS.METRICS.CLICK_THROUGH_RATE]: 'Click-Through Rate',
    [SEARCH_ANALYTICS.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [SEARCH_ANALYTICS.METRICS.ABANDONMENT_RATE]: 'Abandonment Rate',
    [SEARCH_ANALYTICS.METRICS.AVERAGE_CLICK_POSITION]: 'Average Click Position',
    [SEARCH_ANALYTICS.METRICS.ZERO_RESULTS_RATE]: 'Zero Results Rate',
    [SEARCH_ANALYTICS.METRICS.QUERY_LENGTH_AVG]: 'Average Query Length',
    [SEARCH_ANALYTICS.METRICS.SESSION_DURATION]: 'Session Duration',
    [SEARCH_ANALYTICS.METRICS.USER_RETENTION]: 'User Retention',
    [SEARCH_ANALYTICS.METRICS.RELEVANCE_SCORE]: 'Relevance Score',
    [SEARCH_ANALYTICS.METRICS.RESPONSE_TIME]: 'Response Time',
    [SEARCH_ANALYTICS.METRICS.SUCCESS_RATE]: 'Success Rate',
  };
  return labels[metric] || 'Unknown Metric';
}

export function searchAnalyticsGetDimensionLabel(dimension: SearchAnalyticsDimension): string {
  const labels: Record<SearchAnalyticsDimension, string> = {
    [SEARCH_ANALYTICS.DIMENSIONS.DATE]: 'Date',
    [SEARCH_ANALYTICS.DIMENSIONS.HOUR]: 'Hour',
    [SEARCH_ANALYTICS.DIMENSIONS.DEVICE]: 'Device',
    [SEARCH_ANALYTICS.DIMENSIONS.LOCATION]: 'Location',
    [SEARCH_ANALYTICS.DIMENSIONS.USER_TYPE]: 'User Type',
    [SEARCH_ANALYTICS.DIMENSIONS.QUERY_TYPE]: 'Query Type',
    [SEARCH_ANALYTICS.DIMENSIONS.RESULT_TYPE]: 'Result Type',
    [SEARCH_ANALYTICS.DIMENSIONS.CATEGORY]: 'Category',
    [SEARCH_ANALYTICS.DIMENSIONS.BRAND]: 'Brand',
    [SEARCH_ANALYTICS.DIMENSIONS.VENDOR]: 'Vendor',
  };
  return labels[dimension] || 'Unknown Dimension';
}

export function searchAnalyticsGetTimeframeLabel(timeframe: SearchAnalyticsTimeframe): string {
  const labels: Record<SearchAnalyticsTimeframe, string> = {
    [SEARCH_ANALYTICS.TIMEFRAMES.TODAY]: 'Today',
    [SEARCH_ANALYTICS.TIMEFRAMES.YESTERDAY]: 'Yesterday',
    [SEARCH_ANALYTICS.TIMEFRAMES.LAST_7_DAYS]: 'Last 7 Days',
    [SEARCH_ANALYTICS.TIMEFRAMES.LAST_30_DAYS]: 'Last 30 Days',
    [SEARCH_ANALYTICS.TIMEFRAMES.LAST_90_DAYS]: 'Last 90 Days',
    [SEARCH_ANALYTICS.TIMEFRAMES.LAST_365_DAYS]: 'Last 365 Days',
    [SEARCH_ANALYTICS.TIMEFRAMES.THIS_MONTH]: 'This Month',
    [SEARCH_ANALYTICS.TIMEFRAMES.LAST_MONTH]: 'Last Month',
    [SEARCH_ANALYTICS.TIMEFRAMES.THIS_QUARTER]: 'This Quarter',
    [SEARCH_ANALYTICS.TIMEFRAMES.LAST_QUARTER]: 'Last Quarter',
    [SEARCH_ANALYTICS.TIMEFRAMES.THIS_YEAR]: 'This Year',
    [SEARCH_ANALYTICS.TIMEFRAMES.LAST_YEAR]: 'Last Year',
    [SEARCH_ANALYTICS.TIMEFRAMES.CUSTOM]: 'Custom',
  };
  return labels[timeframe] || 'Unknown Timeframe';
}

export function searchAnalyticsGetAggregationLabel(
  aggregation: SearchAnalyticsAggregation
): string {
  const labels: Record<SearchAnalyticsAggregation, string> = {
    [SEARCH_ANALYTICS.AGGREGATIONS.SUM]: 'Sum',
    [SEARCH_ANALYTICS.AGGREGATIONS.AVG]: 'Average',
    [SEARCH_ANALYTICS.AGGREGATIONS.MIN]: 'Minimum',
    [SEARCH_ANALYTICS.AGGREGATIONS.MAX]: 'Maximum',
    [SEARCH_ANALYTICS.AGGREGATIONS.COUNT]: 'Count',
    [SEARCH_ANALYTICS.AGGREGATIONS.PERCENTILE]: 'Percentile',
    [SEARCH_ANALYTICS.AGGREGATIONS.RATE]: 'Rate',
    [SEARCH_ANALYTICS.AGGREGATIONS.TREND]: 'Trend',
    [SEARCH_ANALYTICS.AGGREGATIONS.CUMULATIVE]: 'Cumulative',
  };
  return labels[aggregation] || 'Unknown Aggregation';
}

export function searchAnalyticsGetDefaultTimeframe(): SearchAnalyticsTimeframe {
  return SEARCH_ANALYTICS.DEFAULTS.DEFAULT_TIMEFRAME;
}

export function searchAnalyticsGetMaxMetrics(): number {
  return SEARCH_ANALYTICS.DEFAULTS.MAX_METRICS;
}

export function searchAnalyticsGetDataRetentionDays(): number {
  return SEARCH_ANALYTICS.DEFAULTS.DATA_RETENTION_DAYS;
}
