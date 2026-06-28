/**
 * Pagination Constants - Enterprise Grade Pagination Configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/pagination.constants
 * 
 * @description
 * Centralized pagination configuration for all services.
 * Provides consistent pagination defaults, sort orders, and search configurations.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Consistent pagination across all microservices
 * ✅ Type-safe constants for pagination parameters
 * ✅ Bangladesh-specific timezone support for date ranges
 * ✅ Configurable defaults for performance optimization
 * ✅ Search configuration with minimum length requirements
 * ✅ Sort direction and order type definitions
 * 
 * Enterprise Rules:
 * ✅ Pure readonly constants - NO runtime logic
 * ✅ Type-safe with as const assertions
 * ✅ Framework-agnostic
 * ✅ Reusable across all services
 * ✅ Extensible for future requirements
 */

// ============================================================
// Pagination Defaults
// ============================================================

/**
 * Core pagination configuration
 * Used across all list endpoints for consistent pagination behavior
 */
export const PAGINATION = {
  /** Default page number (1-indexed) */
  DEFAULT_PAGE: 1,
  /** Default items per page */
  DEFAULT_LIMIT: 20,
  /** Maximum items per page (prevent large queries) */
  MAX_LIMIT: 100,
  /** Minimum items per page */
  MIN_LIMIT: 1,
  /** Maximum page number (prevent deep pagination) */
  MAX_PAGE: 1000,
  /** Default offset for cursor-based pagination */
  DEFAULT_CURSOR_LIMIT: 20,
  /** Maximum cursor limit */
  MAX_CURSOR_LIMIT: 100,
} as const;

// ============================================================
// Sort Order
// ============================================================

/**
 * Sort order types
 * Used for consistent sorting across all list endpoints
 */
export const SORT_ORDER = {
  /** Ascending order (A-Z, 0-9) */
  ASC: 'asc',
  /** Descending order (Z-A, 9-0) */
  DESC: 'desc',
} as const;

/**
 * Sort direction (alias for SORT_ORDER)
 * Maintained for backward compatibility
 */
export const SORT_DIRECTION = {
  /** Ascending order */
  ASC: 'asc',
  /** Descending order */
  DESC: 'desc',
} as const;

// ============================================================
// Pagination Type
// ============================================================

/**
 * Pagination strategy types
 * Supports both offset-based and cursor-based pagination
 */
export const PAGINATION_TYPE = {
  /** Offset-based pagination (page + limit) */
  OFFSET: 'offset',
  /** Cursor-based pagination (cursor + limit) */
  CURSOR: 'cursor',
} as const;

// ============================================================
// Date Range
// ============================================================

/**
 * Predefined date ranges for filtering
 * Bangladesh timezone aware (Asia/Dhaka)
 */
export const DATE_RANGE = {
  /** Today (00:00 to now) */
  TODAY: 'today',
  /** Yesterday (00:00 to 23:59) */
  YESTERDAY: 'yesterday',
  /** Last 7 days (excluding today) */
  LAST_7_DAYS: 'last_7_days',
  /** Last 30 days (excluding today) */
  LAST_30_DAYS: 'last_30_days',
  /** Last 90 days (excluding today) */
  LAST_90_DAYS: 'last_90_days',
  /** Current month (1st to now) */
  THIS_MONTH: 'this_month',
  /** Previous month (1st to last day) */
  LAST_MONTH: 'last_month',
  /** Current year (Jan 1 to now) */
  THIS_YEAR: 'this_year',
  /** Custom date range */
  CUSTOM: 'custom',
} as const;

/**
 * Date range configuration with timezone
 * Bangladesh specific (Asia/Dhaka)
 */
export const DATE_RANGE_CONFIG = {
  /** Default timezone for date ranges */
  TIMEZONE: 'Asia/Dhaka',
  /** Default format for date range display */
  DISPLAY_FORMAT: 'YYYY-MM-DD',
  /** Default format for date range API */
  API_FORMAT: 'YYYY-MM-DDTHH:mm:ssZ',
} as const;

// ============================================================
// Search Configuration
// ============================================================

/**
 * Search configuration for list endpoints
 * Defines minimum requirements for search functionality
 */
