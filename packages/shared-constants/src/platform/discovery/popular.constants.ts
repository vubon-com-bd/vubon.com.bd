import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const POPULAR = {
  TYPES: {
    ...COMMON_TYPES,
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    BRANDS: 'brands',
    VENDORS: 'vendors',
    REVIEWS: 'reviews',
    SEARCHES: 'searches',
  },
  POPULARITY_METRICS: {
    VIEWS: 'views',
    PURCHASES: 'purchases',
    RATINGS: 'ratings',
    REVIEWS: 'reviews',
    SHARES: 'shares',
    BOOKMARKS: 'bookmarks',
  },
  POPULARITY_WEIGHTS: {
    PURCHASES: 0.4,
    VIEWS: 0.2,
    RATINGS: 0.15,
    REVIEWS: 0.1,
    SHARES: 0.1,
    BOOKMARKS: 0.05,
  },
  MAX_POPULAR_ITEMS: 100,
  MIN_POPULARITY_SCORE: 50,
  POPULARITY_UPDATE_INTERVAL_DAYS: 1,
} as const;
