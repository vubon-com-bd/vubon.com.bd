import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const CUSTOM_CONFIG = Object.freeze({
  baseUrl: getOptionalEnv('CUSTOM_LLM_URL', ''),
  apiKey: getOptionalEnv('CUSTOM_LLM_API_KEY', ''),
  defaultModel: getOptionalEnv('CUSTOM_LLM_MODEL', 'custom-model'),
  timeoutMs: getOptionalEnvInt('CUSTOM_LLM_TIMEOUT_MS', 60000),
} as const);
