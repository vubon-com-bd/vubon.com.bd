export const ANALYTICS_METRIC_TYPE = {
  COUNTER: 'counter',
  GAUGE: 'gauge',
  HISTOGRAM: 'histogram',
  SUMMARY: 'summary',
  DERIVED: 'derived',
} as const;

export type AnalyticsMetricTypeType =
  (typeof ANALYTICS_METRIC_TYPE)[keyof typeof ANALYTICS_METRIC_TYPE];
