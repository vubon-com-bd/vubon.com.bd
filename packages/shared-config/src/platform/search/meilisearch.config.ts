/**
 * Meilisearch configuration
 * @module shared-config/platform/search
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const MEILISEARCH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('MEILISEARCH_ENABLED', false),
  host: getOptionalEnv('MEILISEARCH_HOST', 'http://localhost:7700'),
  apiKey: getOptionalEnv('MEILISEARCH_API_KEY', ''),
  indexPrefix: getOptionalEnv('MEILISEARCH_INDEX_PREFIX', 'vubon'),
  timeoutMs: getOptionalEnvInt('MEILISEARCH_TIMEOUT_MS', 5000),
  maxRetries: getOptionalEnvInt('MEILISEARCH_MAX_RETRIES', 2),
});
