/**
 * Logistics Analytics Constants
 * Configuration for logistics analytics - Bangladesh based
 */

export const LOGISTICS_ANALYTICS = {
  // Analytics Types
  TYPES: {
    SHIPMENT: 'shipment',
    DELIVERY: 'delivery',
    PERFORMANCE: 'performance',
    COST: 'cost',
    EFFICIENCY: 'efficiency',
    QUALITY: 'quality',
    TRENDING: 'trending',
    PREDICTIVE: 'predictive',
  } as const,

  // Analytics Statuses
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
  } as const,

  // Metrics
  METRICS: {
    // Shipment Metrics
    SHIPMENT_COUNT: 'shipment_count',
    SHIPMENT_VOLUME: 'shipment_volume',
    SHIPMENT_WEIGHT: 'shipment_weight',

    // Delivery Metrics
    DELIVERY_TIME: 'delivery_time',
    DELIVERY_RATE: 'delivery_rate',
    ON_TIME_DELIVERY: 'on_time_delivery',
    DELIVERY_FAILURES: 'delivery_failures',

    // Performance Metrics
    AVG_RESPONSE_TIME: 'avg_response_time',
    AVG_HANDLE_TIME: 'avg_handle_time',
    AGENT_PRODUCTIVITY: 'agent_productivity',
    UTILIZATION_RATE: 'utilization_rate',

    // Cost Metrics
    COST_PER_SHIPMENT: 'cost_per_shipment',
    FUEL_COST: 'fuel_cost',
    MAINTENANCE_COST: 'maintenance_cost',
    LABOR_COST: 'labor_cost',

    // Efficiency Metrics
    EFFICIENCY_RATE: 'efficiency_rate',
    OPTIMIZATION_SCORE: 'optimization_score',
    ROUTE_EFFICIENCY: 'route_efficiency',

    // Quality Metrics
    QUALITY_SCORE: 'quality_score',
    CUSTOMER_SATISFACTION: 'customer_satisfaction',
    COMPLAINT_RATE: 'complaint_rate',
    RETURN_RATE: 'return_rate',
  } as const,

  // Time Periods
  PERIODS: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    CUSTOM: 'custom',
  } as const,

  // Aggregations
  AGGREGATIONS: {
    SUM: 'sum',
    AVG: 'avg',
    MIN: 'min',
    MAX: 'max',
    COUNT: 'count',
    PERCENTILE: 'percentile',
    MEDIAN: 'median',
    MODE: 'mode',
  } as const,

  // Comparison Types
  COMPARISONS: {
    PERIOD_OVER_PERIOD: 'period_over_period',
    YEAR_OVER_YEAR: 'year_over_year',
    TARGET_VS_ACTUAL: 'target_vs_actual',
    BENCHMARK: 'benchmark',
    REGIONAL: 'regional',
  } as const,

  // Dashboard Types
  DASHBOARD_TYPES: {
    OPERATIONAL: 'operational',
    EXECUTIVE: 'executive',
    PERFORMANCE: 'performance',
    FINANCIAL: 'financial',
    CUSTOMER: 'customer',
  } as const,

  // Chart Types
  CHART_TYPES: {
    LINE: 'line',
    BAR: 'bar',
    PIE: 'pie',
    AREA: 'area',
    SCATTER: 'scatter',
    HEATMAP: 'heatmap',
    STACKED: 'stacked',
    GAUGE: 'gauge',
    TABLE: 'table',
  } as const,

  // Refresh Intervals (in seconds)
  REFRESH_INTERVALS: {
    REAL_TIME: 5,
    HIGH: 30,
    MEDIUM: 300,
    LOW: 1800,
    DAILY: 86400,
  } as const,
} as const;

// Analytics Types
export type LogisticsAnalyticsType =
  (typeof LOGISTICS_ANALYTICS.TYPES)[keyof typeof LOGISTICS_ANALYTICS.TYPES];

// Analytics Statuses
export type LogisticsAnalyticsStatus =
  (typeof LOGISTICS_ANALYTICS.STATUS)[keyof typeof LOGISTICS_ANALYTICS.STATUS];

