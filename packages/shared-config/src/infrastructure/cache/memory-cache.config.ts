/**
 * In-memory cache configuration (LRU-based)
 * @module shared-config/infrastructure/cache
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const MEMORY_CACHE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('MEMORY_CACHE_ENABLED', true),
  maxKeys: getOptionalEnvInt('MEMORY_CACHE_MAX_KEYS', 10000),
  maxMemoryMb: getOptionalEnvInt('MEMORY_CACHE_MAX_MEMORY_MB', 512),
  defaultTtlSeconds: getOptionalEnvInt('MEMORY_CACHE_DEFAULT_TTL_SECONDS', 300),
  checkIntervalMs: getOptionalEnvInt('MEMORY_CACHE_CHECK_INTERVAL_MS', 60000),
  updateAgeOnGet: getOptionalEnvBool('MEMORY_CACHE_UPDATE_AGE_ON_GET', true),
  allowStale: getOptionalEnvBool('MEMORY_CACHE_ALLOW_STALE', false),
  disposeAfterMs: getOptionalEnvInt('MEMORY_CACHE_DISPOSE_AFTER_MS', 0),
} as const);

export type MemoryCacheConfig = typeof MEMORY_CACHE_CONFIG;
