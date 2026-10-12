/**
 * Metric Configuration
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const METRIC_CONFIG = Object.freeze({
  aggregationEnabled: getOptionalEnvBool('ANALYTICS_METRIC_AGG_ENABLED', true),
  maxSeriesPerQuery: getOptionalEnvInt('ANALYTICS_METRIC_MAX_SERIES', 50),
  aggregationIntervalMs: getOptionalEnvInt('ANALYTICS_METRIC_AGG_INTERVAL_MS', 60000),
  cacheTtlSeconds: getOptionalEnvInt('ANALYTICS_METRIC_CACHE_TTL', 300),
  retentionDays: getOptionalEnvInt('ANALYTICS_METRIC_RETENTION_DAYS', 730),
  defaultGranularity: getOptionalEnv('ANALYTICS_METRIC_DEFAULT_GRANULARITY', 'hour'),
  backend: getOptionalEnv('ANALYTICS_METRIC_BACKEND', 'clickhouse'),
});
