/**
 * Redis base configuration
 * @module shared-config/infrastructure/redis
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

export const REDIS_CONFIG = Object.freeze({
  url: getOptionalEnv('REDIS_URL', 'redis://localhost:6379'),
  keyPrefix: loadEnv().REDIS_KEY_PREFIX,
  db: getOptionalEnvInt('REDIS_DB', 0),
  password: getOptionalEnv('REDIS_PASSWORD', ''),
  tls: getOptionalEnvBool('REDIS_TLS', false),
  connectTimeoutMs: getOptionalEnvInt('REDIS_CONNECT_TIMEOUT_MS', 5000),
  commandTimeoutMs: getOptionalEnvInt('REDIS_COMMAND_TIMEOUT_MS', 3000),
  maxRetriesPerRequest: getOptionalEnvInt('REDIS_MAX_RETRIES', 3),
  retryDelayMs: getOptionalEnvInt('REDIS_RETRY_DELAY_MS', 200),
  retryBackoffFactor: getOptionalEnvInt('REDIS_RETRY_BACKOFF', 2),
  enableOfflineQueue: getOptionalEnvBool('REDIS_ENABLE_OFFLINE_QUEUE', true),
  enableReadyCheck: getOptionalEnvBool('REDIS_ENABLE_READY_CHECK', true),
  lazyConnect: getOptionalEnvBool('REDIS_LAZY_CONNECT', false),
  keepAliveMs: getOptionalEnvInt('REDIS_KEEP_ALIVE_MS', 30000),
} as const);

export type RedisConfig = typeof REDIS_CONFIG;
