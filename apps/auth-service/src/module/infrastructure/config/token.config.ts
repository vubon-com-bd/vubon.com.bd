/**
 * TOKEN_CONFIG — Token issuance configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnv } from '@vubon/shared-config/common';
import { AUTH_TOKEN } from '@vubon/shared-constants/auth';

export const TOKEN_CONFIG = Object.freeze({
  accessExpiry: getOptionalEnv('TOKEN_ACCESS_EXPIRY', AUTH_TOKEN.ACCESS_TOKEN_EXPIRY) as string,
  refreshExpiry: getOptionalEnv('TOKEN_REFRESH_EXPIRY', AUTH_TOKEN.REFRESH_TOKEN_EXPIRY) as string,
  idExpiry: getOptionalEnv('TOKEN_ID_EXPIRY', AUTH_TOKEN.ID_TOKEN_EXPIRY) as string,
  resetExpiry: getOptionalEnv('TOKEN_RESET_EXPIRY', AUTH_TOKEN.RESET_TOKEN_EXPIRY) as string,
  verifyExpiry: getOptionalEnv('TOKEN_VERIFY_EXPIRY', AUTH_TOKEN.VERIFY_TOKEN_EXPIRY) as string,
  inviteExpiry: getOptionalEnv('TOKEN_INVITE_EXPIRY', AUTH_TOKEN.INVITE_TOKEN_EXPIRY) as string,
  apiKeyExpiry: getOptionalEnv('TOKEN_API_KEY_EXPIRY', AUTH_TOKEN.API_KEY_EXPIRY) as string,
  algorithm: getOptionalEnv('TOKEN_ALGORITHM', AUTH_TOKEN.ALGORITHM) as string,
  issuer: getOptionalEnv('TOKEN_ISSUER', AUTH_TOKEN.ISSUER) as string,
  audience: getOptionalEnv('TOKEN_AUDIENCE', AUTH_TOKEN.AUDIENCE) as string,
} as const);