// Metrics
export type LogisticsAnalyticsMetric =
  (typeof LOGISTICS_ANALYTICS.METRICS)[keyof typeof LOGISTICS_ANALYTICS.METRICS];

// Time Periods
export type LogisticsAnalyticsPeriod =
  (typeof LOGISTICS_ANALYTICS.PERIODS)[keyof typeof LOGISTICS_ANALYTICS.PERIODS];

// Aggregations
export type LogisticsAnalyticsAggregation =
  (typeof LOGISTICS_ANALYTICS.AGGREGATIONS)[keyof typeof LOGISTICS_ANALYTICS.AGGREGATIONS];

// Dashboard Types
export type LogisticsAnalyticsDashboardType =
  (typeof LOGISTICS_ANALYTICS.DASHBOARD_TYPES)[keyof typeof LOGISTICS_ANALYTICS.DASHBOARD_TYPES];

// Chart Types
export type LogisticsAnalyticsChartType =
  (typeof LOGISTICS_ANALYTICS.CHART_TYPES)[keyof typeof LOGISTICS_ANALYTICS.CHART_TYPES];

// Utility Functions
export function logisticsAnalyticsGetTypeLabel(type: LogisticsAnalyticsType): string {
  const labels: Record<LogisticsAnalyticsType, string> = {
    [LOGISTICS_ANALYTICS.TYPES.SHIPMENT]: 'Shipment Analytics',
    [LOGISTICS_ANALYTICS.TYPES.DELIVERY]: 'Delivery Analytics',
    [LOGISTICS_ANALYTICS.TYPES.PERFORMANCE]: 'Performance Analytics',
    [LOGISTICS_ANALYTICS.TYPES.COST]: 'Cost Analytics',
    [LOGISTICS_ANALYTICS.TYPES.EFFICIENCY]: 'Efficiency Analytics',
    [LOGISTICS_ANALYTICS.TYPES.QUALITY]: 'Quality Analytics',
    [LOGISTICS_ANALYTICS.TYPES.TRENDING]: 'Trending Analytics',
    [LOGISTICS_ANALYTICS.TYPES.PREDICTIVE]: 'Predictive Analytics',
  };
  return labels[type] || 'Unknown';
}

