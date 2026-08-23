/**
 * Analytics Aggregation Constants
 * Aggregation methods for analytics data processing
 */

export const ANALYTICS_AGGREGATION = {
  // Aggregation Types
  TYPES: {
    // Statistical Aggregations
    SUM: 'sum',
    AVERAGE: 'average',
    MEAN: 'mean',
    MEDIAN: 'median',
    MODE: 'mode',
    COUNT: 'count',
    DISTINCT_COUNT: 'distinct_count',

    // Statistical Measures
    MIN: 'min',
    MAX: 'max',
    RANGE: 'range',
    PERCENTILE: 'percentile',
    PERCENTILE_25: 'percentile_25',
    PERCENTILE_50: 'percentile_50',
    PERCENTILE_75: 'percentile_75',
    PERCENTILE_90: 'percentile_90',
    PERCENTILE_95: 'percentile_95',
    PERCENTILE_99: 'percentile_99',

    // Statistical Dispersion
    STDDEV: 'stddev',
    STDDEV_POP: 'stddev_pop',
    STDDEV_SAMP: 'stddev_samp',
    VARIANCE: 'variance',
    VARIANCE_POP: 'variance_pop',
    VARIANCE_SAMP: 'variance_samp',

    // Advanced Aggregations
    APPROX_COUNT: 'approx_count',
    APPROX_PERCENTILE: 'approx_percentile',
    HLL: 'hll', // HyperLogLog
    CARDINALITY: 'cardinality',

    // Time Series Aggregations
    FIRST: 'first',
    LAST: 'last',
    EARLIEST: 'earliest',
    LATEST: 'latest',
    TRENDING: 'trending',
    MOVING_AVERAGE: 'moving_average',
    EXPONENTIAL_AVERAGE: 'exponential_average',

    // Custom Aggregations
    CUSTOM: 'custom',
    NONE: 'none',
  } as const,

  // Aggregation Categories
  CATEGORIES: {
    STATISTICAL: 'statistical',
    MATHEMATICAL: 'mathematical',
    TIME_SERIES: 'time_series',
    SET: 'set',
    DISTRIBUTION: 'distribution',
    CUSTOM: 'custom',
  } as const,

  // Aggregation Levels
  LEVELS: {
    RAW: 'raw',
    SUMMARY: 'summary',
    AGGREGATED: 'aggregated',
    ROLLED_UP: 'rolled_up',
    CUBE: 'cube',
  } as const,

  // Aggregation Scopes
  SCOPES: {
    GLOBAL: 'global',
    DIMENSION: 'dimension',
    TIME: 'time',
    FILTER: 'filter',
    SEGMENT: 'segment',
  } as const,

  // Aggregation Precision
  PRECISION: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    EXACT: 'exact',
  } as const,
} as const;

// Analytics Aggregation Types
export type AnalyticsAggregationType =
  (typeof ANALYTICS_AGGREGATION.TYPES)[keyof typeof ANALYTICS_AGGREGATION.TYPES];

// Analytics Aggregation Categories
export type AnalyticsAggregationCategory =
  (typeof ANALYTICS_AGGREGATION.CATEGORIES)[keyof typeof ANALYTICS_AGGREGATION.CATEGORIES];

// Analytics Aggregation Levels
export type AnalyticsAggregationLevel =
  (typeof ANALYTICS_AGGREGATION.LEVELS)[keyof typeof ANALYTICS_AGGREGATION.LEVELS];

// Analytics Aggregation Scopes
export type AnalyticsAggregationScope =
  (typeof ANALYTICS_AGGREGATION.SCOPES)[keyof typeof ANALYTICS_AGGREGATION.SCOPES];

// Analytics Aggregation Precision
export type AnalyticsAggregationPrecision =
  (typeof ANALYTICS_AGGREGATION.PRECISION)[keyof typeof ANALYTICS_AGGREGATION.PRECISION];

