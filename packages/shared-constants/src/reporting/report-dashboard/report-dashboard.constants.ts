/**
 * Report Dashboard Constants
 * Configuration for dashboards, widgets, and layouts
 */

export const REPORT_DASHBOARD = {
  // Dashboard Types
  TYPES: {
    EXECUTIVE: 'executive',
    OPERATIONAL: 'operational',
    ANALYTICAL: 'analytical',
    SALES: 'sales',
    MARKETING: 'marketing',
    FINANCIAL: 'financial',
    CUSTOMER: 'customer',
    PRODUCT: 'product',
    VENDOR: 'vendor',
    LOGISTICS: 'logistics',
    SUPPORT: 'support',
    PERFORMANCE: 'performance',
    CUSTOM: 'custom',
  } as const,

  // Dashboard Layouts
  LAYOUTS: {
    GRID: 'grid',
    FLEX: 'flex',
    STACKED: 'stacked',
    SIDEBAR: 'sidebar',
    FULL_WIDTH: 'full_width',
    TWO_COLUMN: 'two_column',
    THREE_COLUMN: 'three_column',
    FOUR_COLUMN: 'four_column',
    CUSTOM: 'custom',
  } as const,

  // Widget Types
  WIDGET_TYPES: {
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

  // Chart Types
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
    HISTOGRAM: 'histogram',
    BOX_PLOT: 'box_plot',
    VIOLIN: 'violin',
    HORIZONTAL_BAR: 'horizontal_bar',
    STACKED_BAR: 'stacked_bar',
    STACKED_AREA: 'stacked_area',
  } as const,

  // Widget Sizes
  WIDGET_SIZES: {
    TINY: 'tiny',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XLARGE: 'xlarge',
    FULL: 'full',
    AUTO: 'auto',
  } as const,

  // Widget Positions
  WIDGET_POSITIONS: {
    TOP_LEFT: 'top_left',
    TOP_CENTER: 'top_center',
    TOP_RIGHT: 'top_right',
    MIDDLE_LEFT: 'middle_left',
    MIDDLE_CENTER: 'middle_center',
    MIDDLE_RIGHT: 'middle_right',
    BOTTOM_LEFT: 'bottom_left',
    BOTTOM_CENTER: 'bottom_center',
    BOTTOM_RIGHT: 'bottom_right',
    FULL: 'full',
  } as const,

  // Refresh Intervals
  REFRESH_INTERVALS: {
    REALTIME: 'realtime',
    SECONDS_10: '10s',
    SECONDS_30: '30s',
    MINUTE: '1m',
    MINUTES_5: '5m',
    MINUTES_10: '10m',
    MINUTES_15: '15m',
    MINUTES_30: '30m',
    HOUR: '1h',
    HOURS_2: '2h',
    HOURS_6: '6h',
    HOURS_12: '12h',
    DAY: '1d',
    WEEK: '1w',
    MONTH: '1M',
    MANUAL: 'manual',
  } as const,

  // Time Ranges
  TIME_RANGES: {
    LAST_HOUR: 'last_hour',
    LAST_6_HOURS: 'last_6_hours',
    LAST_12_HOURS: 'last_12_hours',
    LAST_24_HOURS: 'last_24_hours',
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_90_DAYS: 'last_90_days',
    LAST_MONTH: 'last_month',
    LAST_QUARTER: 'last_quarter',
    LAST_YEAR: 'last_year',
    CUSTOM: 'custom',
  } as const,

  // Metrics
  METRICS: {
    REVENUE: 'revenue',
    ORDERS: 'orders',
    CUSTOMERS: 'customers',
    PRODUCTS: 'products',
    CONVERSION_RATE: 'conversion_rate',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    CUSTOMER_LIFETIME_VALUE: 'customer_lifetime_value',
    CHURN_RATE: 'churn_rate',
    RETENTION_RATE: 'retention_rate',
    GROWTH_RATE: 'growth_rate',
    PROFIT_MARGIN: 'profit_margin',
    ROI: 'roi',
    CAC: 'cac',
    LTV: 'ltv',
    NPS: 'nps',
    CSAT: 'csat',
    SLA: 'sla',
    INVENTORY_TURNOVER: 'inventory_turnover',
    FULFILLMENT_RATE: 'fulfillment_rate',
    RETURN_RATE: 'return_rate',
  } as const,

  // Dashboard Themes
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    BLUE: 'blue',
    GREEN: 'green',
    RED: 'red',
    PURPLE: 'purple',
    ORANGE: 'orange',
    TEAL: 'teal',
    PINK: 'pink',
    INDIGO: 'indigo',
    GRAY: 'gray',
    CUSTOM: 'custom',
  } as const,

  // Dashboard Defaults
  DEFAULTS: {
    REFRESH_INTERVAL: '5m',
    TIME_RANGE: 'last_7_days',
    WIDGET_SIZE: 'medium',
    COLUMNS: 3,
    THEME: 'light',
  } as const,

  // Dashboard Limits
  LIMITS: {
    MAX_WIDGETS: 50,
    MAX_COLUMNS: 12,
    MAX_ROWS: 20,
    MAX_DASHBOARDS: 100,
    MAX_SHARED_USERS: 100,
  } as const,
} as const;

