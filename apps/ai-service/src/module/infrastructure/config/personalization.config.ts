import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const PERSONALIZATION_CONFIG = Object.freeze({
  minConfidenceThreshold: getOptionalEnvInt('PERSONALIZATION_MIN_CONFIDENCE', 50) / 100,
  maxProfileInterests: getOptionalEnvInt('PERSONALIZATION_MAX_INTERESTS', 20),
  cacheTtlSeconds: getOptionalEnvInt('PERSONALIZATION_CACHE_TTL', 300),
  minInteractionsForProfile: getOptionalEnvInt('PERSONALIZATION_MIN_INTERACTIONS', 10),
} as const);
