/**
 * Report Widget Constants
 * Configuration for widgets, visualization, and data display
 */

export const REPORT_WIDGET = {
  // Widget Categories
  CATEGORIES: {
    CHART: 'chart',
    METRIC: 'metric',
    TABLE: 'table',
    LIST: 'list',
    SCORECARD: 'scorecard',
    GAUGE: 'gauge',
    HEATMAP: 'heatmap',
    FUNNEL: 'funnel',
    TIMELINE: 'timeline',
    CALENDAR: 'calendar',
    ALERT: 'alert',
    STATUS: 'status',
    PROGRESS: 'progress',
    KPI: 'kpi',
    COMPARISON: 'comparison',
    TREND: 'trend',
    DISTRIBUTION: 'distribution',
    MAP: 'map',
    IMAGE: 'image',
    TEXT: 'text',
    HTML: 'html',
    IFRAME: 'iframe',
    CUSTOM: 'custom',
  } as const,

  // Widget Sizes
  SIZES: {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XLARGE: 'xlarge',
    XXLARGE: 'xxlarge',
    FULL: 'full',
    AUTO: 'auto',
  } as const,

  // Widget Dimensions (in grid units)
  DIMENSIONS: {
    TINY: { width: 1, height: 1 },
    SMALL: { width: 2, height: 2 },
    MEDIUM: { width: 3, height: 3 },
    LARGE: { width: 4, height: 4 },
    XLARGE: { width: 6, height: 6 },
    XXLARGE: { width: 8, height: 8 },
    FULL: { width: 12, height: 6 },
    AUTO: { width: 0, height: 0 },
  } as const,

  // Widget Layouts
  LAYOUTS: {
    SINGLE: 'single',
    GRID: 'grid',
    STACKED: 'stacked',
    CAROUSEL: 'carousel',
    TABBED: 'tabbed',
    ACCORDION: 'accordion',
    COLLAPSIBLE: 'collapsible',
    RESIZABLE: 'resizable',
    DRAGGABLE: 'draggable',
  } as const,

  // Widget Data Sources
  DATA_SOURCES: {
    DATABASE: 'database',
    API: 'api',
    CACHE: 'cache',
    EXTERNAL: 'external',
    FILE: 'file',
    STREAM: 'stream',
    EVENT: 'event',
    REAL_TIME: 'real_time',
  } as const,

  // Widget Data Formats
  DATA_FORMATS: {
    JSON: 'json',
    XML: 'xml',
    CSV: 'csv',
    TSV: 'tsv',
    HTML: 'html',
    TEXT: 'text',
    MARKDOWN: 'markdown',
    YAML: 'yaml',
    PROTOBUF: 'protobuf',
  } as const,

  // Widget Aggregations
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
    GROWTH: 'growth',
    MOM: 'mom',
    QOQ: 'qoq',
    YOY: 'yoy',
  } as const,

  // Widget Comparison Types
  COMPARISON_TYPES: {
    PERIOD_OVER_PERIOD: 'period_over_period',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    DAY_OVER_DAY: 'day_over_day',
    VS_TARGET: 'vs_target',
    VS_BUDGET: 'vs_budget',
    VS_FORECAST: 'vs_forecast',
    BENCHMARK: 'benchmark',
  } as const,

  // Widget Alert Types
  ALERT_TYPES: {
    THRESHOLD: 'threshold',
    TREND: 'trend',
    ANOMALY: 'anomaly',
    OUTLIER: 'outlier',
    PREDICTION: 'prediction',
    STATUS_CHANGE: 'status_change',
    DATA_REFRESH: 'data_refresh',
    CUSTOM: 'custom',
  } as const,

  // Widget Color Schemes
  COLOR_SCHEMES: {
    MONOCHROME: 'monochrome',
    COMPLEMENTARY: 'complementary',
    ANALOGOUS: 'analogous',
    TRIADIC: 'triadic',
    TETRADIC: 'tetradic',
    CUSTOM: 'custom',
    CATEGORICAL: 'categorical',
    SEQUENTIAL: 'sequential',
    DIVERGING: 'diverging',
    QUALITATIVE: 'qualitative',
  } as const,

  // Widget Defaults
  DEFAULTS: {
    SIZE: 'medium',
    REFRESH_INTERVAL: '5m',
    DATA_POINTS: 100,
    COLOR_SCHEME: 'categorical',
    AGGREGATION: 'sum',
    SHOW_TITLE: true,
    SHOW_LEGEND: true,
    SHOW_LABELS: true,
    SHOW_ANIMATION: true,
  } as const,

  // Widget Limits
  LIMITS: {
    MAX_DATA_POINTS: 10000,
    MAX_SERIES: 50,
    MAX_CATEGORIES: 100,
    MAX_ROWS: 1000,
    MAX_COLUMNS: 50,
    MAX_FILTERS: 20,
    MAX_SORTING: 10,
  } as const,
} as const;

