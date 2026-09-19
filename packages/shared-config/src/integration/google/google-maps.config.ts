/**
 * Google Maps integration configuration
 * @module shared-config/integration/google
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const GOOGLE_MAPS_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('GOOGLE_MAPS_ENABLED', false),
  apiKey: getOptionalEnv('GOOGLE_MAPS_API_KEY', ''),
  defaultLanguage: getOptionalEnv('GOOGLE_MAPS_LANGUAGE', 'bn'),
  defaultRegion: getOptionalEnv('GOOGLE_MAPS_REGION', 'BD'),
  timeoutMs: getOptionalEnvInt('GOOGLE_MAPS_TIMEOUT_MS', 10000),
  cacheTtlSeconds: getOptionalEnvInt('GOOGLE_MAPS_CACHE_TTL', 86400),
  enableGeocoding: getOptionalEnvBool('GOOGLE_MAPS_GEOCODING', true),
  enablePlaces: getOptionalEnvBool('GOOGLE_MAPS_PLACES', true),
  enableDirections: getOptionalEnvBool('GOOGLE_MAPS_DIRECTIONS', true),
});
