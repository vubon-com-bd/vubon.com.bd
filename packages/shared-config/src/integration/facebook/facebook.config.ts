/**
 * Facebook integration configuration (pixel + OAuth)
 * @module shared-config/integration/facebook
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const FACEBOOK_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('FACEBOOK_ENABLED', false),
  appId: getOptionalEnv('FACEBOOK_APP_ID', ''),
  appSecret: getOptionalEnv('FACEBOOK_APP_SECRET', ''),
  pixelId: getOptionalEnv('FACEBOOK_PIXEL_ID', ''),
  accessToken: getOptionalEnv('FACEBOOK_ACCESS_TOKEN', ''),
  oauthEnabled: getOptionalEnvBool('FACEBOOK_OAUTH_ENABLED', false),
  pixelEnabled: getOptionalEnvBool('FACEBOOK_PIXEL_ENABLED', false),
  conversionApiEnabled: getOptionalEnvBool('FACEBOOK_CONVERSION_API', false),
});
