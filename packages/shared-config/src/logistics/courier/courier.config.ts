/**
 * Courier base configuration
 * @module shared-config/logistics/courier
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const COURIER_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('COURIER_ENABLED', true),
  defaultCourier: getOptionalEnv('COURIER_DEFAULT', 'sa-paribahan'),
  activeCouriers: Object.freeze([
    'sa-paribahan',
    'sundarban',
    'redx',
    'pathao',
    'paperfly',
  ] as const),
  apiTimeoutMs: getOptionalEnvInt('COURIER_API_TIMEOUT_MS', 30000),
  retryAttempts: getOptionalEnvInt('COURIER_RETRY_ATTEMPTS', 3),
  retryDelayMs: getOptionalEnvInt('COURIER_RETRY_DELAY_MS', 60000),
  autoSelectCheapest: getOptionalEnvBool('COURIER_AUTO_CHEAPEST', false),
  preferFastest: getOptionalEnvBool('COURIER_PREFER_FASTEST', true),
  requireApiKey: getOptionalEnvBool('COURIER_REQUIRE_API_KEY', true),
  trackingEnabled: getOptionalEnvBool('COURIER_TRACKING_ENABLED', true),
  webhookEnabled: getOptionalEnvBool('COURIER_WEBHOOK_ENABLED', true),
});
