export const FACET_TYPE = {
  TERMS: 'terms',
  RANGE: 'range',
  HISTOGRAM: 'histogram',
  DATE_HISTOGRAM: 'date_histogram',
  GEO_DISTANCE: 'geo_distance',
  NESTED: 'nested',
  FILTER: 'filter',
  STATS: 'stats',
} as const;

export const FACET_FIELD = {
  CATEGORY: 'category',
  BRAND: 'brand',
  PRICE: 'price',
  RATING: 'rating',
  COLOR: 'color',
  SIZE: 'size',
  VENDOR: 'vendor',
  AVAILABILITY: 'availability',
  DISCOUNT: 'discount',
} as const;

export const FACET_SORT = {
  COUNT_DESC: 'count_desc',
  COUNT_ASC: 'count_asc',
  KEY_ASC: 'key_asc',
  KEY_DESC: 'key_desc',
  CUSTOM: 'custom',
} as const;

export const FACET = {
  MAX_FACETS: 30,
  MAX_FACET_VALUES: 100,
  MIN_FACET_COUNT: 1,
  AUTO_EXPAND: false,
  SHOW_COUNTS: true,
  MULTISELECT: true,
  SEARCH_WITHIN_FACET: true,
  ORDER_DEFAULT: FACET_SORT.COUNT_DESC,
} as const;

export type FacetTypeType = (typeof FACET_TYPE)[keyof typeof FACET_TYPE];
export type FacetFieldType = (typeof FACET_FIELD)[keyof typeof FACET_FIELD];
export type FacetSortType = (typeof FACET_SORT)[keyof typeof FACET_SORT];
