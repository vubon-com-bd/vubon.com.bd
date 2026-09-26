/**
 * Facebook OAuth configuration
 * @module shared-config/auth/oauth
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const FACEBOOK_OAUTH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('FACEBOOK_OAUTH_ENABLED', false),
  clientId: getOptionalEnv('FACEBOOK_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('FACEBOOK_CLIENT_SECRET', ''),
  redirectUri: getOptionalEnv('FACEBOOK_REDIRECT_URI', ''),
  scopes: Object.freeze(['email', 'public_profile'] as const),
  authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
  tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
  userInfoUrl: 'https://graph.facebook.com/me?fields=id,name,email,picture',
});
