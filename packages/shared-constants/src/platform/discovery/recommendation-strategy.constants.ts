export const RECOMMENDATION_STRATEGY = {
  COLLABORATIVE_FILTERING: 'collaborative_filtering',
  CONTENT_BASED: 'content_based',
  HYBRID: 'hybrid',
  MATRIX_FACTORIZATION: 'matrix_factorization',
  DEEP_LEARNING: 'deep_learning',
  KNOWLEDGE_BASED: 'knowledge_based',
  DEMOGRAPHIC: 'demographic',
  CONTEXTUAL: 'contextual',
  SESSION_BASED: 'session_based',
  REINFORCEMENT: 'reinforcement',
} as const;

export const RECOMMENDATION_STRATEGY_WEIGHT = {
  collaborative_filtering: 0.3,
  content_based: 0.25,
  trending: 0.2,
  personalized: 0.25,
} as const;

export const RECOMMENDATION_STRATEGY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  TRAINING: 'training',
  DEPLOYED: 'deployed',
  ARCHIVED: 'archived',
} as const;

export type RecommendationStrategyType =
  (typeof RECOMMENDATION_STRATEGY)[keyof typeof RECOMMENDATION_STRATEGY];
export type RecommendationStrategyStatusType =
  (typeof RECOMMENDATION_STRATEGY_STATUS)[keyof typeof RECOMMENDATION_STRATEGY_STATUS];
