/**
 * Typesense configuration
 * @module shared-config/platform/search
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const TYPESENSE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('TYPESENSE_ENABLED', false),
  host: getOptionalEnv('TYPESENSE_HOST', 'localhost'),
  port: getOptionalEnvInt('TYPESENSE_PORT', 8108),
  protocol: getOptionalEnv('TYPESENSE_PROTOCOL', 'http'),
  apiKey: getOptionalEnv('TYPESENSE_API_KEY', ''),
  connectionTimeoutMs: getOptionalEnvInt('TYPESENSE_CONNECTION_TIMEOUT_MS', 2000),
  numRetries: getOptionalEnvInt('TYPESENSE_NUM_RETRIES', 3),
  retryIntervalMs: getOptionalEnvInt('TYPESENSE_RETRY_INTERVAL_MS', 100),
});
