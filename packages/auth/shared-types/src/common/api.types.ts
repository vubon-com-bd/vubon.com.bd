/**
 * Common API response types
 * These types define the structure of all API responses across the application
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
}

export interface ApiErrorResponse {
  success: false;
  data: null;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  errors?: ApiValidationError[];
}

export interface ApiValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
}

export interface ApiPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiPaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: ApiPaginationMeta;
}

export interface ApiSuccessResponse<T> extends ApiResponse<T> {
  success: true;
}

export interface ApiListResponse<T> extends ApiResponse<T[]> {
  total: number;
  limit: number;
  offset: number;
}

export type ApiDataResponse<T> = ApiResponse<T> | ApiErrorResponse;

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
  retry?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheTTL?: number;
}

export interface ApiResponseMeta {
  requestId: string;
  duration: number;
  cacheHit: boolean;
  cacheKey?: string;
}

export interface ApiResponseWithMeta<T> extends ApiResponse<T> {
  meta: ApiResponseMeta;
}

export interface ApiFileResponse {
  success: boolean;
  data: {
    url: string;
    filename: string;
    size: number;
    mimeType: string;
    hash: string;
  };
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
}

export interface ApiUploadResponse {
  success: boolean;
  data: {
    id: string;
    url: string;
    filename: string;
    size: number;
    mimeType: string;
    uploadedAt: string;
  };
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
}

export interface ApiBatchResponse<T> {
  success: boolean;
  data: {
    succeeded: Array<{
      index: number;
      item: T;
    }>;
    failed: Array<{
      index: number;
      error: string;
      code: string;
    }>;
  };
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
}

export interface ApiStatusResponse {
  success: boolean;
  data: {
    status: 'ok' | 'degraded' | 'down';
    uptime: number;
    version: string;
    environment: string;
    timestamp: string;
    services: Record<string, 'up' | 'down' | 'degraded'>;
  };
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
}

export interface ApiHealthResponse {
  success: boolean;
  data: {
    status: 'healthy' | 'unhealthy';
    checks: Record<
      string,
      {
        status: 'pass' | 'fail' | 'warn';
        time: string;
        component: string;
        componentType: string;
        observedValue: number;
        observedUnit: string;
        output?: string;
      }
    >;
  };
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
}

export interface ApiStreamResponse<T> {
  data: T;
  complete: boolean;
  error: string | null;
  timestamp: string;
}

export interface ApiEventResponse {
  event: string;
  data: unknown;
  timestamp: string;
  id: string;
}

export type ApiResponseType = 'json' | 'text' | 'blob' | 'arraybuffer' | 'stream';

export interface ApiError {
  code: string;
  message: string;
  status: number;
  field?: string;
  details?: Record<string, unknown>;
}

export interface ApiErrorMap {
  [key: string]: {
    message: string;
    status: number;
    code: string;
  };
}

export interface ApiRateLimitInfo {
  limit: number;
  remaining: number;
  reset: string;
  retryAfter?: number;
}

export interface ApiResponseWithRateLimit<T> extends ApiResponse<T> {
  rateLimit: ApiRateLimitInfo;
}

export interface ApiPaginationRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiFilterRequest {
  filters?: Record<string, string | number | boolean | string[]>;
  search?: string;
  searchFields?: string[];
}

export interface ApiListRequest extends ApiPaginationRequest, ApiFilterRequest {}

export type ApiResult<T> = Promise<ApiResponse<T>>;

export interface ApiClientResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface ApiConfiguration {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  withCredentials: boolean;
  retryAttempts: number;
  retryDelay: number;
}
