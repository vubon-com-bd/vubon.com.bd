/**
 * Cache configuration
 * @module shared-config/infrastructure/cache
 *
 * Values আসে shared-constants/infrastructure/cache.constants থেকে।
 */
import { CACHE_STRATEGY, CACHE_EVICTION } from '@vubon/shared-constants/infrastructure';
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const CACHE_CONFIG = Object.freeze({
  driver: getOptionalEnv('CACHE_DRIVER', 'redis'), // redis | memory | hybrid
  enabled: getOptionalEnvBool('CACHE_ENABLED', true),
  strategy: getOptionalEnv('CACHE_STRATEGY', CACHE_STRATEGY.CACHE_ASIDE),
  eviction: getOptionalEnv('CACHE_EVICTION', CACHE_EVICTION.LRU),
  defaultTtlSeconds: getOptionalEnvInt('CACHE_DEFAULT_TTL_SECONDS', 3600),
  maxTtlSeconds: getOptionalEnvInt('CACHE_MAX_TTL_SECONDS', 2592000),
  negativeTtlSeconds: getOptionalEnvInt('CACHE_NEGATIVE_TTL_SECONDS', 60),
  staleWhileRevalidate: getOptionalEnvBool('CACHE_SWR_ENABLED', true),
  staleTtlSeconds: getOptionalEnvInt('CACHE_STALE_TTL_SECONDS', 60),
  keyPrefix: getOptionalEnv('CACHE_KEY_PREFIX', 'vubon:cache:'),
  maxKeyLength: getOptionalEnvInt('CACHE_MAX_KEY_LENGTH', 512),
  compress: getOptionalEnvBool('CACHE_COMPRESS', false),
  compressAboveBytes: getOptionalEnvInt('CACHE_COMPRESS_ABOVE_BYTES', 1024),
  singleFlightEnabled: getOptionalEnvBool('CACHE_SINGLE_FLIGHT', true),
} as const);

export type CacheConfig = typeof CACHE_CONFIG;
