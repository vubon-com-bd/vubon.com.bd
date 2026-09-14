/**
 * Custom analytics configuration (self-hosted)
 * @module shared-config/platform/analytics
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const CUSTOM_ANALYTICS_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('CUSTOM_ANALYTICS_ENABLED', false),
  endpoint: getOptionalEnv('CUSTOM_ANALYTICS_ENDPOINT', ''),
  apiKey: getOptionalEnv('CUSTOM_ANALYTICS_API_KEY', ''),
  batchSize: getOptionalEnvInt('CUSTOM_ANALYTICS_BATCH_SIZE', 50),
  flushIntervalMs: getOptionalEnvInt('CUSTOM_ANALYTICS_FLUSH_MS', 15000),
  retryAttempts: getOptionalEnvInt('CUSTOM_ANALYTICS_RETRY', 3),
  timeoutMs: getOptionalEnvInt('CUSTOM_ANALYTICS_TIMEOUT_MS', 10000),
});