// Widget Categories
export type ReportWidgetCategory =
  (typeof REPORT_WIDGET.CATEGORIES)[keyof typeof REPORT_WIDGET.CATEGORIES];

// Widget Sizes
export type ReportWidgetSize = (typeof REPORT_WIDGET.SIZES)[keyof typeof REPORT_WIDGET.SIZES];

// Widget Dimensions
export type ReportWidgetDimension =
  (typeof REPORT_WIDGET.DIMENSIONS)[keyof typeof REPORT_WIDGET.DIMENSIONS];

// Widget Layouts
export type ReportWidgetLayout = (typeof REPORT_WIDGET.LAYOUTS)[keyof typeof REPORT_WIDGET.LAYOUTS];

// Widget Data Sources
export type ReportWidgetDataSource =
  (typeof REPORT_WIDGET.DATA_SOURCES)[keyof typeof REPORT_WIDGET.DATA_SOURCES];

// Widget Data Formats
export type ReportWidgetDataFormat =
  (typeof REPORT_WIDGET.DATA_FORMATS)[keyof typeof REPORT_WIDGET.DATA_FORMATS];

// Widget Aggregations
export type ReportWidgetAggregation =
  (typeof REPORT_WIDGET.AGGREGATIONS)[keyof typeof REPORT_WIDGET.AGGREGATIONS];

// Widget Comparison Types
export type ReportWidgetComparisonType =
  (typeof REPORT_WIDGET.COMPARISON_TYPES)[keyof typeof REPORT_WIDGET.COMPARISON_TYPES];

// Widget Alert Types
export type ReportWidgetAlertType =
  (typeof REPORT_WIDGET.ALERT_TYPES)[keyof typeof REPORT_WIDGET.ALERT_TYPES];

// Widget Color Schemes
export type ReportWidgetColorScheme =
  (typeof REPORT_WIDGET.COLOR_SCHEMES)[keyof typeof REPORT_WIDGET.COLOR_SCHEMES];

// Utility Functions
export function reportWidgetGetCategoryLabel(category: ReportWidgetCategory): string {
  const labels: Record<ReportWidgetCategory, string> = {
    [REPORT_WIDGET.CATEGORIES.CHART]: 'Chart',
    [REPORT_WIDGET.CATEGORIES.METRIC]: 'Metric',
    [REPORT_WIDGET.CATEGORIES.TABLE]: 'Table',
    [REPORT_WIDGET.CATEGORIES.LIST]: 'List',
    [REPORT_WIDGET.CATEGORIES.SCORECARD]: 'Scorecard',
    [REPORT_WIDGET.CATEGORIES.GAUGE]: 'Gauge',
    [REPORT_WIDGET.CATEGORIES.HEATMAP]: 'Heatmap',
    [REPORT_WIDGET.CATEGORIES.FUNNEL]: 'Funnel',
    [REPORT_WIDGET.CATEGORIES.TIMELINE]: 'Timeline',
    [REPORT_WIDGET.CATEGORIES.CALENDAR]: 'Calendar',
    [REPORT_WIDGET.CATEGORIES.ALERT]: 'Alert',
    [REPORT_WIDGET.CATEGORIES.STATUS]: 'Status',
    [REPORT_WIDGET.CATEGORIES.PROGRESS]: 'Progress',
    [REPORT_WIDGET.CATEGORIES.KPI]: 'KPI',
    [REPORT_WIDGET.CATEGORIES.COMPARISON]: 'Comparison',
    [REPORT_WIDGET.CATEGORIES.TREND]: 'Trend',
    [REPORT_WIDGET.CATEGORIES.DISTRIBUTION]: 'Distribution',
    [REPORT_WIDGET.CATEGORIES.MAP]: 'Map',
    [REPORT_WIDGET.CATEGORIES.IMAGE]: 'Image',
    [REPORT_WIDGET.CATEGORIES.TEXT]: 'Text',
    [REPORT_WIDGET.CATEGORIES.HTML]: 'HTML',
    [REPORT_WIDGET.CATEGORIES.IFRAME]: 'Iframe',
    [REPORT_WIDGET.CATEGORIES.CUSTOM]: 'Custom Widget',
  };
  return labels[category] || 'Unknown Widget';
}

