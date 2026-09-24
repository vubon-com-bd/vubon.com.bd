import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const CACHE_CONFIG = Object.freeze({
  defaultTtlSeconds: getOptionalEnvInt('CACHE_DEFAULT_TTL', 300),
  aggregationTtlSeconds: getOptionalEnvInt('CACHE_AGGREGATION_TTL', 600),
  dashboardTtlSeconds: getOptionalEnvInt('CACHE_DASHBOARD_TTL', 900),
  reportTtlSeconds: getOptionalEnvInt('CACHE_REPORT_TTL', 1800),
  maxCacheEntries: getOptionalEnvInt('CACHE_MAX_ENTRIES', 10_000),
  enableWarmup: getOptionalEnvBool('CACHE_ENABLE_WARMUP', true),
  warmupIntervalSeconds: getOptionalEnvInt('CACHE_WARMUP_INTERVAL', 300),
} as const);
