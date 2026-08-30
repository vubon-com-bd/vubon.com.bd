/**
 * Pagination Types
 * Paginated request and response structures
 */

import { HTTP_STATUS } from '@vubon/shared-constants';
import type { HttpStatusCode } from '@vubon/shared-constants';
import { SortOrder } from './core-primitives.types';

/**
 * Pagination Parameters
 * Standard pagination request parameters
 */
export interface PaginationParams {
  /** Page number (starts from 1) */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Field to sort by */
  sortBy?: string;
  /** Sort order */
  sortOrder?: SortOrder;
  /** Search term (optional) */
  search?: string;
}

/**
 * Pagination Metadata
 * Metadata for paginated responses
 */
export interface PaginationMeta {
  /** Current page number */
  currentPage: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Total number of items available */
  totalItems: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
  /** Next page number (if exists) */
  nextPage?: number;
  /** Previous page number (if exists) */
  previousPage?: number;
}

/**
 * Paginated Response
 * Standard paginated API response
 */
export interface PaginatedResponse<T> {
  /** HTTP status code */
  status: HttpStatusCode;
  /** Array of data items */
  data: T[];
  /** Pagination metadata */
  meta: PaginationMeta;
  /** Human-readable message */
  message: string;
  /** ISO timestamp of the response */
  timestamp: string;
}

/**
 * Paginated Request
 * Standard paginated request structure
 */
export interface PaginatedRequest<T = unknown> {
  /** Pagination parameters */
  pagination: PaginationParams;
  /** Filter parameters */
  filters?: T;
  /** Additional options */
  options?: {
    /** Include soft-deleted items */
    includeDeleted?: boolean;
    /** Include metadata */
    includeMeta?: boolean;
  };
}

/**
 * Create pagination metadata helper
 */
export function createPaginationMeta(
  currentPage: number,
  itemsPerPage: number,
  totalItems: number
): PaginationMeta {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : undefined,
    previousPage: currentPage > 1 ? currentPage - 1 : undefined,
  };
}

/**
 * Create paginated response helper
 */
export function createPaginatedResponse<T>(
  data: T[],
  meta: PaginationMeta,
  message: string = 'Success'
): PaginatedResponse<T> {
  return {
    status: HTTP_STATUS.OK,
    data,
    meta,
    message,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Default pagination values
 */
export const DEFAULT_PAGINATION: Required<Omit<PaginationParams, 'search'>> = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

/**
 * Maximum pagination limits
 */
export const PAGINATION_LIMITS = {
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  DEFAULT_LIMIT: 10,
} as const;

/**
 * Validate pagination parameters
 */
export function validatePaginationParams(params: Partial<PaginationParams>): PaginationParams {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(
    PAGINATION_LIMITS.MAX_LIMIT,
    Math.max(PAGINATION_LIMITS.MIN_LIMIT, params.limit || DEFAULT_PAGINATION.limit)
  );

  return {
    page,
    limit,
    sortBy: params.sortBy || DEFAULT_PAGINATION.sortBy,
    sortOrder: params.sortOrder || DEFAULT_PAGINATION.sortOrder,
    search: params.search,
  };
}
