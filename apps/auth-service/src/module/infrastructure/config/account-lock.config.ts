import { getOptionalEnvInt } from '@vubon/shared-config/common';
import { SECURITY } from '@vubon/shared-constants/security';

export const ACCOUNT_LOCK_CONFIG = Object.freeze({
  maxAttempts: getOptionalEnvInt('ACCOUNT_LOCK_MAX_ATTEMPTS', SECURITY.MAX_LOGIN_ATTEMPTS),
  lockoutDurationSeconds: getOptionalEnvInt('ACCOUNT_LOCK_DURATION', SECURITY.LOCKOUT_DURATION_SECONDS),
} as const);
