import { PaginationParams } from './paginated-response.types';
import { SORT } from '@vubon/shared-constants';
import { FILTER } from '@vubon/shared-constants';

export interface ApiRequest<T = unknown> {
  body?: T;
  params?: Record<string, string>;
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface ApiRequestWithPagination extends ApiRequest {
  pagination: PaginationParams;
  sort?: keyof typeof SORT;
  filter?: keyof typeof FILTER;
}
