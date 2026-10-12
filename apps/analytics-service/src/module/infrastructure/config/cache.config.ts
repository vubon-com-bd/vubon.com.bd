/**
 * Cache Configuration
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const ANALYTICS_CACHE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ANALYTICS_CACHE_ENABLED', true),
  provider: getOptionalEnv('ANALYTICS_CACHE_PROVIDER', 'redis') as 'redis' | 'memory',
  keyPrefix: getOptionalEnv('ANALYTICS_CACHE_PREFIX', 'analytics:'),
  defaultTtlSeconds: getOptionalEnvInt('ANALYTICS_CACHE_DEFAULT_TTL', 3600),
  metricTtlSeconds: getOptionalEnvInt('ANALYTICS_CACHE_METRIC_TTL', 300),
  dashboardTtlSeconds: getOptionalEnvInt('ANALYTICS_CACHE_DASHBOARD_TTL', 1800),
  reportTtlSeconds: getOptionalEnvInt('ANALYTICS_CACHE_REPORT_TTL', 3600),
  invalidateOnWrite: getOptionalEnvBool('ANALYTICS_CACHE_INVALIDATE_WRITE', true),
  warmOnBoot: getOptionalEnvBool('ANALYTICS_CACHE_WARM_BOOT', true),
});
