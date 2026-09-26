/**
 * API-wide rate limit configuration
 * @module shared-config/security/rate-limit
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const API_RATE_LIMIT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('API_RATE_LIMIT_ENABLED', true),
  windowMs: getOptionalEnvInt('API_RATE_LIMIT_WINDOW_MS', 60000),
  max: getOptionalEnvInt('API_RATE_LIMIT_MAX', 1000),
  authenticatedMax: getOptionalEnvInt('API_RATE_LIMIT_AUTH_MAX', 5000),
  unauthenticatedMax: getOptionalEnvInt('API_RATE_LIMIT_UNAUTH_MAX', 100),
  perApiKeyMax: getOptionalEnvInt('API_RATE_LIMIT_KEY_MAX', 10000),
  burstWindowMs: getOptionalEnvInt('API_RATE_LIMIT_BURST_WINDOW_MS', 1000),
  burstMax: getOptionalEnvInt('API_RATE_LIMIT_BURST_MAX', 50),
  trackBy: getOptionalEnvBool('API_RATE_LIMIT_TRACK_BY_USER', true),
});
