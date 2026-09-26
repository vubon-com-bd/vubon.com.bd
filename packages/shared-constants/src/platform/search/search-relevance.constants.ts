export const SEARCH_RELEVANCE_ALGORITHM = {
  TF_IDF: 'tf_idf',
  BM25: 'bm25',
  BM25F: 'bm25f',
  VECTOR_SIMILARITY: 'vector_similarity',
  HYBRID: 'hybrid',
  LEARNING_TO_RANK: 'learning_to_rank',
} as const;

export const SEARCH_RELEVANCE = {
  BM25_K1: 1.2,
  BM25_B: 0.75,
  MIN_SCORE: 0.0,
  MAX_SCORE: 100.0,
  SCORE_THRESHOLD: 0.1,
  PERSONALIZATION_ENABLED: true,
  DIVERSITY_ENABLED: true,
  DIVERSITY_FACTOR: 0.3,
  FRESHNESS_BOOST: true,
  FRESHNESS_DECAY_DAYS: 30,
} as const;

export type SearchRelevanceAlgorithmType =
  (typeof SEARCH_RELEVANCE_ALGORITHM)[keyof typeof SEARCH_RELEVANCE_ALGORITHM];
