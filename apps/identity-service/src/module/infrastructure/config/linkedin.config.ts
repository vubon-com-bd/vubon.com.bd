/**
 * LinkedIn OAuth2 Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnv } from '@vubon/shared-config/common';

export const LINKEDIN_OAUTH_CONFIG = Object.freeze({
  clientId: getOptionalEnv('LINKEDIN_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('LINKEDIN_CLIENT_SECRET', ''),
  redirectUri: getOptionalEnv(
    'LINKEDIN_REDIRECT_URI',
    'http://localhost:3001/api/v1/auth/social/linkedin/callback',
  ),
  authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
  tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
  userInfoUrl: 'https://api.linkedin.com/v2/userinfo',
  scope: 'openid profile email',
  isConfigured(): boolean {
    return this.clientId.length > 0 && this.clientSecret.length > 0;
  },
});

export type LinkedinOAuthConfig = typeof LINKEDIN_OAUTH_CONFIG;
