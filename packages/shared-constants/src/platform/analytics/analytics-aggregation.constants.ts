export const ANALYTICS_AGGREGATION = {
  SUM: 'sum',
  AVG: 'avg',
  MIN: 'min',
  MAX: 'max',
  COUNT: 'count',
  COUNT_DISTINCT: 'count_distinct',
  MEDIAN: 'median',
  MODE: 'mode',
  STDDEV: 'stddev',
  VARIANCE: 'variance',
  PERCENTILE: 'percentile',
  FIRST: 'first',
  LAST: 'last',
} as const;

export const ANALYTICS_PERCENTILE = {
  P25: 25,
  P50: 50,
  P75: 75,
  P90: 90,
  P95: 95,
  P99: 99,
} as const;

export const ANALYTICS_AGGREGATION_LIMIT = {
  MAX_GROUPS: 1000,
  MAX_AGGREGATIONS: 20,
  MAX_METRICS: 50,
  MAX_DIMENSIONS: 10,
} as const;

export type AnalyticsAggregationType =
  (typeof ANALYTICS_AGGREGATION)[keyof typeof ANALYTICS_AGGREGATION];