export const SEARCH_CONFIG = {
  /** Minimum characters required for search */
  MIN_SEARCH_LENGTH: 2,
  /** Maximum characters allowed for search */
  MAX_SEARCH_LENGTH: 100,
  /** Default search field when none specified */
  DEFAULT_SEARCH_FIELD: 'all',
  /** Maximum search results limit */
  MAX_SEARCH_RESULTS: 1000,
  /** Minimum search score for relevance */
  MIN_SEARCH_SCORE: 0.3,
} as const;

// ============================================================
// Sortable Fields Configuration
// ============================================================

/**
 * Common sortable fields across entities
 * Used for consistent sorting behavior
 */
export const SORTABLE_FIELDS = {
  /** User-related sortable fields */
  USER: {
    ID: 'id',
    EMAIL: 'email',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
    LAST_LOGIN: 'lastLoginAt',
    TOTAL_SPENT: 'totalSpent',
  },
  /** Session-related sortable fields */
  SESSION: {
    ID: 'id',
    CREATED_AT: 'createdAt',
    EXPIRES_AT: 'expiresAt',
    LAST_ACTIVITY: 'lastActivityAt',
  },
  /** Product-related sortable fields */
  PRODUCT: {
    ID: 'id',
    NAME: 'name',
    PRICE: 'price',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
    STOCK: 'stock',
    RATING: 'rating',
  },
  /** Order-related sortable fields */
  ORDER: {
    ID: 'id',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
    TOTAL: 'total',
    STATUS: 'status',
  },
} as const;

// ============================================================
// Filter Operators
// ============================================================

/**
 * Filter operators for advanced filtering
 * Used in list endpoints for complex queries
 */
export const FILTER_OPERATORS = {
  /** Equal to */
  EQ: 'eq',
  /** Not equal to */
  NE: 'ne',
  /** Greater than */
  GT: 'gt',
  /** Greater than or equal to */
  GTE: 'gte',
  /** Less than */
  LT: 'lt',
  /** Less than or equal to */
  LTE: 'lte',
  /** Contains (string) */
  CONTAINS: 'contains',
  /** Starts with (string) */
  STARTS_WITH: 'startsWith',
  /** Ends with (string) */
  ENDS_WITH: 'endsWith',
  /** In array */
  IN: 'in',
  /** Not in array */
  NIN: 'nin',
  /** Between (range) */
  BETWEEN: 'between',
} as const;

// ============================================================
// Response Metadata
// ============================================================

/**
 * Default pagination response metadata
 * Used for consistent API responses
 */
export const PAGINATION_METADATA = {
  /** Default field for total count */
  TOTAL_FIELD: 'total',
  /** Default field for items */
  ITEMS_FIELD: 'items',
  /** Default field for page */
  PAGE_FIELD: 'page',
  /** Default field for limit */
  LIMIT_FIELD: 'limit',
  /** Default field for total pages */
  TOTAL_PAGES_FIELD: 'totalPages',
  /** Default field for has next page */
  HAS_NEXT_FIELD: 'hasNext',
  /** Default field for has previous page */
  HAS_PREV_FIELD: 'hasPrev',
} as const;

// ============================================================
// Type Exports (for TypeScript)
// ============================================================

export type PaginationConfig = typeof PAGINATION;
export type SortOrder = typeof SORT_ORDER[keyof typeof SORT_ORDER];
export type SortDirection = typeof SORT_DIRECTION[keyof typeof SORT_DIRECTION];
export type PaginationType = typeof PAGINATION_TYPE[keyof typeof PAGINATION_TYPE];
export type DateRange = typeof DATE_RANGE[keyof typeof DATE_RANGE];
export type SearchConfig = typeof SEARCH_CONFIG;
export type SortableFields = typeof SORTABLE_FIELDS;
export type FilterOperator = typeof FILTER_OPERATORS[keyof typeof FILTER_OPERATORS];

// ============================================================
// Utility Types
// ============================================================

/**
 * Pagination parameters type
 * Used for consistent pagination across services
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
  dateRange?: DateRange;
  fromDate?: Date;
  toDate?: Date;
}

/**
 * Cursor pagination parameters
 * Used for cursor-based pagination
 */
export interface CursorPaginationParams {
  cursor?: string;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  direction?: 'next' | 'prev';
}

/**
 * Filter parameter with operator
 * Used for advanced filtering
 */
export interface FilterParam<T = unknown> {
  operator: FilterOperator;
  value: T;
}

