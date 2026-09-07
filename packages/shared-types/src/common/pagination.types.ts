import { PAGINATION } from '@vubon/shared-constants';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type PaginationType = keyof typeof PAGINATION;
