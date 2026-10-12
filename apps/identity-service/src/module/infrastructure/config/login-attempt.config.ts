/**
 * Login Attempt Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';
import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants/auth';

export const AUTH_LOGIN_ATTEMPT_CONFIG = Object.freeze({
  maxAttempts: getOptionalEnvInt('LOGIN_MAX_ATTEMPTS', AUTH_LOGIN_ATTEMPT.MAX_ATTEMPTS),
  maxAttemptsPerIp: getOptionalEnvInt(
    'LOGIN_MAX_PER_IP',
    AUTH_LOGIN_ATTEMPT.MAX_ATTEMPTS_PER_IP,
  ),
  windowSeconds: getOptionalEnvInt(
    'LOGIN_ATTEMPT_WINDOW',
    AUTH_LOGIN_ATTEMPT.ATTEMPT_WINDOW_SECONDS,
  ),
  trackByIp: getOptionalEnvBool('LOGIN_TRACK_BY_IP', AUTH_LOGIN_ATTEMPT.TRACK_BY_IP),
  trackByEmail: getOptionalEnvBool('LOGIN_TRACK_BY_EMAIL', AUTH_LOGIN_ATTEMPT.TRACK_BY_EMAIL),
  trackByDevice: getOptionalEnvBool(
    'LOGIN_TRACK_BY_DEVICE',
    AUTH_LOGIN_ATTEMPT.TRACK_BY_DEVICE,
  ),
  cleanupAfterDays: getOptionalEnvInt('LOGIN_CLEANUP_AFTER_DAYS', 30),
});
