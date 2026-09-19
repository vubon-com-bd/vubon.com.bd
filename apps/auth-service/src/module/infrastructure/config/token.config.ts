import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';
import { SECURITY } from '@vubon/shared-constants/security';

export const TOKEN_CONFIG = Object.freeze({
  accessTtl: getOptionalEnv('TOKEN_ACCESS_EXPIRY', SECURITY.JWT_ACCESS_EXPIRY),
  refreshTtl: getOptionalEnv('TOKEN_REFRESH_EXPIRY', SECURITY.JWT_REFRESH_EXPIRY),
  resetTtlSeconds: getOptionalEnvInt('TOKEN_RESET_TTL', 3600),
  verifyTtlSeconds: getOptionalEnvInt('TOKEN_VERIFY_TTL', 86400),
} as const);
