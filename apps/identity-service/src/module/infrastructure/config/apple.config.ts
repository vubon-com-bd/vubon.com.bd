/**
 * Apple Sign In OAuth2 Configuration
 * @module identity-service/infrastructure/config
 *
 * Notes:
 * - Apple requires a JWT-signed client secret (not plain text)
 * - JWT is signed with the .p8 key from Apple Developer
 * - JWT expires every 6 months (regenerate)
 */
import { getOptionalEnv } from '@vubon/shared-config/common';

export const APPLE_OAUTH_CONFIG = Object.freeze({
  clientId: getOptionalEnv('APPLE_CLIENT_ID', ''),           // Service ID (e.g. com.vubon.web)
  teamId: getOptionalEnv('APPLE_TEAM_ID', ''),               // Apple Developer Team ID
  keyId: getOptionalEnv('APPLE_KEY_ID', ''),                 // Key ID from .p8
  privateKey: getOptionalEnv('APPLE_PRIVATE_KEY', ''),       // Content of .p8 file (with \n)
  redirectUri: getOptionalEnv(
    'APPLE_REDIRECT_URI',
    'http://localhost:3001/api/v1/auth/social/apple/callback',
  ),
  authorizationUrl: 'https://appleid.apple.com/auth/authorize',
  tokenUrl: 'https://appleid.apple.com/auth/token',
  scope: 'name email',
  isConfigured(): boolean {
    return (
      this.clientId.length > 0 &&
      this.teamId.length > 0 &&
      this.keyId.length > 0 &&
      this.privateKey.length > 0
    );
  },
});

export type AppleOAuthConfig = typeof APPLE_OAUTH_CONFIG;
