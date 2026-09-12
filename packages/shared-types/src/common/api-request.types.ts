import { PaginationParams } from './pagination.types';
import { SORT } from '@vubon/shared-constants/src/common/sort.constants';
import { FILTER } from '@vubon/shared-constants/src/common/filter.constants';

/**
 * API request interface
 */
export interface ApiRequest<T = unknown> {
  body?: T;
  params?: Record<string, string>;
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
}

/**
 * API request with pagination interface
 */
export interface ApiRequestWithPagination extends ApiRequest {
  pagination: PaginationParams;
  sort?: keyof typeof SORT;
  filter?: keyof typeof FILTER;
}
