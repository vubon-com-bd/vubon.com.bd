import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const RANKING_CONFIG = Object.freeze({
  defaultLimit: getOptionalEnvInt('RANKING_DEFAULT_LIMIT', 50),
  featureWeights: Object.freeze({
    relevance: 0.4,
    ctr: 0.3,
    freshness: 0.2,
    popularity: 0.1,
  }),
  cacheTtlSeconds: getOptionalEnvInt('RANKING_CACHE_TTL', 300),
} as const);
