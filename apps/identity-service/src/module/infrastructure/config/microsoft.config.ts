/**
 * Microsoft (Azure AD) OAuth2 Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnv } from '@vubon/shared-config/common';

export const MICROSOFT_OAUTH_CONFIG = Object.freeze({
  clientId: getOptionalEnv('MICROSOFT_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('MICROSOFT_CLIENT_SECRET', ''),
  tenantId: getOptionalEnv('MICROSOFT_TENANT_ID', 'common'),
  redirectUri: getOptionalEnv(
    'MICROSOFT_REDIRECT_URI',
    'http://localhost:3001/api/v1/auth/social/microsoft/callback',
  ),
  get authorizationUrl(): string {
    return `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/authorize`;
  },
  get tokenUrl(): string {
    return `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;
  },
  userInfoUrl: 'https://graph.microsoft.com/v1.0/me',
  scope: 'openid profile email User.Read',
  isConfigured(): boolean {
    return this.clientId.length > 0 && this.clientSecret.length > 0;
  },
});

export type MicrosoftOAuthConfig = typeof MICROSOFT_OAUTH_CONFIG;
