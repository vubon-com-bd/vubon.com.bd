/**
 * Common API types for the monorepo
 * All API-related types are centralized here for consistent usage across packages
 */

/**
 * Standard API response wrapper
 * Used for all API responses to maintain consistency
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ApiError[];
  metadata?: ResponseMetadata;
}

/**
 * API error structure
 */
export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
}

/**
 * Response metadata for pagination and additional info
 */
export interface ResponseMetadata {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  timestamp?: string;
  requestId?: string;
  version?: string;
}

/**
 * Paginated API response
 */
export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  metadata: Required<Pick<ResponseMetadata, 'page' | 'limit' | 'total' | 'totalPages'>>;
}

/**
 * Empty response for operations that return no data
 */
export type EmptyResponse = ApiResponse<null>;

/**
 * API request options
 */
export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
  retry?: boolean;
  retryCount?: number;
  withCredentials?: boolean;
  signal?: AbortSignal;
}

/**
 * API pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * API filter parameters
 */
export interface FilterParams {
  search?: string;
  fromDate?: string | Date;
  toDate?: string | Date;
  status?: string | string[];
  [key: string]: unknown;
}

/**
 * API query parameters with pagination and filters
 */
export interface ApiQueryParams extends PaginationParams, FilterParams {
  fields?: string[];
  include?: string[];
  exclude?: string[];
}

/**
 * API endpoint configuration
 */
export interface ApiEndpointConfig {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  version?: string;
  auth?: boolean;
  rateLimit?: boolean;
  timeout?: number;
  retry?: boolean;
  cache?: boolean | number;
  tags?: string[];
}

/**
 * API client configuration
 */
export interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
  withCredentials: boolean;
  retryConfig?: RetryConfig;
  cacheConfig?: CacheConfig;
}

/**
 * Retry configuration
 */
export interface RetryConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryStatusCodes: number[];
  retryOnNetworkErrors: boolean;
  retryOnTimeout: boolean;
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  enabled: boolean;
  ttl: number;
  maxSize: number;
  staleWhileRevalidate: boolean;
  cacheOnError: boolean;
}

/**
 * API error types
 */
export type ApiErrorType =
  | 'validation'
  | 'authentication'
  | 'authorization'
  | 'not_found'
  | 'conflict'
  | 'rate_limited'
  | 'server_error'
  | 'network_error'
  | 'timeout'
  | 'unknown';

/**
 * API error response
 */
export interface ApiErrorResponse {
  success: false;
  error: ApiError;
  metadata?: ResponseMetadata;
}

/**
 * API success response
 */
export type ApiSuccessResponse<T> = ApiResponse<T>;

/**
 * API status codes (as const for better type inference)
 */
export const ApiStatusCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export type ApiStatusCodeType = (typeof ApiStatusCode)[keyof typeof ApiStatusCode];

/**
 * HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

/**
 * API content types
 */
export const ApiContentType = {
  JSON: 'application/json',
  XML: 'application/xml',
  HTML: 'text/html',
  TEXT: 'text/plain',
  CSV: 'text/csv',
  PDF: 'application/pdf',
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  FORM: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data',
  JSON_PATCH: 'application/json-patch+json',
  JSON_MERGE: 'application/merge-patch+json',
  PROBLEM: 'application/problem+json',
  HAL: 'application/hal+json',
  STREAM: 'application/stream+json',
} as const;

export type ApiContentTypeType = (typeof ApiContentType)[keyof typeof ApiContentType];

/**
 * API response format
 */
export const ApiResponseFormat = {
  JSON: 'json',
  XML: 'xml',
  HTML: 'html',
  TEXT: 'text',
  CSV: 'csv',
  PDF: 'pdf',
  EXCEL: 'excel',
} as const;

export type ApiResponseFormatType = (typeof ApiResponseFormat)[keyof typeof ApiResponseFormat];

/**
 * API event types
 */
export type ApiEventType =
  | 'request_start'
  | 'request_success'
  | 'request_failure'
  | 'request_timeout'
  | 'rate_limit_hit'
  | 'rate_limit_exceeded'
  | 'circuit_opened'
  | 'circuit_closed'
  | 'circuit_half_open'
  | 'retry_attempt'
  | 'retry_success'
  | 'retry_failure';

/**
 * API event payload
 */
