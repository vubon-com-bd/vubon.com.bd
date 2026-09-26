/**
 * Vector database base configuration
 * @module shared-config/ai/vector
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const VECTOR_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('VECTOR_ENABLED', true),
  provider: getOptionalEnv('VECTOR_PROVIDER', 'pgvector'), // pgvector | pinecone | weaviate | qdrant
  indexPrefix: getOptionalEnv('VECTOR_INDEX_PREFIX', 'vubon'),
  dimension: getOptionalEnvInt('VECTOR_DIMENSION', 1536),
  metric: getOptionalEnv('VECTOR_METRIC', 'cosine'), // cosine | euclidean | dot_product
  indexType: getOptionalEnv('VECTOR_INDEX_TYPE', 'hnsw'), // flat | ivf_flat | hnsw
  maxVectors: getOptionalEnvInt('VECTOR_MAX', 10000000),
  maxBatchSize: getOptionalEnvInt('VECTOR_BATCH_SIZE', 1000),
  topK: getOptionalEnvInt('VECTOR_TOP_K', 10),
  timeoutMs: getOptionalEnvInt('VECTOR_TIMEOUT_MS', 30000),
});
