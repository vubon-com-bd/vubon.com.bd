import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const PROVIDER_CONFIG = Object.freeze({
  timeoutMs: getOptionalEnvInt('PROVIDER_TIMEOUT_MS', 30000),
  retryAttempts: getOptionalEnvInt('PROVIDER_RETRY_ATTEMPTS', 3),
  retryBackoffMs: getOptionalEnvInt('PROVIDER_RETRY_BACKOFF_MS', 1000),
  circuitBreakerThreshold: getOptionalEnvInt('PROVIDER_CB_THRESHOLD', 5),
  circuitBreakerResetMs: getOptionalEnvInt('PROVIDER_CB_RESET_MS', 60000),
});