// Analytics Aggregation Labels
export function getAnalyticsAggregationLabel(aggregation: AnalyticsAggregationType): string {
  const labels: Record<AnalyticsAggregationType, string> = {
    [ANALYTICS_AGGREGATION.TYPES.SUM]: 'Sum',
    [ANALYTICS_AGGREGATION.TYPES.AVERAGE]: 'Average',
    [ANALYTICS_AGGREGATION.TYPES.MEAN]: 'Mean',
    [ANALYTICS_AGGREGATION.TYPES.MEDIAN]: 'Median',
    [ANALYTICS_AGGREGATION.TYPES.MODE]: 'Mode',
    [ANALYTICS_AGGREGATION.TYPES.COUNT]: 'Count',
    [ANALYTICS_AGGREGATION.TYPES.DISTINCT_COUNT]: 'Distinct Count',
    [ANALYTICS_AGGREGATION.TYPES.MIN]: 'Minimum',
    [ANALYTICS_AGGREGATION.TYPES.MAX]: 'Maximum',
    [ANALYTICS_AGGREGATION.TYPES.RANGE]: 'Range',
    [ANALYTICS_AGGREGATION.TYPES.PERCENTILE]: 'Percentile',
    [ANALYTICS_AGGREGATION.TYPES.PERCENTILE_25]: '25th Percentile',
    [ANALYTICS_AGGREGATION.TYPES.PERCENTILE_50]: '50th Percentile',
    [ANALYTICS_AGGREGATION.TYPES.PERCENTILE_75]: '75th Percentile',
    [ANALYTICS_AGGREGATION.TYPES.PERCENTILE_90]: '90th Percentile',
    [ANALYTICS_AGGREGATION.TYPES.PERCENTILE_95]: '95th Percentile',
    [ANALYTICS_AGGREGATION.TYPES.PERCENTILE_99]: '99th Percentile',
    [ANALYTICS_AGGREGATION.TYPES.STDDEV]: 'Standard Deviation',
    [ANALYTICS_AGGREGATION.TYPES.STDDEV_POP]: 'StdDev Population',
    [ANALYTICS_AGGREGATION.TYPES.STDDEV_SAMP]: 'StdDev Sample',
    [ANALYTICS_AGGREGATION.TYPES.VARIANCE]: 'Variance',
    [ANALYTICS_AGGREGATION.TYPES.VARIANCE_POP]: 'Variance Population',
    [ANALYTICS_AGGREGATION.TYPES.VARIANCE_SAMP]: 'Variance Sample',
    [ANALYTICS_AGGREGATION.TYPES.APPROX_COUNT]: 'Approximate Count',
    [ANALYTICS_AGGREGATION.TYPES.APPROX_PERCENTILE]: 'Approximate Percentile',
    [ANALYTICS_AGGREGATION.TYPES.HLL]: 'HyperLogLog',
    [ANALYTICS_AGGREGATION.TYPES.CARDINALITY]: 'Cardinality',
    [ANALYTICS_AGGREGATION.TYPES.FIRST]: 'First',
    [ANALYTICS_AGGREGATION.TYPES.LAST]: 'Last',
    [ANALYTICS_AGGREGATION.TYPES.EARLIEST]: 'Earliest',
    [ANALYTICS_AGGREGATION.TYPES.LATEST]: 'Latest',
    [ANALYTICS_AGGREGATION.TYPES.TRENDING]: 'Trending',
    [ANALYTICS_AGGREGATION.TYPES.MOVING_AVERAGE]: 'Moving Average',
    [ANALYTICS_AGGREGATION.TYPES.EXPONENTIAL_AVERAGE]: 'Exponential Average',
    [ANALYTICS_AGGREGATION.TYPES.CUSTOM]: 'Custom',
    [ANALYTICS_AGGREGATION.TYPES.NONE]: 'None',
  };
  return labels[aggregation] || 'Unknown';
}

