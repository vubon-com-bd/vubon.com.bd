/**
 * Elasticsearch configuration
 * @module shared-config/platform/search
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ELASTICSEARCH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ELASTICSEARCH_ENABLED', false),
  node: getOptionalEnv('ELASTICSEARCH_NODE', 'http://localhost:9200'),
  username: getOptionalEnv('ELASTICSEARCH_USERNAME', ''),
  password: getOptionalEnv('ELASTICSEARCH_PASSWORD', ''),
  apiKey: getOptionalEnv('ELASTICSEARCH_API_KEY', ''),
  indexPrefix: getOptionalEnv('ELASTICSEARCH_INDEX_PREFIX', 'vubon'),
  requestTimeoutMs: getOptionalEnvInt('ELASTICSEARCH_TIMEOUT_MS', 30000),
  maxRetries: getOptionalEnvInt('ELASTICSEARCH_MAX_RETRIES', 3),
  sniffOnStart: getOptionalEnvBool('ELASTICSEARCH_SNIFF_ON_START', false),
  sslRejectUnauthorized: getOptionalEnvBool('ELASTICSEARCH_SSL_STRICT', true),
});
