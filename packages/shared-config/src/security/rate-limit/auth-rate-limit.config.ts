/**
 * Auth-specific rate limit (login, register, otp, forgot-password)
 * @module shared-config/security/rate-limit
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

const env = loadEnv();

export const AUTH_RATE_LIMIT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AUTH_RATE_LIMIT_ENABLED', true),
  windowMs: getOptionalEnvInt('AUTH_RATE_LIMIT_WINDOW_MS', env.RATE_LIMIT_WINDOW_MS),
  max: env.AUTH_RATE_LIMIT_MAX,
  blockOnExceed: getOptionalEnvBool('AUTH_RATE_LIMIT_BLOCK', true),
  blockDurationMs: getOptionalEnvInt('AUTH_RATE_LIMIT_BLOCK_MS', 900000), // 15 min
  perEmail: getOptionalEnvBool('AUTH_RATE_LIMIT_PER_EMAIL', true),
  perIp: getOptionalEnvBool('AUTH_RATE_LIMIT_PER_IP', true),
  perDevice: getOptionalEnvBool('AUTH_RATE_LIMIT_PER_DEVICE', false),
  endpoints: Object.freeze({
    login: Object.freeze({
      windowMs: getOptionalEnvInt('RATE_LIMIT_LOGIN_WINDOW_MS', 300000), // 5 min
      max: getOptionalEnvInt('RATE_LIMIT_LOGIN_MAX', 10),
    }),
    register: Object.freeze({
      windowMs: getOptionalEnvInt('RATE_LIMIT_REGISTER_WINDOW_MS', 3600000), // 1 hour
      max: getOptionalEnvInt('RATE_LIMIT_REGISTER_MAX', 5),
    }),
    otp: Object.freeze({
      windowMs: getOptionalEnvInt('RATE_LIMIT_OTP_WINDOW_MS', 300000),
      max: getOptionalEnvInt('RATE_LIMIT_OTP_MAX', 3),
    }),
    forgotPassword: Object.freeze({
      windowMs: getOptionalEnvInt('RATE_LIMIT_FORGOT_WINDOW_MS', 3600000),
      max: getOptionalEnvInt('RATE_LIMIT_FORGOT_MAX', 3),
    }),
    resetPassword: Object.freeze({
      windowMs: getOptionalEnvInt('RATE_LIMIT_RESET_WINDOW_MS', 3600000),
      max: getOptionalEnvInt('RATE_LIMIT_RESET_MAX', 5),
    }),
    verifyEmail: Object.freeze({
      windowMs: getOptionalEnvInt('RATE_LIMIT_VERIFY_EMAIL_WINDOW_MS', 300000),
      max: getOptionalEnvInt('RATE_LIMIT_VERIFY_EMAIL_MAX', 5),
    }),
  }),
});

export type AuthRateLimitConfig = typeof AUTH_RATE_LIMIT_CONFIG;
