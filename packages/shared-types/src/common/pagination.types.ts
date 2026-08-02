/**
 * Pagination-related type definitions for the monorepo
 * All pagination types are centralized here for consistent API responses
 */

/**
 * Pagination metadata interface
 * Contains pagination information for list responses
 */
export interface PaginationMetadata {
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Total number of items available */
  total: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
  /** Next page number (null if no next page) */
  nextPage: number | null;
  /** Previous page number (null if no previous page) */
  previousPage: number | null;
  /** Timestamp when the data was retrieved */
  timestamp: string;
}

/**
 * Pagination request parameters interface
 * Used when requesting paginated data
 */
export interface PaginationRequestParams {
  /** Page number (default: 1) */
  page?: number;
  /** Number of items per page (default: 10) */
  limit?: number;
  /** Field to sort by */
  sortBy?: string;
  /** Sort order (ascending or descending) */
  sortOrder?: 'asc' | 'desc';
  /** Additional filters */
  filters?: Record<string, unknown>;
}

/**
 * Paginated response interface
 * Standard wrapper for paginated API responses
 */
export interface PaginatedResponse<T> {
  /** Array of items for the current page */
  items: T[];
  /** Pagination metadata */
  metadata: PaginationMetadata;
  /** Optional additional metadata */
  extra?: Record<string, unknown>;
}

/**
 * Page-based pagination request interface
 * Request using page and limit parameters
 */
export interface PagePaginationRequest extends PaginationRequestParams {
  /** Page number (1-indexed) */
  page: number;
  /** Number of items per page */
  limit: number;
}

/**
 * Cursor-based pagination request interface
 * Request using cursor for infinite scrolling
 */
export interface CursorPaginationRequest {
  /** Cursor for the next page (null for first page) */
  cursor: string | null;
  /** Number of items per page */
  limit: number;
  /** Field to sort by (must be unique for cursor) */
  sortBy: string;
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
  /** Additional filters */
  filters?: Record<string, unknown>;
}

/**
 * Cursor-based pagination metadata interface
 * Metadata for cursor-based pagination
 */
export interface CursorPaginationMetadata {
  /** Cursor for the next page (null if no more items) */
  nextCursor: string | null;
  /** Cursor for the previous page (null if at start) */
  previousCursor: string | null;
  /** Number of items in the current page */
  count: number;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
  /** Total number of items (if available) */
  total?: number;
  /** Timestamp when the data was retrieved */
  timestamp: string;
}

/**
 * Cursor-based paginated response interface
 * Response for cursor-based pagination
 */
export interface CursorPaginatedResponse<T> {
  /** Array of items for the current page */
  items: T[];
  /** Cursor pagination metadata */
  metadata: CursorPaginationMetadata;
  /** Optional additional metadata */
  extra?: Record<string, unknown>;
}

/**
 * Offset-based pagination request interface
 * Request using offset and limit parameters
 */
export interface OffsetPaginationRequest {
  /** Number of items to skip */
  offset: number;
  /** Number of items per page */
  limit: number;
  /** Field to sort by */
  sortBy?: string;
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
  /** Additional filters */
  filters?: Record<string, unknown>;
}

/**
 * Offset-based pagination metadata interface
 * Metadata for offset-based pagination
 */
export interface OffsetPaginationMetadata {
  /** Offset used for the current page */
  offset: number;
  /** Number of items per page */
  limit: number;
  /** Total number of items available */
  total: number;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
  /** Next offset (null if no next page) */
  nextOffset: number | null;
  /** Previous offset (null if no previous page) */
  previousOffset: number | null;
  /** Timestamp when the data was retrieved */
  timestamp: string;
}

/**
 * Offset-based paginated response interface
 * Response for offset-based pagination
 */
export interface OffsetPaginatedResponse<T> {
  /** Array of items for the current page */
  items: T[];
  /** Offset pagination metadata */
  metadata: OffsetPaginationMetadata;
  /** Optional additional metadata */
  extra?: Record<string, unknown>;
}

/**
 * Pagination sort option interface
 * Defines a sorting option for a field
 */
export interface PaginationSortOption {
  /** Field name to sort by */
  field: string;
  /** Display name for the sort option */
  label: string;
  /** Whether the field is indexed (for performance) */
  isIndexed: boolean;
}

/**
 * Pagination filter option interface
 * Defines a filter option for a field
 */
