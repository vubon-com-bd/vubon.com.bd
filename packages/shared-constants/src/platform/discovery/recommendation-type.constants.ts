import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const RECOMMENDATION_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    PERSONALIZED: 'personalized',
    TRENDING: 'trending',
    POPULAR: 'popular',
    RECENTLY_VIEWED: 'recently_viewed',
    FREQUENTLY_BOUGHT: 'frequently_bought',
    COMPLEMENTARY: 'complementary',
    SUBSTITUTE: 'substitute',
    UPSELLING: 'upselling',
    CROSS_SELLING: 'cross_selling',
    BUNDLE: 'bundle',
    NEW_ARRIVALS: 'new_arrivals',
    BEST_SELLERS: 'best_sellers',
    TOP_RATED: 'top_rated',
    DISCOUNTED: 'discounted',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
  },
} as const;
