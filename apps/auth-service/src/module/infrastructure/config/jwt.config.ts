/**
 * JWT_CONFIG — JWT signing configuration
 * @module auth-service/infrastructure/config
 */
import { getEnv, getOptionalEnv } from '@vubon/shared-config/common';
import { SECURITY } from '@vubon/shared-constants/security';

export const JWT_CONFIG = Object.freeze({
  secret: getEnv('JWT_SECRET'),
  algorithm: getOptionalEnv('JWT_ALGORITHM', SECURITY.JWT_ALGORITHM) as string,
  accessTokenExpiry: getOptionalEnv('JWT_ACCESS_EXPIRY', SECURITY.JWT_ACCESS_EXPIRY) as string,
  refreshTokenExpiry: getOptionalEnv('JWT_REFRESH_EXPIRY', SECURITY.JWT_REFRESH_EXPIRY) as string,
  issuer: getOptionalEnv('JWT_ISSUER', 'vubon-api') as string,
  audience: getOptionalEnv('JWT_AUDIENCE', 'vubon-client') as string,
} as const);
