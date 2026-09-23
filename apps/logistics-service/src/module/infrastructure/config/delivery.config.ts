import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const DELIVERY_CONFIG = Object.freeze({
  maxAttempts: getOptionalEnvInt('DELIVERY_MAX_ATTEMPTS', 3),
  attemptIntervalHours: getOptionalEnvInt('DELIVERY_ATTEMPT_INTERVAL_HOURS', 24),
  requireProof: getOptionalEnv('DELIVERY_REQUIRE_PROOF', 'true') === 'true',
});