export interface PaginationFilterOption {
  /** Field name to filter by */
  field: string;
  /** Display name for the filter option */
  label: string;
  /** Type of filter (text, number, date, select) */
  type: 'text' | 'number' | 'date' | 'select' | 'boolean';
  /** Available options for select type */
  options?: Array<{
    value: string;
    label: string;
  }>;
  /** Whether the filter is required */
  required: boolean;
}

/**
 * Pagination configuration interface
 * Configuration for pagination behavior
 */
export interface PaginationConfig {
  /** Default page number */
  defaultPage: number;
  /** Default items per page */
  defaultLimit: number;
  /** Maximum items per page allowed */
  maxLimit: number;
  /** Available items per page options */
  limitOptions: number[];
  /** Whether to enforce maximum limit */
  enforceMaxLimit: boolean;
  /** Whether to include total count in metadata */
  includeTotal: boolean;
}

/**
 * Pagination error interface
 * Error details for pagination errors
 */
export interface PaginationError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Field that caused the error (if applicable) */
  field?: string;
  /** Additional error details */
  details?: Record<string, unknown>;
}

/**
 * Pagination validation result interface
 * Result of validating pagination parameters
 */
export interface PaginationValidationResult {
  /** Whether the parameters are valid */
  isValid: boolean;
  /** Validated and normalized parameters */
  params?: PaginationRequestParams;
  /** Errors if validation failed */
  errors?: PaginationError[];
}

/**
 * Pagination stats interface
 * Statistics about paginated data
 */
export interface PaginationStats {
  /** Total number of items */
  totalItems: number;
  /** Total number of pages */
  totalPages: number;
  /** Number of items on the first page */
  firstPageSize: number;
  /** Number of items on the last page */
  lastPageSize: number;
  /** Average items per page */
  averagePageSize: number;
  /** Whether pagination is needed */
  needsPagination: boolean;
}

/**
 * Pagination state interface
 * State of pagination in the frontend
 */
export interface PaginationState {
  /** Current page number */
  page: number;
  /** Items per page */
  limit: number;
  /** Current sort field */
  sortBy: string;
  /** Current sort order */
  sortOrder: 'asc' | 'desc';
  /** Active filters */
  filters: Record<string, unknown>;
  /** Search term */
  search?: string;
}

/**
 * Pagination data source interface
 * Data source configuration for pagination
 */
export interface PaginationDataSource {
  /** Type of data source */
  type: 'api' | 'local';
  /** Endpoint URL (for API source) */
  endpoint?: string;
  /** Data array (for local source) */
  data?: unknown[];
  /** Whether the data is loading */
  loading: boolean;
  /** Error message if data fetching failed */
  error?: string;
}

/**
 * Pagination state change event interface
 * Event when pagination state changes
 */
export interface PaginationStateChange {
  /** Previous state */
  previousState: PaginationState;
  /** Current state */
  currentState: PaginationState;
  /** Changed fields */
  changedFields: (keyof PaginationState)[];
  /** Timestamp of the change */
  timestamp: Date;
}

/**
 * Pagination response builder options interface
 * Options for building pagination responses
 */
export interface PaginationBuilderOptions {
  /** Items for the current page */
  items: unknown[];
  /** Total number of items */
  total: number;
  /** Current page */
  page: number;
  /** Items per page */
  limit: number;
  /** Additional metadata to include */
  extra?: Record<string, unknown>;
}

/**
 * Pagination UI configuration interface
 * Configuration for UI pagination components
 */
export interface PaginationUIConfig {
  /** Whether to show the page size selector */
  showPageSizeSelector: boolean;
  /** Whether to show the total count */
  showTotalCount: boolean;
  /** Whether to show page navigation buttons */
  showNavigationButtons: boolean;
  /** Whether to show quick jump to page */
  showQuickJump: boolean;
  /** Maximum number of page buttons to show */
  maxPageButtons: number;
  /** Whether to use compact mode */
  compact: boolean;
  /** Alignment of the pagination component */
  alignment: 'left' | 'center' | 'right';
}

/**
 * Pagination state store interface
 * Store for managing pagination state
 */
export interface PaginationStore<T> {
  /** Current pagination state */
  state: PaginationState;
  /** Current items */
  items: T[];
  /** Total number of items */
  total: number;
  /** Whether data is loading */
  loading: boolean;
  /** Error message if any */
  error?: string;
  /** Update pagination state */
  updateState: (newState: Partial<PaginationState>) => void;
  /** Fetch data with current state */
  fetchData: () => Promise<void>;
  /** Reset pagination to default */
  reset: () => void;
}
