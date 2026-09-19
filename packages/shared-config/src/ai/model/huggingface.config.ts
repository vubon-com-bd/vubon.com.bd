/**
 * Hugging Face configuration
 * @module shared-config/ai/model
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const HUGGINGFACE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('HUGGINGFACE_ENABLED', false),
  apiKey: getOptionalEnv('HUGGINGFACE_API_KEY', ''),
  baseUrl: getOptionalEnv('HUGGINGFACE_BASE_URL', 'https://api-inference.huggingface.co'),
  defaultModel: getOptionalEnv('HUGGINGFACE_MODEL', 'meta-llama/Llama-3-8b-instruct'),
  timeoutMs: getOptionalEnvInt('HUGGINGFACE_TIMEOUT_MS', 120000),
  maxRetries: getOptionalEnvInt('HUGGINGFACE_MAX_RETRIES', 3),
});
