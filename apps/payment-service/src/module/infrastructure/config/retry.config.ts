import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const RETRY_CONFIG = Object.freeze({
  maxAttempts: getOptionalEnvInt('RETRY_MAX_ATTEMPTS', 3),
  initialDelayMs: getOptionalEnvInt('RETRY_INITIAL_DELAY_MS', 500),
  maxDelayMs: getOptionalEnvInt('RETRY_MAX_DELAY_MS', 30000),
  backoffMultiplier: getOptionalEnvInt('RETRY_BACKOFF_MULTIPLIER', 2),
} as const);
