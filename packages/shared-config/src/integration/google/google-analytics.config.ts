/**
 * Google Analytics integration configuration (alias to platform/analytics/ga)
 * @module shared-config/integration/google
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const GOOGLE_ANALYTICS_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('GOOGLE_ANALYTICS_ENABLED', false),
  measurementId: getOptionalEnv('GA_MEASUREMENT_ID', ''),
  apiSecret: getOptionalEnv('GA_API_SECRET', ''),
  debugMode: getOptionalEnvBool('GA_DEBUG', false),
});
