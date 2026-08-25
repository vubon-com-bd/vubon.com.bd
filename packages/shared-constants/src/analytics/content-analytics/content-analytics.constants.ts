/**
 * Content Analytics Constants
 * Configuration for content analytics, metrics, and reporting
 */

export const CONTENT_ANALYTICS = {
  // Analytics Types
  TYPES: {
    PAGE_VIEWS: 'page_views',
    UNIQUE_VISITORS: 'unique_visitors',
    BOUNCE_RATE: 'bounce_rate',
    AVERAGE_TIME: 'average_time',
    SOCIAL_SHARES: 'social_shares',
    COMMENTS: 'comments',
    LIKES: 'likes',
    RATINGS: 'ratings',
    DOWNLOADS: 'downloads',
    CONVERSIONS: 'conversions',
    ENGAGEMENT: 'engagement',
    RETENTION: 'retention',
    CUSTOM: 'custom',
  } as const,

  // Analytics Metrics
  METRICS: {
    VIEWS: 'views',
    VISITORS: 'visitors',
    UNIQUE_VISITORS: 'unique_visitors',
    PAGE_VIEWS: 'page_views',
    SESSIONS: 'sessions',
    BOUNCE: 'bounce',
    BOUNCE_RATE: 'bounce_rate',
    AVERAGE_SESSION_DURATION: 'average_session_duration',
    AVERAGE_TIME_ON_PAGE: 'average_time_on_page',
    EXIT_RATE: 'exit_rate',
    CLICK_THROUGH_RATE: 'click_through_rate',
    CONVERSION_RATE: 'conversion_rate',
    ENGAGEMENT_RATE: 'engagement_rate',
    SHARE_RATE: 'share_rate',
    COMMENT_RATE: 'comment_rate',
    LIKE_RATE: 'like_rate',
    DOWNLOAD_RATE: 'download_rate',
    RETENTION_RATE: 'retention_rate',
    CHURN_RATE: 'churn_rate',
    GROWTH_RATE: 'growth_rate',
  } as const,

  // Analytics Dimensions
  DIMENSIONS: {
    DATE: 'date',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
    CONTENT_TYPE: 'content_type',
    CONTENT_CATEGORY: 'content_category',
    CONTENT_TAG: 'content_tag',
    AUTHOR: 'author',
    SOURCE: 'source',
    MEDIUM: 'medium',
    CAMPAIGN: 'campaign',
    DEVICE: 'device',
    BROWSER: 'browser',
    OS: 'os',
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',
    REFERRER: 'referrer',
    UTM_SOURCE: 'utm_source',
    UTM_MEDIUM: 'utm_medium',
    UTM_CAMPAIGN: 'utm_campaign',
    UTM_TERM: 'utm_term',
    UTM_CONTENT: 'utm_content',
  } as const,

  // Analytics Timeframes
  TIMEFRAMES: {
    LAST_HOUR: 'last_hour',
    LAST_6_HOURS: 'last_6_hours',
    LAST_12_HOURS: 'last_12_hours',
    LAST_24_HOURS: 'last_24_hours',
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_90_DAYS: 'last_90_days',
    LAST_180_DAYS: 'last_180_days',
    LAST_365_DAYS: 'last_365_days',
    THIS_WEEK: 'this_week',
    THIS_MONTH: 'this_month',
    THIS_QUARTER: 'this_quarter',
    THIS_YEAR: 'this_year',
    CUSTOM: 'custom',
  } as const,

  // Analytics Aggregations
  AGGREGATIONS: {
    SUM: 'sum',
    AVG: 'avg',
    MIN: 'min',
    MAX: 'max',
    COUNT: 'count',
    DISTINCT: 'distinct',
    MEDIAN: 'median',
    PERCENTILE: 'percentile',
    STD_DEV: 'std_dev',
    VARIANCE: 'variance',
  } as const,

  // Analytics Comparison Types
  COMPARISON_TYPES: {
    PERIOD_OVER_PERIOD: 'period_over_period',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    DAY_OVER_DAY: 'day_over_day',
    VS_TARGET: 'vs_target',
    VS_BENCHMARK: 'vs_benchmark',
  } as const,

  // Analytics Defaults
  DEFAULTS: {
    TIMEFRAME: 'last_30_days',
    AGGREGATION: 'sum',
    LIMIT: 100,
    OFFSET: 0,
    SORT_BY: 'date',
    SORT_ORDER: 'desc',
  } as const,

  // Analytics Limits
  LIMITS: {
    MAX_RESULTS: 10000,
    MAX_DIMENSIONS: 10,
    MAX_METRICS: 20,
    MAX_FILTERS: 10,
    MAX_COMPARISONS: 5,
  } as const,

  // Analytics Data Sources
  DATA_SOURCES: {
    DATABASE: 'database',
    CACHE: 'cache',
    REAL_TIME: 'real_time',
    EXTERNAL: 'external',
    API: 'api',
  } as const,

  // Analytics Export Formats
  EXPORT_FORMATS: {
    CSV: 'csv',
    JSON: 'json',
    XML: 'xml',
    EXCEL: 'excel',
    PDF: 'pdf',
    HTML: 'html',
  } as const,
} as const;

