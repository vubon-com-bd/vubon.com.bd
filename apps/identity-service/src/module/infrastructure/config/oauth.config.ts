/**
 * OAuth Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';
import { AUTH_OAUTH } from '@vubon/shared-constants/auth';

export const AUTH_OAUTH_CONFIG = Object.freeze({
  stateLength: getOptionalEnvInt('OAUTH_STATE_LENGTH', AUTH_OAUTH.STATE_LENGTH),
  codeVerifierLength: getOptionalEnvInt(
    'OAUTH_CODE_VERIFIER_LENGTH',
    AUTH_OAUTH.CODE_VERIFIER_LENGTH,
  ),
  pkceMethod: getOptionalEnv('OAUTH_PKCE_METHOD', AUTH_OAUTH.PKCE_METHOD_S256),
  authorizationCodeTtlSeconds: getOptionalEnvInt('OAUTH_CODE_TTL', 600),
  accessTokenTtlSeconds: getOptionalEnvInt('OAUTH_ACCESS_TTL', 3600),
  refreshTokenTtlSeconds: getOptionalEnvInt('OAUTH_REFRESH_TTL', 30 * 24 * 3600),
});
