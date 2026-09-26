/**
 * Access token configuration
 * @module shared-config/security/jwt
 */
import { getOptionalEnv, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

const env = loadEnv();

export const ACCESS_TOKEN_CONFIG = Object.freeze({
  expiresIn: env.JWT_ACCESS_EXPIRY,
  audience: `${env.JWT_AUDIENCE}:access`,
  issuer: env.JWT_ISSUER,
  subjectPrefix: getOptionalEnv('ACCESS_TOKEN_SUBJECT_PREFIX', 'usr_'),
  includeRoles: true,
  includePermissions: false,
  includeSessionId: true,
  maxPayloadBytes: getOptionalEnvInt('ACCESS_TOKEN_MAX_PAYLOAD_BYTES', 4096),
});

export type AccessTokenConfig = typeof ACCESS_TOKEN_CONFIG;
