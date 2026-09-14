/**
 * OAuth base configuration
 * @module shared-config/auth/oauth
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const OAUTH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('OAUTH_ENABLED', true),
  stateTtlSeconds: getOptionalEnvInt('OAUTH_STATE_TTL_SECONDS', 600),
  pkceEnabled: getOptionalEnvBool('OAUTH_PKCE_ENABLED', true),
  callbackUrlBase: getOptionalEnv('OAUTH_CALLBACK_URL_BASE', 'http://localhost:3000/auth'),
  allowNewUserSignup: getOptionalEnvBool('OAUTH_ALLOW_SIGNUP', true),
  autoLinkByEmail: getOptionalEnvBool('OAUTH_AUTO_LINK_EMAIL', true),
  timeoutMs: getOptionalEnvInt('OAUTH_TIMEOUT_MS', 10000),
});
