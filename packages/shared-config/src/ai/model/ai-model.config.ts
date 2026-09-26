/**
 * AI model base configuration
 * @module shared-config/ai/model
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const AI_MODEL_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AI_ENABLED', true),
  activeProvider: getOptionalEnv('AI_ACTIVE_PROVIDER', 'openai'),
  defaultModel: getOptionalEnv('AI_DEFAULT_MODEL', 'gpt-4o-mini'),
  maxTokens: getOptionalEnvInt('AI_MAX_TOKENS', 4096),
  temperature: getOptionalEnvInt('AI_TEMPERATURE', 7), // /10 = 0.7
  topP: getOptionalEnvInt('AI_TOP_P', 10), // /10 = 1.0
  timeoutMs: getOptionalEnvInt('AI_TIMEOUT_MS', 60000),
  maxRetries: getOptionalEnvInt('AI_MAX_RETRIES', 3),
  retryDelayMs: getOptionalEnvInt('AI_RETRY_DELAY_MS', 1000),
  streamEnabled: getOptionalEnvBool('AI_STREAM_ENABLED', true),
  cacheEnabled: getOptionalEnvBool('AI_CACHE_ENABLED', true),
  cacheTtlSeconds: getOptionalEnvInt('AI_CACHE_TTL_SECONDS', 3600),
  rateLimitPerMinute: getOptionalEnvInt('AI_RATE_LIMIT_PER_MINUTE', 60),
  maxCostPerDayCents: getOptionalEnvInt('AI_MAX_COST_PER_DAY_CENTS', 10000),
});
