export const AI_RANKING_ALGORITHM = {
  LEARNING_TO_RANK: 'learning_to_rank',
  PAIRWISE: 'pairwise',
  LISTWISE: 'listwise',
  POINTWISE: 'pointwise',
  LAMBDAMART: 'lambdamart',
  RANKNET: 'ranknet',
  NEURAL_RANKING: 'neural_ranking',
} as const;

export const AI_RANKING_FEATURE = {
  RELEVANCE: 'relevance',
  POPULARITY: 'popularity',
  RECENCY: 'recency',
  PRICE: 'price',
  RATING: 'rating',
  CLICK_THROUGH: 'click_through',
  CONVERSION: 'conversion',
  PERSONALIZATION: 'personalization',
  DIVERSITY: 'diversity',
  FRESHNESS: 'freshness',
} as const;

export const AI_RANKING = {
  ALGORITHM: AI_RANKING_ALGORITHM,
  FEATURE: AI_RANKING_FEATURE,
  DEFAULT_ALGORITHM: AI_RANKING_ALGORITHM.LAMBDAMART,
  DEFAULT_TOP_K: 100,
  MAX_TOP_K: 1000,
  MIN_SCORE: 0.0,
  MAX_SCORE: 1.0,
  DIVERSITY_ENABLED: true,
  DIVERSITY_FACTOR: 0.3,
  PERSONALIZATION_ENABLED: true,
  FRESHNESS_BOOST: true,
  FRESHNESS_DECAY_DAYS: 30,
  CACHE_TTL_SECONDS: 300,
} as const;

export type AiRankingType = typeof AI_RANKING;
