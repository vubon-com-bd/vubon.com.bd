import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const METRIC_CONFIG = Object.freeze({
  defaultAggregation: 'sum' as const,
  maxMetricsPerQuery: getOptionalEnvInt('METRIC_MAX_PER_QUERY', 50),
  maxDimensionsPerQuery: getOptionalEnvInt('METRIC_MAX_DIMS_PER_QUERY', 10),
  aggregationCacheTtlSeconds: getOptionalEnvInt('METRIC_AGG_CACHE_TTL', 600),
  reliableSampleThreshold: getOptionalEnvInt('METRIC_RELIABLE_SAMPLE', 30),
  highConfidenceSample: getOptionalEnvInt('METRIC_HIGH_CONF_SAMPLE', 1000),
  enableCache: getOptionalEnvBool('METRIC_ENABLE_CACHE', true),
  timeSeriesMaxPoints: getOptionalEnvInt('METRIC_TIME_SERIES_MAX_POINTS', 10000),
} as const);
