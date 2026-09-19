/**
 * OIDC SSO configuration
 * @module shared-config/auth/sso
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const OIDC_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('OIDC_ENABLED', false),
  issuer: getOptionalEnv('OIDC_ISSUER', ''),
  clientId: getOptionalEnv('OIDC_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('OIDC_CLIENT_SECRET', ''),
  redirectUri: getOptionalEnv('OIDC_REDIRECT_URI', ''),
  scopes: Object.freeze(['openid', 'profile', 'email'] as const),
  timeoutMs: getOptionalEnvInt('OIDC_TIMEOUT_MS', 10000),
  clockSkewSeconds: getOptionalEnvInt('OIDC_CLOCK_SKEW_SECONDS', 5),
  cacheJwks: getOptionalEnvBool('OIDC_CACHE_JWKS', true),
});
