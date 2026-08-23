/**
 * Performance Analytics Metric Constants
 * Metrics for measuring system and application performance
 */

export const PERFORMANCE_ANALYTICS_METRIC = {
  // System Metrics
  SYSTEM_METRICS: {
    CPU_AVG: 'cpu_avg',
    CPU_MAX: 'cpu_max',
    CPU_MIN: 'cpu_min',
    CPU_P95: 'cpu_p95',
    CPU_P99: 'cpu_p99',
    MEMORY_AVG: 'memory_avg',
    MEMORY_MAX: 'memory_max',
    MEMORY_MIN: 'memory_min',
    MEMORY_P95: 'memory_p95',
    MEMORY_P99: 'memory_p99',
    DISK_AVG: 'disk_avg',
    DISK_MAX: 'disk_max',
    DISK_MIN: 'disk_min',
    DISK_P95: 'disk_p95',
    DISK_P99: 'disk_p99',
    NETWORK_AVG: 'network_avg',
    NETWORK_MAX: 'network_max',
    NETWORK_MIN: 'network_min',
    NETWORK_P95: 'network_p95',
    NETWORK_P99: 'network_p99',
  } as const,

  // Response Metrics
  RESPONSE_METRICS: {
    RESPONSE_TIME_AVG: 'response_time_avg',
    RESPONSE_TIME_MAX: 'response_time_max',
    RESPONSE_TIME_MIN: 'response_time_min',
    RESPONSE_TIME_P50: 'response_time_p50',
    RESPONSE_TIME_P75: 'response_time_p75',
    RESPONSE_TIME_P90: 'response_time_p90',
    RESPONSE_TIME_P95: 'response_time_p95',
    RESPONSE_TIME_P99: 'response_time_p99',
    RESPONSE_TIME_STDDEV: 'response_time_stddev',
    RESPONSE_TIME_VARIANCE: 'response_time_variance',
  } as const,

  // Throughput Metrics
  THROUGHPUT_METRICS: {
    THROUGHPUT_AVG: 'throughput_avg',
    THROUGHPUT_MAX: 'throughput_max',
    THROUGHPUT_MIN: 'throughput_min',
    THROUGHPUT_P95: 'throughput_p95',
    THROUGHPUT_P99: 'throughput_p99',
    REQUESTS_PER_SECOND: 'requests_per_second',
    REQUESTS_PER_MINUTE: 'requests_per_minute',
    REQUESTS_PER_HOUR: 'requests_per_hour',
    TRANSACTIONS_PER_SECOND: 'transactions_per_second',
  } as const,

  // Latency Metrics
  LATENCY_METRICS: {
    LATENCY_AVG: 'latency_avg',
    LATENCY_MAX: 'latency_max',
    LATENCY_MIN: 'latency_min',
    LATENCY_P50: 'latency_p50',
    LATENCY_P75: 'latency_p75',
    LATENCY_P90: 'latency_p90',
    LATENCY_P95: 'latency_p95',
    LATENCY_P99: 'latency_p99',
    LATENCY_STDDEV: 'latency_stddev',
    LATENCY_VARIANCE: 'latency_variance',
  } as const,

  // Error Metrics
  ERROR_METRICS: {
    ERROR_RATE: 'error_rate',
    ERROR_COUNT: 'error_count',
    ERROR_PER_SECOND: 'error_per_second',
    ERROR_PER_MINUTE: 'error_per_minute',
    FATAL_ERROR_RATE: 'fatal_error_rate',
    FATAL_ERROR_COUNT: 'fatal_error_count',
    ERROR_P95: 'error_p95',
    ERROR_P99: 'error_p99',
  } as const,

  // Database Metrics
  DATABASE_METRICS: {
    QUERY_TIME_AVG: 'query_time_avg',
    QUERY_TIME_MAX: 'query_time_max',
    QUERY_TIME_MIN: 'query_time_min',
    QUERY_TIME_P95: 'query_time_p95',
    QUERY_TIME_P99: 'query_time_p99',
    QUERY_COUNT: 'query_count',
    QUERY_PER_SECOND: 'query_per_second',
    CACHE_HIT_RATE: 'cache_hit_rate',
    CACHE_MISS_RATE: 'cache_miss_rate',
    CACHE_HIT_COUNT: 'cache_hit_count',
    CACHE_MISS_COUNT: 'cache_miss_count',
    CONNECTION_POOL_SIZE: 'connection_pool_size',
    ACTIVE_CONNECTIONS: 'active_connections',
    IDLE_CONNECTIONS: 'idle_connections',
  } as const,

  // API Metrics
  API_METRICS: {
    API_RESPONSE_AVG: 'api_response_avg',
    API_RESPONSE_MAX: 'api_response_max',
    API_RESPONSE_MIN: 'api_response_min',
    API_RESPONSE_P95: 'api_response_p95',
    API_RESPONSE_P99: 'api_response_p99',
    API_THROUGHPUT: 'api_throughput',
    API_ERROR_RATE: 'api_error_rate',
    API_ERROR_COUNT: 'api_error_count',
    API_SUCCESS_RATE: 'api_success_rate',
    API_LATENCY_AVG: 'api_latency_avg',
    API_LATENCY_MAX: 'api_latency_max',
    API_LATENCY_MIN: 'api_latency_min',
    API_LATENCY_P95: 'api_latency_p95',
    API_LATENCY_P99: 'api_latency_p99',
  } as const,

  // Frontend Metrics
  FRONTEND_METRICS: {
    PAGE_LOAD_AVG: 'page_load_avg',
    PAGE_LOAD_MAX: 'page_load_max',
    PAGE_LOAD_MIN: 'page_load_min',
    PAGE_LOAD_P50: 'page_load_p50',
    PAGE_LOAD_P75: 'page_load_p75',
    PAGE_LOAD_P90: 'page_load_p90',
    PAGE_LOAD_P95: 'page_load_p95',
    PAGE_LOAD_P99: 'page_load_p99',
    RENDER_TIME_AVG: 'render_time_avg',
    RENDER_TIME_MAX: 'render_time_max',
    RENDER_TIME_MIN: 'render_time_min',
    RENDER_TIME_P95: 'render_time_p95',
    RENDER_TIME_P99: 'render_time_p99',
    INTERACTIVE_TIME_AVG: 'interactive_time_avg',
    INTERACTIVE_TIME_MAX: 'interactive_time_max',
    INTERACTIVE_TIME_MIN: 'interactive_time_min',
    INTERACTIVE_TIME_P95: 'interactive_time_p95',
    INTERACTIVE_TIME_P99: 'interactive_time_p99',
    FIRST_CONTENTFUL_PAINT: 'first_contentful_paint',
    TIME_TO_INTERACTIVE: 'time_to_interactive',
    FIRST_PAINT: 'first_paint',
    LARGEST_CONTENTFUL_PAINT: 'largest_contentful_paint',
    CUMULATIVE_LAYOUT_SHIFT: 'cumulative_layout_shift',
    CLS: 'cls',
  } as const,

  // User Experience Metrics
  UX_METRICS: {
    USER_SATISFACTION_SCORE: 'user_satisfaction_score',
    USER_ENGAGEMENT_SCORE: 'user_engagement_score',
    USER_RETENTION_SCORE: 'user_retention_score',
    USER_LOYALTY_SCORE: 'user_loyalty_score',
    USER_EXPERIENCE_SCORE: 'user_experience_score',
    NPS_SCORE: 'nps_score',
    CSAT_SCORE: 'csat_score',
    CES_SCORE: 'ces_score',
  } as const,

  // Business Metrics
  BUSINESS_METRICS: {
    REVENUE_PER_DAY: 'revenue_per_day',
    REVENUE_PER_WEEK: 'revenue_per_week',
    REVENUE_PER_MONTH: 'revenue_per_month',
    REVENUE_PER_QUARTER: 'revenue_per_quarter',
    REVENUE_PER_YEAR: 'revenue_per_year',
    GROWTH_RATE: 'growth_rate',
    GROWTH_PER_DAY: 'growth_per_day',
    GROWTH_PER_WEEK: 'growth_per_week',
    GROWTH_PER_MONTH: 'growth_per_month',
    EFFICIENCY_SCORE: 'efficiency_score',
    EFFICIENCY_RATIO: 'efficiency_ratio',
    PRODUCTIVITY_SCORE: 'productivity_score',
    PRODUCTIVITY_RATIO: 'productivity_ratio',
  } as const,

  // Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    DAY_OVER_DAY: 'day_over_day',
    PERIOD_COMPARISON: 'period_comparison',
    BASELINE_COMPARISON: 'baseline_comparison',
    BENCHMARK_COMPARISON: 'benchmark_comparison',
    TARGET_COMPARISON: 'target_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    SYSTEM: 'system',
    RESPONSE: 'response',
    THROUGHPUT: 'throughput',
    LATENCY: 'latency',
    ERROR: 'error',
    DATABASE: 'database',
    API: 'api',
    FRONTEND: 'frontend',
    UX: 'ux',
    BUSINESS: 'business',
    COMPARISON: 'comparison',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    RATE: 'rate',
    SCORE: 'score',
    DURATION: 'duration',
    COUNT: 'count',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    CURRENCY: 'currency',
    DURATION: 'duration',
    RATING: 'rating',
    COUNT: 'count',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Performance Analytics System Metrics
export type PerformanceAnalyticsSystemMetric =
  (typeof PERFORMANCE_ANALYTICS_METRIC.SYSTEM_METRICS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.SYSTEM_METRICS];

// Performance Analytics Response Metrics
export type PerformanceAnalyticsResponseMetric =
  (typeof PERFORMANCE_ANALYTICS_METRIC.RESPONSE_METRICS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.RESPONSE_METRICS];

// Performance Analytics Throughput Metrics
export type PerformanceAnalyticsThroughputMetric =
  (typeof PERFORMANCE_ANALYTICS_METRIC.THROUGHPUT_METRICS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.THROUGHPUT_METRICS];

// Performance Analytics Latency Metrics
export type PerformanceAnalyticsLatencyMetric =
  (typeof PERFORMANCE_ANALYTICS_METRIC.LATENCY_METRICS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.LATENCY_METRICS];

// Performance Analytics Error Metrics
export type PerformanceAnalyticsErrorMetric =
  (typeof PERFORMANCE_ANALYTICS_METRIC.ERROR_METRICS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.ERROR_METRICS];

// Performance Analytics Database Metrics
export type PerformanceAnalyticsDatabaseMetric =
  (typeof PERFORMANCE_ANALYTICS_METRIC.DATABASE_METRICS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.DATABASE_METRICS];

// Performance Analytics API Metrics
export type PerformanceAnalyticsAPIMetric =
  (typeof PERFORMANCE_ANALYTICS_METRIC.API_METRICS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.API_METRICS];

// Performance Analytics Frontend Metrics
export type PerformanceAnalyticsFrontendMetric =
  (typeof PERFORMANCE_ANALYTICS_METRIC.FRONTEND_METRICS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.FRONTEND_METRICS];

// Performance Analytics UX Metrics
export type PerformanceAnalyticsUXMetric =
  (typeof PERFORMANCE_ANALYTICS_METRIC.UX_METRICS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.UX_METRICS];

// Performance Analytics Business Metrics
export type PerformanceAnalyticsBusinessMetric =
  (typeof PERFORMANCE_ANALYTICS_METRIC.BUSINESS_METRICS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.BUSINESS_METRICS];

// Performance Analytics Comparison Metrics
export type PerformanceAnalyticsComparisonMetric =
  (typeof PERFORMANCE_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.COMPARISON_METRICS];

// Performance Analytics Metric Categories
export type PerformanceAnalyticsMetricCategory =
  (typeof PERFORMANCE_ANALYTICS_METRIC.CATEGORIES)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.CATEGORIES];

