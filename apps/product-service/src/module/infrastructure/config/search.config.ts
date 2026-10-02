import { getEnv, getOptionalEnv, getOptionalEnvInt } from './_helpers.js';

function parseProvider(): 'meilisearch' | 'elasticsearch' | 'typesense' {
  const raw = getOptionalEnv('SEARCH_PROVIDER', 'meilisearch') as string;
  return raw === 'elasticsearch' || raw === 'typesense' ? raw : 'meilisearch';
}

const SEARCH_CONFIG = Object.freeze({
  PROVIDER: parseProvider(),
  HOST: getOptionalEnv('SEARCH_HOST', 'http://localhost:7700') as string,
  API_KEY: getOptionalEnv('SEARCH_API_KEY', '') as string,
  PRODUCT_INDEX: getOptionalEnv('SEARCH_PRODUCT_INDEX', 'products') as string,
  CATEGORY_INDEX: getOptionalEnv('SEARCH_CATEGORY_INDEX', 'categories') as string,
  BATCH_SIZE: getOptionalEnvInt('SEARCH_BATCH_SIZE', 100),
  TIMEOUT_MS: getOptionalEnvInt('SEARCH_TIMEOUT_MS', 5000),
  RETRY_ATTEMPTS: getOptionalEnvInt('SEARCH_RETRY_ATTEMPTS', 3),
});

export type SearchConfig = typeof SEARCH_CONFIG;
export const searchConfig = SEARCH_CONFIG;
export function getSearchConfig(): SearchConfig { return SEARCH_CONFIG; }
void getEnv;