// Dashboard Types
export type ReportDashboardType =
  (typeof REPORT_DASHBOARD.TYPES)[keyof typeof REPORT_DASHBOARD.TYPES];

// Dashboard Layouts
export type ReportDashboardLayout =
  (typeof REPORT_DASHBOARD.LAYOUTS)[keyof typeof REPORT_DASHBOARD.LAYOUTS];

// Widget Types
export type ReportDashboardWidgetType =
  (typeof REPORT_DASHBOARD.WIDGET_TYPES)[keyof typeof REPORT_DASHBOARD.WIDGET_TYPES];

// Chart Types
export type ReportDashboardChartType =
  (typeof REPORT_DASHBOARD.CHART_TYPES)[keyof typeof REPORT_DASHBOARD.CHART_TYPES];

// Widget Sizes
export type ReportDashboardWidgetSize =
  (typeof REPORT_DASHBOARD.WIDGET_SIZES)[keyof typeof REPORT_DASHBOARD.WIDGET_SIZES];

// Widget Positions
export type ReportDashboardWidgetPosition =
  (typeof REPORT_DASHBOARD.WIDGET_POSITIONS)[keyof typeof REPORT_DASHBOARD.WIDGET_POSITIONS];

// Refresh Intervals
export type ReportDashboardRefreshInterval =
  (typeof REPORT_DASHBOARD.REFRESH_INTERVALS)[keyof typeof REPORT_DASHBOARD.REFRESH_INTERVALS];

// Time Ranges
export type ReportDashboardTimeRange =
  (typeof REPORT_DASHBOARD.TIME_RANGES)[keyof typeof REPORT_DASHBOARD.TIME_RANGES];

// Metrics
export type ReportDashboardMetric =
  (typeof REPORT_DASHBOARD.METRICS)[keyof typeof REPORT_DASHBOARD.METRICS];

// Dashboard Themes
export type ReportDashboardTheme =
  (typeof REPORT_DASHBOARD.THEMES)[keyof typeof REPORT_DASHBOARD.THEMES];

