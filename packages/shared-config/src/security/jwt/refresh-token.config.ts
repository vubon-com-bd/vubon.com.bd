/**
 * Refresh token configuration
 * @module shared-config/security/jwt
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

const env = loadEnv();

export const REFRESH_TOKEN_CONFIG = Object.freeze({
  expiresIn: env.JWT_REFRESH_EXPIRY,
  audience: `${env.JWT_AUDIENCE}:refresh`,
  issuer: env.JWT_ISSUER,
  rotateOnUse: getOptionalEnvBool('REFRESH_TOKEN_ROTATE', true),
  revokeOnReuse: getOptionalEnvBool('REFRESH_TOKEN_REVOKE_ON_REUSE', true),
  reuseDetectionEnabled: getOptionalEnvBool('REFRESH_TOKEN_REUSE_DETECT', true),
  storeHashed: getOptionalEnvBool('REFRESH_TOKEN_STORE_HASHED', true),
  bindToDevice: getOptionalEnvBool('REFRESH_TOKEN_BIND_DEVICE', true),
  bindToIp: getOptionalEnvBool('REFRESH_TOKEN_BIND_IP', false),
  maxActivePerUser: getOptionalEnvInt('REFRESH_TOKEN_MAX_PER_USER', 5),
  subjectPrefix: getOptionalEnv('REFRESH_TOKEN_SUBJECT_PREFIX', 'ref_'),
});

export type RefreshTokenConfig = typeof REFRESH_TOKEN_CONFIG;
