import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const RETRY_CONFIG = Object.freeze({
  maxAttempts: getOptionalEnvInt('RETRY_MAX_ATTEMPTS', 3),
  baseDelayMs: getOptionalEnvInt('RETRY_BASE_DELAY_MS', 1000),
  maxDelayMs: getOptionalEnvInt('RETRY_MAX_DELAY_MS', 60000),
  backoffMultiplier: getOptionalEnvInt('RETRY_BACKOFF_MULT', 2),
});