export function logisticsAnalyticsGetStatusLabel(status: LogisticsAnalyticsStatus): string {
  const labels: Record<LogisticsAnalyticsStatus, string> = {
    [LOGISTICS_ANALYTICS.STATUS.PENDING]: 'Pending',
    [LOGISTICS_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [LOGISTICS_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [LOGISTICS_ANALYTICS.STATUS.FAILED]: 'Failed',
    [LOGISTICS_ANALYTICS.STATUS.SCHEDULED]: 'Scheduled',
  };
  return labels[status] || 'Unknown';
}

export function logisticsAnalyticsGetMetricLabel(metric: LogisticsAnalyticsMetric): string {
  const labels: Record<LogisticsAnalyticsMetric, string> = {
    [LOGISTICS_ANALYTICS.METRICS.SHIPMENT_COUNT]: 'Shipment Count',
    [LOGISTICS_ANALYTICS.METRICS.SHIPMENT_VOLUME]: 'Shipment Volume',
    [LOGISTICS_ANALYTICS.METRICS.SHIPMENT_WEIGHT]: 'Shipment Weight',
    [LOGISTICS_ANALYTICS.METRICS.DELIVERY_TIME]: 'Delivery Time',
    [LOGISTICS_ANALYTICS.METRICS.DELIVERY_RATE]: 'Delivery Rate',
    [LOGISTICS_ANALYTICS.METRICS.ON_TIME_DELIVERY]: 'On-Time Delivery',
    [LOGISTICS_ANALYTICS.METRICS.DELIVERY_FAILURES]: 'Delivery Failures',
    [LOGISTICS_ANALYTICS.METRICS.AVG_RESPONSE_TIME]: 'Avg Response Time',
    [LOGISTICS_ANALYTICS.METRICS.AVG_HANDLE_TIME]: 'Avg Handle Time',
    [LOGISTICS_ANALYTICS.METRICS.AGENT_PRODUCTIVITY]: 'Agent Productivity',
    [LOGISTICS_ANALYTICS.METRICS.UTILIZATION_RATE]: 'Utilization Rate',
    [LOGISTICS_ANALYTICS.METRICS.COST_PER_SHIPMENT]: 'Cost per Shipment',
    [LOGISTICS_ANALYTICS.METRICS.FUEL_COST]: 'Fuel Cost',
    [LOGISTICS_ANALYTICS.METRICS.MAINTENANCE_COST]: 'Maintenance Cost',
    [LOGISTICS_ANALYTICS.METRICS.LABOR_COST]: 'Labor Cost',
    [LOGISTICS_ANALYTICS.METRICS.EFFICIENCY_RATE]: 'Efficiency Rate',
    [LOGISTICS_ANALYTICS.METRICS.OPTIMIZATION_SCORE]: 'Optimization Score',
    [LOGISTICS_ANALYTICS.METRICS.ROUTE_EFFICIENCY]: 'Route Efficiency',
    [LOGISTICS_ANALYTICS.METRICS.QUALITY_SCORE]: 'Quality Score',
    [LOGISTICS_ANALYTICS.METRICS.CUSTOMER_SATISFACTION]: 'Customer Satisfaction',
    [LOGISTICS_ANALYTICS.METRICS.COMPLAINT_RATE]: 'Complaint Rate',
    [LOGISTICS_ANALYTICS.METRICS.RETURN_RATE]: 'Return Rate',
  };
  return labels[metric] || 'Unknown';
}

export function logisticsAnalyticsGetPeriodLabel(period: LogisticsAnalyticsPeriod): string {
  const labels: Record<LogisticsAnalyticsPeriod, string> = {
    [LOGISTICS_ANALYTICS.PERIODS.HOURLY]: 'Hourly',
    [LOGISTICS_ANALYTICS.PERIODS.DAILY]: 'Daily',
    [LOGISTICS_ANALYTICS.PERIODS.WEEKLY]: 'Weekly',
    [LOGISTICS_ANALYTICS.PERIODS.MONTHLY]: 'Monthly',
    [LOGISTICS_ANALYTICS.PERIODS.QUARTERLY]: 'Quarterly',
    [LOGISTICS_ANALYTICS.PERIODS.YEARLY]: 'Yearly',
    [LOGISTICS_ANALYTICS.PERIODS.CUSTOM]: 'Custom',
  };
  return labels[period] || 'Unknown';
}

export function logisticsAnalyticsGetDashboardTypeLabel(
  type: LogisticsAnalyticsDashboardType
): string {
  const labels: Record<LogisticsAnalyticsDashboardType, string> = {
    [LOGISTICS_ANALYTICS.DASHBOARD_TYPES.OPERATIONAL]: 'Operational Dashboard',
    [LOGISTICS_ANALYTICS.DASHBOARD_TYPES.EXECUTIVE]: 'Executive Dashboard',
    [LOGISTICS_ANALYTICS.DASHBOARD_TYPES.PERFORMANCE]: 'Performance Dashboard',
    [LOGISTICS_ANALYTICS.DASHBOARD_TYPES.FINANCIAL]: 'Financial Dashboard',
    [LOGISTICS_ANALYTICS.DASHBOARD_TYPES.CUSTOMER]: 'Customer Dashboard',
  };
  return labels[type] || 'Unknown';
}

export function logisticsAnalyticsIsCompleted(status: LogisticsAnalyticsStatus): boolean {
  return status === LOGISTICS_ANALYTICS.STATUS.COMPLETED;
}

export function logisticsAnalyticsIsProcessing(status: LogisticsAnalyticsStatus): boolean {
  return (
    status === LOGISTICS_ANALYTICS.STATUS.PENDING ||
    status === LOGISTICS_ANALYTICS.STATUS.PROCESSING
  );
}
