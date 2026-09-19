import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';
import { SECURITY } from '@vubon/shared-constants/security';

export const PASSWORD_CONFIG = Object.freeze({
  minLength: getOptionalEnvInt('PASSWORD_MIN_LENGTH', SECURITY.PASSWORD_MIN_LENGTH),
  maxLength: getOptionalEnvInt('PASSWORD_MAX_LENGTH', SECURITY.PASSWORD_MAX_LENGTH),
  requireUppercase: getOptionalEnvBool('PASSWORD_REQUIRE_UPPERCASE', SECURITY.PASSWORD_REQUIRE_UPPERCASE),
  requireLowercase: getOptionalEnvBool('PASSWORD_REQUIRE_LOWERCASE', SECURITY.PASSWORD_REQUIRE_LOWERCASE),
  requireNumber: getOptionalEnvBool('PASSWORD_REQUIRE_NUMBER', SECURITY.PASSWORD_REQUIRE_NUMBER),
  requireSymbol: getOptionalEnvBool('PASSWORD_REQUIRE_SYMBOL', SECURITY.PASSWORD_REQUIRE_SYMBOL),
  bcryptRounds: getOptionalEnvInt('PASSWORD_BCRYPT_ROUNDS', SECURITY.BCRYPT_ROUNDS),
  historyCount: getOptionalEnvInt('PASSWORD_HISTORY_COUNT', SECURITY.PASSWORD_HISTORY_COUNT),
  expiryDays: getOptionalEnvInt('PASSWORD_EXPIRY_DAYS', SECURITY.PASSWORD_EXPIRY_DAYS),
} as const);
