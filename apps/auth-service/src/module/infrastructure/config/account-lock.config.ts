/**
 * ACCOUNT_LOCK_CONFIG — Lockout policy configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';
import { SECURITY } from '@vubon/shared-constants/security';

export const ACCOUNT_LOCK_CONFIG = Object.freeze({
  maxAttempts: getOptionalEnvInt('ACCOUNT_LOCK_MAX_ATTEMPTS', SECURITY.MAX_LOGIN_ATTEMPTS),
  baseDurationSeconds: getOptionalEnvInt('ACCOUNT_LOCK_BASE_DURATION', SECURITY.LOCKOUT_DURATION_SECONDS),
  escalatingLocks: true,
  permanentThresholdMultiplier: 2,
  autoUnlockCheckIntervalSeconds: getOptionalEnvInt('ACCOUNT_LOCK_AUTO_CHECK_INTERVAL', 300),
} as const);