export function reportWidgetGetSizeLabel(size: ReportWidgetSize): string {
  const labels: Record<ReportWidgetSize, string> = {
    [REPORT_WIDGET.SIZES.TINY]: 'Tiny',
    [REPORT_WIDGET.SIZES.SMALL]: 'Small',
    [REPORT_WIDGET.SIZES.MEDIUM]: 'Medium',
    [REPORT_WIDGET.SIZES.LARGE]: 'Large',
    [REPORT_WIDGET.SIZES.XLARGE]: 'X-Large',
    [REPORT_WIDGET.SIZES.XXLARGE]: 'XX-Large',
    [REPORT_WIDGET.SIZES.FULL]: 'Full Width',
    [REPORT_WIDGET.SIZES.AUTO]: 'Auto',
  };
  return labels[size] || 'Unknown Size';
}

export function reportWidgetGetDimension(size: ReportWidgetSize): ReportWidgetDimension {
  const dimensions: Record<ReportWidgetSize, ReportWidgetDimension> = {
    [REPORT_WIDGET.SIZES.TINY]: REPORT_WIDGET.DIMENSIONS.TINY,
    [REPORT_WIDGET.SIZES.SMALL]: REPORT_WIDGET.DIMENSIONS.SMALL,
    [REPORT_WIDGET.SIZES.MEDIUM]: REPORT_WIDGET.DIMENSIONS.MEDIUM,
    [REPORT_WIDGET.SIZES.LARGE]: REPORT_WIDGET.DIMENSIONS.LARGE,
    [REPORT_WIDGET.SIZES.XLARGE]: REPORT_WIDGET.DIMENSIONS.XLARGE,
    [REPORT_WIDGET.SIZES.XXLARGE]: REPORT_WIDGET.DIMENSIONS.XXLARGE,
    [REPORT_WIDGET.SIZES.FULL]: REPORT_WIDGET.DIMENSIONS.FULL,
    [REPORT_WIDGET.SIZES.AUTO]: REPORT_WIDGET.DIMENSIONS.AUTO,
  };
  return dimensions[size] || REPORT_WIDGET.DIMENSIONS.MEDIUM;
}

export function reportWidgetGetLayoutLabel(layout: ReportWidgetLayout): string {
  const labels: Record<ReportWidgetLayout, string> = {
    [REPORT_WIDGET.LAYOUTS.SINGLE]: 'Single',
    [REPORT_WIDGET.LAYOUTS.GRID]: 'Grid',
    [REPORT_WIDGET.LAYOUTS.STACKED]: 'Stacked',
    [REPORT_WIDGET.LAYOUTS.CAROUSEL]: 'Carousel',
    [REPORT_WIDGET.LAYOUTS.TABBED]: 'Tabbed',
    [REPORT_WIDGET.LAYOUTS.ACCORDION]: 'Accordion',
    [REPORT_WIDGET.LAYOUTS.COLLAPSIBLE]: 'Collapsible',
    [REPORT_WIDGET.LAYOUTS.RESIZABLE]: 'Resizable',
    [REPORT_WIDGET.LAYOUTS.DRAGGABLE]: 'Draggable',
  };
  return labels[layout] || 'Unknown Layout';
}

export function reportWidgetGetDataSourceLabel(dataSource: ReportWidgetDataSource): string {
  const labels: Record<ReportWidgetDataSource, string> = {
    [REPORT_WIDGET.DATA_SOURCES.DATABASE]: 'Database',
    [REPORT_WIDGET.DATA_SOURCES.API]: 'API',
    [REPORT_WIDGET.DATA_SOURCES.CACHE]: 'Cache',
    [REPORT_WIDGET.DATA_SOURCES.EXTERNAL]: 'External Source',
    [REPORT_WIDGET.DATA_SOURCES.FILE]: 'File',
    [REPORT_WIDGET.DATA_SOURCES.STREAM]: 'Data Stream',
    [REPORT_WIDGET.DATA_SOURCES.EVENT]: 'Event',
    [REPORT_WIDGET.DATA_SOURCES.REAL_TIME]: 'Real-time',
  };
  return labels[dataSource] || 'Unknown Data Source';
}

