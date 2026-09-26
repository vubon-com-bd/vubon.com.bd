/**
 * PASSWORD_CONFIG — Password policy configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';
import { AUTH_PASSWORD } from '@vubon/shared-constants/auth';

export const PASSWORD_CONFIG = Object.freeze({
  minLength: getOptionalEnvInt('PASSWORD_MIN_LENGTH', AUTH_PASSWORD.MIN_LENGTH),
  maxLength: getOptionalEnvInt('PASSWORD_MAX_LENGTH', AUTH_PASSWORD.MAX_LENGTH),
  requireUppercase: getOptionalEnvBool('PASSWORD_REQUIRE_UPPERCASE', AUTH_PASSWORD.REQUIRE_UPPERCASE),
  requireLowercase: getOptionalEnvBool('PASSWORD_REQUIRE_LOWERCASE', AUTH_PASSWORD.REQUIRE_LOWERCASE),
  requireNumber: getOptionalEnvBool('PASSWORD_REQUIRE_NUMBER', AUTH_PASSWORD.REQUIRE_NUMBER),
  requireSymbol: getOptionalEnvBool('PASSWORD_REQUIRE_SYMBOL', AUTH_PASSWORD.REQUIRE_SYMBOL),
  historyCount: getOptionalEnvInt('PASSWORD_HISTORY_COUNT', AUTH_PASSWORD.HISTORY_COUNT),
  expiryDays: getOptionalEnvInt('PASSWORD_EXPIRY_DAYS', AUTH_PASSWORD.EXPIRY_DAYS),
  bcryptRounds: getOptionalEnvInt('BCRYPT_ROUNDS', AUTH_PASSWORD.BCRYPT_ROUNDS),
  resetTokenExpirySeconds: getOptionalEnvInt('PASSWORD_RESET_TOKEN_EXPIRY', AUTH_PASSWORD.RESET_TOKEN_EXPIRY_SECONDS),
  maxResetAttempts: getOptionalEnvInt('PASSWORD_MAX_RESET_ATTEMPTS', AUTH_PASSWORD.MAX_RESET_ATTEMPTS),
} as const);
