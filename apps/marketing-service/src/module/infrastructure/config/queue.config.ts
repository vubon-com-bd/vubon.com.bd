import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const QUEUE_CONFIG = Object.freeze({
  concurrency: getOptionalEnvInt('MARKETING_QUEUE_CONCURRENCY', 5),
  maxAttempts: getOptionalEnvInt('MARKETING_QUEUE_MAX_ATTEMPTS', 3),
  backoffMs: getOptionalEnvInt('MARKETING_QUEUE_BACKOFF_MS', 5000),
  removeOnComplete: 1000,
  removeOnFail: 5000,
} as const);
