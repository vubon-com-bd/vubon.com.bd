/**
 * Job scheduler configuration
 * @module shared-config/infrastructure/queue
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const JOB_CONFIG = Object.freeze({
  schedulerEnabled: getOptionalEnvBool('JOB_SCHEDULER_ENABLED', true),
  schedulerIntervalMs: getOptionalEnvInt('JOB_SCHEDULER_INTERVAL_MS', 60000),
  maxJobsPerTick: getOptionalEnvInt('JOB_MAX_PER_TICK', 100),
  defaultTimeoutMs: getOptionalEnvInt('JOB_DEFAULT_TIMEOUT_MS', 60000),
  longJobTimeoutMs: getOptionalEnvInt('JOB_LONG_TIMEOUT_MS', 600000),
  keepResultsDays: getOptionalEnvInt('JOB_KEEP_RESULTS_DAYS', 7),
  cleanupIntervalMs: getOptionalEnvInt('JOB_CLEANUP_INTERVAL_MS', 3600000),
} as const);

export type JobConfig = typeof JOB_CONFIG;
