import { getEnv, getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const COHERE_CONFIG = Object.freeze({
  apiKey: getEnv('COHERE_API_KEY'),
  defaultModel: getOptionalEnv('COHERE_DEFAULT_MODEL', 'command-r'),
  defaultEmbeddingModel: getOptionalEnv('COHERE_EMBEDDING_MODEL', 'embed-multilingual-v3.0'),
  defaultEmbeddingDimension: getOptionalEnvInt('COHERE_EMBEDDING_DIM', 1024),
  timeoutMs: getOptionalEnvInt('COHERE_TIMEOUT_MS', 30000),
} as const);
