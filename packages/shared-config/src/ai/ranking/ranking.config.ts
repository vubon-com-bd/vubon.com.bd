/**
 * AI ranking configuration
 * @module shared-config/ai/ranking
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const RANKING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AI_RANKING_ENABLED', true),
  algorithm: getOptionalEnv('AI_RANKING_ALGORITHM', 'lambdamart'),
  defaultTopK: getOptionalEnvInt('AI_RANKING_TOP_K', 100),
  maxTopK: getOptionalEnvInt('AI_RANKING_MAX_K', 1000),
  diversityEnabled: getOptionalEnvBool('AI_RANKING_DIVERSITY', true),
  personalizationEnabled: getOptionalEnvBool('AI_RANKING_PERSONALIZATION', true),
  freshnessBoost: getOptionalEnvBool('AI_RANKING_FRESHNESS', true),
  freshnessDecayDays: getOptionalEnvInt('AI_RANKING_DECAY_DAYS', 30),
  cacheTtlSeconds: getOptionalEnvInt('AI_RANKING_CACHE_TTL', 300),
});
