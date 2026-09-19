/**
 * Redis queue-specific configuration (Bull/BullMQ)
 * @module shared-config/infrastructure/redis
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

export const REDIS_QUEUE_CONFIG = Object.freeze({
  keyPrefix: `${loadEnv().REDIS_KEY_PREFIX}queue:`,
  db: getOptionalEnvInt('REDIS_QUEUE_DB', 2),
  concurrency: getOptionalEnvInt('REDIS_QUEUE_CONCURRENCY', 5),
  maxStalledCount: getOptionalEnvInt('REDIS_QUEUE_MAX_STALLED', 2),
  stalledIntervalMs: getOptionalEnvInt('REDIS_QUEUE_STALLED_INTERVAL_MS', 30000),
  drainDelayMs: getOptionalEnvInt('REDIS_QUEUE_DRAIN_DELAY_MS', 5000),
  lockDurationMs: getOptionalEnvInt('REDIS_QUEUE_LOCK_DURATION_MS', 30000),
  lockRenewTimeMs: getOptionalEnvInt('REDIS_QUEUE_LOCK_RENEW_MS', 15000),
  enableAutoPipelining: getOptionalEnvBool('REDIS_QUEUE_AUTO_PIPELINE', true),
  skipVersionCheck: getOptionalEnvBool('REDIS_QUEUE_SKIP_VERSION_CHECK', false),
} as const);

export type RedisQueueConfig = typeof REDIS_QUEUE_CONFIG;
