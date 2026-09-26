import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const LOCAL_CONFIG = Object.freeze({
  baseUrl: getOptionalEnv('LOCAL_LLM_URL', 'http://localhost:11434'),
  defaultModel: getOptionalEnv('LOCAL_LLM_MODEL', 'llama3'),
  defaultEmbeddingModel: getOptionalEnv('LOCAL_EMBEDDING_MODEL', 'nomic-embed-text'),
  defaultEmbeddingDimension: getOptionalEnvInt('LOCAL_EMBEDDING_DIM', 768),
  timeoutMs: getOptionalEnvInt('LOCAL_LLM_TIMEOUT_MS', 120000),
} as const);
