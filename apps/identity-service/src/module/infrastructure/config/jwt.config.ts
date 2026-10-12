/**
 * JWT Configuration (auth-service specific)
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const AUTH_JWT_CONFIG = Object.freeze({
  algorithm: getOptionalEnv('JWT_ALGORITHM', 'HS256'),
  accessTokenTtlSeconds: getOptionalEnvInt('JWT_ACCESS_TTL', 15 * 60),
  refreshTokenTtlSeconds: getOptionalEnvInt('JWT_REFRESH_TTL', 7 * 24 * 3600),
  idTokenTtlSeconds: getOptionalEnvInt('JWT_ID_TTL', 3600),
  clockToleranceSeconds: getOptionalEnvInt('JWT_CLOCK_TOLERANCE', 5),
  issuer: getOptionalEnv('JWT_ISSUER', 'vubon-api'),
  audience: getOptionalEnv('JWT_AUDIENCE', 'vubon-client'),
});
