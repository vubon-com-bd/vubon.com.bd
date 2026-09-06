/**
 * Pagination Constants
 * @module shared-constants/common/pagination.constants
 */

export const PAGINATION = {
  // Default values
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,

  // Predefined limits
  LIMITS: {
    SMALL: 10,
    MEDIUM: 20,
    LARGE: 50,
    XLARGE: 100,
  } as const,

  // Pagination strategies
  STRATEGY: {
    OFFSET: 'offset',
    CURSOR: 'cursor',
    KEYSET: 'keyset',
  } as const,

  // Sort orders
  ORDER: {
    ASC: 'asc',
    DESC: 'desc',
  } as const,

  // Default sort fields
  DEFAULT_SORT: 'createdAt',
  DEFAULT_ORDER: 'desc',

  // Maximum pages
  MAX_PAGES: 1000,

  // Page size options for UI
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100] as const,

  // Pagination metadata fields
  METADATA_FIELDS: {
    TOTAL: 'total',
    PAGE: 'page',
    LIMIT: 'limit',
    TOTAL_PAGES: 'totalPages',
    HAS_NEXT: 'hasNext',
    HAS_PREV: 'hasPrev',
    NEXT_PAGE: 'nextPage',
    PREV_PAGE: 'prevPage',
  } as const,

  // Cursor pagination
  CURSOR: {
    DEFAULT_BEFORE: 0,
    DEFAULT_AFTER: 0,
    MAX_BATCH_SIZE: 1000,
  },

  // Infinite scroll
  INFINITE: {
    THRESHOLD: 0.8, // 80% of scroll position
    DEBOUNCE_MS: 200,
    MAX_ITEMS: 10000,
  },

  // Table pagination
  TABLE: {
    DEFAULT_ROWS: 10,
    ROWS_OPTIONS: [5, 10, 25, 50, 100] as const,
    SHOW_ROWS_LABEL: 'Show rows',
  },

  // API pagination
  API: {
    DEFAULT_OFFSET: 0,
    MAX_OFFSET: 10000,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 200,
  },

  // Database pagination
  DATABASE: {
    DEFAULT_SKIP: 0,
    DEFAULT_TAKE: 20,
    MAX_TAKE: 1000,
  },
} as const;

export type PaginationStrategy = (typeof PAGINATION.STRATEGY)[keyof typeof PAGINATION.STRATEGY];
export type SortOrder = (typeof PAGINATION.ORDER)[keyof typeof PAGINATION.ORDER];
export type PageSizeOption = (typeof PAGINATION.PAGE_SIZE_OPTIONS)[number];
export type TableRowsOption = (typeof PAGINATION.TABLE.ROWS_OPTIONS)[number];
