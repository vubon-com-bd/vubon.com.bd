import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SORT as COMMON_SORT } from '../../common/sort.constants';

// SORT এর পরিবর্তে PLATFORM_SORT ব্যবহার করছি
export const PLATFORM_SORT = {
  TYPES: {
    ...COMMON_TYPES,
    ...COMMON_SORT,
    RELEVANCE: 'relevance',
    POPULARITY: 'popularity',
    RATING: 'rating',
    PRICE: 'price',
    DATE: 'date',
    NAME: 'name',
    DISTANCE: 'distance',
    DISCOUNT: 'discount',
    BEST_SELLING: 'best_selling',
  },
  COMMON_SORT: { ...COMMON_SORT },
  SORT_DIRECTIONS: {
    ASC: 'asc',
    DESC: 'desc',
  },
  DEFAULT_SORT: 'relevance',
  DEFAULT_DIRECTION: 'desc',
} as const;
