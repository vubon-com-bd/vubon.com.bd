/**
 * Apple Sign In OAuth configuration
 * @module shared-config/auth/oauth
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const APPLE_OAUTH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('APPLE_OAUTH_ENABLED', false),
  clientId: getOptionalEnv('APPLE_CLIENT_ID', ''),
  teamId: getOptionalEnv('APPLE_TEAM_ID', ''),
  keyId: getOptionalEnv('APPLE_KEY_ID', ''),
  privateKey: getOptionalEnv('APPLE_PRIVATE_KEY', ''),
  redirectUri: getOptionalEnv('APPLE_REDIRECT_URI', ''),
  scopes: Object.freeze(['name', 'email'] as const),
  authUrl: 'https://appleid.apple.com/auth/authorize',
  tokenUrl: 'https://appleid.apple.com/auth/token',
});