// Utility Functions
export function reportDashboardGetTypeLabel(type: ReportDashboardType): string {
  const labels: Record<ReportDashboardType, string> = {
    [REPORT_DASHBOARD.TYPES.EXECUTIVE]: 'Executive Dashboard',
    [REPORT_DASHBOARD.TYPES.OPERATIONAL]: 'Operational Dashboard',
    [REPORT_DASHBOARD.TYPES.ANALYTICAL]: 'Analytical Dashboard',
    [REPORT_DASHBOARD.TYPES.SALES]: 'Sales Dashboard',
    [REPORT_DASHBOARD.TYPES.MARKETING]: 'Marketing Dashboard',
    [REPORT_DASHBOARD.TYPES.FINANCIAL]: 'Financial Dashboard',
    [REPORT_DASHBOARD.TYPES.CUSTOMER]: 'Customer Dashboard',
    [REPORT_DASHBOARD.TYPES.PRODUCT]: 'Product Dashboard',
    [REPORT_DASHBOARD.TYPES.VENDOR]: 'Vendor Dashboard',
    [REPORT_DASHBOARD.TYPES.LOGISTICS]: 'Logistics Dashboard',
    [REPORT_DASHBOARD.TYPES.SUPPORT]: 'Support Dashboard',
    [REPORT_DASHBOARD.TYPES.PERFORMANCE]: 'Performance Dashboard',
    [REPORT_DASHBOARD.TYPES.CUSTOM]: 'Custom Dashboard',
  };
  return labels[type] || 'Unknown Dashboard';
}

export function reportDashboardGetLayoutLabel(layout: ReportDashboardLayout): string {
  const labels: Record<ReportDashboardLayout, string> = {
    [REPORT_DASHBOARD.LAYOUTS.GRID]: 'Grid Layout',
    [REPORT_DASHBOARD.LAYOUTS.FLEX]: 'Flex Layout',
    [REPORT_DASHBOARD.LAYOUTS.STACKED]: 'Stacked Layout',
    [REPORT_DASHBOARD.LAYOUTS.SIDEBAR]: 'Sidebar Layout',
    [REPORT_DASHBOARD.LAYOUTS.FULL_WIDTH]: 'Full Width Layout',
    [REPORT_DASHBOARD.LAYOUTS.TWO_COLUMN]: 'Two Column Layout',
    [REPORT_DASHBOARD.LAYOUTS.THREE_COLUMN]: 'Three Column Layout',
    [REPORT_DASHBOARD.LAYOUTS.FOUR_COLUMN]: 'Four Column Layout',
    [REPORT_DASHBOARD.LAYOUTS.CUSTOM]: 'Custom Layout',
  };
  return labels[layout] || 'Unknown Layout';
}

export function reportDashboardGetWidgetTypeLabel(widgetType: ReportDashboardWidgetType): string {
  const labels: Record<ReportDashboardWidgetType, string> = {
    [REPORT_DASHBOARD.WIDGET_TYPES.CHART]: 'Chart',
    [REPORT_DASHBOARD.WIDGET_TYPES.METRIC]: 'Metric',
    [REPORT_DASHBOARD.WIDGET_TYPES.TABLE]: 'Table',
    [REPORT_DASHBOARD.WIDGET_TYPES.LIST]: 'List',
    [REPORT_DASHBOARD.WIDGET_TYPES.SCORECARD]: 'Scorecard',
    [REPORT_DASHBOARD.WIDGET_TYPES.GAUGE]: 'Gauge',
    [REPORT_DASHBOARD.WIDGET_TYPES.HEATMAP]: 'Heatmap',
    [REPORT_DASHBOARD.WIDGET_TYPES.FUNNEL]: 'Funnel',
    [REPORT_DASHBOARD.WIDGET_TYPES.TIMELINE]: 'Timeline',
    [REPORT_DASHBOARD.WIDGET_TYPES.CALENDAR]: 'Calendar',
    [REPORT_DASHBOARD.WIDGET_TYPES.ALERT]: 'Alert',
    [REPORT_DASHBOARD.WIDGET_TYPES.STATUS]: 'Status',
    [REPORT_DASHBOARD.WIDGET_TYPES.PROGRESS]: 'Progress',
    [REPORT_DASHBOARD.WIDGET_TYPES.KPI]: 'KPI',
    [REPORT_DASHBOARD.WIDGET_TYPES.COMPARISON]: 'Comparison',
    [REPORT_DASHBOARD.WIDGET_TYPES.TREND]: 'Trend',
    [REPORT_DASHBOARD.WIDGET_TYPES.DISTRIBUTION]: 'Distribution',
    [REPORT_DASHBOARD.WIDGET_TYPES.MAP]: 'Map',
    [REPORT_DASHBOARD.WIDGET_TYPES.IMAGE]: 'Image',
    [REPORT_DASHBOARD.WIDGET_TYPES.TEXT]: 'Text',
    [REPORT_DASHBOARD.WIDGET_TYPES.HTML]: 'HTML',
    [REPORT_DASHBOARD.WIDGET_TYPES.IFRAME]: 'Iframe',
    [REPORT_DASHBOARD.WIDGET_TYPES.CUSTOM]: 'Custom Widget',
  };
  return labels[widgetType] || 'Unknown Widget';
}

