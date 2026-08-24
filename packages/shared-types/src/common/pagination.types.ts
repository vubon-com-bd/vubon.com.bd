/**
 * Pagination Types
 * Type definitions for pagination, sorting, and filtering
 * Based on shared-constants patterns
 * @module PaginationTypes
 */

import {
  SortOrder,
  FilterCondition,
  FilterGroup,
  LogicalOperator,
  FilterOperator,
} from './core-primitives.types';

// Import from shared-constants for pagination defaults
import { CACHE, QUEUE } from '@vubon/shared-constants';

/**
 * Base pagination parameters
 */
export interface BasePaginationParams {
  /** Page number (1-indexed) */
  page: number;
  /** Items per page */
  limit: number;
  /** Sort field */
  sortBy?: string;
  /** Sort order */
  sortOrder?: SortOrder;
}

/**
 * Pagination parameters with filters
 */
export interface PaginationParams extends BasePaginationParams {
  /** Filter conditions */
  filters?: FilterCondition[];
  /** Filter group with logical operators */
  filterGroup?: FilterGroup;
  /** Search query */
  search?: string;
  /** Fields to include in response */
  fields?: string[];
  /** Fields to exclude from response */
  exclude?: string[];
}

/**
 * Pagination parameters with cursor-based pagination
 */
export interface CursorPaginationParams {
  /** Cursor for next page */
  cursor?: string;
  /** Items per page */
  limit: number;
  /** Sort field */
  sortBy?: string;
  /** Sort order */
  sortOrder?: SortOrder;
}

/**
 * Offset-based pagination parameters
 */
export interface OffsetPaginationParams {
  /** Offset (number of items to skip) */
  offset: number;
  /** Items per page */
  limit: number;
  /** Sort field */
  sortBy?: string;
  /** Sort order */
  sortOrder?: SortOrder;
}

/**
 * Pagination metadata
 */
export interface PaginationMetadata {
  /** Total number of items */
  total: number;
  /** Current page number */
  page: number;
  /** Items per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
  /** Has next page */
  hasNext: boolean;
  /** Has previous page */
  hasPrev: boolean;
  /** Next page number (if available) */
  nextPage?: number;
  /** Previous page number (if available) */
  prevPage?: number;
  /** First page number */
  firstPage: number;
  /** Last page number */
  lastPage: number;
}

/**
 * Cursor pagination metadata
 */
export interface CursorPaginationMetadata {
  /** Total number of items */
  total: number;
  /** Items per page */
  limit: number;
  /** Next cursor */
  nextCursor?: string;
  /** Previous cursor */
  prevCursor?: string;
  /** Has next page */
  hasNext: boolean;
  /** Has previous page */
  hasPrev: boolean;
}

/**
 * Paginated response with metadata
 */
export interface PaginatedResponse<T> {
  /** Items for current page */
  items: T[];
  /** Pagination metadata */
  metadata: PaginationMetadata;
}

/**
 * Cursor paginated response
 */
export interface CursorPaginatedResponse<T> {
  /** Items for current page */
  items: T[];
  /** Cursor pagination metadata */
  metadata: CursorPaginationMetadata;
}

/**
 * Paginated response without items (metadata only)
 */
export interface PaginationInfo {
  /** Pagination metadata */
  metadata: PaginationMetadata;
}

/**
 * Sort configuration
 */
export interface SortConfig {
  /** Sort field */
  field: string;
  /** Sort order */
  order: SortOrder;
  /** Nested sort path (for nested fields) */
  path?: string;
  /** Sort priority (when multiple sorts) */
  priority?: number;
}

/**
 * Sort configuration with multiple fields
 */
export interface MultiSortConfig {
  /** Array of sort configurations */
  sorts: SortConfig[];
}

/**
 * Filter configuration
 */
export interface FilterConfig {
  /** Field name */
  field: string;
  /** Filter operator */
  operator: FilterOperator;
  /** Filter value */
  value: unknown;
  /** Nested filter path */
  path?: string;
}

/**
 * Filter configuration with logical grouping
 */
export interface FilterGroupConfig {
  /** Logical operator */
  operator: LogicalOperator;
  /** Array of filter configurations */
  filters: FilterConfig[];
}

/**
 * Search configuration
 * Uses CACHE strategies from shared-constants
 */
export interface SearchConfig {
  /** Search query */
  query: string;
  /** Search fields (if empty, search all) */
  fields?: string[];
  /** Case sensitive search */
  caseSensitive?: boolean;
  /** Fuzzy search */
  fuzzy?: boolean;
  /** Minimum match score */
  minScore?: number;
  /** Cache strategy from shared-constants */
  cacheStrategy?: (typeof CACHE)[keyof typeof CACHE];
}

