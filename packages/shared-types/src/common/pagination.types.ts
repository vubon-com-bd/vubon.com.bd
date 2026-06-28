/**
 * Pagination Types - Pure TypeScript type contracts for Pagination
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/src/common/pagination.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO query builder, database-specific logic
 * ✅ NO functions, classes, enums
 * ✅ NO framework imports
 * ✅ Readonly modifiers for immutability
 */

// ============================================================
// Sort Order
// ============================================================
export type SortOrder = 'asc' | 'desc';

// ============================================================
// Pagination Metadata (Offset-based)
// ============================================================
export interface PaginationMetadata {
  readonly page: number;           // Current page number (1-indexed)
  readonly limit: number;          // Items per page
  readonly total: number;          // Total number of items
  readonly totalPages: number;     // Total number of pages
  readonly hasNextPage: boolean;   // Is there a next page?
  readonly hasPrevPage: boolean;   // Is there a previous page?
  readonly from: number;           // Starting item index (1-indexed)
  readonly to: number;             // Ending item index (1-indexed)
}

// ============================================================
// Pagination Parameters (Offset-based request)
// ============================================================
export interface PaginationParams {
  readonly page?: number;          // Default: 1
  readonly limit?: number;         // Default: 20, Max: 100
  readonly sortBy?: string;        // Field to sort by
  readonly sortOrder?: SortOrder;  // Default: 'desc'
}

// ============================================================
// Extended Pagination Parameters (with search)
// ============================================================
export interface ExtendedPaginationParams extends PaginationParams {
  readonly search?: string;        // Search query
  readonly fromDate?: string;      // ISO date
  readonly toDate?: string;        // ISO date
  readonly status?: string | readonly string[];
}

// ============================================================
// Pagination Sort Configuration
// ============================================================
export interface PaginationSort {
  readonly field: string;
  readonly order: SortOrder;
  readonly priority?: number;      // For multi-column sorting
}

export type DateRange = 
  | 'today' 
  | 'yesterday' 
  | 'last_7_days' 
  | 'last_30_days' 
  | 'last_90_days' 
  | 'this_month' 
  | 'last_month' 
  | 'this_year' 
  | 'custom';



  export type FilterOperator = 
  | 'eq' 
  | 'ne' 
  | 'gt' 
  | 'gte' 
  | 'lt' 
  | 'lte' 
  | 'contains' 
  | 'startsWith' 
  | 'endsWith' 
  | 'in' 
  | 'nin' 
  | 'between';



  export interface SearchConfig {
  readonly minSearchLength: number;
  readonly maxSearchLength: number;
  readonly defaultSearchField: string;
  readonly maxSearchResults: number;
  readonly minSearchScore: number;
}
// ============================================================
// Offset Pagination Response
// ============================================================
export interface OffsetPaginationResponse<T> {
  readonly data: readonly T[];
  readonly metadata: PaginationMetadata;
}

export type PaginationType = 'offset' | 'cursor';
// ============================================================
// Cursor-based Pagination Parameters
// ============================================================
export interface CursorPaginationParams {
  readonly cursor?: string;        // Encoded cursor string
  readonly limit?: number;         // Default: 20, Max: 100
  readonly direction?: 'next' | 'prev';  // Default: 'next'
  readonly sortBy?: string;        // Field to sort by (must be indexed)
  readonly sortOrder?: SortOrder;
}

// ============================================================
// Cursor-based Pagination Response
// ============================================================
export interface CursorPaginationResponse<T> {
  readonly data: readonly T[];
  readonly nextCursor: string | null;
  readonly prevCursor: string | null;
  readonly hasMore: boolean;
  readonly total?: number;          // Optional: expensive operation
}

// ============================================================
// Cursor Info (Internal for cursor encoding)
// ============================================================
export interface CursorInfo {
  readonly value: string | number | Date;
  readonly id: string;              // Unique ID for tie-breaking
  readonly direction: 'next' | 'prev';
}

// ============================================================
// Infinite Scroll Pagination Response
// ============================================================
export interface InfiniteScrollResponse<T> {
  readonly data: readonly T[];
  readonly hasMore: boolean;
  readonly nextPage: number;
  readonly total: number;
  readonly nextCursor?: string;     // For cursor-based infinite scroll
}

// ============================================================
// Pagination Filters (Generic)
// ============================================================
export interface PaginationFilters {
  readonly search?: string;
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly status?: string | readonly string[];
  readonly [key: string]: unknown;  // Additional dynamic filters
}

// ============================================================
// Page Request (For batch processing)
// ============================================================
export interface PageRequest<TFilters = PaginationFilters> {
  readonly page: number;
  readonly limit: number;
  readonly sort?: readonly PaginationSort[];
  readonly filters?: TFilters;
}

// ============================================================
// Page Result (For batch processing)
// ============================================================
export interface PageResult<T> {
  readonly items: readonly T[];
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
  readonly totalPages: number;
}

