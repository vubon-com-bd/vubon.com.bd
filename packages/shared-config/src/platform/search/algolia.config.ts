/**
 * Algolia configuration
 * @module shared-config/platform/search
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ALGOLIA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ALGOLIA_ENABLED', false),
  appId: getOptionalEnv('ALGOLIA_APP_ID', ''),
  apiKey: getOptionalEnv('ALGOLIA_API_KEY', ''),
  searchKey: getOptionalEnv('ALGOLIA_SEARCH_KEY', ''),
  indexPrefix: getOptionalEnv('ALGOLIA_INDEX_PREFIX', 'vubon'),
  timeoutMs: getOptionalEnvInt('ALGOLIA_TIMEOUT_MS', 5000),
  maxRetries: getOptionalEnvInt('ALGOLIA_MAX_RETRIES', 2),
});
