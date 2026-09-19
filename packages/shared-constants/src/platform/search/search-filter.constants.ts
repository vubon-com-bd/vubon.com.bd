export const SEARCH_FILTER_TYPE = {
  TERM: 'term',
  TERMS: 'terms',
  RANGE: 'range',
  EXISTS: 'exists',
  MISSING: 'missing',
  PREFIX: 'prefix',
  WILDCARD: 'wildcard',
  REGEXP: 'regexp',
  NESTED: 'nested',
  GEO_DISTANCE: 'geo_distance',
  GEO_BOUNDING_BOX: 'geo_bounding_box',
} as const;

export const SEARCH_FILTER_RANGE = {
  PRICE: 'price',
  RATING: 'rating',
  DATE: 'date',
  STOCK: 'stock',
  DISCOUNT: 'discount',
  WEIGHT: 'weight',
  DISTANCE: 'distance',
} as const;

export const SEARCH_FILTER = {
  MAX_FILTERS: 50,
  MAX_VALUES_PER_FILTER: 1000,
  MAX_RANGE_VALUES: 100,
  MAX_NESTED_DEPTH: 5,
  CACHE_ENABLED: true,
  AUTO_AGGREGATE: true,
} as const;

export type SearchFilterTypeType = (typeof SEARCH_FILTER_TYPE)[keyof typeof SEARCH_FILTER_TYPE];
export type SearchFilterRangeType = (typeof SEARCH_FILTER_RANGE)[keyof typeof SEARCH_FILTER_RANGE];
