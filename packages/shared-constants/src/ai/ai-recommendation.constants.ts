import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { RECOMMENDATION_TYPE } from '../platform/discovery/recommendation-type.constants';
import { RECOMMENDATION_STRATEGY } from '../platform/discovery/recommendation-strategy.constants';

export const AI_RECOMMENDATION = {
  TYPES: {
    ...COMMON_TYPES,
    ...RECOMMENDATION_TYPE,
    AI_PERSONALIZED: 'ai_personalized',
    AI_CONTEXTUAL: 'ai_contextual',
    AI_BEHAVIORAL: 'ai_behavioral',
    AI_SEMANTIC: 'ai_semantic',
  },
  RECOMMENDATION_TYPE: { ...RECOMMENDATION_TYPE },
  RECOMMENDATION_STRATEGY: { ...RECOMMENDATION_STRATEGY },
  AI_RECOMMENDATION_ALGORITHMS: {
    MATRIX_FACTORIZATION: 'matrix_factorization',
    NEURAL_COLLABORATIVE: 'neural_collaborative',
    TWO_TOWER: 'two_tower',
    DEEP_CROSS: 'deep_cross',
    WIDE_AND_DEEP: 'wide_and_deep',
  },
  RECOMMENDATION_SCORE_THRESHOLD: 0.6,
  MAX_AI_RECOMMENDATIONS: 20,
  MIN_AI_RECOMMENDATIONS: 3,
} as const;