export function reportDashboardGetChartTypeLabel(chartType: ReportDashboardChartType): string {
  const labels: Record<ReportDashboardChartType, string> = {
    [REPORT_DASHBOARD.CHART_TYPES.LINE]: 'Line Chart',
    [REPORT_DASHBOARD.CHART_TYPES.BAR]: 'Bar Chart',
    [REPORT_DASHBOARD.CHART_TYPES.PIE]: 'Pie Chart',
    [REPORT_DASHBOARD.CHART_TYPES.DOUGHNUT]: 'Doughnut Chart',
    [REPORT_DASHBOARD.CHART_TYPES.AREA]: 'Area Chart',
    [REPORT_DASHBOARD.CHART_TYPES.SCATTER]: 'Scatter Plot',
    [REPORT_DASHBOARD.CHART_TYPES.BUBBLE]: 'Bubble Chart',
    [REPORT_DASHBOARD.CHART_TYPES.RADAR]: 'Radar Chart',
    [REPORT_DASHBOARD.CHART_TYPES.POLAR_AREA]: 'Polar Area Chart',
    [REPORT_DASHBOARD.CHART_TYPES.HEATMAP]: 'Heatmap',
    [REPORT_DASHBOARD.CHART_TYPES.TREEMAP]: 'Treemap',
    [REPORT_DASHBOARD.CHART_TYPES.SANKEY]: 'Sankey Diagram',
    [REPORT_DASHBOARD.CHART_TYPES.FUNNEL]: 'Funnel Chart',
    [REPORT_DASHBOARD.CHART_TYPES.GAUGE]: 'Gauge Chart',
    [REPORT_DASHBOARD.CHART_TYPES.HISTOGRAM]: 'Histogram',
    [REPORT_DASHBOARD.CHART_TYPES.BOX_PLOT]: 'Box Plot',
    [REPORT_DASHBOARD.CHART_TYPES.VIOLIN]: 'Violin Plot',
    [REPORT_DASHBOARD.CHART_TYPES.HORIZONTAL_BAR]: 'Horizontal Bar Chart',
    [REPORT_DASHBOARD.CHART_TYPES.STACKED_BAR]: 'Stacked Bar Chart',
    [REPORT_DASHBOARD.CHART_TYPES.STACKED_AREA]: 'Stacked Area Chart',
  };
  return labels[chartType] || 'Unknown Chart Type';
}

export function reportDashboardGetWidgetSizeLabel(size: ReportDashboardWidgetSize): string {
  const labels: Record<ReportDashboardWidgetSize, string> = {
    [REPORT_DASHBOARD.WIDGET_SIZES.TINY]: 'Tiny',
    [REPORT_DASHBOARD.WIDGET_SIZES.SMALL]: 'Small',
    [REPORT_DASHBOARD.WIDGET_SIZES.MEDIUM]: 'Medium',
    [REPORT_DASHBOARD.WIDGET_SIZES.LARGE]: 'Large',
    [REPORT_DASHBOARD.WIDGET_SIZES.XLARGE]: 'X-Large',
    [REPORT_DASHBOARD.WIDGET_SIZES.FULL]: 'Full Width',
    [REPORT_DASHBOARD.WIDGET_SIZES.AUTO]: 'Auto',
  };
  return labels[size] || 'Unknown Size';
}

