/**
 * Bull / BullMQ specific configuration
 * @module shared-config/infrastructure/queue
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const BULL_CONFIG = Object.freeze({
  prefix: 'bull',
  concurrency: getOptionalEnvInt('BULL_CONCURRENCY', 5),
  lockDurationMs: getOptionalEnvInt('BULL_LOCK_DURATION_MS', 30000),
  lockRenewTimeMs: getOptionalEnvInt('BULL_LOCK_RENEW_MS', 15000),
  stalledIntervalMs: getOptionalEnvInt('BULL_STALLED_INTERVAL_MS', 30000),
  maxStalledCount: getOptionalEnvInt('BULL_MAX_STALLED_COUNT', 2),
  drainDelayMs: getOptionalEnvInt('BULL_DRAIN_DELAY_MS', 5000),
  retryProcessDelayMs: getOptionalEnvInt('BULL_RETRY_PROCESS_DELAY_MS', 5000),
  skipLockRenewal: getOptionalEnvBool('BULL_SKIP_LOCK_RENEWAL', false),
  metrics: Object.freeze({
    enabled: getOptionalEnvBool('BULL_METRICS', true),
    maxDataPoints: getOptionalEnvInt('BULL_METRICS_MAX_DATA_POINTS', 1000),
  }),
} as const);

export type BullConfig = typeof BULL_CONFIG;