// Analytics Aggregation Category Labels
export function getAnalyticsAggregationCategoryLabel(
  category: AnalyticsAggregationCategory
): string {
  const labels: Record<AnalyticsAggregationCategory, string> = {
    [ANALYTICS_AGGREGATION.CATEGORIES.STATISTICAL]: 'Statistical',
    [ANALYTICS_AGGREGATION.CATEGORIES.MATHEMATICAL]: 'Mathematical',
    [ANALYTICS_AGGREGATION.CATEGORIES.TIME_SERIES]: 'Time Series',
    [ANALYTICS_AGGREGATION.CATEGORIES.SET]: 'Set Operations',
    [ANALYTICS_AGGREGATION.CATEGORIES.DISTRIBUTION]: 'Distribution',
    [ANALYTICS_AGGREGATION.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown';
}

// Analytics Aggregation Level Labels
export function getAnalyticsAggregationLevelLabel(level: AnalyticsAggregationLevel): string {
  const labels: Record<AnalyticsAggregationLevel, string> = {
    [ANALYTICS_AGGREGATION.LEVELS.RAW]: 'Raw',
    [ANALYTICS_AGGREGATION.LEVELS.SUMMARY]: 'Summary',
    [ANALYTICS_AGGREGATION.LEVELS.AGGREGATED]: 'Aggregated',
    [ANALYTICS_AGGREGATION.LEVELS.ROLLED_UP]: 'Rolled Up',
    [ANALYTICS_AGGREGATION.LEVELS.CUBE]: 'Cube',
  };
  return labels[level] || 'Unknown';
}

// Analytics Aggregation Scope Labels
export function getAnalyticsAggregationScopeLabel(scope: AnalyticsAggregationScope): string {
  const labels: Record<AnalyticsAggregationScope, string> = {
    [ANALYTICS_AGGREGATION.SCOPES.GLOBAL]: 'Global',
    [ANALYTICS_AGGREGATION.SCOPES.DIMENSION]: 'Dimension',
    [ANALYTICS_AGGREGATION.SCOPES.TIME]: 'Time',
    [ANALYTICS_AGGREGATION.SCOPES.FILTER]: 'Filter',
    [ANALYTICS_AGGREGATION.SCOPES.SEGMENT]: 'Segment',
  };
  return labels[scope] || 'Unknown';
}

// Analytics Aggregation Precision Labels
export function getAnalyticsAggregationPrecisionLabel(
  precision: AnalyticsAggregationPrecision
): string {
  const labels: Record<AnalyticsAggregationPrecision, string> = {
    [ANALYTICS_AGGREGATION.PRECISION.LOW]: 'Low',
    [ANALYTICS_AGGREGATION.PRECISION.MEDIUM]: 'Medium',
    [ANALYTICS_AGGREGATION.PRECISION.HIGH]: 'High',
    [ANALYTICS_AGGREGATION.PRECISION.EXACT]: 'Exact',
  };
  return labels[precision] || 'Unknown';
}

// Check if aggregation is statistical
export function isAnalyticsAggregationStatistical(aggregation: AnalyticsAggregationType): boolean {
  const statisticalAggregations: AnalyticsAggregationType[] = [
    ANALYTICS_AGGREGATION.TYPES.MEAN,
    ANALYTICS_AGGREGATION.TYPES.MEDIAN,
    ANALYTICS_AGGREGATION.TYPES.MODE,
    ANALYTICS_AGGREGATION.TYPES.PERCENTILE,
    ANALYTICS_AGGREGATION.TYPES.PERCENTILE_25,
    ANALYTICS_AGGREGATION.TYPES.PERCENTILE_50,
    ANALYTICS_AGGREGATION.TYPES.PERCENTILE_75,
    ANALYTICS_AGGREGATION.TYPES.PERCENTILE_90,
    ANALYTICS_AGGREGATION.TYPES.PERCENTILE_95,
    ANALYTICS_AGGREGATION.TYPES.PERCENTILE_99,
    ANALYTICS_AGGREGATION.TYPES.STDDEV,
    ANALYTICS_AGGREGATION.TYPES.STDDEV_POP,
    ANALYTICS_AGGREGATION.TYPES.STDDEV_SAMP,
    ANALYTICS_AGGREGATION.TYPES.VARIANCE,
    ANALYTICS_AGGREGATION.TYPES.VARIANCE_POP,
    ANALYTICS_AGGREGATION.TYPES.VARIANCE_SAMP,
  ];
  return statisticalAggregations.includes(aggregation);
}

// Check if aggregation is mathematical
export function isAnalyticsAggregationMathematical(aggregation: AnalyticsAggregationType): boolean {
  const mathematicalAggregations: AnalyticsAggregationType[] = [
    ANALYTICS_AGGREGATION.TYPES.SUM,
    ANALYTICS_AGGREGATION.TYPES.AVERAGE,
    ANALYTICS_AGGREGATION.TYPES.COUNT,
    ANALYTICS_AGGREGATION.TYPES.DISTINCT_COUNT,
    ANALYTICS_AGGREGATION.TYPES.MIN,
    ANALYTICS_AGGREGATION.TYPES.MAX,
    ANALYTICS_AGGREGATION.TYPES.RANGE,
  ];
  return mathematicalAggregations.includes(aggregation);
}

// Check if aggregation is time series
export function isAnalyticsAggregationTimeSeries(aggregation: AnalyticsAggregationType): boolean {
  const timeSeriesAggregations: AnalyticsAggregationType[] = [
    ANALYTICS_AGGREGATION.TYPES.FIRST,
    ANALYTICS_AGGREGATION.TYPES.LAST,
    ANALYTICS_AGGREGATION.TYPES.EARLIEST,
    ANALYTICS_AGGREGATION.TYPES.LATEST,
    ANALYTICS_AGGREGATION.TYPES.TRENDING,
    ANALYTICS_AGGREGATION.TYPES.MOVING_AVERAGE,
    ANALYTICS_AGGREGATION.TYPES.EXPONENTIAL_AVERAGE,
  ];
  return timeSeriesAggregations.includes(aggregation);
}

// Check if aggregation is approximate
export function isAnalyticsAggregationApproximate(aggregation: AnalyticsAggregationType): boolean {
  const approximateAggregations: AnalyticsAggregationType[] = [
    ANALYTICS_AGGREGATION.TYPES.APPROX_COUNT,
    ANALYTICS_AGGREGATION.TYPES.APPROX_PERCENTILE,
    ANALYTICS_AGGREGATION.TYPES.HLL,
    ANALYTICS_AGGREGATION.TYPES.CARDINALITY,
  ];
  return approximateAggregations.includes(aggregation);
}

// Get aggregation category
export function getAnalyticsAggregationCategory(
  aggregation: AnalyticsAggregationType
): AnalyticsAggregationCategory {
  if (isAnalyticsAggregationStatistical(aggregation))
    return ANALYTICS_AGGREGATION.CATEGORIES.STATISTICAL;
  if (isAnalyticsAggregationMathematical(aggregation))
    return ANALYTICS_AGGREGATION.CATEGORIES.MATHEMATICAL;
  if (isAnalyticsAggregationTimeSeries(aggregation))
    return ANALYTICS_AGGREGATION.CATEGORIES.TIME_SERIES;
  if (isAnalyticsAggregationApproximate(aggregation)) return ANALYTICS_AGGREGATION.CATEGORIES.SET;
  return ANALYTICS_AGGREGATION.CATEGORIES.CUSTOM;
}
