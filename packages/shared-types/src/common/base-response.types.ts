// BaseEntity ব্যবহার করা হচ্ছে না, তাই ইমপোর্ট সরানো হয়েছে

export interface BaseResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  code?: string;
  timestamp: Date;
}

export interface SuccessResponse<T = unknown> extends BaseResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse extends BaseResponse<never> {
  success: false;
  error: string;
  details?: unknown;
}

// হেল্পার টাইপ
export type ResponseData<T = unknown> = T;
export type ResponseMessage = string;
export type ResponseCode = string;

// রেসপন্স ফ্যাক্টরি টাইপ
export type ResponseFactory<T = unknown> = (data: T, message?: string) => BaseResponse<T>;
export type SuccessResponseFactory<T = unknown> = (data: T, message?: string) => SuccessResponse<T>;
export type ErrorResponseFactory = (
  error: string,
  details?: unknown,
  code?: string
) => ErrorResponse;

// রেসপন্স অপশন - T এর প্রয়োজন নেই
export interface ResponseOptions {
  message?: string;
  code?: string;
  timestamp?: Date;
  metadata?: Record<string, unknown>;
}

// মেটাডেটা সহ রেসপন্স
export interface ResponseWithMetadata<T = unknown> extends BaseResponse<T> {
  metadata: Record<string, unknown>;
}

// লিস্ট রেসপন্স
export interface ListResponse<T = unknown> extends BaseResponse<T[]> {
  data: T[];
  total?: number;
  limit?: number;
  offset?: number;
}

// পেজিনেটেড লিস্ট রেসপন্স
export interface PaginatedListResponse<T = unknown> extends ListResponse<T> {
  total: number;
  limit: number;
  offset: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalPages: number;
}

// খালি রেসপন্স
export type EmptyResponse = BaseResponse<void>;

// বাল্ক রেসপন্স
export interface BulkResponse<T = unknown> extends BaseResponse<T[]> {
  data: T[];
  errors?: Array<{
    index: number;
    message: string;
    code?: string;
  }>;
  successCount: number;
  failureCount: number;
}

// রেসপন্স ইউটিলিটি ফাংশনের টাইপ
export type ResponseTransformer<T, U> = (data: T) => U;
export type ResponseFilter<T> = (data: T) => boolean;
export type ResponseSorter<T> = (a: T, b: T) => number;

// রেসপন্স স্ট্যাটাস টাইপ
export type ResponseStatus = 'success' | 'error' | 'pending' | 'idle';

// রেসপন্স স্টেট
export interface ResponseState<T = unknown> {
  status: ResponseStatus;
  data?: T;
  error?: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}
