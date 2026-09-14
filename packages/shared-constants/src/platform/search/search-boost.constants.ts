export const SEARCH_BOOST_FIELD = {
  TITLE: 'title',
  NAME: 'name',
  DESCRIPTION: 'description',
  TAGS: 'tags',
  CATEGORY: 'category',
  BRAND: 'brand',
  SKU: 'sku',
  RATING: 'rating',
  POPULARITY: 'popularity',
  RECENCY: 'recency',
} as const;

export const SEARCH_BOOST = {
  title: 3.0,
  name: 3.0,
  tags: 2.0,
  category: 1.5,
  brand: 1.5,
  sku: 2.5,
  description: 1.0,
  rating: 1.2,
  popularity: 1.5,
  recency: 1.3,
} as const;

export const SEARCH_BOOST_LIMIT = {
  MIN_BOOST: 0.1,
  MAX_BOOST: 10.0,
  DEFAULT_BOOST: 1.0,
  MAX_BOOSTED_FIELDS: 20,
  DECAY_ENABLED: true,
  DECAY_SCALE_DAYS: 30,
} as const;

export type SearchBoostFieldType = (typeof SEARCH_BOOST_FIELD)[keyof typeof SEARCH_BOOST_FIELD];
