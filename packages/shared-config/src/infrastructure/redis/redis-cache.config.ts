/**
 * Redis cache-specific configuration
 * @module shared-config/infrastructure/redis
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

export const REDIS_CACHE_CONFIG = Object.freeze({
  keyPrefix: `${loadEnv().REDIS_KEY_PREFIX}cache:`,
  db: getOptionalEnvInt('REDIS_CACHE_DB', 1),
  defaultTtlSeconds: getOptionalEnvInt('REDIS_CACHE_DEFAULT_TTL', 3600),
  maxTtlSeconds: getOptionalEnvInt('REDIS_CACHE_MAX_TTL', 2592000),
  staleWhileRevalidateSeconds: getOptionalEnvInt('REDIS_CACHE_SWR_SECONDS', 60),
  compressionEnabled: getOptionalEnvBool('REDIS_CACHE_COMPRESSION', false),
  maxKeyLength: getOptionalEnvInt('REDIS_CACHE_MAX_KEY_LENGTH', 512),
  maxValueBytes: getOptionalEnvInt('REDIS_CACHE_MAX_VALUE_BYTES', 1048576),
  evictionPolicy: getOptionalEnv('REDIS_CACHE_EVICTION', 'allkeys-lru'),
} as const);

export type RedisCacheConfig = typeof REDIS_CACHE_CONFIG;
