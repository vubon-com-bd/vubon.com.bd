/**
 * OpenAI configuration
 * @module shared-config/ai/model
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const OPENAI_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('OPENAI_ENABLED', false),
  apiKey: getOptionalEnv('OPENAI_API_KEY', ''),
  organization: getOptionalEnv('OPENAI_ORG_ID', ''),
  baseUrl: getOptionalEnv('OPENAI_BASE_URL', 'https://api.openai.com/v1'),
  defaultModel: getOptionalEnv('OPENAI_MODEL', 'gpt-4o-mini'),
  embeddingModel: getOptionalEnv('OPENAI_EMBEDDING_MODEL', 'text-embedding-3-small'),
  timeoutMs: getOptionalEnvInt('OPENAI_TIMEOUT_MS', 60000),
  maxRetries: getOptionalEnvInt('OPENAI_MAX_RETRIES', 3),
});
