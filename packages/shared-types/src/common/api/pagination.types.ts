/**
 * Pagination API Types
 * @module shared-types/common/api
 *
 * ⚠️ Note: এখানে PaginationQuery এর নাম ApiPaginationQuery
 * কারণ common/query/-এ আসল business PaginationQuery আছে।
 */

export interface ApiPaginationQuery {
  readonly page?: number;
  readonly limit?: number;
  readonly cursor?: string;
}

export interface PaginationResponseMeta {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  readonly success: boolean;
  readonly data: readonly T[];
  readonly meta: PaginationResponseMeta;
  readonly timestamp: string;
}

export interface CursorPaginatedResponse<T> {
  readonly success: boolean;
  readonly data: readonly T[];
  readonly nextCursor: string | null;
  readonly prevCursor: string | null;
  readonly hasMore: boolean;
  readonly timestamp: string;
}
