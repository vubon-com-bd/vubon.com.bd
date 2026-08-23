/**
 * Reporting Constants
 * Configuration for reporting system, schedules, and delivery
 */

export const REPORTING = {
  // Report Categories
  CATEGORIES: {
    SALES: 'sales',
    FINANCIAL: 'financial',
    OPERATIONAL: 'operational',
    ANALYTICAL: 'analytical',
    MARKETING: 'marketing',
    CUSTOMER: 'customer',
    PRODUCT: 'product',
    VENDOR: 'vendor',
    LOGISTICS: 'logistics',
    SUPPORT: 'support',
    PERFORMANCE: 'performance',
    COMPLIANCE: 'compliance',
    CUSTOM: 'custom',
  } as const,

  // Report Delivery Methods
  DELIVERY_METHODS: {
    EMAIL: 'email',
    DOWNLOAD: 'download',
    API: 'api',
    WEBHOOK: 'webhook',
    DASHBOARD: 'dashboard',
    FTP: 'ftp',
    S3: 's3',
  } as const,

  // Report Schedule Types
  SCHEDULE_TYPES: {
    ONE_TIME: 'one_time',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    BI_ANNUAL: 'bi_annual',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
  } as const,

  // Report Time Periods
  TIME_PERIODS: {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_90_DAYS: 'last_90_days',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    THIS_QUARTER: 'this_quarter',
    LAST_QUARTER: 'last_quarter',
    THIS_YEAR: 'this_year',
    LAST_YEAR: 'last_year',
    CUSTOM: 'custom',
  } as const,

  // Report Grouping
  GROUPING: {
    NONE: 'none',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    BY_CATEGORY: 'by_category',
    BY_PRODUCT: 'by_product',
    BY_VENDOR: 'by_vendor',
    BY_CUSTOMER: 'by_customer',
    BY_REGION: 'by_region',
  } as const,

  // Report Aggregations
  AGGREGATIONS: {
    SUM: 'sum',
    AVG: 'avg',
    MIN: 'min',
    MAX: 'max',
    COUNT: 'count',
    DISTINCT: 'distinct',
    MEDIAN: 'median',
    PERCENTILE: 'percentile',
    RATE: 'rate',
    PERCENTAGE: 'percentage',
  } as const,

  // Report Chart Types
  CHART_TYPES: {
    LINE: 'line',
    BAR: 'bar',
    PIE: 'pie',
    DOUGHNUT: 'doughnut',
    AREA: 'area',
    SCATTER: 'scatter',
    BUBBLE: 'bubble',
    RADAR: 'radar',
    POLAR_AREA: 'polar_area',
    HEATMAP: 'heatmap',
    TREEMAP: 'treemap',
    SANKEY: 'sankey',
    FUNNEL: 'funnel',
    GAUGE: 'gauge',
    TABLE: 'table',
  } as const,

  // Report Data Sources
  DATA_SOURCES: {
    DATABASE: 'database',
    CACHE: 'cache',
    API: 'api',
    EXTERNAL: 'external',
    FILE: 'file',
    STREAM: 'stream',
    EVENT: 'event',
  } as const,

  // Report Time Zones
  TIMEZONES: {
    UTC: 'UTC',
    BD: 'Asia/Dhaka',
    US_EAST: 'America/New_York',
    US_WEST: 'America/Los_Angeles',
    EU_LONDON: 'Europe/London',
    EU_PARIS: 'Europe/Paris',
    ASIA_DUBAI: 'Asia/Dubai',
    ASIA_SINGAPORE: 'Asia/Singapore',
    ASIA_TOKYO: 'Asia/Tokyo',
    AUSTRALIA: 'Australia/Sydney',
  } as const,

  // Report Languages
  LANGUAGES: {
    EN: 'en',
    BN: 'bn',
    HI: 'hi',
    AR: 'ar',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
    JA: 'ja',
    RU: 'ru',
  } as const,

  // Report Defaults
  DEFAULTS: {
    PAGE_SIZE: 50,
    MAX_PAGE_SIZE: 1000,
    DEFAULT_TIMEZONE: 'Asia/Dhaka',
    DEFAULT_LANGUAGE: 'bn',
    MAX_REPORT_AGE_DAYS: 90,
    MAX_EXPORT_ROWS: 100000,
    SCHEDULE_RETRY_ATTEMPTS: 3,
    SCHEDULE_RETRY_DELAY: 300000, // 5 minutes
  } as const,

  // Report Limits
  LIMITS: {
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 1000,
    MAX_FILTERS: 20,
    MAX_GROUPING: 5,
    MAX_SORTING: 10,
    MAX_CHARTS: 10,
    MAX_METRICS: 50,
  } as const,
} as const;

// Report Categories
export type ReportingCategory = (typeof REPORTING.CATEGORIES)[keyof typeof REPORTING.CATEGORIES];

