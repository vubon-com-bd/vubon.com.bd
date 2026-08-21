/**
 * Common Pagination Types Module
 * Pagination and filtering types for the e-commerce platform
 * Handles paginated queries, sorting, and filtering
 */

import { Timestamp } from '../auth/core-primitives.types';

/**
 * Pagination Request
 * Pagination parameters
 */
export interface PaginationRequest {
  page?: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Pagination Response
 * Pagination metadata
 */
export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage?: number;
  prevPage?: number;
  from: number;
  to: number;
}

/**
 * Paginated Result
 * Complete paginated result
 */
export interface PaginatedResult<T = unknown> {
  data: T[];
  pagination: PaginationResponse;
  metadata?: Record<string, unknown>;
}

/**
 * Filter Request
 * Filter parameters
 */
export interface FilterRequest {
  search?: string;
  filters?: FilterCondition[];
  dateRange?: DateRange;
  status?: string[];
  tags?: string[];
  [key: string]: unknown;
}

/**
 * Filter Condition
 * Individual filter condition
 */
export interface FilterCondition {
  field: string;
  operator:
    | 'eq'
    | 'neq'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'contains'
    | 'starts_with'
    | 'ends_with'
    | 'in'
    | 'nin'
    | 'between'
    | 'is_null'
    | 'is_not_null';
  value: unknown;
  logicalOperator?: 'and' | 'or';
}

/**
 * Date Range
 * Date range filter
 */
export interface DateRange {
  start: Timestamp;
  end: Timestamp;
}

/**
 * Sort Request
 * Sort parameters
 */
export interface SortRequest {
  field: string;
  order: 'asc' | 'desc';
  priority?: number;
}

/**
 * Search Request
 * Search parameters
 */
export interface SearchRequest {
  query: string;
  fields?: string[];
  fuzzy?: boolean;
  caseSensitive?: boolean;
  minScore?: number;
}

/**
 * Cursor Pagination
 * Cursor-based pagination
 */
export interface CursorPagination {
  cursor?: string;
  limit?: number;
  direction?: 'forward' | 'backward';
}

/**
 * Page Info
 * Page information for cursor pagination
 */
export interface PageInfo {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

/**
 * Edge
 * GraphQL-style edge
 */
export interface Edge<T = unknown> {
  cursor: string;
  node: T;
}

/**
 * Connection
 * GraphQL-style connection
 */
export interface Connection<T = unknown> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
  totalCount: number;
}

/**
 * Pagination Constants
 * Pagination-related constants
 */
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
  maxLimit: 100,
  defaultSortOrder: 'desc' as const,
  defaultSortField: 'createdAt',
} as const;

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const FILTER_OPERATORS = {
  EQ: 'eq',
  NEQ: 'neq',
  GT: 'gt',
  GTE: 'gte',
  LT: 'lt',
  LTE: 'lte',
  CONTAINS: 'contains',
  STARTS_WITH: 'starts_with',
  ENDS_WITH: 'ends_with',
  IN: 'in',
  NIN: 'nin',
  BETWEEN: 'between',
  IS_NULL: 'is_null',
  IS_NOT_NULL: 'is_not_null',
} as const;

/**
 * Pagination Builder
 * Helper for building pagination responses
 */
export interface PaginationBuilder {
  build(data: unknown[], total: number, request: PaginationRequest): PaginatedResult;
  buildConnection<T>(data: T[], total: number, pageInfo: PageInfo): Connection<T>;
  buildCursor(data: unknown[], total: number, request: CursorPagination): PaginatedResult;
  getOffset(page: number, limit: number): number;
  getTotalPages(total: number, limit: number): number;
  hasNext(page: number, totalPages: number): boolean;
  hasPrev(page: number): boolean;
}