/**
 * Sort parameter
 * Used for sorting in list endpoints
 */
export interface SortParam {
  field: string;
  order: SortOrder;
}

// ============================================================
// Default Configurations
// ============================================================

/**
 * Full pagination configuration object
 * Use this for consistent pagination across services
 */
export const PAGINATION_CONFIG = {
  /** Default pagination values */
  defaults: PAGINATION,
  /** Sort order values */
  sortOrder: SORT_ORDER,
  /** Sort direction values */
  sortDirection: SORT_DIRECTION,
  /** Pagination type values */
  paginationType: PAGINATION_TYPE,
  /** Date range values */
  dateRange: DATE_RANGE,
  /** Search configuration */
  search: SEARCH_CONFIG,
  /** Sortable fields */
  sortableFields: SORTABLE_FIELDS,
  /** Filter operators */
  filterOperators: FILTER_OPERATORS,
  /** Response metadata */
  metadata: PAGINATION_METADATA,
} as const;

// ============================================================
// Bangladesh Specific Configurations
// ============================================================

/**
 * Bangladesh-specific pagination configurations
 * Includes local date formats and timezone settings
 */
export const BANGLADESH_PAGINATION = {
  /** Default timezone for Bangladesh */
  TIMEZONE: 'Asia/Dhaka',
  /** Date format for Bangladesh */
  DATE_FORMAT: 'DD-MM-YYYY',
  /** Date time format for Bangladesh */
  DATETIME_FORMAT: 'DD-MM-YYYY HH:mm:ss',
  /** Default locale for Bangladesh */
  LOCALE: 'bn-BD',
  /** Common sort fields for Bangladesh e-commerce */
  LOCAL_SORT_FIELDS: {
    DISTRICT: 'district',
    UPAZILA: 'upazila',
    POST_CODE: 'postCode',
    MOBILE_OPERATOR: 'mobileOperator',
  },
} as const;

// ============================================================
// Performance Optimization Constants
// ============================================================

/**
 * Performance thresholds for pagination
 * Helps prevent slow queries
 */
export const PAGINATION_PERFORMANCE = {
  /** Maximum offset for offset-based pagination */
  MAX_OFFSET: 10000,
  /** Maximum pages for pagination */
  MAX_PAGES: 1000,
  /** Timeout for pagination queries (ms) */
  QUERY_TIMEOUT_MS: 5000,
  /** Cache TTL for paginated results (seconds) */
  CACHE_TTL_SECONDS: 60,
  /** Cache TTL for heavy queries (seconds) */
  HEAVY_QUERY_CACHE_TTL_SECONDS: 300,
} as const;

// ============================================================
// Export all constants
// ============================================================

export {
  PAGINATION as DEFAULT_PAGINATION,
  SORT_ORDER as SORT_ORDER_VALUES,
  SORT_DIRECTION as SORT_DIRECTION_VALUES,
  PAGINATION_TYPE as PAGINATION_TYPE_VALUES,
  DATE_RANGE as DATE_RANGE_VALUES,
  SEARCH_CONFIG as SEARCH_CONFIG_VALUES,
  SORTABLE_FIELDS as SORTABLE_FIELD_VALUES,
  FILTER_OPERATORS as FILTER_OPERATOR_VALUES,
  PAGINATION_METADATA as PAGINATION_METADATA_VALUES,
};

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features:
// 1. ✅ Consistent pagination across all microservices
// 2. ✅ Type-safe constants with as const assertions
// 3. ✅ Bangladesh-specific timezone support (Asia/Dhaka)
// 4. ✅ Configurable defaults for performance optimization
// 5. ✅ Search configuration with minimum length requirements
// 6. ✅ Sort direction and order type definitions
// 7. ✅ Filter operators for advanced queries
// 8. ✅ Cursor and offset pagination support
// 9. ✅ Performance thresholds to prevent slow queries
// 10. ✅ Cache TTL configuration for paginated results
// 11. ✅ Bangladesh-specific date formats and locale
// 12. ✅ Framework-agnostic and reusable
// 
// Bangladesh Specific:
// - Asia/Dhaka timezone for accurate date ranges
// - DD-MM-YYYY date format for local compliance
// - bn-BD locale support
// - District, Upazila, Post Code sorting fields
// - Mobile operator filtering support
// 
// ============================================================
