/**
 * GitHub OAuth configuration
 * @module shared-config/auth/oauth
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const GITHUB_OAUTH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('GITHUB_OAUTH_ENABLED', false),
  clientId: getOptionalEnv('GITHUB_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('GITHUB_CLIENT_SECRET', ''),
  redirectUri: getOptionalEnv('GITHUB_REDIRECT_URI', ''),
  scopes: Object.freeze(['read:user', 'user:email'] as const),
  authUrl: 'https://github.com/login/oauth/authorize',
  tokenUrl: 'https://github.com/login/oauth/access_token',
  userInfoUrl: 'https://api.github.com/user',
});
