import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SORT as COMMON_SORT } from '../../common/sort.constants';

export const SEARCH_SORT = {
  TYPES: {
    ...COMMON_TYPES,
    ...COMMON_SORT,
    RELEVANCE: 'relevance',
    POPULARITY: 'popularity',
    RATING: 'rating',
    PRICE_LOW_TO_HIGH: 'price_low_to_high',
    PRICE_HIGH_TO_LOW: 'price_high_to_low',
    NEWEST: 'newest',
    OLDEST: 'oldest',
    BEST_SELLING: 'best_selling',
    MOST_VIEWED: 'most_viewed',
    DISCOUNT: 'discount',
    DISTANCE: 'distance',
    NAME: 'name',
    DATE: 'date',
  },
  SORT: { ...COMMON_SORT },
  SORT_DIRECTIONS: {
    ASC: 'asc',
    DESC: 'desc',
  },
  DEFAULT_SORT: 'relevance',
  DEFAULT_DIRECTION: 'desc',
} as const;
