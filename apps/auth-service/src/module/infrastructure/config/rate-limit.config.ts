/**
 * RATE_LIMIT_CONFIG — Rate limiting configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';
import { SECURITY } from '@vubon/shared-constants/security';

export const RATE_LIMIT_CONFIG = Object.freeze({
  windowSeconds: getOptionalEnvInt('RATE_LIMIT_WINDOW', SECURITY.RATE_LIMIT_WINDOW_SECONDS),
  maxRequests: getOptionalEnvInt('RATE_LIMIT_MAX', SECURITY.RATE_LIMIT_MAX_REQUESTS),
  authMax: getOptionalEnvInt('AUTH_RATE_LIMIT_MAX', SECURITY.RATE_LIMIT_AUTH_MAX),
  otpMax: getOptionalEnvInt('OTP_RATE_LIMIT_MAX', SECURITY.RATE_LIMIT_OTP_MAX),
  apiMax: getOptionalEnvInt('API_RATE_LIMIT_MAX', SECURITY.RATE_LIMIT_API_MAX),
} as const);
