/**
 * Account Lock Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';
import { SECURITY } from '@vubon/shared-constants/security';

export const AUTH_ACCOUNT_LOCK_CONFIG = Object.freeze({
  maxLoginAttempts: getOptionalEnvInt('LOCK_MAX_ATTEMPTS', SECURITY.MAX_LOGIN_ATTEMPTS),
  lockoutDurationSeconds: getOptionalEnvInt(
    'LOCK_DURATION',
    SECURITY.LOCKOUT_DURATION_SECONDS,
  ),
  autoUnlockEnabled: getOptionalEnvBool('LOCK_AUTO_UNLOCK', true),
  progressiveBackoffEnabled: getOptionalEnvBool('LOCK_PROGRESSIVE_BACKOFF', true),
  maxBackoffMultiplier: getOptionalEnvInt('LOCK_MAX_MULTIPLIER', 8),
});
