import { getEnv, getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const OPENAI_CONFIG = Object.freeze({
  apiKey: getEnv('OPENAI_API_KEY'),
  baseUrl: getOptionalEnv('OPENAI_BASE_URL', 'https://api.openai.com/v1'),
  defaultModel: getOptionalEnv('OPENAI_DEFAULT_MODEL', 'gpt-4o-mini'),
  defaultEmbeddingModel: getOptionalEnv('OPENAI_EMBEDDING_MODEL', 'text-embedding-3-small'),
  defaultEmbeddingDimension: getOptionalEnvInt('OPENAI_EMBEDDING_DIM', 1536),
  maxRetries: getOptionalEnvInt('OPENAI_MAX_RETRIES', 3),
  timeoutMs: getOptionalEnvInt('OPENAI_TIMEOUT_MS', 30000),
} as const);

export type OpenAiConfig = typeof OPENAI_CONFIG;
