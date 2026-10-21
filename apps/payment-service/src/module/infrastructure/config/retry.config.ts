/**
 * Retry Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const RETRY_INFRA_CONFIG = Object.freeze({
  maxAttempts: getOptionalEnvInt('RETRY_MAX_ATTEMPTS', 3),
  delayMs: getOptionalEnvInt('RETRY_DELAY_MS', 200),
  backoffFactor: getOptionalEnvInt('RETRY_BACKOFF_FACTOR', 2),
  maxDelayMs: getOptionalEnvInt('RETRY_MAX_DELAY_MS', 5000),
  circuitBreakerThreshold: getOptionalEnvInt('RETRY_CB_THRESHOLD', 5),
  circuitBreakerOpenMs: getOptionalEnvInt('RETRY_CB_OPEN_MS', 30_000),
});

export type RetryInfraConfig = typeof RETRY_INFRA_CONFIG;
