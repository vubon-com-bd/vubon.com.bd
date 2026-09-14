/**
 * Mixpanel configuration
 * @module shared-config/platform/analytics
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const MIXPANEL_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('MIXPANEL_ENABLED', false),
  token: getOptionalEnv('MIXPANEL_TOKEN', ''),
  apiHost: getOptionalEnv('MIXPANEL_HOST', 'https://api.mixpanel.com'),
  trackAutomaticEvents: getOptionalEnvBool('MIXPANEL_AUTO_EVENTS', true),
  persistence: getOptionalEnv('MIXPANEL_PERSISTENCE', 'localStorage'),
  debugMode: getOptionalEnvBool('MIXPANEL_DEBUG', false),
});
