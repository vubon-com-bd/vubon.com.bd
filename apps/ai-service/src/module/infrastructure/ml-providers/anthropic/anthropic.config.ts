import { getEnv, getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const ANTHROPIC_CONFIG = Object.freeze({
  apiKey: getEnv('ANTHROPIC_API_KEY'),
  baseUrl: getOptionalEnv('ANTHROPIC_BASE_URL', 'https://api.anthropic.com'),
  defaultModel: getOptionalEnv('ANTHROPIC_DEFAULT_MODEL', 'claude-3-haiku-20240307'),
  maxRetries: getOptionalEnvInt('ANTHROPIC_MAX_RETRIES', 3),
  timeoutMs: getOptionalEnvInt('ANTHROPIC_TIMEOUT_MS', 60000),
  maxTokens: getOptionalEnvInt('ANTHROPIC_MAX_TOKENS', 4096),
} as const);
