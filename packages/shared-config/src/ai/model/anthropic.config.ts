/**
 * Anthropic Claude configuration
 * @module shared-config/ai/model
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ANTHROPIC_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ANTHROPIC_ENABLED', false),
  apiKey: getOptionalEnv('ANTHROPIC_API_KEY', ''),
  baseUrl: getOptionalEnv('ANTHROPIC_BASE_URL', 'https://api.anthropic.com/v1'),
  defaultModel: getOptionalEnv('ANTHROPIC_MODEL', 'claude-3-5-sonnet-20241022'),
  apiVersion: getOptionalEnv('ANTHROPIC_VERSION', '2023-06-01'),
  timeoutMs: getOptionalEnvInt('ANTHROPIC_TIMEOUT_MS', 60000),
  maxRetries: getOptionalEnvInt('ANTHROPIC_MAX_RETRIES', 3),
});
