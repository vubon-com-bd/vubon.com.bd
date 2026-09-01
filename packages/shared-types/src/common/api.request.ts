import { AuthUser } from './auth.user';

/**
 * File Interface
 * ফাইল টাইপ
 */
export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

/**
 * API Request
 * এপিআই রিকোয়েস্ট টাইপ
 */
export interface ApiRequest<T = unknown> {
  body: T;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
  headers: Record<string, string>;
  user?: AuthUser;
  ip?: string;
}

/**
 * API Request with File
 * ফাইল সহ এপিআই রিকোয়েস্ট
 */
export interface ApiRequestWithFile<T = unknown> extends ApiRequest<T> {
  file: File;
  files: File[];
}

/**
 * API Request with Pagination
 * পেজিনেশন সহ এপিআই রিকোয়েস্ট
 */
export interface ApiRequestWithPagination<T = unknown> extends ApiRequest<T> {
  query: ApiRequest<T>['query'] & {
    page: string;
    limit: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search: string;
  };
}

/**
 * API Request with Files (Multiple)
 * মাল্টিপল ফাইল সহ এপিআই রিকোয়েস্ট
 */
export interface ApiRequestWithFiles<T = unknown> extends ApiRequest<T> {
  files: Record<string, File[]>;
}
