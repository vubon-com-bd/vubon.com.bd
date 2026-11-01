/**
 * Token Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const AUTH_TOKEN_CONFIG = Object.freeze({
  resetTokenTtlSeconds: getOptionalEnvInt('TOKEN_RESET_TTL', 3600),
  verifyTokenTtlSeconds: getOptionalEnvInt('TOKEN_VERIFY_TTL', 24 * 3600),
  inviteTokenTtlSeconds: getOptionalEnvInt('TOKEN_INVITE_TTL', 7 * 24 * 3600),
  apiKeyTtlSeconds: getOptionalEnvInt('TOKEN_API_KEY_TTL', 365 * 24 * 3600),
  cleanupIntervalSeconds: getOptionalEnvInt('TOKEN_CLEANUP_INTERVAL', 3600),
});