// Performance Analytics Metric Types
export type PerformanceAnalyticsMetricType =
  (typeof PERFORMANCE_ANALYTICS_METRIC.TYPES)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.TYPES];

// Performance Analytics Metric Formats
export type PerformanceAnalyticsMetricFormat =
  (typeof PERFORMANCE_ANALYTICS_METRIC.FORMATS)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.FORMATS];

// Performance Analytics Metric Priority
export type PerformanceAnalyticsMetricPriority =
  (typeof PERFORMANCE_ANALYTICS_METRIC.PRIORITY)[keyof typeof PERFORMANCE_ANALYTICS_METRIC.PRIORITY];

// Performance Analytics Metric Labels
export function getPerformanceAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // System Metrics
    cpu_avg: 'CPU Average',
    cpu_max: 'CPU Max',
    cpu_min: 'CPU Min',
    cpu_p95: 'CPU P95',
    cpu_p99: 'CPU P99',
    memory_avg: 'Memory Average',
    memory_max: 'Memory Max',
    memory_min: 'Memory Min',
    memory_p95: 'Memory P95',
    memory_p99: 'Memory P99',
    disk_avg: 'Disk Average',
    disk_max: 'Disk Max',
    disk_min: 'Disk Min',
    disk_p95: 'Disk P95',
    disk_p99: 'Disk P99',
    network_avg: 'Network Average',
    network_max: 'Network Max',
    network_min: 'Network Min',
    network_p95: 'Network P95',
    network_p99: 'Network P99',

    // Response Metrics
    response_time_avg: 'Response Time Avg',
    response_time_max: 'Response Time Max',
    response_time_min: 'Response Time Min',
    response_time_p50: 'Response Time P50',
    response_time_p75: 'Response Time P75',
    response_time_p90: 'Response Time P90',
    response_time_p95: 'Response Time P95',
    response_time_p99: 'Response Time P99',
    response_time_stddev: 'Response Time StdDev',
    response_time_variance: 'Response Time Variance',

    // Throughput Metrics
    throughput_avg: 'Throughput Avg',
    throughput_max: 'Throughput Max',
    throughput_min: 'Throughput Min',
    throughput_p95: 'Throughput P95',
    throughput_p99: 'Throughput P99',
    requests_per_second: 'Requests Per Second',
    requests_per_minute: 'Requests Per Minute',
    requests_per_hour: 'Requests Per Hour',
    transactions_per_second: 'Transactions Per Second',

    // Latency Metrics
    latency_avg: 'Latency Avg',
    latency_max: 'Latency Max',
    latency_min: 'Latency Min',
    latency_p50: 'Latency P50',
    latency_p75: 'Latency P75',
    latency_p90: 'Latency P90',
    latency_p95: 'Latency P95',
    latency_p99: 'Latency P99',
    latency_stddev: 'Latency StdDev',
    latency_variance: 'Latency Variance',

    // Error Metrics
    error_rate: 'Error Rate',
    error_count: 'Error Count',
    error_per_second: 'Error Per Second',
    error_per_minute: 'Error Per Minute',
    fatal_error_rate: 'Fatal Error Rate',
    fatal_error_count: 'Fatal Error Count',
    error_p95: 'Error P95',
    error_p99: 'Error P99',

    // Database Metrics
    query_time_avg: 'Query Time Avg',
    query_time_max: 'Query Time Max',
    query_time_min: 'Query Time Min',
    query_time_p95: 'Query Time P95',
    query_time_p99: 'Query Time P99',
    query_count: 'Query Count',
    query_per_second: 'Query Per Second',
    cache_hit_rate: 'Cache Hit Rate',
    cache_miss_rate: 'Cache Miss Rate',
    cache_hit_count: 'Cache Hit Count',
    cache_miss_count: 'Cache Miss Count',
    connection_pool_size: 'Connection Pool Size',
    active_connections: 'Active Connections',
    idle_connections: 'Idle Connections',

    // API Metrics
    api_response_avg: 'API Response Avg',
    api_response_max: 'API Response Max',
    api_response_min: 'API Response Min',
    api_response_p95: 'API Response P95',
    api_response_p99: 'API Response P99',
    api_throughput: 'API Throughput',
    api_error_rate: 'API Error Rate',
    api_error_count: 'API Error Count',
    api_success_rate: 'API Success Rate',
    api_latency_avg: 'API Latency Avg',
    api_latency_max: 'API Latency Max',
    api_latency_min: 'API Latency Min',
    api_latency_p95: 'API Latency P95',
    api_latency_p99: 'API Latency P99',

    // Frontend Metrics
    page_load_avg: 'Page Load Avg',
    page_load_max: 'Page Load Max',
    page_load_min: 'Page Load Min',
    page_load_p50: 'Page Load P50',
    page_load_p75: 'Page Load P75',
    page_load_p90: 'Page Load P90',
    page_load_p95: 'Page Load P95',
    page_load_p99: 'Page Load P99',
    render_time_avg: 'Render Time Avg',
    render_time_max: 'Render Time Max',
    render_time_min: 'Render Time Min',
    render_time_p95: 'Render Time P95',
    render_time_p99: 'Render Time P99',
    interactive_time_avg: 'Interactive Time Avg',
    interactive_time_max: 'Interactive Time Max',
    interactive_time_min: 'Interactive Time Min',
    interactive_time_p95: 'Interactive Time P95',
    interactive_time_p99: 'Interactive Time P99',
    first_contentful_paint: 'First Contentful Paint',
    time_to_interactive: 'Time to Interactive',
    first_paint: 'First Paint',
    largest_contentful_paint: 'Largest Contentful Paint',
    cumulative_layout_shift: 'Cumulative Layout Shift',
    cls: 'CLS',

    // UX Metrics
    user_satisfaction_score: 'User Satisfaction Score',
    user_engagement_score: 'User Engagement Score',
    user_retention_score: 'User Retention Score',
    user_loyalty_score: 'User Loyalty Score',
    user_experience_score: 'User Experience Score',
    nps_score: 'NPS Score',
    csat_score: 'CSAT Score',
    ces_score: 'CES Score',

    // Business Metrics
    revenue_per_day: 'Revenue Per Day',
    revenue_per_week: 'Revenue Per Week',
    revenue_per_month: 'Revenue Per Month',
    revenue_per_quarter: 'Revenue Per Quarter',
    revenue_per_year: 'Revenue Per Year',
    growth_rate: 'Growth Rate',
    growth_per_day: 'Growth Per Day',
    growth_per_week: 'Growth Per Week',
    growth_per_month: 'Growth Per Month',
    efficiency_score: 'Efficiency Score',
    efficiency_ratio: 'Efficiency Ratio',
    productivity_score: 'Productivity Score',
    productivity_ratio: 'Productivity Ratio',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    week_over_week: 'Week Over Week',
    day_over_day: 'Day Over Day',
    period_comparison: 'Period Comparison',
    baseline_comparison: 'Baseline Comparison',
    benchmark_comparison: 'Benchmark Comparison',
    target_comparison: 'Target Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Performance Analytics Metric Category Labels
