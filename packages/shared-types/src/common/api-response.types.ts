import { SuccessResponse, ErrorResponse as BaseErrorResponse } from './base-response.types';

// বেস API রেসপন্স টাইপ (ইউনিয়ন টাইপ)
export type ApiResponse<T = unknown> = SuccessResponse<T> | BaseErrorResponse;

export interface ApiResponseMeta {
  requestId: string;
  duration: number;
  timestamp: Date;
}

// সফল রেসপন্সের জন্য হেল্পার টাইপ
export type SuccessApiResponse<T = unknown> = SuccessResponse<T>;

// এরর রেসপন্সের জন্য হেল্পার টাইপ
export type ErrorApiResponse = BaseErrorResponse;

// পেজিনেটেড রেসপন্স (ইন্টারফেস না হয়ে টাইপ ব্যবহার)
export type PaginatedApiResponse<T = unknown> = SuccessResponse<T[]> & {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// অ্যাডভান্সড রেসপন্স মেটা
export interface AdvancedResponseMeta extends ApiResponseMeta {
  cache?: boolean;
  server?: string;
  version?: string;
}

// অ্যাডভান্সড রেসপন্স (টাইপ ব্যবহার)
export type AdvancedApiResponse<T = unknown> = ApiResponse<T> & {
  meta?: AdvancedResponseMeta;
  links?: {
    self: string;
    next?: string;
    prev?: string;
  };
};

// বাল্ক রেসপন্স
export interface BulkApiResponse<T = unknown> {
  data: T[];
  errors?: Array<{
    index: number;
    message: string;
    code?: string;
  }>;
  meta: {
    total: number;
    successCount: number;
    failureCount: number;
  };
}
