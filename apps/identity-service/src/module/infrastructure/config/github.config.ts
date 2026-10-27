/**
 * GitHub OAuth2 Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnv } from '@vubon/shared-config/common';

export const GITHUB_OAUTH_CONFIG = Object.freeze({
  clientId: getOptionalEnv('GITHUB_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('GITHUB_CLIENT_SECRET', ''),
  redirectUri: getOptionalEnv(
    'GITHUB_REDIRECT_URI',
    'http://localhost:3001/api/v1/auth/social/github/callback',
  ),
  authorizationUrl: 'https://github.com/login/oauth/authorize',
  tokenUrl: 'https://github.com/login/oauth/access_token',
  userInfoUrl: 'https://api.github.com/user',
  emailsUrl: 'https://api.github.com/user/emails',
  scope: 'user:email',
  isConfigured(): boolean {
    return this.clientId.length > 0 && this.clientSecret.length > 0;
  },
});

export type GithubOAuthConfig = typeof GITHUB_OAUTH_CONFIG;
