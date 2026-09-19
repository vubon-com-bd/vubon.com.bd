import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const AUTH_CONFIG = Object.freeze({
  loginMaxAttempts: getOptionalEnvInt('AUTH_LOGIN_MAX_ATTEMPTS', 5),
  sessionTtlSeconds: getOptionalEnvInt('AUTH_SESSION_TTL', 86400),
  refreshTokenTtlSeconds: getOptionalEnvInt('AUTH_REFRESH_TTL', 604800),
  passwordResetTtlSeconds: getOptionalEnvInt('AUTH_PASSWORD_RESET_TTL', 3600),
  emailVerificationTtlSeconds: getOptionalEnvInt('AUTH_EMAIL_VERIFY_TTL', 86400),
} as const);
