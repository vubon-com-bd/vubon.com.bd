import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const CHECKOUT_CONFIG = Object.freeze({
  sessionTtlSeconds: getOptionalEnvInt('CHECKOUT_SESSION_TTL', 1800),
  maxRetries: getOptionalEnvInt('CHECKOUT_MAX_RETRIES', 3),
  autoAbandonAfterSeconds: getOptionalEnvInt('CHECKOUT_AUTO_ABANDON', 3600),
  requireAllSteps: true,
} as const);
