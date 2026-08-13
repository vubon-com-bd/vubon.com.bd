/**
 * @fileoverview Analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Default time periods for analytics queries
 */
export enum AnalyticsTimePeriod {
  /** Last 7 days */
  LAST_7_DAYS = 'LAST_7_DAYS',
  /** Last 14 days */
  LAST_14_DAYS = 'LAST_14_DAYS',
  /** Last 30 days */
  LAST_30_DAYS = 'LAST_30_DAYS',
  /** Last 90 days */
  LAST_90_DAYS = 'LAST_90_DAYS',
  /** Last 12 months */
  LAST_12_MONTHS = 'LAST_12_MONTHS',
}

/**
 * Default time periods configuration with duration in days
 */
export const ANALYTICS_TIME_PERIOD_CONFIG: Record<
  AnalyticsTimePeriod,
  { label: string; days: number; months?: number }
> = {
  [AnalyticsTimePeriod.LAST_7_DAYS]: {
    label: 'Last 7 Days',
    days: 7,
  },
  [AnalyticsTimePeriod.LAST_14_DAYS]: {
    label: 'Last 14 Days',
    days: 14,
  },
  [AnalyticsTimePeriod.LAST_30_DAYS]: {
    label: 'Last 30 Days',
    days: 30,
  },
  [AnalyticsTimePeriod.LAST_90_DAYS]: {
    label: 'Last 90 Days',
    days: 90,
  },
  [AnalyticsTimePeriod.LAST_12_MONTHS]: {
    label: 'Last 12 Months',
    days: 365,
    months: 12,
  },
};

/**
 * Maximum number of records to return in analytics queries
 */
export const ANALYTICS_MAX_RECORDS = 10000;

/**
 * Default records per page for pagination
 */
export const ANALYTICS_DEFAULT_PAGE_SIZE = 50;

/**
 * Maximum records per page for pagination
 */
export const ANALYTICS_MAX_PAGE_SIZE = 500;

/**
 * Supported timezones for analytics reporting
 */
export const ANALYTICS_SUPPORTED_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Dhaka',
  'Asia/Singapore',
  'Australia/Sydney',
] as const;

/**
 * Supported timezone type
 */
export type AnalyticsTimezone = (typeof ANALYTICS_SUPPORTED_TIMEZONES)[number];

/**
 * Default timezone for analytics
 */
export const ANALYTICS_DEFAULT_TIMEZONE: AnalyticsTimezone = 'UTC';

/**
 * Data refresh interval in milliseconds (5 minutes)
 */
export const ANALYTICS_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

/**
 * Data refresh interval in seconds
 */
export const ANALYTICS_REFRESH_INTERVAL_SECONDS = 300;

/**
 * Analytics data retention period in days
 */
export const ANALYTICS_DATA_RETENTION_DAYS = 90;

/**
 * Analytics system version
 */
export const ANALYTICS_VERSION = '1.0.0';

/**
 * Analytics API version
 */
export const ANALYTICS_API_VERSION = 'v1';

/**
 * Analytics event types
 */
export enum AnalyticsEventType {
  /** Page view event */
  PAGE_VIEW = 'PAGE_VIEW',
  /** Click event */
  CLICK = 'CLICK',
  /** Form submission event */
  FORM_SUBMIT = 'FORM_SUBMIT',
  /** User login event */
  USER_LOGIN = 'USER_LOGIN',
  /** User logout event */
  USER_LOGOUT = 'USER_LOGOUT',
  /** Search event */
  SEARCH = 'SEARCH',
  /** Purchase event */
  PURCHASE = 'PURCHASE',
  /** Error event */
  ERROR = 'ERROR',
  /** Performance event */
  PERFORMANCE = 'PERFORMANCE',
}

/**
 * Analytics event priority levels
 */
export enum AnalyticsEventPriority {
  /** Low priority - batch processing */
  LOW = 'LOW',
  /** Medium priority - normal processing */
  MEDIUM = 'MEDIUM',
  /** High priority - immediate processing */
  HIGH = 'HIGH',
  /** Critical priority - real-time processing */
  CRITICAL = 'CRITICAL',
}

