/**
 * Search Infrastructure Configuration
 * @module product-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SEARCH_INFRA_CONFIG = Object.freeze({
  enabled: true,
  defaultLimit: getOptionalEnvInt('SEARCH_DEFAULT_LIMIT', 20),
  maxLimit: getOptionalEnvInt('SEARCH_MAX_LIMIT', 100),
  reindexBatchSize: getOptionalEnvInt('SEARCH_REINDEX_BATCH', 500),
  reindexIntervalMs: getOptionalEnvInt('SEARCH_REINDEX_INTERVAL_MS', 3600000),
} as const);

export type SearchInfraConfig = typeof SEARCH_INFRA_CONFIG;
