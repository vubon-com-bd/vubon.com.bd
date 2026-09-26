/**
 * Generic queue configuration
 * @module shared-config/infrastructure/queue
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const QUEUE_CONFIG = Object.freeze({
  driver: getOptionalEnv('QUEUE_DRIVER', 'bull'),
  enabled: getOptionalEnvBool('QUEUE_ENABLED', true),
  defaultPriority: getOptionalEnvInt('QUEUE_DEFAULT_PRIORITY', QUEUE_PRIORITY.NORMAL),
  defaultAttempts: getOptionalEnvInt('QUEUE_DEFAULT_ATTEMPTS', 3),
  defaultBackoffMs: getOptionalEnvInt('QUEUE_DEFAULT_BACKOFF_MS', 5000),
  defaultBackoffType: getOptionalEnv('QUEUE_DEFAULT_BACKOFF_TYPE', 'exponential'), // fixed | exponential
  defaultRemoveOnComplete: getOptionalEnvInt('QUEUE_REMOVE_ON_COMPLETE', 1000),
  defaultRemoveOnFail: getOptionalEnvInt('QUEUE_REMOVE_ON_FAIL', 5000),
  workerConcurrency: getOptionalEnvInt('QUEUE_WORKER_CONCURRENCY', 5),
  rateLimitPerSecond: getOptionalEnvInt('QUEUE_RATE_LIMIT_PER_SECOND', 100),
  maxJobsPerWorker: getOptionalEnvInt('QUEUE_MAX_JOBS_PER_WORKER', 100),
  autoStartWorkers: getOptionalEnvBool('QUEUE_AUTO_START_WORKERS', true),
} as const);

export type QueueConfig = typeof QUEUE_CONFIG;
