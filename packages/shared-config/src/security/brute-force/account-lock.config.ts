/**
 * Account lockout configuration
 * @module shared-config/security/brute-force
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { SECURITY } from '@vubon/shared-constants/security';

export const ACCOUNT_LOCK_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ACCOUNT_LOCK_ENABLED', true),
  maxFailedAttempts: SECURITY.MAX_LOGIN_ATTEMPTS,
  lockDurationSeconds: SECURITY.LOCKOUT_DURATION_SECONDS,
  resetOnSuccess: getOptionalEnvBool('ACCOUNT_LOCK_RESET_ON_SUCCESS', true),
  notifyUserOnLock: getOptionalEnvBool('ACCOUNT_LOCK_NOTIFY_USER', true),
  notifyAdminOnLock: getOptionalEnvBool('ACCOUNT_LOCK_NOTIFY_ADMIN', false),
  permanentLockAfter: getOptionalEnvInt('ACCOUNT_LOCK_PERMANENT_AFTER', 10),
  autoUnlockEnabled: getOptionalEnvBool('ACCOUNT_LOCK_AUTO_UNLOCK', true),
  manualUnlockAllowed: getOptionalEnvBool('ACCOUNT_LOCK_MANUAL_UNLOCK', true),
});

export type AccountLockConfig = typeof ACCOUNT_LOCK_CONFIG;
