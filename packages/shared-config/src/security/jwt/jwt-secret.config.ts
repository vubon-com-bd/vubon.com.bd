/**
 * JWT secret management (from env ONLY)
 * @module shared-config/security/jwt
 *
 * ⚠️ NEVER hardcode JWT secret. Always read from env.
 */
import { getEnv, getOptionalEnv } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

const env = loadEnv();

export const JWT_SECRET_CONFIG = Object.freeze({
  secret: getEnv('JWT_SECRET'),
  algorithm: getOptionalEnv('JWT_ALGORITHM', 'HS256'),
  issuer: env.JWT_ISSUER,
  audience: env.JWT_AUDIENCE,
  minSecretLength: 32,
  rotateEnabled: getOptionalEnv('JWT_ROTATE_ENABLED', 'false') === 'true',
  previousSecret: getOptionalEnv('JWT_PREVIOUS_SECRET', ''),
});