// Analytics Types
export type ContentAnalyticsType =
  (typeof CONTENT_ANALYTICS.TYPES)[keyof typeof CONTENT_ANALYTICS.TYPES];

// Analytics Metrics
export type ContentAnalyticsMetric =
  (typeof CONTENT_ANALYTICS.METRICS)[keyof typeof CONTENT_ANALYTICS.METRICS];

// Analytics Dimensions
export type ContentAnalyticsDimension =
  (typeof CONTENT_ANALYTICS.DIMENSIONS)[keyof typeof CONTENT_ANALYTICS.DIMENSIONS];

// Analytics Timeframes
export type ContentAnalyticsTimeframe =
  (typeof CONTENT_ANALYTICS.TIMEFRAMES)[keyof typeof CONTENT_ANALYTICS.TIMEFRAMES];

// Analytics Aggregations
export type ContentAnalyticsAggregation =
  (typeof CONTENT_ANALYTICS.AGGREGATIONS)[keyof typeof CONTENT_ANALYTICS.AGGREGATIONS];

// Analytics Comparison Types
export type ContentAnalyticsComparisonType =
  (typeof CONTENT_ANALYTICS.COMPARISON_TYPES)[keyof typeof CONTENT_ANALYTICS.COMPARISON_TYPES];

// Analytics Data Sources
export type ContentAnalyticsDataSource =
  (typeof CONTENT_ANALYTICS.DATA_SOURCES)[keyof typeof CONTENT_ANALYTICS.DATA_SOURCES];

// Analytics Export Formats
export type ContentAnalyticsExportFormat =
  (typeof CONTENT_ANALYTICS.EXPORT_FORMATS)[keyof typeof CONTENT_ANALYTICS.EXPORT_FORMATS];

// Utility Functions
export function contentAnalyticsGetTypeLabel(type: ContentAnalyticsType): string {
  const labels: Record<ContentAnalyticsType, string> = {
    [CONTENT_ANALYTICS.TYPES.PAGE_VIEWS]: 'Page Views',
    [CONTENT_ANALYTICS.TYPES.UNIQUE_VISITORS]: 'Unique Visitors',
    [CONTENT_ANALYTICS.TYPES.BOUNCE_RATE]: 'Bounce Rate',
    [CONTENT_ANALYTICS.TYPES.AVERAGE_TIME]: 'Average Time',
    [CONTENT_ANALYTICS.TYPES.SOCIAL_SHARES]: 'Social Shares',
    [CONTENT_ANALYTICS.TYPES.COMMENTS]: 'Comments',
    [CONTENT_ANALYTICS.TYPES.LIKES]: 'Likes',
    [CONTENT_ANALYTICS.TYPES.RATINGS]: 'Ratings',
    [CONTENT_ANALYTICS.TYPES.DOWNLOADS]: 'Downloads',
    [CONTENT_ANALYTICS.TYPES.CONVERSIONS]: 'Conversions',
    [CONTENT_ANALYTICS.TYPES.ENGAGEMENT]: 'Engagement',
    [CONTENT_ANALYTICS.TYPES.RETENTION]: 'Retention',
    [CONTENT_ANALYTICS.TYPES.CUSTOM]: 'Custom Analytics',
  };
  return labels[type] || 'Unknown Analytics Type';
}