export function reportDashboardGetRefreshIntervalLabel(
  interval: ReportDashboardRefreshInterval
): string {
  const labels: Record<ReportDashboardRefreshInterval, string> = {
    [REPORT_DASHBOARD.REFRESH_INTERVALS.REALTIME]: 'Realtime',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.SECONDS_10]: '10 Seconds',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.SECONDS_30]: '30 Seconds',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MINUTE]: '1 Minute',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MINUTES_5]: '5 Minutes',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MINUTES_10]: '10 Minutes',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MINUTES_15]: '15 Minutes',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MINUTES_30]: '30 Minutes',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.HOUR]: '1 Hour',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.HOURS_2]: '2 Hours',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.HOURS_6]: '6 Hours',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.HOURS_12]: '12 Hours',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.DAY]: '1 Day',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.WEEK]: '1 Week',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MONTH]: '1 Month',
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MANUAL]: 'Manual',
  };
  return labels[interval] || 'Unknown Interval';
}

export function reportDashboardGetTimeRangeLabel(timeRange: ReportDashboardTimeRange): string {
  const labels: Record<ReportDashboardTimeRange, string> = {
    [REPORT_DASHBOARD.TIME_RANGES.LAST_HOUR]: 'Last Hour',
    [REPORT_DASHBOARD.TIME_RANGES.LAST_6_HOURS]: 'Last 6 Hours',
    [REPORT_DASHBOARD.TIME_RANGES.LAST_12_HOURS]: 'Last 12 Hours',
    [REPORT_DASHBOARD.TIME_RANGES.LAST_24_HOURS]: 'Last 24 Hours',
    [REPORT_DASHBOARD.TIME_RANGES.LAST_7_DAYS]: 'Last 7 Days',
    [REPORT_DASHBOARD.TIME_RANGES.LAST_30_DAYS]: 'Last 30 Days',
    [REPORT_DASHBOARD.TIME_RANGES.LAST_90_DAYS]: 'Last 90 Days',
    [REPORT_DASHBOARD.TIME_RANGES.LAST_MONTH]: 'Last Month',
    [REPORT_DASHBOARD.TIME_RANGES.LAST_QUARTER]: 'Last Quarter',
    [REPORT_DASHBOARD.TIME_RANGES.LAST_YEAR]: 'Last Year',
    [REPORT_DASHBOARD.TIME_RANGES.CUSTOM]: 'Custom Range',
  };
  return labels[timeRange] || 'Unknown Time Range';
}