export function reportWidgetGetDataFormatLabel(dataFormat: ReportWidgetDataFormat): string {
  const labels: Record<ReportWidgetDataFormat, string> = {
    [REPORT_WIDGET.DATA_FORMATS.JSON]: 'JSON',
    [REPORT_WIDGET.DATA_FORMATS.XML]: 'XML',
    [REPORT_WIDGET.DATA_FORMATS.CSV]: 'CSV',
    [REPORT_WIDGET.DATA_FORMATS.TSV]: 'TSV',
    [REPORT_WIDGET.DATA_FORMATS.HTML]: 'HTML',
    [REPORT_WIDGET.DATA_FORMATS.TEXT]: 'Text',
    [REPORT_WIDGET.DATA_FORMATS.MARKDOWN]: 'Markdown',
    [REPORT_WIDGET.DATA_FORMATS.YAML]: 'YAML',
    [REPORT_WIDGET.DATA_FORMATS.PROTOBUF]: 'Protobuf',
  };
  return labels[dataFormat] || 'Unknown Data Format';
}

export function reportWidgetGetAggregationLabel(aggregation: ReportWidgetAggregation): string {
  const labels: Record<ReportWidgetAggregation, string> = {
    [REPORT_WIDGET.AGGREGATIONS.SUM]: 'Sum',
    [REPORT_WIDGET.AGGREGATIONS.AVG]: 'Average',
    [REPORT_WIDGET.AGGREGATIONS.MIN]: 'Minimum',
    [REPORT_WIDGET.AGGREGATIONS.MAX]: 'Maximum',
    [REPORT_WIDGET.AGGREGATIONS.COUNT]: 'Count',
    [REPORT_WIDGET.AGGREGATIONS.DISTINCT]: 'Distinct Count',
    [REPORT_WIDGET.AGGREGATIONS.MEDIAN]: 'Median',
    [REPORT_WIDGET.AGGREGATIONS.PERCENTILE]: 'Percentile',
    [REPORT_WIDGET.AGGREGATIONS.RATE]: 'Rate',
    [REPORT_WIDGET.AGGREGATIONS.PERCENTAGE]: 'Percentage',
    [REPORT_WIDGET.AGGREGATIONS.GROWTH]: 'Growth',
    [REPORT_WIDGET.AGGREGATIONS.MOM]: 'Month over Month',
    [REPORT_WIDGET.AGGREGATIONS.QOQ]: 'Quarter over Quarter',
    [REPORT_WIDGET.AGGREGATIONS.YOY]: 'Year over Year',
  };
  return labels[aggregation] || 'Unknown Aggregation';
}

export function reportWidgetGetComparisonTypeLabel(
  comparisonType: ReportWidgetComparisonType
): string {
  const labels: Record<ReportWidgetComparisonType, string> = {
    [REPORT_WIDGET.COMPARISON_TYPES.PERIOD_OVER_PERIOD]: 'Period over Period',
    [REPORT_WIDGET.COMPARISON_TYPES.YEAR_OVER_YEAR]: 'Year over Year',
    [REPORT_WIDGET.COMPARISON_TYPES.QUARTER_OVER_QUARTER]: 'Quarter over Quarter',
    [REPORT_WIDGET.COMPARISON_TYPES.MONTH_OVER_MONTH]: 'Month over Month',
    [REPORT_WIDGET.COMPARISON_TYPES.WEEK_OVER_WEEK]: 'Week over Week',
    [REPORT_WIDGET.COMPARISON_TYPES.DAY_OVER_DAY]: 'Day over Day',
    [REPORT_WIDGET.COMPARISON_TYPES.VS_TARGET]: 'vs Target',
    [REPORT_WIDGET.COMPARISON_TYPES.VS_BUDGET]: 'vs Budget',
    [REPORT_WIDGET.COMPARISON_TYPES.VS_FORECAST]: 'vs Forecast',
    [REPORT_WIDGET.COMPARISON_TYPES.BENCHMARK]: 'Benchmark',
  };
  return labels[comparisonType] || 'Unknown Comparison Type';
}

