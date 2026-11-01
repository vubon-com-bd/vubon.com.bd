export const REPORT_WIDGET_TYPE = {
  CHART: 'chart',
  TABLE: 'table',
  METRIC: 'metric',
  KPI: 'kpi',
  GAUGE: 'gauge',
  PROGRESS: 'progress',
  LIST: 'list',
  MAP: 'map',
  HEATMAP: 'heatmap',
  FUNNEL: 'funnel',
  PIE: 'pie',
  BAR: 'bar',
  LINE: 'line',
  AREA: 'area',
  SCATTER: 'scatter',
  TEXT: 'text',
  IMAGE: 'image',
  IFRAME: 'iframe',
} as const;

export const REPORT_WIDGET_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
  FULL_WIDTH: 'full_width',
  HALF_WIDTH: 'half_width',
  QUARTER_WIDTH: 'quarter_width',
} as const;

export const REPORT_WIDGET_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  LOADING: 'loading',
  ERROR: 'error',
  EMPTY: 'empty',
} as const;

export const REPORT_WIDGET = {
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  MAX_DATA_POINTS: 10000,
  MAX_DATASETS: 20,
  MAX_SERIES: 10,
  REFRESH_INTERVAL_SECONDS: 60,
  CACHE_TTL_SECONDS: 300,
  ALLOW_DRILL_DOWN: true,
  ALLOW_FULLSCREEN: true,
  SHOW_LEGEND: true,
  SHOW_TOOLTIP: true,
  ANIMATION_ENABLED: true,
} as const;

export type ReportWidgetTypeType = (typeof REPORT_WIDGET_TYPE)[keyof typeof REPORT_WIDGET_TYPE];
export type ReportWidgetSizeType = (typeof REPORT_WIDGET_SIZE)[keyof typeof REPORT_WIDGET_SIZE];
export type ReportWidgetStatusType =
  (typeof REPORT_WIDGET_STATUS)[keyof typeof REPORT_WIDGET_STATUS];
