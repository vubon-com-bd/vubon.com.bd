import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const EMBEDDING_CONFIG = Object.freeze({
  defaultDimension: getOptionalEnvInt('EMBEDDING_DEFAULT_DIM', 1536),
  maxBatchSize: getOptionalEnvInt('EMBEDDING_MAX_BATCH', 2048),
  maxInputTokens: getOptionalEnvInt('EMBEDDING_MAX_INPUT_TOKENS', 8191),
  cacheTtlSeconds: getOptionalEnvInt('EMBEDDING_CACHE_TTL', 86400),
  normalize: true,
} as const);
