/**
 * Search base configuration
 * @module shared-config/platform/search
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SEARCH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SEARCH_ENABLED', true),
  provider: getOptionalEnv('SEARCH_PROVIDER', 'elasticsearch'), // elasticsearch | algolia | meilisearch | typesense
  defaultLimit: getOptionalEnvInt('SEARCH_DEFAULT_LIMIT', 20),
  maxLimit: getOptionalEnvInt('SEARCH_MAX_LIMIT', 100),
  timeoutMs: getOptionalEnvInt('SEARCH_TIMEOUT_MS', 5000),
  cacheTtlSeconds: getOptionalEnvInt('SEARCH_CACHE_TTL_SECONDS', 300),
  fuzzyEnabled: getOptionalEnvBool('SEARCH_FUZZY_ENABLED', true),
  fuzzyMinLength: getOptionalEnvInt('SEARCH_FUZZY_MIN_LENGTH', 3),
  highlightEnabled: getOptionalEnvBool('SEARCH_HIGHLIGHT_ENABLED', true),
  facetEnabled: getOptionalEnvBool('SEARCH_FACET_ENABLED', true),
  suggestionsEnabled: getOptionalEnvBool('SEARCH_SUGGESTIONS_ENABLED', true),
});
