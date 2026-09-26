import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const SEARCH_CONFIG = Object.freeze({
  indexName: getOptionalEnv('SEARCH_INDEX_NAME', 'products'),
  categoryIndexName: getOptionalEnv('SEARCH_CATEGORY_INDEX', 'categories'),
  maxResults: getOptionalEnvInt('SEARCH_MAX_RESULTS', 100),
  pageSize: getOptionalEnvInt('SEARCH_PAGE_SIZE', 20),
  enableFuzzy: true,
} as const);
