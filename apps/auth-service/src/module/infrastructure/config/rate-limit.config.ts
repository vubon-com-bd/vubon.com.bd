import { getOptionalEnvInt } from '@vubon/shared-config/common';
import { SECURITY } from '@vubon/shared-constants/security';

export const RATE_LIMIT_CONFIG = Object.freeze({
  windowSeconds: getOptionalEnvInt('RATE_LIMIT_WINDOW', SECURITY.RATE_LIMIT_WINDOW_SECONDS),
  maxRequests: getOptionalEnvInt('RATE_LIMIT_MAX', SECURITY.RATE_LIMIT_MAX_REQUESTS),
  authMax: getOptionalEnvInt('RATE_LIMIT_AUTH_MAX', SECURITY.RATE_LIMIT_AUTH_MAX),
  otpMax: getOptionalEnvInt('RATE_LIMIT_OTP_MAX', SECURITY.RATE_LIMIT_OTP_MAX),
  apiMax: getOptionalEnvInt('RATE_LIMIT_API_MAX', SECURITY.RATE_LIMIT_API_MAX),
} as const);
