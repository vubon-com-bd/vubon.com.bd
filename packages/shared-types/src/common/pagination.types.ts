import { PAGINATION } from '@vubon/shared-constants/src/common/pagination.constants';

/**
 * Pagination interface
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Pagination parameters interface
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Pagination type
 */
export type PaginationType = keyof typeof PAGINATION;
