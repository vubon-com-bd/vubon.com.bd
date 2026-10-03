// shared-constants/platform/analytics/analytics-report.constants.ts

export const ANALYTICS_REPORT_TYPE = {
  OVERVIEW: 'overview',
  TRAFFIC: 'traffic',
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  RETENTION: 'retention',
  REVENUE: 'revenue',
  COHORT: 'cohort',
  FUNNEL: 'funnel',
  ATTRIBUTION: 'attribution',
  CUSTOM: 'custom',
} as const;

export const ANALYTICS_REPORT_FORMAT = {
  JSON: 'json',
  CSV: 'csv',
  XLSX: 'xlsx',
  PDF: 'pdf',
  HTML: 'html',
} as const;

export const ANALYTICS_REPORT_FREQUENCY = {
  ONCE: 'once',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
} as const;

export const ANALYTICS_DASHBOARD_LAYOUT = {
  GRID: 'grid',
  MASONRY: 'masonry',
  FLEX: 'flex',
  FREEFORM: 'freeform',
} as const;

export const ANALYTICS_WIDGET_TYPE = {
  CHART: 'chart',
  TABLE: 'table',
  METRIC: 'metric',
  TEXT: 'text',
  FUNNEL: 'funnel',
  HEATMAP: 'heatmap',
  GAUGE: 'gauge',
} as const;

export const ANALYTICS_CHART_TYPE = {
  LINE: 'line',
  BAR: 'bar',
  COLUMN: 'column',
  PIE: 'pie',
  DONUT: 'donut',
  AREA: 'area',
  SCATTER: 'scatter',
  HEATMAP: 'heatmap',
  FUNNEL: 'funnel',
  TREEMAP: 'treemap',
  SANKEY: 'sankey',
  RADAR: 'radar',
} as const;

export const ANALYTICS_ATTRIBUTION_MODEL = {
  FIRST_TOUCH: 'first_touch',
  LAST_TOUCH: 'last_touch',
  LINEAR: 'linear',
  TIME_DECAY: 'time_decay',
  POSITION_BASED: 'position_based',
  DATA_DRIVEN: 'data_driven',
} as const;

export type AnalyticsReportTypeType =
  (typeof ANALYTICS_REPORT_TYPE)[keyof typeof ANALYTICS_REPORT_TYPE];
export type AnalyticsReportFormatType =
  (typeof ANALYTICS_REPORT_FORMAT)[keyof typeof ANALYTICS_REPORT_FORMAT];
export type AnalyticsReportFrequencyType =
  (typeof ANALYTICS_REPORT_FREQUENCY)[keyof typeof ANALYTICS_REPORT_FREQUENCY];
export type AnalyticsDashboardLayoutType =
  (typeof ANALYTICS_DASHBOARD_LAYOUT)[keyof typeof ANALYTICS_DASHBOARD_LAYOUT];
export type AnalyticsWidgetTypeType =
  (typeof ANALYTICS_WIDGET_TYPE)[keyof typeof ANALYTICS_WIDGET_TYPE];
export type AnalyticsChartTypeType =
  (typeof ANALYTICS_CHART_TYPE)[keyof typeof ANALYTICS_CHART_TYPE];
export type AnalyticsAttributionModelType =
  (typeof ANALYTICS_ATTRIBUTION_MODEL)[keyof typeof ANALYTICS_ATTRIBUTION_MODEL];
