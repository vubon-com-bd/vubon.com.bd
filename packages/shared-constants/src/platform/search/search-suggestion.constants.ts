import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const SEARCH_SUGGESTION = {
  TYPES: {
    ...COMMON_TYPES,
    POPULAR: 'popular',
    RELATED: 'related',
    TRENDING: 'trending',
    CORRECTION: 'correction',
    COMPLETION: 'completion',
    HISTORICAL: 'historical',
  },
  SUGGESTION_WEIGHTS: {
    POPULAR: 2.0,
    TRENDING: 1.8,
    RELATED: 1.5,
    HISTORICAL: 1.2,
    COMPLETION: 1.0,
  },
  MAX_SUGGESTIONS: 10,
  MIN_SUGGESTION_LENGTH: 2,
  SUGGESTION_CACHE_TTL_HOURS: 24,
  AUTO_CORRECT_THRESHOLD: 0.8,
} as const;
