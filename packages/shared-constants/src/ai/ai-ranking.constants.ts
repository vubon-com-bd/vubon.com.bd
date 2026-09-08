import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { SEARCH_SORT } from '../platform/search/search-sort.constants';

export const AI_RANKING = {
  TYPES: {
    ...COMMON_TYPES,
    ...SEARCH_SORT.TYPES,
    LEARNING_TO_RANK: 'learning_to_rank',
    NEURAL_RANKING: 'neural_ranking',
    PERSONALIZED: 'personalized',
    CONTEXTUAL: 'contextual',
  },
  SEARCH_SORT: { ...SEARCH_SORT },
  RANKING_FEATURES: {
    RELEVANCE: 0.3,
    POPULARITY: 0.2,
    RATING: 0.15,
    RECENCY: 0.1,
    PERSONALIZATION: 0.15,
    CONTEXT: 0.1,
  },
  LEARNING_TO_RANK_ALGORITHMS: {
    LAMBDA_MART: 'lambda_mart',
    RANK_SVM: 'rank_svm',
    RANK_NET: 'rank_net',
    LIST_NET: 'list_net',
  },
  MAX_RANKING_RESULTS: 100,
  RANKING_MODEL_UPDATE_INTERVAL_HOURS: 6,
} as const;
