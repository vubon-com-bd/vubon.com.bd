/**
 * Facet Constants
 * Facet configurations for search
 */

export const SEARCH_FACET = {
  // Facet Types
  TYPES: {
    TERMS: 'terms',
    RANGE: 'range',
    DATE: 'date',
    HISTOGRAM: 'histogram',
    FILTER: 'filter',
    QUERY: 'query',
    NESTED: 'nested',
    GEO: 'geo',
    CUSTOM: 'custom',
  } as const,

  // Facet Modes
  MODES: {
    COUNT: 'count',
    SUM: 'sum',
    AVG: 'avg',
    MIN: 'min',
    MAX: 'max',
    CUSTOM: 'custom',
  } as const,

  // Facet Orders
  ORDERS: {
    COUNT: 'count',
    TERM: 'term',
    ALPHA: 'alpha',
    CUSTOM: 'custom',
  } as const,

  // Facet Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'terms',
    DEFAULT_MODE: 'count',
    DEFAULT_ORDER: 'count',
    DEFAULT_SIZE: 10,
    MAX_SIZE: 100,
    MIN_DOC_COUNT: 1,
    MAX_DEPTH: 5,
    MISSING: false,
    EXCLUDE: [],
    CACHE_TTL: 3600,
  } as const,

  // Facet Limits
  LIMITS: {
    MAX_SIZE: 100,
    MIN_DOC_COUNT: 0,
    MAX_DEPTH: 10,
    MAX_NESTED_LEVELS: 5,
    MAX_RANGES: 20,
    MAX_DATE_RANGES: 20,
    MAX_HISTOGRAM_INTERVALS: 100,
  } as const,
} as const;

// Facet Types
export type SearchFacetType = (typeof SEARCH_FACET.TYPES)[keyof typeof SEARCH_FACET.TYPES];

// Facet Modes
export type SearchFacetMode = (typeof SEARCH_FACET.MODES)[keyof typeof SEARCH_FACET.MODES];

// Facet Orders
export type SearchFacetOrder = (typeof SEARCH_FACET.ORDERS)[keyof typeof SEARCH_FACET.ORDERS];

// Facet Defaults
export type SearchFacetDefault = (typeof SEARCH_FACET.DEFAULTS)[keyof typeof SEARCH_FACET.DEFAULTS];

// Facet Limits
export type SearchFacetLimit = (typeof SEARCH_FACET.LIMITS)[keyof typeof SEARCH_FACET.LIMITS];

// Utility Functions
export function searchFacetGetTypeLabel(type: SearchFacetType): string {
  const labels: Record<SearchFacetType, string> = {
    [SEARCH_FACET.TYPES.TERMS]: 'Terms',
    [SEARCH_FACET.TYPES.RANGE]: 'Range',
    [SEARCH_FACET.TYPES.DATE]: 'Date',
    [SEARCH_FACET.TYPES.HISTOGRAM]: 'Histogram',
    [SEARCH_FACET.TYPES.FILTER]: 'Filter',
    [SEARCH_FACET.TYPES.QUERY]: 'Query',
    [SEARCH_FACET.TYPES.NESTED]: 'Nested',
    [SEARCH_FACET.TYPES.GEO]: 'Geo',
    [SEARCH_FACET.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Facet Type';
}

export function searchFacetGetModeLabel(mode: SearchFacetMode): string {
  const labels: Record<SearchFacetMode, string> = {
    [SEARCH_FACET.MODES.COUNT]: 'Count',
    [SEARCH_FACET.MODES.SUM]: 'Sum',
    [SEARCH_FACET.MODES.AVG]: 'Average',
    [SEARCH_FACET.MODES.MIN]: 'Minimum',
    [SEARCH_FACET.MODES.MAX]: 'Maximum',
    [SEARCH_FACET.MODES.CUSTOM]: 'Custom',
  };
  return labels[mode] || 'Unknown Mode';
}

export function searchFacetGetOrderLabel(order: SearchFacetOrder): string {
  const labels: Record<SearchFacetOrder, string> = {
    [SEARCH_FACET.ORDERS.COUNT]: 'Count',
    [SEARCH_FACET.ORDERS.TERM]: 'Term',
    [SEARCH_FACET.ORDERS.ALPHA]: 'Alphabetical',
    [SEARCH_FACET.ORDERS.CUSTOM]: 'Custom',
  };
  return labels[order] || 'Unknown Order';
}

export function searchFacetIsTermsType(type: SearchFacetType): boolean {
  return type === SEARCH_FACET.TYPES.TERMS;
}

export function searchFacetIsRangeType(type: SearchFacetType): boolean {
  return type === SEARCH_FACET.TYPES.RANGE;
}

export function searchFacetIsDateType(type: SearchFacetType): boolean {
  return type === SEARCH_FACET.TYPES.DATE;
}

export function searchFacetIsHistogramType(type: SearchFacetType): boolean {
  return type === SEARCH_FACET.TYPES.HISTOGRAM;
}

export function searchFacetIsNestedType(type: SearchFacetType): boolean {
  return type === SEARCH_FACET.TYPES.NESTED;
}

export function searchFacetIsGeoType(type: SearchFacetType): boolean {
  return type === SEARCH_FACET.TYPES.GEO;
}

export function searchFacetGetDefaultSize(): number {
  return SEARCH_FACET.DEFAULTS.DEFAULT_SIZE;
}

export function searchFacetGetMaxSize(): number {
  return SEARCH_FACET.DEFAULTS.MAX_SIZE;
}

export function searchFacetGetMinDocCount(): number {
  return SEARCH_FACET.DEFAULTS.MIN_DOC_COUNT;
}

export function searchFacetGetDefaultOrder(): SearchFacetOrder {
  return SEARCH_FACET.DEFAULTS.DEFAULT_ORDER;
}

export function searchFacetGetMaxDepth(): number {
  return SEARCH_FACET.DEFAULTS.MAX_DEPTH;
}
