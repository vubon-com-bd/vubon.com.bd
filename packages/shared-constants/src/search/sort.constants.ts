/**
 * Sort Constants
 * Sort configurations for search (consolidated from search-sort)
 */

export const SEARCH_SORT_CONSOLIDATED = {
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
    DISCOUNT: 'discount',
    CUSTOM: 'custom',
  } as const,

  // Sort Orders
  ORDERS: {
    ASC: 'asc',
    DESC: 'desc',
    RANDOM: 'random',
  } as const,

  // Sort Types
  TYPES: {
    FIELD: 'field',
    SCRIPT: 'script',
    GEO: 'geo',
    CUSTOM: 'custom',
  } as const,

  // Sort Defaults
  DEFAULTS: {
    DEFAULT_FIELD: 'relevance',
    DEFAULT_ORDER: 'desc',
    DEFAULT_TYPE: 'field',
    MAX_SORT_FIELDS: 5,
  } as const,

  // Sort Limits
  LIMITS: {
    MAX_SORT_FIELDS: 5,
    MAX_GEO_DISTANCE: 100000,
    MIN_SCRIPT_LENGTH: 1,
    MAX_SCRIPT_LENGTH: 1000,
  } as const,
} as const;

// Sort Fields
export type SearchSortConsolidatedField =
  (typeof SEARCH_SORT_CONSOLIDATED.FIELDS)[keyof typeof SEARCH_SORT_CONSOLIDATED.FIELDS];

// Sort Orders
export type SearchSortConsolidatedOrder =
  (typeof SEARCH_SORT_CONSOLIDATED.ORDERS)[keyof typeof SEARCH_SORT_CONSOLIDATED.ORDERS];

// Sort Types
export type SearchSortConsolidatedType =
  (typeof SEARCH_SORT_CONSOLIDATED.TYPES)[keyof typeof SEARCH_SORT_CONSOLIDATED.TYPES];

// Sort Defaults
export type SearchSortConsolidatedDefault =
  (typeof SEARCH_SORT_CONSOLIDATED.DEFAULTS)[keyof typeof SEARCH_SORT_CONSOLIDATED.DEFAULTS];

// Sort Limits
export type SearchSortConsolidatedLimit =
  (typeof SEARCH_SORT_CONSOLIDATED.LIMITS)[keyof typeof SEARCH_SORT_CONSOLIDATED.LIMITS];

// Utility Functions
export function searchSortConsolidatedGetFieldLabel(field: SearchSortConsolidatedField): string {
  const labels: Record<SearchSortConsolidatedField, string> = {
    [SEARCH_SORT_CONSOLIDATED.FIELDS.RELEVANCE]: 'Relevance',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.PRICE]: 'Price',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.POPULARITY]: 'Popularity',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.RATING]: 'Rating',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.DATE]: 'Date',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.NAME]: 'Name',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.VENDOR]: 'Vendor',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.CATEGORY]: 'Category',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.SALES]: 'Sales',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.REVIEWS]: 'Reviews',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.DISTANCE]: 'Distance',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.DISCOUNT]: 'Discount',
    [SEARCH_SORT_CONSOLIDATED.FIELDS.CUSTOM]: 'Custom',
  };
  return labels[field] || 'Unknown Sort Field';
}

export function searchSortConsolidatedGetOrderLabel(order: SearchSortConsolidatedOrder): string {
  const labels: Record<SearchSortConsolidatedOrder, string> = {
    [SEARCH_SORT_CONSOLIDATED.ORDERS.ASC]: 'Ascending',
    [SEARCH_SORT_CONSOLIDATED.ORDERS.DESC]: 'Descending',
    [SEARCH_SORT_CONSOLIDATED.ORDERS.RANDOM]: 'Random',
  };
  return labels[order] || 'Unknown Sort Order';
}

export function searchSortConsolidatedGetTypeLabel(type: SearchSortConsolidatedType): string {
  const labels: Record<SearchSortConsolidatedType, string> = {
    [SEARCH_SORT_CONSOLIDATED.TYPES.FIELD]: 'Field Sort',
    [SEARCH_SORT_CONSOLIDATED.TYPES.SCRIPT]: 'Script Sort',
    [SEARCH_SORT_CONSOLIDATED.TYPES.GEO]: 'Geo Sort',
    [SEARCH_SORT_CONSOLIDATED.TYPES.CUSTOM]: 'Custom Sort',
  };
  return labels[type] || 'Unknown Sort Type';
}

export function searchSortConsolidatedIsPriceField(field: SearchSortConsolidatedField): boolean {
  return field === SEARCH_SORT_CONSOLIDATED.FIELDS.PRICE;
}

export function searchSortConsolidatedIsRatingField(field: SearchSortConsolidatedField): boolean {
  return field === SEARCH_SORT_CONSOLIDATED.FIELDS.RATING;
}

export function searchSortConsolidatedIsPopularityField(
  field: SearchSortConsolidatedField
): boolean {
  return field === SEARCH_SORT_CONSOLIDATED.FIELDS.POPULARITY;
}

export function searchSortConsolidatedIsGeoField(field: SearchSortConsolidatedField): boolean {
  return field === SEARCH_SORT_CONSOLIDATED.FIELDS.DISTANCE;
}

export function searchSortConsolidatedGetDefaultField(): SearchSortConsolidatedField {
  return SEARCH_SORT_CONSOLIDATED.DEFAULTS.DEFAULT_FIELD;
}

export function searchSortConsolidatedGetDefaultOrder(): SearchSortConsolidatedOrder {
  return SEARCH_SORT_CONSOLIDATED.DEFAULTS.DEFAULT_ORDER;
}

export function searchSortConsolidatedIsAscending(order: SearchSortConsolidatedOrder): boolean {
  return order === SEARCH_SORT_CONSOLIDATED.ORDERS.ASC;
}

export function searchSortConsolidatedIsDescending(order: SearchSortConsolidatedOrder): boolean {
  return order === SEARCH_SORT_CONSOLIDATED.ORDERS.DESC;
}

export function searchSortConsolidatedGetMaxSortFields(): number {
  return SEARCH_SORT_CONSOLIDATED.DEFAULTS.MAX_SORT_FIELDS;
}
