/**
 * Rate Limit Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';
import { SECURITY } from '@vubon/shared-constants/security';

export const AUTH_RATE_LIMIT_CONFIG = Object.freeze({
  windowSeconds: getOptionalEnvInt('RATELIMIT_WINDOW', SECURITY.RATE_LIMIT_WINDOW_SECONDS),
  maxRequests: getOptionalEnvInt('RATELIMIT_MAX', SECURITY.RATE_LIMIT_MAX_REQUESTS),
  authMax: getOptionalEnvInt('RATELIMIT_AUTH_MAX', SECURITY.RATE_LIMIT_AUTH_MAX),
  otpMax: getOptionalEnvInt('RATELIMIT_OTP_MAX', SECURITY.RATE_LIMIT_OTP_MAX),
  apiMax: getOptionalEnvInt('RATELIMIT_API_MAX', SECURITY.RATE_LIMIT_API_MAX),
});
