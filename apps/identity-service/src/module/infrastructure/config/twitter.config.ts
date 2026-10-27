/**
 * Twitter (X) OAuth2 Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnv } from '@vubon/shared-config/common';

export const TWITTER_OAUTH_CONFIG = Object.freeze({
  clientId: getOptionalEnv('TWITTER_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('TWITTER_CLIENT_SECRET', ''),
  redirectUri: getOptionalEnv(
    'TWITTER_REDIRECT_URI',
    'http://localhost:3001/api/v1/auth/social/twitter/callback',
  ),
  authorizationUrl: 'https://twitter.com/i/oauth2/authorize',
  tokenUrl: 'https://api.twitter.com/2/oauth2/token',
  userInfoUrl: 'https://api.twitter.com/2/users/me?user.fields=profile_image_url,name,username',
  scope: 'tweet.read users.read offline.access',
  isConfigured(): boolean {
    return this.clientId.length > 0 && this.clientSecret.length > 0;
  },
});

export type TwitterOAuthConfig = typeof TWITTER_OAUTH_CONFIG;