export function reportDashboardGetMetricLabel(metric: ReportDashboardMetric): string {
  const labels: Record<ReportDashboardMetric, string> = {
    [REPORT_DASHBOARD.METRICS.REVENUE]: 'Revenue',
    [REPORT_DASHBOARD.METRICS.ORDERS]: 'Orders',
    [REPORT_DASHBOARD.METRICS.CUSTOMERS]: 'Customers',
    [REPORT_DASHBOARD.METRICS.PRODUCTS]: 'Products',
    [REPORT_DASHBOARD.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [REPORT_DASHBOARD.METRICS.AVERAGE_ORDER_VALUE]: 'Average Order Value',
    [REPORT_DASHBOARD.METRICS.CUSTOMER_LIFETIME_VALUE]: 'Customer Lifetime Value',
    [REPORT_DASHBOARD.METRICS.CHURN_RATE]: 'Churn Rate',
    [REPORT_DASHBOARD.METRICS.RETENTION_RATE]: 'Retention Rate',
    [REPORT_DASHBOARD.METRICS.GROWTH_RATE]: 'Growth Rate',
    [REPORT_DASHBOARD.METRICS.PROFIT_MARGIN]: 'Profit Margin',
    [REPORT_DASHBOARD.METRICS.ROI]: 'ROI',
    [REPORT_DASHBOARD.METRICS.CAC]: 'Customer Acquisition Cost',
    [REPORT_DASHBOARD.METRICS.LTV]: 'Lifetime Value',
    [REPORT_DASHBOARD.METRICS.NPS]: 'Net Promoter Score',
    [REPORT_DASHBOARD.METRICS.CSAT]: 'Customer Satisfaction',
    [REPORT_DASHBOARD.METRICS.SLA]: 'SLA Compliance',
    [REPORT_DASHBOARD.METRICS.INVENTORY_TURNOVER]: 'Inventory Turnover',
    [REPORT_DASHBOARD.METRICS.FULFILLMENT_RATE]: 'Fulfillment Rate',
    [REPORT_DASHBOARD.METRICS.RETURN_RATE]: 'Return Rate',
  };
  return labels[metric] || 'Unknown Metric';
}

export function reportDashboardGetThemeLabel(theme: ReportDashboardTheme): string {
  const labels: Record<ReportDashboardTheme, string> = {
    [REPORT_DASHBOARD.THEMES.LIGHT]: 'Light',
    [REPORT_DASHBOARD.THEMES.DARK]: 'Dark',
    [REPORT_DASHBOARD.THEMES.BLUE]: 'Blue',
    [REPORT_DASHBOARD.THEMES.GREEN]: 'Green',
    [REPORT_DASHBOARD.THEMES.RED]: 'Red',
    [REPORT_DASHBOARD.THEMES.PURPLE]: 'Purple',
    [REPORT_DASHBOARD.THEMES.ORANGE]: 'Orange',
    [REPORT_DASHBOARD.THEMES.TEAL]: 'Teal',
    [REPORT_DASHBOARD.THEMES.PINK]: 'Pink',
    [REPORT_DASHBOARD.THEMES.INDIGO]: 'Indigo',
    [REPORT_DASHBOARD.THEMES.GRAY]: 'Gray',
    [REPORT_DASHBOARD.THEMES.CUSTOM]: 'Custom',
  };
  return labels[theme] || 'Unknown Theme';
}

export function reportDashboardIsValidType(type: string): type is ReportDashboardType {
  return Object.values(REPORT_DASHBOARD.TYPES).includes(type as ReportDashboardType);
}

export function reportDashboardIsValidWidgetType(
  widgetType: string
): widgetType is ReportDashboardWidgetType {
  return Object.values(REPORT_DASHBOARD.WIDGET_TYPES).includes(
    widgetType as ReportDashboardWidgetType
  );
}

export function reportDashboardGetDefaultRefreshInterval(): ReportDashboardRefreshInterval {
  return REPORT_DASHBOARD.DEFAULTS.REFRESH_INTERVAL as ReportDashboardRefreshInterval;
}

export function reportDashboardGetDefaultTimeRange(): ReportDashboardTimeRange {
  return REPORT_DASHBOARD.DEFAULTS.TIME_RANGE as ReportDashboardTimeRange;
}

export function reportDashboardGetRefreshIntervalMs(
  interval: ReportDashboardRefreshInterval
): number {
  const intervalMap: Record<ReportDashboardRefreshInterval, number> = {
    [REPORT_DASHBOARD.REFRESH_INTERVALS.REALTIME]: 1000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.SECONDS_10]: 10000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.SECONDS_30]: 30000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MINUTE]: 60000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MINUTES_5]: 300000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MINUTES_10]: 600000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MINUTES_15]: 900000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MINUTES_30]: 1800000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.HOUR]: 3600000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.HOURS_2]: 7200000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.HOURS_6]: 21600000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.HOURS_12]: 43200000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.DAY]: 86400000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.WEEK]: 604800000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MONTH]: 2592000000,
    [REPORT_DASHBOARD.REFRESH_INTERVALS.MANUAL]: 0,
  };
  return intervalMap[interval] || 0;
}
