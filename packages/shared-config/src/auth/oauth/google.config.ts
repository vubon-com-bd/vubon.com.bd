/**
 * Google OAuth configuration
 * @module shared-config/auth/oauth
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const GOOGLE_OAUTH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('GOOGLE_OAUTH_ENABLED', false),
  clientId: getOptionalEnv('GOOGLE_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('GOOGLE_CLIENT_SECRET', ''),
  redirectUri: getOptionalEnv('GOOGLE_REDIRECT_URI', ''),
  scopes: Object.freeze(['openid', 'email', 'profile'] as const),
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
});
