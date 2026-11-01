/**
 * Route configuration
 * @module shared-config/logistics/route
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const ROUTE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ROUTE_ENABLED', true),
  maxStops: getOptionalEnvInt('ROUTE_MAX_STOPS', 200),
  maxDistanceKm: getOptionalEnvInt('ROUTE_MAX_DISTANCE_KM', 2000),
  maxDurationHours: getOptionalEnvInt('ROUTE_MAX_DURATION_H', 12),
  optimizationTimeoutSec: getOptionalEnvInt('ROUTE_OPTIMIZATION_TIMEOUT_SEC', 30),
  autoOptimize: getOptionalEnvBool('ROUTE_AUTO_OPTIMIZE', true),
  trafficAware: getOptionalEnvBool('ROUTE_TRAFFIC_AWARE', true),
});
