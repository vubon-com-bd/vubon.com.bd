/**
 * Push notification base configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PUSH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PUSH_ENABLED', true),
  provider: getOptionalEnv('PUSH_PROVIDER', 'fcm'), // fcm | apns | web-push | onesignal
  defaultTtlSeconds: getOptionalEnvInt('PUSH_DEFAULT_TTL_SECONDS', 2419200),
  maxRetries: getOptionalEnvInt('PUSH_MAX_RETRIES', 3),
  rateLimitPerSecond: getOptionalEnvInt('PUSH_RATE_LIMIT_PER_SECOND', 500),
  trackDelivery: getOptionalEnvBool('PUSH_TRACK_DELIVERY', true),
});
