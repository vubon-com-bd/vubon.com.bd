import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const SEARCH_BOOST = {
  TYPES: {
    ...COMMON_TYPES,
    TITLE: 'title',
    DESCRIPTION: 'description',
    CONTENT: 'content',
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
    TAGS: 'tags',
    SKU: 'sku',
    POPULARITY: 'popularity',
    RATING: 'rating',
    SALES: 'sales',
    NEWNESS: 'newness',
    PROMOTION: 'promotion',
  },
  BOOST_WEIGHTS: {
    TITLE: 5.0,
    CATEGORY: 4.0,
    BRAND: 3.0,
    TAGS: 2.5,
    DESCRIPTION: 2.0,
    CONTENT: 1.5,
    SKU: 1.0,
  },
  POPULARITY_BOOST: {
    HIGH: 2.0,
    MEDIUM: 1.5,
    LOW: 1.0,
  },
  RATING_BOOST: {
    HIGH: 2.0,
    MEDIUM: 1.5,
    LOW: 1.0,
  },
  NEWNESS_BOOST_DAYS: 30,
  NEWNESS_BOOST_FACTOR: 1.5,
  PROMOTION_BOOST_FACTOR: 2.0,
} as const;
