import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SCHEDULE_CONFIG = Object.freeze({
  maxSchedules: getOptionalEnvInt('SCHEDULE_MAX', 10000),
  pollIntervalMs: getOptionalEnvInt('SCHEDULE_POLL_INTERVAL_MS', 30000),
  batchSize: getOptionalEnvInt('SCHEDULE_BATCH_SIZE', 100),
});