// ============================================================
// Batch Processing Options
// ============================================================
export interface BatchProcessingOptions {
  readonly batchSize: number;       // Items per batch
  readonly concurrency: number;     // Parallel batches (default: 1)
  readonly retryOnFailure: boolean;
  readonly maxRetries: number;      // Default: 3
  readonly retryDelayMs?: number;   // Default: 1000
  readonly stopOnError?: boolean;   // Default: false
}

// ============================================================
// Batch Processing Result
// ============================================================
export interface BatchProcessingResult<T> {
  readonly totalProcessed: number;
  readonly successful: number;
  readonly failed: number;
  readonly items: readonly T[];
  readonly errors: ReadonlyArray<{
    readonly item: T;
    readonly error: string;
    readonly attemptCount: number;
  }>;
  readonly durationMs: number;
}

// ============================================================
// Pagination Link (For API response navigation)
// ============================================================
export interface PaginationLink {
  readonly url: string;
  readonly label: string;
  readonly labelBn?: string;        // Bengali label (Bangladesh specific)
  readonly active: boolean;
  readonly page: number | null;
  readonly rel?: 'first' | 'last' | 'prev' | 'next';
}

// ============================================================
// Pagination Links (For API response)
// ============================================================
export interface PaginationLinks {
  readonly first: string | null;
  readonly last: string | null;
  readonly prev: string | null;
  readonly next: string | null;
  readonly self?: string;
}

// ============================================================
// Pagination Meta with Links
// ============================================================
export interface PaginationMetaWithLinks extends PaginationMetadata {
  readonly links: PaginationLinks;
  readonly path: string;            // Base API path
  readonly queryParams?: Record<string, unknown>;
}


// ============================================================
// Full Paginated Response (With data + metadata + links)
// ============================================================
export interface FullPaginatedResponse<T> {
  readonly data: readonly T[];
  readonly metadata: PaginationMetadata;
  readonly links: PaginationLinks;
}

// ============================================================
// Pagination Defaults (Type-safe constants)
// ============================================================
export interface PaginationDefaults {
  readonly DEFAULT_PAGE: 1;
  readonly DEFAULT_LIMIT: 20;
  readonly MAX_LIMIT: 100;
  readonly MIN_LIMIT: 1;
  readonly MAX_LIMIT_ADMIN: 500;
  readonly DEFAULT_SORT_ORDER: 'desc';
}

// ============================================================
// Sortable Fields Configuration
// ============================================================
export interface SortableField {
  readonly field: string;
  readonly allowed: boolean;
  readonly defaultOrder?: SortOrder;
  readonly dbField?: string;        // Database column name if different
}

export interface SortableFieldsConfig {
  readonly fields: readonly SortableField[];
  readonly defaultField: string;
  readonly defaultOrder: SortOrder;
}

// ============================================================
// Pagination Validation Result
// ============================================================
export interface PaginationValidationResult {
  readonly valid: boolean;
  readonly page: number;
  readonly limit: number;
  readonly sortBy: string;
  readonly sortOrder: SortOrder;
  readonly errors?: ReadonlyArray<{
    readonly field: string;
    readonly message: string;
  }>;
}

// ============================================================
// Search Pagination Parameters (E-commerce specific)
// ============================================================
export interface SearchPaginationParams extends PaginationParams {
  readonly search: string;
  readonly searchFields?: readonly string[];  // Fields to search in
  readonly fuzzy?: boolean;                   // Enable fuzzy search
  readonly exactMatch?: boolean;
}

// ============================================================
// Product Search Pagination (Bangladesh e-commerce specific)
// ============================================================
export interface ProductSearchPaginationParams extends SearchPaginationParams {
  readonly categoryId?: string;
  readonly brandId?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly rating?: number;
  readonly inStock?: boolean;
  readonly discountOnly?: boolean;
  readonly featuredOnly?: boolean;
  readonly sortBy?: 'price' | 'rating' | 'newest' | 'popularity' | 'discount';
}

// ============================================================
// Order Pagination Parameters
// ============================================================
export interface OrderPaginationParams extends PaginationParams {
  readonly status?: string | readonly string[];
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly paymentStatus?: string | readonly string[];
}

// ============================================================
// Pagination Event (For analytics)
// ============================================================
export interface PaginationEvent {
  readonly type: 'next' | 'prev' | 'first' | 'last' | 'page';
  readonly page: number;
  readonly limit: number;
  readonly timestamp: Date;
  readonly userId?: string;
  readonly sessionId?: string;
}

// ============================================================
// Pagination Cache Key Configuration
// ============================================================
export interface PaginationCacheConfig {
  readonly enabled: boolean;
  readonly ttlSeconds: number;
  readonly keyPrefix: string;
  readonly invalidationTriggers?: readonly string[];  // Events that invalidate cache
}

// ============================================================
// Pagination Metrics (For monitoring)
// ============================================================
export interface PaginationMetrics {
  readonly totalRequests: number;
  readonly averagePageSize: number;
  readonly averageResponseTimeMs: number;
  readonly mostRequestedLimits: Record<number, number>;
  readonly cacheHitRate: number;
  readonly deepPaginationCount: number;   // Page > 50
  readonly cursorUsageCount: number;
}
