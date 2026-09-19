/**
 * JWT base configuration
 * @module shared-config/security/jwt
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';
import { JWT_SECRET_CONFIG } from './jwt-secret.config';

export const JWT_CONFIG = Object.freeze({
  secret: JWT_SECRET_CONFIG.secret,
  algorithm: JWT_SECRET_CONFIG.algorithm,
  issuer: JWT_SECRET_CONFIG.issuer,
  audience: JWT_SECRET_CONFIG.audience,
  clockToleranceSeconds: 5,
  ignoreExpiration: false,
  ignoreNotBefore: false,
  complete: false,
  clockTimestamp: undefined,
  maxAge: undefined,
  mutatePayload: getOptionalEnvBool('JWT_MUTATE_PAYLOAD', false),
  allowInsecureKeySizes: false,
  allowInvalidAsymmetricKeyTypes: false,
  headerName: getOptionalEnv('JWT_HEADER_NAME', 'authorization'),
  bearerPrefix: getOptionalEnv('JWT_BEARER_PREFIX', 'Bearer '),
});

export type JwtConfig = typeof JWT_CONFIG;
