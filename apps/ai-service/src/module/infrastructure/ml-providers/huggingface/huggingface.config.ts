import { getEnv, getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const HUGGINGFACE_CONFIG = Object.freeze({
  apiKey: getEnv('HUGGINGFACE_API_KEY'),
  baseUrl: getOptionalEnv('HUGGINGFACE_BASE_URL', 'https://api-inference.huggingface.co'),
  defaultModel: getOptionalEnv('HUGGINGFACE_DEFAULT_MODEL', 'meta-llama/Meta-Llama-3-8B-Instruct'),
  defaultEmbeddingModel: getOptionalEnv('HUGGINGFACE_EMBEDDING_MODEL', 'BAAI/bge-large-en-v1.5'),
  defaultEmbeddingDimension: getOptionalEnvInt('HUGGINGFACE_EMBEDDING_DIM', 1024),
  timeoutMs: getOptionalEnvInt('HUGGINGFACE_TIMEOUT_MS', 60000),
} as const);
