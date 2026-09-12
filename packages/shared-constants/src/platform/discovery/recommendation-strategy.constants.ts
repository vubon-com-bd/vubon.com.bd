import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const RECOMMENDATION_STRATEGY = {
  TYPES: {
    ...COMMON_TYPES,
    COLLABORATIVE_FILTERING: 'collaborative_filtering',
    CONTENT_BASED: 'content_based',
    HYBRID: 'hybrid',
    POPULARITY: 'popularity',
    TRENDING: 'trending',
    PERSONALIZED: 'personalized',
    RULE_BASED: 'rule_based',
    AI_BASED: 'ai_based',
    ASSOCIATION: 'association',
    SEQUENTIAL: 'sequential',
    CONTEXTUAL: 'contextual',
  },
  STRATEGY_WEIGHTS: {
    COLLABORATIVE_FILTERING: 0.3,
    CONTENT_BASED: 0.25,
    POPULARITY: 0.15,
    TRENDING: 0.1,
    CONTEXTUAL: 0.1,
    SEQUENTIAL: 0.1,
  },
  MIN_SAMPLES_FOR_STRATEGY: 10,
  MODEL_UPDATE_INTERVAL_HOURS: 6,
} as const;