/**
 * Advanced search configuration
 */
export interface AdvancedSearchConfig extends SearchConfig {
  /** Search operators (AND, OR, NOT) */
  operator?: 'AND' | 'OR' | 'NOT';
  /** Search in nested objects */
  nestedFields?: string[];
  /** Highlight search terms */
  highlight?: boolean;
  /** Search synonyms */
  useSynonyms?: boolean;
  /** Queue strategy from shared-constants */
  queueStrategy?: (typeof QUEUE)[keyof typeof QUEUE];
}

/**
 * Facet configuration
 */
export interface FacetConfig {
  /** Field name */
  field: string;
  /** Facet type */
  type: 'terms' | 'range' | 'date_histogram' | 'histogram';
  /** Number of buckets */
  size?: number;
  /** Minimum document count */
  minCount?: number;
  /** Range configuration (for range facets) */
  range?: {
    min: number;
    max: number;
    interval: number;
  };
}

/**
 * Facet result
 */
export interface FacetResult {
  /** Field name */
  field: string;
  /** Facet type */
  type: 'terms' | 'range' | 'date_histogram' | 'histogram';
  /** Facet buckets */
  buckets: FacetBucket[];
}

/**
 * Facet bucket
 */
export interface FacetBucket {
  /** Bucket key */
  key: string;
  /** Bucket value */
  value?: unknown;
  /** Document count */
  count: number;
  /** Additional data */
  data?: Record<string, unknown>;
}

/**
 * Aggregation configuration
 */
export interface AggregationConfig {
  /** Aggregation name */
  name: string;
  /** Aggregation type */
  type: 'sum' | 'avg' | 'min' | 'max' | 'count' | 'stats' | 'terms' | 'range';
  /** Field name */
  field: string;
  /** Additional parameters */
  params?: Record<string, unknown>;
}

/**
 * Aggregation result
 */
export interface AggregationResult {
  /** Aggregation name */
  name: string;
  /** Aggregation type */
  type: string;
  /** Result value */
  value: unknown;
  /** Additional data */
  data?: Record<string, unknown>;
}

/**
 * Request with pagination
 */
export interface PaginatedRequest {
  /** Pagination parameters */
  pagination?: PaginationParams;
  /** Sort configurations */
  sort?: SortConfig[];
  /** Filter configurations */
  filters?: FilterConfig[];
  /** Search configuration */
  search?: SearchConfig;
  /** Facet configurations */
  facets?: FacetConfig[];
  /** Aggregation configurations */
  aggregations?: AggregationConfig[];
}

/**
 * Response with pagination and aggregations
 */
export interface AggregatedPaginatedResponse<T> extends PaginatedResponse<T> {
  /** Facet results */
  facets?: FacetResult[];
  /** Aggregation results */
  aggregations?: AggregationResult[];
}

/**
 * Page info for infinite scrolling
 */
export interface PageInfo {
  /** Total number of items */
  total: number;
  /** Has next page */
  hasNextPage: boolean;
  /** Has previous page */
  hasPreviousPage: boolean;
  /** Next page number */
  nextPage?: number;
  /** Previous page number */
  prevPage?: number;
}

/**
 * Connection for GraphQL-style pagination
 */
export interface Connection<T> {
  /** Array of edges */
  edges: Edge<T>[];
  /** Page info */
  pageInfo: PageInfo;
  /** Total count */
  totalCount: number;
}

/**
 * Edge for GraphQL-style pagination
 */
export interface Edge<T> {
  /** Node cursor */
  cursor: string;
  /** Node data */
  node: T;
}

/**
 * Page request with cursor
 */
export interface PageRequest {
  /** Items per page */
  limit: number;
  /** Starting cursor */
  cursor?: string;
  /** Sort field */
  sortBy?: string;
  /** Sort order */
  sortOrder?: SortOrder;
}

/**
 * Batch pagination request
 */
export interface BatchPaginationRequest {
  /** Array of pagination requests */
  requests: PaginatedRequest[];
  /** Batch size */
  batchSize?: number;
}

/**
 * Batch pagination response
 */
export interface BatchPaginationResponse<T> {
  /** Array of paginated responses */
  responses: PaginatedResponse<T>[];
  /** Batch metadata */
  metadata: {
    totalRequests: number;
    successCount: number;
    failedCount: number;
  };
}
