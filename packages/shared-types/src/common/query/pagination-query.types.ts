/**
 * Pagination Query Types
 * @module shared-types/common/query
 *
 * Values আসে shared-constants/common/pagination.constants থেকে।
 */

import type { PAGINATION } from '@vubon/shared-constants/common';

export type PaginationDefaultPage = typeof PAGINATION.DEFAULT_PAGE;
export type PaginationDefaultLimit = typeof PAGINATION.DEFAULT_LIMIT;
export type PaginationMaxLimit = typeof PAGINATION.MAX_LIMIT;

export interface PageQuery {
  readonly page?: number;
  readonly limit?: number;
}

export interface OffsetQuery {
  readonly offset?: number;
  readonly limit?: number;
}

export interface CursorQuery {
  readonly cursor?: string;
  readonly limit?: number;
  readonly direction?: 'forward' | 'backward';
}

export type PaginationQuery = PageQuery | OffsetQuery | CursorQuery;

export interface PaginatedQueryResult<T> {
  readonly items: readonly T[];
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}
