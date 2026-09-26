import { getEnv, getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const VECTOR_CONFIG = Object.freeze({
  defaultProvider: getOptionalEnv('VECTOR_DEFAULT_PROVIDER', 'pinecone'),
  defaultMetric: getOptionalEnv('VECTOR_DEFAULT_METRIC', 'cosine'),
  defaultTopK: getOptionalEnvInt('VECTOR_DEFAULT_TOP_K', 10),
  maxDimension: getOptionalEnvInt('VECTOR_MAX_DIMENSION', 16384),
  indexBuildTimeoutMs: getOptionalEnvInt('VECTOR_INDEX_BUILD_TIMEOUT_MS', 300000),
  // Provider-specific
  pineconeApiKey: getEnv('PINECONE_API_KEY'),
  pineconeEnvironment: getEnv('PINECONE_ENVIRONMENT'),
  pineconeIndex: getOptionalEnv('PINECONE_INDEX', 'vubon-ai'),
  weaviateUrl: getOptionalEnv('WEAVIATE_URL', 'http://localhost:8080'),
  weaviateApiKey: getOptionalEnv('WEAVIATE_API_KEY', ''),
  qdrantUrl: getOptionalEnv('QDRANT_URL', 'http://localhost:6333'),
  qdrantApiKey: getOptionalEnv('QDRANT_API_KEY', ''),
} as const);
