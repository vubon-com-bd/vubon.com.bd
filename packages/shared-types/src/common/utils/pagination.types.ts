/**
 * Pagination Utility
 * @module shared-types/common/utils
 */

export interface PaginationMeta {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

export interface Paginated<T> {
  readonly items: readonly T[];
  readonly meta: PaginationMeta;
}

export interface CursorPaginated<T> {
  readonly items: readonly T[];
  readonly nextCursor: string | null;
  readonly prevCursor: string | null;
  readonly hasMore: boolean;
}