// Delivery Methods
export type ReportingDeliveryMethod =
  (typeof REPORTING.DELIVERY_METHODS)[keyof typeof REPORTING.DELIVERY_METHODS];

// Schedule Types
export type ReportingScheduleType =
  (typeof REPORTING.SCHEDULE_TYPES)[keyof typeof REPORTING.SCHEDULE_TYPES];

// Time Periods
export type ReportingTimePeriod =
  (typeof REPORTING.TIME_PERIODS)[keyof typeof REPORTING.TIME_PERIODS];

// Grouping
export type ReportingGrouping = (typeof REPORTING.GROUPING)[keyof typeof REPORTING.GROUPING];

// Aggregations
export type ReportingAggregation =
  (typeof REPORTING.AGGREGATIONS)[keyof typeof REPORTING.AGGREGATIONS];

// Chart Types
export type ReportingChartType = (typeof REPORTING.CHART_TYPES)[keyof typeof REPORTING.CHART_TYPES];

// Data Sources
export type ReportingDataSource =
  (typeof REPORTING.DATA_SOURCES)[keyof typeof REPORTING.DATA_SOURCES];

// Timezones
export type ReportingTimezone = (typeof REPORTING.TIMEZONES)[keyof typeof REPORTING.TIMEZONES];

// Languages
export type ReportingLanguage = (typeof REPORTING.LANGUAGES)[keyof typeof REPORTING.LANGUAGES];

// Defaults
export type ReportingDefault = (typeof REPORTING.DEFAULTS)[keyof typeof REPORTING.DEFAULTS];

// Limits
export type ReportingLimit = (typeof REPORTING.LIMITS)[keyof typeof REPORTING.LIMITS];

// Utility Functions
export function getReportingCategoryLabel(category: ReportingCategory): string {
  const labels: Record<ReportingCategory, string> = {
    [REPORTING.CATEGORIES.SALES]: 'Sales Report',
    [REPORTING.CATEGORIES.FINANCIAL]: 'Financial Report',
    [REPORTING.CATEGORIES.OPERATIONAL]: 'Operational Report',
    [REPORTING.CATEGORIES.ANALYTICAL]: 'Analytical Report',
    [REPORTING.CATEGORIES.MARKETING]: 'Marketing Report',
    [REPORTING.CATEGORIES.CUSTOMER]: 'Customer Report',
    [REPORTING.CATEGORIES.PRODUCT]: 'Product Report',
    [REPORTING.CATEGORIES.VENDOR]: 'Vendor Report',
    [REPORTING.CATEGORIES.LOGISTICS]: 'Logistics Report',
    [REPORTING.CATEGORIES.SUPPORT]: 'Support Report',
    [REPORTING.CATEGORIES.PERFORMANCE]: 'Performance Report',
    [REPORTING.CATEGORIES.COMPLIANCE]: 'Compliance Report',
    [REPORTING.CATEGORIES.CUSTOM]: 'Custom Report',
  };
  return labels[category] || 'Unknown Report';
}

export function getReportingScheduleTypeLabel(scheduleType: ReportingScheduleType): string {
  const labels: Record<ReportingScheduleType, string> = {
    [REPORTING.SCHEDULE_TYPES.ONE_TIME]: 'One Time',
    [REPORTING.SCHEDULE_TYPES.HOURLY]: 'Hourly',
    [REPORTING.SCHEDULE_TYPES.DAILY]: 'Daily',
    [REPORTING.SCHEDULE_TYPES.WEEKLY]: 'Weekly',
    [REPORTING.SCHEDULE_TYPES.BI_WEEKLY]: 'Bi-Weekly',
    [REPORTING.SCHEDULE_TYPES.MONTHLY]: 'Monthly',
    [REPORTING.SCHEDULE_TYPES.QUARTERLY]: 'Quarterly',
    [REPORTING.SCHEDULE_TYPES.BI_ANNUAL]: 'Bi-Annual',
    [REPORTING.SCHEDULE_TYPES.ANNUAL]: 'Annual',
    [REPORTING.SCHEDULE_TYPES.CUSTOM]: 'Custom',
  };
  return labels[scheduleType] || 'Unknown Schedule';
}

export function getReportingTimePeriodLabel(timePeriod: ReportingTimePeriod): string {
  const labels: Record<ReportingTimePeriod, string> = {
    [REPORTING.TIME_PERIODS.TODAY]: 'Today',
    [REPORTING.TIME_PERIODS.YESTERDAY]: 'Yesterday',
    [REPORTING.TIME_PERIODS.LAST_7_DAYS]: 'Last 7 Days',
    [REPORTING.TIME_PERIODS.LAST_30_DAYS]: 'Last 30 Days',
    [REPORTING.TIME_PERIODS.LAST_90_DAYS]: 'Last 90 Days',
    [REPORTING.TIME_PERIODS.THIS_MONTH]: 'This Month',
    [REPORTING.TIME_PERIODS.LAST_MONTH]: 'Last Month',
    [REPORTING.TIME_PERIODS.THIS_QUARTER]: 'This Quarter',
    [REPORTING.TIME_PERIODS.LAST_QUARTER]: 'Last Quarter',
    [REPORTING.TIME_PERIODS.THIS_YEAR]: 'This Year',
    [REPORTING.TIME_PERIODS.LAST_YEAR]: 'Last Year',
    [REPORTING.TIME_PERIODS.CUSTOM]: 'Custom Period',
  };
  return labels[timePeriod] || 'Unknown Period';
}

