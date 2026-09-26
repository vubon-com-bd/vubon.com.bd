/**
 * Google OAuth integration configuration (alias to auth/oauth/google)
 * @module shared-config/integration/google
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const GOOGLE_OAUTH_INTEGRATION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('GOOGLE_OAUTH_ENABLED', false),
  clientId: getOptionalEnv('GOOGLE_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('GOOGLE_CLIENT_SECRET', ''),
  redirectUri: getOptionalEnv('GOOGLE_REDIRECT_URI', ''),
});
