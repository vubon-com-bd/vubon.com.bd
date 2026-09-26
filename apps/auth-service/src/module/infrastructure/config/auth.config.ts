/**
 * AUTH_CONFIG — Auth-service runtime configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';
import { SECURITY } from '@vubon/shared-constants/security';

export const AUTH_CONFIG = Object.freeze({
  loginMaxAttempts: getOptionalEnvInt('AUTH_LOGIN_MAX_ATTEMPTS', SECURITY.MAX_LOGIN_ATTEMPTS),
  lockoutDurationSeconds: getOptionalEnvInt('AUTH_LOCKOUT_DURATION', SECURITY.LOCKOUT_DURATION_SECONDS),
  registrationOpen: getOptionalEnvBool('AUTH_REGISTRATION_OPEN', true),
  requireEmailVerification: getOptionalEnvBool('AUTH_REQUIRE_EMAIL_VERIFY', true),
  requirePhoneVerification: getOptionalEnvBool('AUTH_REQUIRE_PHONE_VERIFY', false),
  allowConcurrentSessions: getOptionalEnvBool('AUTH_ALLOW_CONCURRENT', true),
} as const);