export function contentAnalyticsGetMetricLabel(metric: ContentAnalyticsMetric): string {
  const labels: Record<ContentAnalyticsMetric, string> = {
    [CONTENT_ANALYTICS.METRICS.VIEWS]: 'Views',
    [CONTENT_ANALYTICS.METRICS.VISITORS]: 'Visitors',
    [CONTENT_ANALYTICS.METRICS.UNIQUE_VISITORS]: 'Unique Visitors',
    [CONTENT_ANALYTICS.METRICS.PAGE_VIEWS]: 'Page Views',
    [CONTENT_ANALYTICS.METRICS.SESSIONS]: 'Sessions',
    [CONTENT_ANALYTICS.METRICS.BOUNCE]: 'Bounces',
    [CONTENT_ANALYTICS.METRICS.BOUNCE_RATE]: 'Bounce Rate',
    [CONTENT_ANALYTICS.METRICS.AVERAGE_SESSION_DURATION]: 'Avg Session Duration',
    [CONTENT_ANALYTICS.METRICS.AVERAGE_TIME_ON_PAGE]: 'Avg Time on Page',
    [CONTENT_ANALYTICS.METRICS.EXIT_RATE]: 'Exit Rate',
    [CONTENT_ANALYTICS.METRICS.CLICK_THROUGH_RATE]: 'Click-Through Rate',
    [CONTENT_ANALYTICS.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [CONTENT_ANALYTICS.METRICS.ENGAGEMENT_RATE]: 'Engagement Rate',
    [CONTENT_ANALYTICS.METRICS.SHARE_RATE]: 'Share Rate',
    [CONTENT_ANALYTICS.METRICS.COMMENT_RATE]: 'Comment Rate',
    [CONTENT_ANALYTICS.METRICS.LIKE_RATE]: 'Like Rate',
    [CONTENT_ANALYTICS.METRICS.DOWNLOAD_RATE]: 'Download Rate',
    [CONTENT_ANALYTICS.METRICS.RETENTION_RATE]: 'Retention Rate',
    [CONTENT_ANALYTICS.METRICS.CHURN_RATE]: 'Churn Rate',
    [CONTENT_ANALYTICS.METRICS.GROWTH_RATE]: 'Growth Rate',
  };
  return labels[metric] || 'Unknown Metric';
}

export function contentAnalyticsGetDimensionLabel(dimension: ContentAnalyticsDimension): string {
  const labels: Record<ContentAnalyticsDimension, string> = {
    [CONTENT_ANALYTICS.DIMENSIONS.DATE]: 'Date',
    [CONTENT_ANALYTICS.DIMENSIONS.HOUR]: 'Hour',
    [CONTENT_ANALYTICS.DIMENSIONS.DAY]: 'Day',
    [CONTENT_ANALYTICS.DIMENSIONS.WEEK]: 'Week',
    [CONTENT_ANALYTICS.DIMENSIONS.MONTH]: 'Month',
    [CONTENT_ANALYTICS.DIMENSIONS.QUARTER]: 'Quarter',
    [CONTENT_ANALYTICS.DIMENSIONS.YEAR]: 'Year',
    [CONTENT_ANALYTICS.DIMENSIONS.CONTENT_TYPE]: 'Content Type',
    [CONTENT_ANALYTICS.DIMENSIONS.CONTENT_CATEGORY]: 'Content Category',
    [CONTENT_ANALYTICS.DIMENSIONS.CONTENT_TAG]: 'Content Tag',
    [CONTENT_ANALYTICS.DIMENSIONS.AUTHOR]: 'Author',
    [CONTENT_ANALYTICS.DIMENSIONS.SOURCE]: 'Source',
    [CONTENT_ANALYTICS.DIMENSIONS.MEDIUM]: 'Medium',
    [CONTENT_ANALYTICS.DIMENSIONS.CAMPAIGN]: 'Campaign',
    [CONTENT_ANALYTICS.DIMENSIONS.DEVICE]: 'Device',
    [CONTENT_ANALYTICS.DIMENSIONS.BROWSER]: 'Browser',
    [CONTENT_ANALYTICS.DIMENSIONS.OS]: 'Operating System',
    [CONTENT_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [CONTENT_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [CONTENT_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [CONTENT_ANALYTICS.DIMENSIONS.REFERRER]: 'Referrer',
    [CONTENT_ANALYTICS.DIMENSIONS.UTM_SOURCE]: 'UTM Source',
    [CONTENT_ANALYTICS.DIMENSIONS.UTM_MEDIUM]: 'UTM Medium',
    [CONTENT_ANALYTICS.DIMENSIONS.UTM_CAMPAIGN]: 'UTM Campaign',
    [CONTENT_ANALYTICS.DIMENSIONS.UTM_TERM]: 'UTM Term',
    [CONTENT_ANALYTICS.DIMENSIONS.UTM_CONTENT]: 'UTM Content',
  };
  return labels[dimension] || 'Unknown Dimension';
}

export function contentAnalyticsGetTimeframeLabel(timeframe: ContentAnalyticsTimeframe): string {
  const labels: Record<ContentAnalyticsTimeframe, string> = {
    [CONTENT_ANALYTICS.TIMEFRAMES.LAST_HOUR]: 'Last Hour',
    [CONTENT_ANALYTICS.TIMEFRAMES.LAST_6_HOURS]: 'Last 6 Hours',
    [CONTENT_ANALYTICS.TIMEFRAMES.LAST_12_HOURS]: 'Last 12 Hours',
    [CONTENT_ANALYTICS.TIMEFRAMES.LAST_24_HOURS]: 'Last 24 Hours',
    [CONTENT_ANALYTICS.TIMEFRAMES.LAST_7_DAYS]: 'Last 7 Days',
    [CONTENT_ANALYTICS.TIMEFRAMES.LAST_30_DAYS]: 'Last 30 Days',
    [CONTENT_ANALYTICS.TIMEFRAMES.LAST_90_DAYS]: 'Last 90 Days',
    [CONTENT_ANALYTICS.TIMEFRAMES.LAST_180_DAYS]: 'Last 180 Days',
    [CONTENT_ANALYTICS.TIMEFRAMES.LAST_365_DAYS]: 'Last 365 Days',
    [CONTENT_ANALYTICS.TIMEFRAMES.THIS_WEEK]: 'This Week',
    [CONTENT_ANALYTICS.TIMEFRAMES.THIS_MONTH]: 'This Month',
    [CONTENT_ANALYTICS.TIMEFRAMES.THIS_QUARTER]: 'This Quarter',
    [CONTENT_ANALYTICS.TIMEFRAMES.THIS_YEAR]: 'This Year',
    [CONTENT_ANALYTICS.TIMEFRAMES.CUSTOM]: 'Custom Range',
  };
  return labels[timeframe] || 'Unknown Timeframe';
}

export function contentAnalyticsGetAggregationLabel(
  aggregation: ContentAnalyticsAggregation
): string {
  const labels: Record<ContentAnalyticsAggregation, string> = {
    [CONTENT_ANALYTICS.AGGREGATIONS.SUM]: 'Sum',
    [CONTENT_ANALYTICS.AGGREGATIONS.AVG]: 'Average',
    [CONTENT_ANALYTICS.AGGREGATIONS.MIN]: 'Minimum',
    [CONTENT_ANALYTICS.AGGREGATIONS.MAX]: 'Maximum',
    [CONTENT_ANALYTICS.AGGREGATIONS.COUNT]: 'Count',
    [CONTENT_ANALYTICS.AGGREGATIONS.DISTINCT]: 'Distinct Count',
    [CONTENT_ANALYTICS.AGGREGATIONS.MEDIAN]: 'Median',
    [CONTENT_ANALYTICS.AGGREGATIONS.PERCENTILE]: 'Percentile',
    [CONTENT_ANALYTICS.AGGREGATIONS.STD_DEV]: 'Standard Deviation',
    [CONTENT_ANALYTICS.AGGREGATIONS.VARIANCE]: 'Variance',
  };
  return labels[aggregation] || 'Unknown Aggregation';
}

export function contentAnalyticsGetComparisonTypeLabel(
  comparison: ContentAnalyticsComparisonType
): string {
  const labels: Record<ContentAnalyticsComparisonType, string> = {
    [CONTENT_ANALYTICS.COMPARISON_TYPES.PERIOD_OVER_PERIOD]: 'Period Over Period',
    [CONTENT_ANALYTICS.COMPARISON_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [CONTENT_ANALYTICS.COMPARISON_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [CONTENT_ANALYTICS.COMPARISON_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [CONTENT_ANALYTICS.COMPARISON_TYPES.WEEK_OVER_WEEK]: 'Week Over Week',
    [CONTENT_ANALYTICS.COMPARISON_TYPES.DAY_OVER_DAY]: 'Day Over Day',
    [CONTENT_ANALYTICS.COMPARISON_TYPES.VS_TARGET]: 'vs Target',
    [CONTENT_ANALYTICS.COMPARISON_TYPES.VS_BENCHMARK]: 'vs Benchmark',
  };
  return labels[comparison] || 'Unknown Comparison Type';
}

export function contentAnalyticsGetDataSourceLabel(source: ContentAnalyticsDataSource): string {
  const labels: Record<ContentAnalyticsDataSource, string> = {
    [CONTENT_ANALYTICS.DATA_SOURCES.DATABASE]: 'Database',
    [CONTENT_ANALYTICS.DATA_SOURCES.CACHE]: 'Cache',
    [CONTENT_ANALYTICS.DATA_SOURCES.REAL_TIME]: 'Real-Time',
    [CONTENT_ANALYTICS.DATA_SOURCES.EXTERNAL]: 'External Source',
    [CONTENT_ANALYTICS.DATA_SOURCES.API]: 'API',
  };
  return labels[source] || 'Unknown Data Source';
}

export function contentAnalyticsGetExportFormatLabel(format: ContentAnalyticsExportFormat): string {
  const labels: Record<ContentAnalyticsExportFormat, string> = {
    [CONTENT_ANALYTICS.EXPORT_FORMATS.CSV]: 'CSV',
    [CONTENT_ANALYTICS.EXPORT_FORMATS.JSON]: 'JSON',
    [CONTENT_ANALYTICS.EXPORT_FORMATS.XML]: 'XML',
    [CONTENT_ANALYTICS.EXPORT_FORMATS.EXCEL]: 'Excel',
    [CONTENT_ANALYTICS.EXPORT_FORMATS.PDF]: 'PDF',
    [CONTENT_ANALYTICS.EXPORT_FORMATS.HTML]: 'HTML',
  };
  return labels[format] || 'Unknown Format';
}

export function contentAnalyticsGetDefaultTimeframe(): ContentAnalyticsTimeframe {
  return CONTENT_ANALYTICS.DEFAULTS.TIMEFRAME as ContentAnalyticsTimeframe;
}

export function contentAnalyticsGetDefaultAggregation(): ContentAnalyticsAggregation {
  return CONTENT_ANALYTICS.DEFAULTS.AGGREGATION as ContentAnalyticsAggregation;
}

export function contentAnalyticsGetDefaultLimit(): number {
  return CONTENT_ANALYTICS.DEFAULTS.LIMIT;
}

export function contentAnalyticsGetMaxResults(): number {
  return CONTENT_ANALYTICS.LIMITS.MAX_RESULTS;
}

export function contentAnalyticsGetMaxDimensions(): number {
  return CONTENT_ANALYTICS.LIMITS.MAX_DIMENSIONS;
}

export function contentAnalyticsGetMaxMetrics(): number {
  return CONTENT_ANALYTICS.LIMITS.MAX_METRICS;
}

export function contentAnalyticsIsValidType(type: string): type is ContentAnalyticsType {
  return Object.values(CONTENT_ANALYTICS.TYPES).includes(type as ContentAnalyticsType);
}

export function contentAnalyticsIsValidMetric(metric: string): metric is ContentAnalyticsMetric {
  return Object.values(CONTENT_ANALYTICS.METRICS).includes(metric as ContentAnalyticsMetric);
}

export function contentAnalyticsIsValidDimension(
  dimension: string
): dimension is ContentAnalyticsDimension {
  return Object.values(CONTENT_ANALYTICS.DIMENSIONS).includes(
    dimension as ContentAnalyticsDimension
  );
}

export function contentAnalyticsIsValidTimeframe(
  timeframe: string
): timeframe is ContentAnalyticsTimeframe {
  return Object.values(CONTENT_ANALYTICS.TIMEFRAMES).includes(
    timeframe as ContentAnalyticsTimeframe
  );
}

export function contentAnalyticsIsValidAggregation(
  aggregation: string
): aggregation is ContentAnalyticsAggregation {
  return Object.values(CONTENT_ANALYTICS.AGGREGATIONS).includes(
    aggregation as ContentAnalyticsAggregation
  );
}
