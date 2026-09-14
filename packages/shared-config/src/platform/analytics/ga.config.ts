/**
 * Google Analytics (GA4) configuration
 * @module shared-config/platform/analytics
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const GA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('GA_ENABLED', false),
  measurementId: getOptionalEnv('GA_MEASUREMENT_ID', ''),
  apiSecret: getOptionalEnv('GA_API_SECRET', ''),
  debugMode: getOptionalEnvBool('GA_DEBUG', false),
  sendPageView: getOptionalEnvBool('GA_SEND_PAGE_VIEW', true),
  cookieDomain: getOptionalEnv('GA_COOKIE_DOMAIN', 'auto'),
  cookieExpiresSeconds: 63072000, // 2 years
  transportUrl: 'https://www.google-analytics.com/mp/collect',
});
