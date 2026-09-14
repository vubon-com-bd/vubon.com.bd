/**
 * Password policy configuration
 * @module shared-config/auth/password
 *
 * Values আসে shared-constants/security থেকে।
 */
import { SECURITY } from '@vubon/shared-constants/security';
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PASSWORD_CONFIG = Object.freeze({
  algorithm: getOptionalEnv('PASSWORD_ALGO', 'bcrypt'), // bcrypt | argon2
  minLength: SECURITY.PASSWORD_MIN_LENGTH,
  maxLength: SECURITY.PASSWORD_MAX_LENGTH,
  requireUppercase: SECURITY.PASSWORD_REQUIRE_UPPERCASE,
  requireLowercase: SECURITY.PASSWORD_REQUIRE_LOWERCASE,
  requireNumber: SECURITY.PASSWORD_REQUIRE_NUMBER,
  requireSymbol: SECURITY.PASSWORD_REQUIRE_SYMBOL,
  historyCount: SECURITY.PASSWORD_HISTORY_COUNT,
  expiryDays: SECURITY.PASSWORD_EXPIRY_DAYS,
  resetTokenExpirySeconds: getOptionalEnvInt('PASSWORD_RESET_TOKEN_TTL_SECONDS', 3600),
  maxResetAttempts: getOptionalEnvInt('PASSWORD_MAX_RESET_ATTEMPTS', 3),
  preventReuseCount: SECURITY.PASSWORD_HISTORY_COUNT,
  pepper: getOptionalEnv('PASSWORD_PEPPER', ''),
  requirePepper: getOptionalEnvBool('PASSWORD_REQUIRE_PEPPER', false),
});