export function getReportingChartTypeLabel(chartType: ReportingChartType): string {
  const labels: Record<ReportingChartType, string> = {
    [REPORTING.CHART_TYPES.LINE]: 'Line Chart',
    [REPORTING.CHART_TYPES.BAR]: 'Bar Chart',
    [REPORTING.CHART_TYPES.PIE]: 'Pie Chart',
    [REPORTING.CHART_TYPES.DOUGHNUT]: 'Doughnut Chart',
    [REPORTING.CHART_TYPES.AREA]: 'Area Chart',
    [REPORTING.CHART_TYPES.SCATTER]: 'Scatter Plot',
    [REPORTING.CHART_TYPES.BUBBLE]: 'Bubble Chart',
    [REPORTING.CHART_TYPES.RADAR]: 'Radar Chart',
    [REPORTING.CHART_TYPES.POLAR_AREA]: 'Polar Area Chart',
    [REPORTING.CHART_TYPES.HEATMAP]: 'Heatmap',
    [REPORTING.CHART_TYPES.TREEMAP]: 'Treemap',
    [REPORTING.CHART_TYPES.SANKEY]: 'Sankey Diagram',
    [REPORTING.CHART_TYPES.FUNNEL]: 'Funnel Chart',
    [REPORTING.CHART_TYPES.GAUGE]: 'Gauge Chart',
    [REPORTING.CHART_TYPES.TABLE]: 'Table',
  };
  return labels[chartType] || 'Unknown Chart';
}

export function getReportingAggregationLabel(aggregation: ReportingAggregation): string {
  const labels: Record<ReportingAggregation, string> = {
    [REPORTING.AGGREGATIONS.SUM]: 'Sum',
    [REPORTING.AGGREGATIONS.AVG]: 'Average',
    [REPORTING.AGGREGATIONS.MIN]: 'Minimum',
    [REPORTING.AGGREGATIONS.MAX]: 'Maximum',
    [REPORTING.AGGREGATIONS.COUNT]: 'Count',
    [REPORTING.AGGREGATIONS.DISTINCT]: 'Distinct Count',
    [REPORTING.AGGREGATIONS.MEDIAN]: 'Median',
    [REPORTING.AGGREGATIONS.PERCENTILE]: 'Percentile',
    [REPORTING.AGGREGATIONS.RATE]: 'Rate',
    [REPORTING.AGGREGATIONS.PERCENTAGE]: 'Percentage',
  };
  return labels[aggregation] || 'Unknown Aggregation';
}

export function getReportingDeliveryMethodLabel(deliveryMethod: ReportingDeliveryMethod): string {
  const labels: Record<ReportingDeliveryMethod, string> = {
    [REPORTING.DELIVERY_METHODS.EMAIL]: 'Email',
    [REPORTING.DELIVERY_METHODS.DOWNLOAD]: 'Download',
    [REPORTING.DELIVERY_METHODS.API]: 'API',
    [REPORTING.DELIVERY_METHODS.WEBHOOK]: 'Webhook',
    [REPORTING.DELIVERY_METHODS.DASHBOARD]: 'Dashboard',
    [REPORTING.DELIVERY_METHODS.FTP]: 'FTP',
    [REPORTING.DELIVERY_METHODS.S3]: 'S3',
  };
  return labels[deliveryMethod] || 'Unknown Delivery Method';
}

export function isValidScheduleType(scheduleType: string): scheduleType is ReportingScheduleType {
  return Object.values(REPORTING.SCHEDULE_TYPES).includes(scheduleType as ReportingScheduleType);
}

export function isValidTimePeriod(timePeriod: string): timePeriod is ReportingTimePeriod {
  return Object.values(REPORTING.TIME_PERIODS).includes(timePeriod as ReportingTimePeriod);
}

export function isValidChartType(chartType: string): chartType is ReportingChartType {
  return Object.values(REPORTING.CHART_TYPES).includes(chartType as ReportingChartType);
}

export function getDefaultTimezone(): ReportingTimezone {
  return REPORTING.DEFAULTS.DEFAULT_TIMEZONE;
}

export function getDefaultLanguage(): ReportingLanguage {
  return REPORTING.DEFAULTS.DEFAULT_LANGUAGE;
}

export function getMaxPageSize(): number {
  return REPORTING.DEFAULTS.MAX_PAGE_SIZE;
}

export function getDefaultPageSize(): number {
  return REPORTING.DEFAULTS.PAGE_SIZE;
}
