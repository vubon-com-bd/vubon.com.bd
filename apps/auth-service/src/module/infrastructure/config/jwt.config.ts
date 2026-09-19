import { getEnv, getOptionalEnv } from '@vubon/shared-config/common';
import { SECURITY } from '@vubon/shared-constants/security';

export const JWT_CONFIG = Object.freeze({
  secret: getEnv('JWT_SECRET'),
  algorithm: getOptionalEnv('JWT_ALGORITHM', 'HS256'),
  accessTokenExpiry: getOptionalEnv('JWT_ACCESS_EXPIRY', SECURITY.JWT_ACCESS_EXPIRY),
  refreshTokenExpiry: getOptionalEnv('JWT_REFRESH_EXPIRY', SECURITY.JWT_REFRESH_EXPIRY),
  issuer: getOptionalEnv('JWT_ISSUER', SECURITY.JWT_ISSUER),
  audience: getOptionalEnv('JWT_AUDIENCE', 'vubon-client'),
} as const);
