/**
 * AI recommendation configuration
 * @module shared-config/ai/recommendation
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const RECOMMENDATION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AI_RECOMMENDATION_ENABLED', true),
  strategy: getOptionalEnv('AI_RECOMMENDATION_STRATEGY', 'hybrid'),
  maxRecommendations: getOptionalEnvInt('AI_RECOMMENDATION_MAX', 50),
  defaultCount: getOptionalEnvInt('AI_RECOMMENDATION_COUNT', 10),
  minScore: getOptionalEnvInt('AI_RECOMMENDATION_MIN_SCORE', 1), // /10
  cacheTtlSeconds: getOptionalEnvInt('AI_RECOMMENDATION_CACHE_TTL', 300),
  refreshIntervalSeconds: getOptionalEnvInt('AI_RECOMMENDATION_REFRESH', 3600),
  personalize: getOptionalEnvBool('AI_RECOMMENDATION_PERSONALIZE', true),
  diversityEnabled: getOptionalEnvBool('AI_RECOMMENDATION_DIVERSITY', true),
  excludeOutOfStock: getOptionalEnvBool('AI_RECOMMENDATION_EXCLUDE_OOS', true),
  excludePurchased: getOptionalEnvBool('AI_RECOMMENDATION_EXCLUDE_PURCHASED', false),
});
