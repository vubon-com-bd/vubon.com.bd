/**
 * Search Sort Constants
 * Sort configurations for search results
 */

export const SEARCH_SORT = {
  // Sort Fields
  FIELDS: {
    RELEVANCE: 'relevance',
    PRICE: 'price',
    POPULARITY: 'popularity',
    RATING: 'rating',
    DATE: 'date',
    NAME: 'name',
    VENDOR: 'vendor',
    CATEGORY: 'category',
    SALES: 'sales',
    REVIEWS: 'reviews',
    DISTANCE: 'distance',
    CUSTOM: 'custom',
  } as const,

  // Sort Orders
  ORDERS: {
    ASC: 'asc',
    DESC: 'desc',
    RANDOM: 'random',
    CUSTOM: 'custom',
  } as const,

  // Sort Types
  TYPES: {
    FIELD: 'field',
    SCRIPT: 'script',
    GEO: 'geo',
    CUSTOM: 'custom',
  } as const,

  // Sort Modes
  MODES: {
    MIN: 'min',
    MAX: 'max',
    SUM: 'sum',
    AVG: 'avg',
    MEDIAN: 'median',
  } as const,

  // Sort Defaults
  DEFAULTS: {
    DEFAULT_FIELD: 'relevance',
    DEFAULT_ORDER: 'desc',
    DEFAULT_TYPE: 'field',
    DEFAULT_MODE: 'max',
    MAX_SORT_FIELDS: 5,
    MAX_CUSTOM_SORTS: 10,
  } as const,

  // Sort Limits
  LIMITS: {
    MIN_SORT_FIELDS: 1,
    MAX_SORT_FIELDS: 5,
    MAX_CUSTOM_SORTS: 10,
    MAX_GEO_DISTANCE: 100000,
  } as const,
} as const;

// Sort Fields
export type SearchSortField = (typeof SEARCH_SORT.FIELDS)[keyof typeof SEARCH_SORT.FIELDS];

// Sort Orders
export type SearchSortOrder = (typeof SEARCH_SORT.ORDERS)[keyof typeof SEARCH_SORT.ORDERS];

// Sort Types
export type SearchSortType = (typeof SEARCH_SORT.TYPES)[keyof typeof SEARCH_SORT.TYPES];

// Sort Modes
export type SearchSortMode = (typeof SEARCH_SORT.MODES)[keyof typeof SEARCH_SORT.MODES];

// Sort Defaults
export type SearchSortDefault = (typeof SEARCH_SORT.DEFAULTS)[keyof typeof SEARCH_SORT.DEFAULTS];

// Sort Limits
export type SearchSortLimit = (typeof SEARCH_SORT.LIMITS)[keyof typeof SEARCH_SORT.LIMITS];

// Utility Functions
export function searchSortGetFieldLabel(field: SearchSortField): string {
  const labels: Record<SearchSortField, string> = {
    [SEARCH_SORT.FIELDS.RELEVANCE]: 'Relevance',
    [SEARCH_SORT.FIELDS.PRICE]: 'Price',
    [SEARCH_SORT.FIELDS.POPULARITY]: 'Popularity',
    [SEARCH_SORT.FIELDS.RATING]: 'Rating',
    [SEARCH_SORT.FIELDS.DATE]: 'Date',
    [SEARCH_SORT.FIELDS.NAME]: 'Name',
    [SEARCH_SORT.FIELDS.VENDOR]: 'Vendor',
    [SEARCH_SORT.FIELDS.CATEGORY]: 'Category',
    [SEARCH_SORT.FIELDS.SALES]: 'Sales',
    [SEARCH_SORT.FIELDS.REVIEWS]: 'Reviews',
    [SEARCH_SORT.FIELDS.DISTANCE]: 'Distance',
    [SEARCH_SORT.FIELDS.CUSTOM]: 'Custom',
  };
  return labels[field] || 'Unknown Sort Field';
}

export function searchSortGetOrderLabel(order: SearchSortOrder): string {
  const labels: Record<SearchSortOrder, string> = {
    [SEARCH_SORT.ORDERS.ASC]: 'Ascending',
    [SEARCH_SORT.ORDERS.DESC]: 'Descending',
    [SEARCH_SORT.ORDERS.RANDOM]: 'Random',
    [SEARCH_SORT.ORDERS.CUSTOM]: 'Custom',
  };
  return labels[order] || 'Unknown Sort Order';
}

export function searchSortGetTypeLabel(type: SearchSortType): string {
  const labels: Record<SearchSortType, string> = {
    [SEARCH_SORT.TYPES.FIELD]: 'Field Sort',
    [SEARCH_SORT.TYPES.SCRIPT]: 'Script Sort',
    [SEARCH_SORT.TYPES.GEO]: 'Geo Sort',
    [SEARCH_SORT.TYPES.CUSTOM]: 'Custom Sort',
  };
  return labels[type] || 'Unknown Sort Type';
}

export function searchSortGetModeLabel(mode: SearchSortMode): string {
  const labels: Record<SearchSortMode, string> = {
    [SEARCH_SORT.MODES.MIN]: 'Minimum',
    [SEARCH_SORT.MODES.MAX]: 'Maximum',
    [SEARCH_SORT.MODES.SUM]: 'Sum',
    [SEARCH_SORT.MODES.AVG]: 'Average',
    [SEARCH_SORT.MODES.MEDIAN]: 'Median',
  };
  return labels[mode] || 'Unknown Sort Mode';
}

export function searchSortGetDefaultField(): SearchSortField {
  return SEARCH_SORT.DEFAULTS.DEFAULT_FIELD;
}

export function searchSortGetDefaultOrder(): SearchSortOrder {
  return SEARCH_SORT.DEFAULTS.DEFAULT_ORDER;
}

export function searchSortIsPriceField(field: SearchSortField): boolean {
  return field === SEARCH_SORT.FIELDS.PRICE;
}

export function searchSortIsRatingField(field: SearchSortField): boolean {
  return field === SEARCH_SORT.FIELDS.RATING;
}

export function searchSortIsPopularityField(field: SearchSortField): boolean {
  return field === SEARCH_SORT.FIELDS.POPULARITY;
}

export function searchSortIsGeoField(field: SearchSortField): boolean {
  return field === SEARCH_SORT.FIELDS.DISTANCE;
}

export function searchSortIsAscending(order: SearchSortOrder): boolean {
  return order === SEARCH_SORT.ORDERS.ASC;
}

export function searchSortIsDescending(order: SearchSortOrder): boolean {
  return order === SEARCH_SORT.ORDERS.DESC;
}

export function searchSortGetMaxSortFields(): number {
  return SEARCH_SORT.DEFAULTS.MAX_SORT_FIELDS;
}
