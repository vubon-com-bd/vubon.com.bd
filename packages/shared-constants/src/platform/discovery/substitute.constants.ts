import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const SUBSTITUTE = {
  TYPES: {
    ...COMMON_TYPES,
    EXACT: 'exact',
    SIMILAR: 'similar',
    ALTERNATIVE: 'alternative',
    BUDGET: 'budget',
    PREMIUM: 'premium',
  },
  SUBSTITUTE_SCORE_THRESHOLD: 0.7,
  MAX_SUBSTITUTES: 10,
  SUBSTITUTE_SIMILARITY_THRESHOLD: 0.8,
  PRICE_RANGE_FACTOR: 0.2,
  UPDATE_INTERVAL_DAYS: 7,
} as const;
