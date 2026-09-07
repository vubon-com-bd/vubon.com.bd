import { BaseResponse } from './base-response.types';
import { PAGINATION } from '@vubon/shared-constants';

// PaginationMeta - PAGINATION কনস্ট্যান্ট ব্যবহার করে ডিফল্ট ভ্যালু সেট করা
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// PaginationMeta ফ্যাক্টরি - PAGINATION ব্যবহার করে ডিফল্ট মান তৈরি
export type PaginationMetaFactory = (
  total: number,
  page?: number,
  limit?: number
) => PaginationMeta;

// PaginatedResponse
export interface PaginatedResponse<T = unknown> extends BaseResponse<T[]> {
  data: T[];
  meta: PaginationMeta;
}

// PaginationParams - PAGINATION ব্যবহার করে ডিফল্ট ভ্যালু
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// PAGINATION কনস্ট্যান্ট থেকে ডিফল্ট প্যারামিটার তৈরি
export const DEFAULT_PAGINATION_PARAMS: Required<Pick<PaginationParams, 'page' | 'limit'>> = {
  page: PAGINATION.DEFAULT_PAGE || 1,
  limit: PAGINATION.DEFAULT_LIMIT || 10,
};

// PAGINATION.LIMITS থেকে লিমিট অপশন তৈরি
export const PAGINATION_LIMIT_OPTIONS: number[] = [
  PAGINATION.LIMITS?.SMALL || 10,
  PAGINATION.LIMITS?.MEDIUM || 20,
  PAGINATION.LIMITS?.LARGE || 50,
  PAGINATION.LIMITS?.XLARGE || 100,
];

// PAGINATION কনস্ট্যান্ট থেকে সর্বোচ্চ লিমিট
export const MAX_PAGINATION_LIMIT: number = PAGINATION.MAX_LIMIT || 100;

// PAGINATION কনস্ট্যান্ট থেকে সর্বনিম্ন লিমিট
export const MIN_PAGINATION_LIMIT: number = PAGINATION.MIN_LIMIT || 1;

// PaginationMeta তৈরির ফাংশন - PAGINATION ব্যবহার করে
export function createPaginationMeta(
  total: number,
  page: number = DEFAULT_PAGINATION_PARAMS.page,
  limit: number = DEFAULT_PAGINATION_PARAMS.limit
): PaginationMeta {
  // PAGINATION থেকে ডিফল্ট মান ব্যবহার
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), PAGINATION.MAX_LIMIT || 100);
  const totalPages = Math.ceil(total / safeLimit);

  return {
    page: safePage,
    limit: safeLimit,
    total,
    totalPages,
    hasNext: safePage < totalPages,
    hasPrevious: safePage > 1,
  };
}

// পেজিনেশন লিমিট ভ্যালিডেশন - PAGINATION ব্যবহার করে
export function isValidPaginationLimit(limit: number): boolean {
  const maxLimit = PAGINATION.MAX_LIMIT || 100;
  const minLimit = PAGINATION.MIN_LIMIT || 1;
  return limit >= minLimit && limit <= maxLimit;
}

// পেজিনেশন পৃষ্ঠা ভ্যালিডেশন - PAGINATION ব্যবহার করে
export function isValidPaginationPage(page: number): boolean {
  return page >= 1;
}

// পেজিনেশন প্যারামিটার নরমালাইজেশন - PAGINATION ব্যবহার করে
export function normalizePaginationParams(params: PaginationParams): Required<PaginationParams> {
  const maxLimit = PAGINATION.MAX_LIMIT || 100;
  const defaultLimit = PAGINATION.DEFAULT_LIMIT || 10;
  const defaultPage = PAGINATION.DEFAULT_PAGE || 1;

  return {
    page: Math.max(1, params.page || defaultPage),
    limit: Math.min(Math.max(1, params.limit || defaultLimit), maxLimit),
    sortBy: params.sortBy || 'createdAt',
    sortOrder: params.sortOrder || 'desc',
  };
}

// পেজিনেশন গণনা - PAGINATION ব্যবহার করে
export interface PaginationCalculation {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  offset: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function calculatePagination(
  total: number,
  page: number = DEFAULT_PAGINATION_PARAMS.page,
  limit: number = DEFAULT_PAGINATION_PARAMS.limit
): PaginationCalculation {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), PAGINATION.MAX_LIMIT || 100);
  const totalPages = Math.ceil(total / safeLimit);
  const offset = (safePage - 1) * safeLimit;

  return {
    page: safePage,
    limit: safeLimit,
    total,
    totalPages,
    offset,
    hasNext: safePage < totalPages,
    hasPrevious: safePage > 1,
  };
}

// পেজিনেশন অপশন
export interface PaginationOptions {
  defaultLimit?: number;
  maxLimit?: number;
  minLimit?: number;
  defaultPage?: number;
}

// PAGINATION থেকে পেজিনেশন অপশন তৈরি
export function getPaginationOptions(): PaginationOptions {
  return {
    defaultLimit: PAGINATION.DEFAULT_LIMIT || 10,
    maxLimit: PAGINATION.MAX_LIMIT || 100,
    minLimit: PAGINATION.MIN_LIMIT || 1,
    defaultPage: PAGINATION.DEFAULT_PAGE || 1,
  };
}

// পেজিনেশন স্টেট
export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  isLoading: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

// পেজিনেশন স্টেট তৈরি - PAGINATION ব্যবহার করে
export function createPaginationState(
  total: number = 0,
  page: number = DEFAULT_PAGINATION_PARAMS.page,
  limit: number = DEFAULT_PAGINATION_PARAMS.limit
): PaginationState {
  const calc = calculatePagination(total, page, limit);
  return {
    ...calc,
    isLoading: false,
  };
}
