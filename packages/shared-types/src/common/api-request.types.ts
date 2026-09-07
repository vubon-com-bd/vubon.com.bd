import { PaginationParams } from './paginated-response.types';
import { SORT } from '@vubon/shared-constants';
import { FILTER } from '@vubon/shared-constants';

// জেনেরিক টাইপ ব্যবহার করে unknown দিয়ে টাইপ সেফ করা
export interface ApiRequest<T = unknown> {
  body?: T;
  params?: Record<string, string>;
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface ApiRequestWithPagination<T = unknown> extends ApiRequest<T> {
  pagination: PaginationParams;
  sort?: keyof typeof SORT;
  filter?: keyof typeof FILTER;
}

// নির্দিষ্ট টাইপের জন্য হেল্পার টাইপ
export type JsonApiRequest<T = unknown> = ApiRequest<T>;
export type FormApiRequest = ApiRequest<FormData>;
export type FileApiRequest = ApiRequest<File | Blob>;

// অ্যাডভান্সড ফিল্টারিং সহ রিকোয়েস্ট
export interface AdvancedFilterRequest<T = unknown> extends ApiRequest<T> {
  filters?: Record<string, unknown>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  fields?: string[];
  include?: string[];
}

// একাধিক ডেটা টাইপ সাপোর্ট করার জন্য ইউনিয়ন টাইপ
export type ApiRequestBody = Record<string, unknown> | unknown[] | string | number | boolean | null;
