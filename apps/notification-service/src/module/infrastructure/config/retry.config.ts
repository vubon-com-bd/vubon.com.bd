/**
 * Retry Config
 * @module notification-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const RETRY_INFRA_CONFIG = Object.freeze({
  maxAttempts: getOptionalEnvInt('RETRY_MAX_ATTEMPTS', 3),
  initialDelayMs: getOptionalEnvInt('RETRY_INITIAL_DELAY_MS', 60_000),
  multiplier: getOptionalEnvInt('RETRY_MULTIPLIER', 2),
  maxDelayMs: getOptionalEnvInt('RETRY_MAX_DELAY_MS', 3_600_000),
  jitterRatio: 0.2,
  retryWindowMinutes: getOptionalEnvInt('RETRY_WINDOW_MIN', 1440),
});
