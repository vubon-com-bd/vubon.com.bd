import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const RATE_LIMIT_CONFIG = Object.freeze({
  windowSeconds: getOptionalEnvInt('RATE_LIMIT_WINDOW', 60),
  maxRequests: getOptionalEnvInt('RATE_LIMIT_MAX', 60),
  authMax: getOptionalEnvInt('RATE_LIMIT_AUTH_MAX', 5),
  emailMax: getOptionalEnvInt('RATE_LIMIT_EMAIL_MAX', 10),
  smsMax: getOptionalEnvInt('RATE_LIMIT_SMS_MAX', 5),
});