export function reportWidgetGetAlertTypeLabel(alertType: ReportWidgetAlertType): string {
  const labels: Record<ReportWidgetAlertType, string> = {
    [REPORT_WIDGET.ALERT_TYPES.THRESHOLD]: 'Threshold Alert',
    [REPORT_WIDGET.ALERT_TYPES.TREND]: 'Trend Alert',
    [REPORT_WIDGET.ALERT_TYPES.ANOMALY]: 'Anomaly Alert',
    [REPORT_WIDGET.ALERT_TYPES.OUTLIER]: 'Outlier Alert',
    [REPORT_WIDGET.ALERT_TYPES.PREDICTION]: 'Prediction Alert',
    [REPORT_WIDGET.ALERT_TYPES.STATUS_CHANGE]: 'Status Change Alert',
    [REPORT_WIDGET.ALERT_TYPES.DATA_REFRESH]: 'Data Refresh Alert',
    [REPORT_WIDGET.ALERT_TYPES.CUSTOM]: 'Custom Alert',
  };
  return labels[alertType] || 'Unknown Alert Type';
}

export function reportWidgetGetColorSchemeLabel(colorScheme: ReportWidgetColorScheme): string {
  const labels: Record<ReportWidgetColorScheme, string> = {
    [REPORT_WIDGET.COLOR_SCHEMES.MONOCHROME]: 'Monochrome',
    [REPORT_WIDGET.COLOR_SCHEMES.COMPLEMENTARY]: 'Complementary',
    [REPORT_WIDGET.COLOR_SCHEMES.ANALOGOUS]: 'Analogous',
    [REPORT_WIDGET.COLOR_SCHEMES.TRIADIC]: 'Triadic',
    [REPORT_WIDGET.COLOR_SCHEMES.TETRADIC]: 'Tetradic',
    [REPORT_WIDGET.COLOR_SCHEMES.CUSTOM]: 'Custom',
    [REPORT_WIDGET.COLOR_SCHEMES.CATEGORICAL]: 'Categorical',
    [REPORT_WIDGET.COLOR_SCHEMES.SEQUENTIAL]: 'Sequential',
    [REPORT_WIDGET.COLOR_SCHEMES.DIVERGING]: 'Diverging',
    [REPORT_WIDGET.COLOR_SCHEMES.QUALITATIVE]: 'Qualitative',
  };
  return labels[colorScheme] || 'Unknown Color Scheme';
}

export function reportWidgetIsValidCategory(category: string): category is ReportWidgetCategory {
  return Object.values(REPORT_WIDGET.CATEGORIES).includes(category as ReportWidgetCategory);
}

export function reportWidgetIsValidSize(size: string): size is ReportWidgetSize {
  return Object.values(REPORT_WIDGET.SIZES).includes(size as ReportWidgetSize);
}

export function reportWidgetGetDefaultSize(): ReportWidgetSize {
  return REPORT_WIDGET.DEFAULTS.SIZE as ReportWidgetSize;
}

export function reportWidgetGetDefaultColorScheme(): ReportWidgetColorScheme {
  return REPORT_WIDGET.DEFAULTS.COLOR_SCHEME as ReportWidgetColorScheme;
}

export function reportWidgetGetDefaultAggregation(): ReportWidgetAggregation {
  return REPORT_WIDGET.DEFAULTS.AGGREGATION as ReportWidgetAggregation;
}

export function reportWidgetGetMaxDataPoints(): number {
  return REPORT_WIDGET.LIMITS.MAX_DATA_POINTS;
}

export function reportWidgetGetWidgetSizeGrid(size: ReportWidgetSize): {
  width: number;
  height: number;
} {
  const gridMap: Record<ReportWidgetSize, { width: number; height: number }> = {
    [REPORT_WIDGET.SIZES.TINY]: { width: 1, height: 1 },
    [REPORT_WIDGET.SIZES.SMALL]: { width: 2, height: 2 },
    [REPORT_WIDGET.SIZES.MEDIUM]: { width: 3, height: 3 },
    [REPORT_WIDGET.SIZES.LARGE]: { width: 4, height: 4 },
    [REPORT_WIDGET.SIZES.XLARGE]: { width: 6, height: 6 },
    [REPORT_WIDGET.SIZES.XXLARGE]: { width: 8, height: 8 },
    [REPORT_WIDGET.SIZES.FULL]: { width: 12, height: 6 },
    [REPORT_WIDGET.SIZES.AUTO]: { width: 0, height: 0 },
  };
  return gridMap[size] || { width: 3, height: 3 };
}