export interface ApiEventPayload {
  type: ApiEventType;
  url: string;
  method: HttpMethod;
  duration?: number;
  statusCode?: number;
  error?: Error;
  retryCount?: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

/**
 * API interceptor interface
 */
export interface ApiInterceptor {
  onRequest?: (config: ApiRequestOptions) => ApiRequestOptions | Promise<ApiRequestOptions>;
  onResponse?: <T>(response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>;
  onError?: (error: ApiError) => ApiError | Promise<ApiError>;
}

/**
 * API health check response
 */
export interface ApiHealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  uptime: number;
  timestamp: string;
  services: Array<{
    name: string;
    status: 'healthy' | 'degraded' | 'unhealthy';
    latency: number;
    error?: string;
  }>;
}

/**
 * API webhook payload
 */
export interface ApiWebhookPayload {
  id: string;
  event: string;
  timestamp: string;
  data: Record<string, unknown>;
  retryCount: number;
  source: string;
}

/**
 * API webhook response
 */
export interface ApiWebhookResponse {
  received: boolean;
  processed: boolean;
  message?: string;
  statusCode: number;
}

/**
 * Helper type for API error handling
 */
export type ApiErrorHandler = (error: ApiError) => ApiError | void | Promise<ApiError | void>;

/**
 * Helper type for API success handling
 */
export type ApiSuccessHandler<T> = (response: ApiResponse<T>) => void | Promise<void>;

/**
 * Type guard to check if response is an error
 */
export function isApiErrorResponse(
  response: ApiResponse<unknown> | ApiErrorResponse
): response is ApiErrorResponse {
  return !response.success && 'error' in response && response.error !== undefined;
}

/**
 * Type guard to check if response is successful
 */
export function isApiSuccessResponse<T>(
  response: ApiResponse<T> | ApiErrorResponse
): response is ApiSuccessResponse<T> {
  return response.success === true && 'data' in response;
}

/**
 * Helper function to create a success response
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  metadata?: ResponseMetadata
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    metadata: {
      timestamp: new Date().toISOString(),
      ...metadata,
    },
  };
}

/**
 * Helper function to create an error response
 */
export function createErrorResponse(
  code: string,
  message: string,
  field?: string,
  details?: Record<string, unknown>,
  metadata?: ResponseMetadata
): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      field,
      details,
    },
    metadata: {
      timestamp: new Date().toISOString(),
      ...metadata,
    },
  };
}

/**
 * Helper function to create a paginated response
 */
export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  message?: string
): PaginatedApiResponse<T> {
  const totalPages = Math.ceil(total / limit);
  return {
    success: true,
    data,
    message,
    metadata: {
      page,
      limit,
      total,
      totalPages,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * API response wrapper class for type-safe operations
 */
export class ApiResponseWrapper<T> {
  private readonly _response: ApiResponse<T> | ApiErrorResponse;

  constructor(response: ApiResponse<T> | ApiErrorResponse) {
    this._response = response;
  }

  get response(): ApiResponse<T> | ApiErrorResponse {
    return this._response;
  }

  get data(): T | undefined {
    if (!this._response.success) {
      return undefined;
    }
    return (this._response as ApiResponse<T>).data;
  }

  get message(): string | undefined {
    return this._response.message;
  }

  get errors(): ApiError[] | undefined {
    if (!this._response.success && 'error' in this._response) {
      return [this._response.error];
    }
    return (this._response as ApiResponse<T>).errors;
  }

  get metadata(): ResponseMetadata | undefined {
    return this._response.metadata;
  }

  get success(): boolean {
    return this._response.success;
  }

  isSuccess(): this is ApiResponseWrapper<Exclude<T, never>> {
    return this._response.success === true && 'data' in this._response;
  }

  isError(): this is ApiResponseWrapper<never> {
    return this._response.success === false;
  }

  getDataOrThrow(): T {
    if (!this._response.success || !('data' in this._response)) {
      const error = this.errors?.[0];
      throw new Error(error?.message || 'API request failed');
    }
    return (this._response as ApiResponse<T>).data;
  }

  getErrorOrThrow(): ApiError {
    if (this._response.success) {
      throw new Error('Cannot get error from success response');
    }
    if ('error' in this._response) {
      return this._response.error;
    }
    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred',
    };
  }
}

/**
 * API request builder for fluent API construction
 */
export class ApiRequestBuilder {
  private _url: string = '';
  private _method: HttpMethod = 'GET';
  private _body?: unknown;
  private _headers: Record<string, string> = {};
  private _params: Record<string, string> = {};
  private _options: ApiRequestOptions = {};

  setUrl(url: string): this {
    this._url = url;
    return this;
  }

  setMethod(method: HttpMethod): this {
    this._method = method;
    return this;
  }

  setBody<T>(body: T): this {
    this._body = body;
    return this;
  }

  setHeader(key: string, value: string): this {
    this._headers[key] = value;
    return this;
  }

  setHeaders(headers: Record<string, string>): this {
    this._headers = { ...this._headers, ...headers };
    return this;
  }

  setParam(key: string, value: string | number | boolean): this {
    this._params[key] = String(value);
    return this;
  }

  setParams(params: Record<string, string | number | boolean>): this {
    for (const [key, value] of Object.entries(params)) {
      this._params[key] = String(value);
    }
    return this;
  }

  setTimeout(timeout: number): this {
    this._options.timeout = timeout;
    return this;
  }

  setRetry(retry: boolean): this {
    this._options.retry = retry;
    return this;
  }

  setCredentials(withCredentials: boolean): this {
    this._options.withCredentials = withCredentials;
    return this;
  }

  setSignal(signal: AbortSignal): this {
    this._options.signal = signal;
    return this;
  }

  build(): { url: string; method: HttpMethod; body?: unknown; options: ApiRequestOptions } {
    const url = new URL(this._url);
    for (const [key, value] of Object.entries(this._params)) {
      url.searchParams.append(key, value);
    }

    const options: ApiRequestOptions = {
      ...this._options,
      headers: this._headers,
    };

    return {
      url: url.toString(),
      method: this._method,
      body: this._body,
      options,
    };
  }
}