/**
 * Default priority for analytics events
 */
export const ANALYTICS_DEFAULT_EVENT_PRIORITY: AnalyticsEventPriority =
  AnalyticsEventPriority.MEDIUM;

/**
 * Analytics aggregation types
 */
export enum AnalyticsAggregationType {
  /** Sum aggregation */
  SUM = 'SUM',
  /** Average aggregation */
  AVG = 'AVG',
  /** Count aggregation */
  COUNT = 'COUNT',
  /** Min aggregation */
  MIN = 'MIN',
  /** Max aggregation */
  MAX = 'MAX',
  /** Distinct count aggregation */
  DISTINCT_COUNT = 'DISTINCT_COUNT',
}

/**
 * Analytics chart types
 */
export enum AnalyticsChartType {
  /** Line chart */
  LINE = 'LINE',
  /** Bar chart */
  BAR = 'BAR',
  /** Pie chart */
  PIE = 'PIE',
  /** Doughnut chart */
  DOUGHNUT = 'DOUGHNUT',
  /** Area chart */
  AREA = 'AREA',
  /** Scatter chart */
  SCATTER = 'SCATTER',
  /** Heatmap chart */
  HEATMAP = 'HEATMAP',
}

/**
 * Default chart type for analytics
 */
export const ANALYTICS_DEFAULT_CHART_TYPE: AnalyticsChartType = AnalyticsChartType.LINE;

/**
 * Analytics report formats
 */
export enum AnalyticsReportFormat {
  /** JSON format */
  JSON = 'JSON',
  /** CSV format */
  CSV = 'CSV',
  /** PDF format */
  PDF = 'PDF',
  /** Excel format */
  EXCEL = 'EXCEL',
  /** HTML format */
  HTML = 'HTML',
}

/**
 * Default report format
 */
export const ANALYTICS_DEFAULT_REPORT_FORMAT: AnalyticsReportFormat = AnalyticsReportFormat.JSON;

/**
 * Analytics cache TTL in seconds (1 hour)
 */
export const ANALYTICS_CACHE_TTL_SECONDS = 3600;

/**
 * Analytics cache TTL in milliseconds
 */
export const ANALYTICS_CACHE_TTL_MS = 3600 * 1000;

/**
 * Maximum analytics query timeout in seconds
 */
export const ANALYTICS_QUERY_TIMEOUT_SECONDS = 30;

/**
 * Analytics batch size for bulk operations
 */
export const ANALYTICS_BATCH_SIZE = 1000;

/**
 * Analytics retry attempts for failed operations
 */
export const ANALYTICS_RETRY_ATTEMPTS = 3;

/**
 * Analytics retry delay in milliseconds
 */
export const ANALYTICS_RETRY_DELAY_MS = 1000;

/**
 * Analytics webhook retry attempts
 */
export const ANALYTICS_WEBHOOK_RETRY_ATTEMPTS = 5;

/**
 * Analytics webhook timeout in milliseconds
 */
export const ANALYTICS_WEBHOOK_TIMEOUT_MS = 30000;

/**
 * Analytics storage types
 */
export enum AnalyticsStorageType {
  /** ClickHouse storage */
  CLICKHOUSE = 'CLICKHOUSE',
  /** Elasticsearch storage */
  ELASTICSEARCH = 'ELASTICSEARCH',
  /** PostgreSQL storage */
  POSTGRESQL = 'POSTGRESQL',
  /** MongoDB storage */
  MONGODB = 'MONGODB',
}

/**
 * Default storage type for analytics
 */
export const ANALYTICS_DEFAULT_STORAGE_TYPE: AnalyticsStorageType = AnalyticsStorageType.POSTGRESQL;

/**
 * Analytics dashboard widget types
 */
