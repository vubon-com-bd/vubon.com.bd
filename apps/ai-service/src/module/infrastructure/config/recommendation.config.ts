import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const RECOMMENDATION_CONFIG = Object.freeze({
  defaultLimit: getOptionalEnvInt('RECOMMENDATION_LIMIT', 10),
  maxLimit: getOptionalEnvInt('RECOMMENDATION_MAX_LIMIT', 100),
  minHistoryItems: getOptionalEnvInt('RECOMMENDATION_MIN_HISTORY', 5),
  cacheTtlSeconds: getOptionalEnvInt('RECOMMENDATION_CACHE_TTL', 300),
  collaborativeWeight: 0.5,
  contentWeight: 0.5,
} as const);
