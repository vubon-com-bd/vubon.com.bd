/**
 * Google AI (Gemini) configuration
 * @module shared-config/ai/model
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const GOOGLE_AI_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('GOOGLE_AI_ENABLED', false),
  apiKey: getOptionalEnv('GOOGLE_AI_API_KEY', ''),
  baseUrl: getOptionalEnv('GOOGLE_AI_BASE_URL', 'https://generativelanguage.googleapis.com/v1beta'),
  defaultModel: getOptionalEnv('GOOGLE_AI_MODEL', 'gemini-1.5-flash'),
  timeoutMs: getOptionalEnvInt('GOOGLE_AI_TIMEOUT_MS', 60000),
  maxRetries: getOptionalEnvInt('GOOGLE_AI_MAX_RETRIES', 3),
});