export enum AnalyticsWidgetType {
  /** Chart widget */
  CHART = 'CHART',
  /** Metric widget */
  METRIC = 'METRIC',
  /** Table widget */
  TABLE = 'TABLE',
  /** List widget */
  LIST = 'LIST',
  /** Gauge widget */
  GAUGE = 'GAUGE',
  /** Map widget */
  MAP = 'MAP',
}

/**
 * Analytics export formats
 */
export const ANALYTICS_EXPORT_FORMATS = ['csv', 'json', 'xlsx', 'pdf'] as const;

/**
 * Analytics export format type
 */
export type AnalyticsExportFormat = (typeof ANALYTICS_EXPORT_FORMATS)[number];

/**
 * Analytics dashboard refresh intervals in seconds
 */
export const ANALYTICS_DASHBOARD_REFRESH_INTERVALS = [
  { label: 'Off', value: 0 },
  { label: '1 minute', value: 60 },
  { label: '5 minutes', value: 300 },
  { label: '15 minutes', value: 900 },
  { label: '30 minutes', value: 1800 },
  { label: '1 hour', value: 3600 },
] as const;

/**
 * Analytics date range presets
 */
export const ANALYTICS_DATE_RANGE_PRESETS = {
  TODAY: { label: 'Today', days: 1 },
  YESTERDAY: { label: 'Yesterday', days: 1, offset: 1 },
  LAST_7_DAYS: { label: 'Last 7 Days', days: 7 },
  LAST_30_DAYS: { label: 'Last 30 Days', days: 30 },
  THIS_MONTH: { label: 'This Month', days: 30 },
  LAST_MONTH: { label: 'Last Month', days: 30, offset: 30 },
  THIS_QUARTER: { label: 'This Quarter', days: 90 },
  LAST_QUARTER: { label: 'Last Quarter', days: 90, offset: 90 },
  THIS_YEAR: { label: 'This Year', days: 365 },
  LAST_YEAR: { label: 'Last Year', days: 365, offset: 365 },
} as const;

/**
 * Analytics date range preset type
 */
export type AnalyticsDateRangePreset = keyof typeof ANALYTICS_DATE_RANGE_PRESETS;

/**
 * Default date range preset
 */
export const ANALYTICS_DEFAULT_DATE_RANGE_PRESET: AnalyticsDateRangePreset = 'LAST_30_DAYS';

// Re-export types from other files to avoid import errors
export type { AnalyticsMediumMetrics } from './analytics-medium.constants';
export type { CampaignConfig, CampaignMetrics } from './analytics-campaign.constants';
export type { AnalyticsEventConfig } from './analytics-event.constants';
export type { AnalyticsMetricConfig, MetricThreshold } from './analytics-metric.constants';
export type { AnalyticsDimensionConfig } from './analytics-dimension.constants';
export type {
  AnalyticsFilterOperatorConfig,
  FilterValue,
  FilterCondition,
  FilterGroup,
} from './analytics-filter.constants';

// Re-export types from other files to avoid import errors
export type { AnalyticsPeriodConfig, DateRange } from './analytics-period.constants';

// Re-export types from other files to avoid import errors
export type { AnalyticsIntervalConfig } from './analytics-interval.constants';

// Re-export types from other files to avoid import errors
export type {
  AnalyticsAggregationConfig,
  AggregationResult,
} from './analytics-aggregation.constants';

// Re-export types from other files to avoid import errors
export type {
  AnalyticsComparisonConfig,
  ComparisonResult,
  ComparisonTarget,
  ComparisonBenchmark,
} from './analytics-comparison.constants';

// Re-export types from other files to avoid import errors
export type { AnalyticsTrendConfig, TrendAnalysisResult } from './analytics-trend.constants';

// Re-export types from other files to avoid import errors
export type { AnalyticsStatusConfig, StatusTransitionResult } from './analytics-status.constants';

// Re-export types from other files to avoid import errors
export type { AnalyticsErrorConfig, AnalyticsError } from './analytics-error.constants';

// Re-export types from other files to avoid import errors
export type { AnalyticsPermissionConfig } from './analytics-permission.constants';