export function getPerformanceAnalyticsMetricCategoryLabel(
  category: PerformanceAnalyticsMetricCategory
): string {
  const labels: Record<PerformanceAnalyticsMetricCategory, string> = {
    [PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.SYSTEM]: 'System',
    [PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.RESPONSE]: 'Response',
    [PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.THROUGHPUT]: 'Throughput',
    [PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.LATENCY]: 'Latency',
    [PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.ERROR]: 'Error',
    [PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.DATABASE]: 'Database',
    [PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.API]: 'API',
    [PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.FRONTEND]: 'Frontend',
    [PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.UX]: 'User Experience',
    [PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.BUSINESS]: 'Business',
    [PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Performance Analytics Metric Type Labels
export function getPerformanceAnalyticsMetricTypeLabel(
  type: PerformanceAnalyticsMetricType
): string {
  const labels: Record<PerformanceAnalyticsMetricType, string> = {
    [PERFORMANCE_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [PERFORMANCE_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [PERFORMANCE_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [PERFORMANCE_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [PERFORMANCE_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [PERFORMANCE_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
    [PERFORMANCE_ANALYTICS_METRIC.TYPES.DURATION]: 'Duration',
    [PERFORMANCE_ANALYTICS_METRIC.TYPES.COUNT]: 'Count',
  };
  return labels[type] || 'Unknown';
}

// Performance Analytics Metric Format Labels
export function getPerformanceAnalyticsMetricFormatLabel(
  format: PerformanceAnalyticsMetricFormat
): string {
  const labels: Record<PerformanceAnalyticsMetricFormat, string> = {
    [PERFORMANCE_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [PERFORMANCE_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [PERFORMANCE_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [PERFORMANCE_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [PERFORMANCE_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [PERFORMANCE_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
    [PERFORMANCE_ANALYTICS_METRIC.FORMATS.COUNT]: 'Count',
  };
  return labels[format] || 'Unknown';
}

// Performance Analytics Metric Priority Labels
export function getPerformanceAnalyticsMetricPriorityLabel(
  priority: PerformanceAnalyticsMetricPriority
): string {
  const labels: Record<PerformanceAnalyticsMetricPriority, string> = {
    [PERFORMANCE_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [PERFORMANCE_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [PERFORMANCE_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [PERFORMANCE_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getPerformanceAnalyticsMetricCategory(
  metric: string
): PerformanceAnalyticsMetricCategory {
  const systemMetrics = Object.values(
    PERFORMANCE_ANALYTICS_METRIC.SYSTEM_METRICS
  ) as readonly string[];
  const responseMetrics = Object.values(
    PERFORMANCE_ANALYTICS_METRIC.RESPONSE_METRICS
  ) as readonly string[];
  const throughputMetrics = Object.values(
    PERFORMANCE_ANALYTICS_METRIC.THROUGHPUT_METRICS
  ) as readonly string[];
  const latencyMetrics = Object.values(
    PERFORMANCE_ANALYTICS_METRIC.LATENCY_METRICS
  ) as readonly string[];
  const errorMetrics = Object.values(
    PERFORMANCE_ANALYTICS_METRIC.ERROR_METRICS
  ) as readonly string[];
  const databaseMetrics = Object.values(
    PERFORMANCE_ANALYTICS_METRIC.DATABASE_METRICS
  ) as readonly string[];
  const apiMetrics = Object.values(PERFORMANCE_ANALYTICS_METRIC.API_METRICS) as readonly string[];
  const frontendMetrics = Object.values(
    PERFORMANCE_ANALYTICS_METRIC.FRONTEND_METRICS
  ) as readonly string[];
  const uxMetrics = Object.values(PERFORMANCE_ANALYTICS_METRIC.UX_METRICS) as readonly string[];
  const businessMetrics = Object.values(
    PERFORMANCE_ANALYTICS_METRIC.BUSINESS_METRICS
  ) as readonly string[];
  const comparisonMetrics = Object.values(
    PERFORMANCE_ANALYTICS_METRIC.COMPARISON_METRICS
  ) as readonly string[];

  if (systemMetrics.includes(metric)) return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.SYSTEM;
  if (responseMetrics.includes(metric)) return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.RESPONSE;
  if (throughputMetrics.includes(metric)) return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.THROUGHPUT;
  if (latencyMetrics.includes(metric)) return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.LATENCY;
  if (errorMetrics.includes(metric)) return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.ERROR;
  if (databaseMetrics.includes(metric)) return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.DATABASE;
  if (apiMetrics.includes(metric)) return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.API;
  if (frontendMetrics.includes(metric)) return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.FRONTEND;
  if (uxMetrics.includes(metric)) return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.UX;
  if (businessMetrics.includes(metric)) return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.BUSINESS;
  if (comparisonMetrics.includes(metric)) return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return PERFORMANCE_ANALYTICS_METRIC.CATEGORIES.SYSTEM;
}

// Get metric type
export function getPerformanceAnalyticsMetricType(metric: string): PerformanceAnalyticsMetricType {
  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'hit_rate',
    'miss_rate',
    'error_rate',
    'success_rate',
    'growth_rate',
    'efficiency_ratio',
  ];

  const averageMetrics: string[] = ['avg', 'average', 'mean'];

  const durationMetrics: string[] = [
    'time',
    'duration',
    'load',
    'response',
    'latency',
    'paint',
    'interactive',
    'render',
    'query',
  ];

  const scoreMetrics: string[] = ['score', 'nps', 'csat', 'ces', 'cls'];

  const countMetrics: string[] = [
    'count',
    'size',
    'connections',
    'requests',
    'transactions',
    'queries',
    'errors',
  ];

  const lowerMetric = metric.toLowerCase();

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return PERFORMANCE_ANALYTICS_METRIC.TYPES.DURATION;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return PERFORMANCE_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am) => lowerMetric.includes(am))) {
    return PERFORMANCE_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm) => lowerMetric.includes(sm))) {
    return PERFORMANCE_ANALYTICS_METRIC.TYPES.SCORE;
  }

  if (countMetrics.some((cm) => lowerMetric.includes(cm))) {
    return PERFORMANCE_ANALYTICS_METRIC.TYPES.COUNT;
  }

  return PERFORMANCE_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getPerformanceAnalyticsMetricFormat(
  metric: string
): PerformanceAnalyticsMetricFormat {
  const durationMetrics: string[] = [
    'time',
    'duration',
    'load',
    'response',
    'latency',
    'paint',
    'interactive',
    'render',
    'query',
  ];

  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'hit_rate',
    'miss_rate',
    'error_rate',
    'success_rate',
    'growth_rate',
    'efficiency_ratio',
  ];

  const currencyMetrics: string[] = ['revenue', 'cost', 'profit'];

  const ratingMetrics: string[] = ['score', 'nps', 'csat', 'ces', 'cls'];

  const countMetrics: string[] = [
    'count',
    'size',
    'connections',
    'requests',
    'transactions',
    'queries',
    'errors',
  ];

  const lowerMetric = metric.toLowerCase();

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return PERFORMANCE_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (currencyMetrics.some((cm) => lowerMetric.includes(cm))) {
    return PERFORMANCE_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (ratingMetrics.some((rm) => lowerMetric.includes(rm))) {
    return PERFORMANCE_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return PERFORMANCE_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  if (countMetrics.some((cm) => lowerMetric.includes(cm))) {
    return PERFORMANCE_ANALYTICS_METRIC.FORMATS.COUNT;
  }

  return PERFORMANCE_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate average
export function calculatePerformanceAnalyticsAverage(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

// Calculate percentile
export function calculatePerformanceAnalyticsPercentile(
  values: number[],
  percentile: number
): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

// Calculate standard deviation
export function calculatePerformanceAnalyticsStdDev(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = calculatePerformanceAnalyticsAverage(values);
  const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
  const avgSquaredDiff = calculatePerformanceAnalyticsAverage(squaredDiffs);
  return Math.sqrt(avgSquaredDiff);
}

// Calculate error rate
export function calculatePerformanceAnalyticsErrorRate(errors: number, total: number): number {
  if (total === 0) return 0;
  return (errors / total) * 100;
}

// Calculate growth rate
export function calculatePerformanceAnalyticsGrowthRate(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

// Calculate throughput
export function calculatePerformanceAnalyticsThroughput(
  requests: number,
  duration: number
): number {
  if (duration === 0) return 0;
  return requests / duration;
}

// Calculate cache hit rate
export function calculatePerformanceAnalyticsCacheHitRate(hits: number, total: number): number {
  if (total === 0) return 0;
  return (hits / total) * 100;
}
