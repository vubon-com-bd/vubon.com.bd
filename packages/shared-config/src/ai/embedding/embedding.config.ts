/**
 * AI embedding configuration
 * @module shared-config/ai/embedding
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const EMBEDDING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AI_EMBEDDING_ENABLED', true),
  model: getOptionalEnv('AI_EMBEDDING_MODEL', 'text-embedding-3-small'),
  dimension: getOptionalEnvInt('AI_EMBEDDING_DIMENSION', 1536),
  maxBatchSize: getOptionalEnvInt('AI_EMBEDDING_BATCH_SIZE', 2048),
  maxInputLength: getOptionalEnvInt('AI_EMBEDDING_MAX_INPUT', 8191),
  normalize: getOptionalEnvBool('AI_EMBEDDING_NORMALIZE', true),
  cacheEnabled: getOptionalEnvBool('AI_EMBEDDING_CACHE', true),
  cacheTtlSeconds: getOptionalEnvInt('AI_EMBEDDING_CACHE_TTL', 86400),
  timeoutMs: getOptionalEnvInt('AI_EMBEDDING_TIMEOUT_MS', 30000),
});
