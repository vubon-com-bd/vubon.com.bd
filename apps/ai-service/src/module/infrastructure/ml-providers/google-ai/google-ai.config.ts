import { getEnv, getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const GOOGLE_AI_CONFIG = Object.freeze({
  apiKey: getEnv('GOOGLE_AI_API_KEY'),
  defaultModel: getOptionalEnv('GOOGLE_AI_DEFAULT_MODEL', 'gemini-1.5-flash'),
  defaultEmbeddingModel: getOptionalEnv('GOOGLE_AI_EMBEDDING_MODEL', 'text-embedding-004'),
  defaultEmbeddingDimension: getOptionalEnvInt('GOOGLE_AI_EMBEDDING_DIM', 768),
  timeoutMs: getOptionalEnvInt('GOOGLE_AI_TIMEOUT_MS', 30000),
} as const);
