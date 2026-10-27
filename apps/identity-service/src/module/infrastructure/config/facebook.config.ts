/**
 * Facebook OAuth2 Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnv } from '@vubon/shared-config/common';

export const FACEBOOK_OAUTH_CONFIG = Object.freeze({
  appId: getOptionalEnv('FACEBOOK_APP_ID', ''),
  appSecret: getOptionalEnv('FACEBOOK_APP_SECRET', ''),
  redirectUri: getOptionalEnv(
    'FACEBOOK_REDIRECT_URI',
    'http://localhost:3001/api/v1/auth/social/facebook/callback',
  ),
  authorizationUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
  tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
  userInfoUrl: 'https://graph.facebook.com/me?fields=id,email,first_name,last_name,name,picture',
  scope: 'email public_profile',
  isConfigured(): boolean {
    return this.appId.length > 0 && this.appSecret.length > 0;
  },
});

export type FacebookOAuthConfig = typeof FACEBOOK_OAUTH_CONFIG;
