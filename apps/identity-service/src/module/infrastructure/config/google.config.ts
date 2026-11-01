/**
 * Google OAuth2 Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnv } from '@vubon/shared-config/common';

export const GOOGLE_OAUTH_CONFIG = Object.freeze({
  clientId: getOptionalEnv('GOOGLE_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('GOOGLE_CLIENT_SECRET', ''),
  redirectUri: getOptionalEnv(
    'GOOGLE_REDIRECT_URI',
    'http://localhost:3001/api/v1/auth/google/callback',
  ),
  authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
  scope: 'openid email profile',
  isConfigured(): boolean {
    return this.clientId.length > 0 && this.clientSecret.length > 0;
  },
});

export type GoogleOAuthConfig = typeof GOOGLE_OAUTH_CONFIG;
