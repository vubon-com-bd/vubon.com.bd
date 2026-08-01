// packages/shared-types/src/common/index.ts
/**
 * Common types module exports
 * Central export point for all common types
 */

// Export all API types
export type {
  ApiResponse,
  ApiError,
  ResponseMetadata,
  PaginatedApiResponse,
  EmptyResponse,
  ApiRequestOptions,
  PaginationParams,
  FilterParams,
  ApiQueryParams,
  ApiEndpointConfig,
  ApiClientConfig,
  RetryConfig,
  CacheConfig,
  ApiErrorType,
  ApiErrorResponse,
  ApiSuccessResponse,
  ApiStatusCodeType,
  HttpMethod,
  ApiContentTypeType,
  ApiResponseFormatType,
  ApiEventType,
  ApiEventPayload,
  ApiInterceptor,
  ApiHealthResponse,
  ApiWebhookPayload,
  ApiWebhookResponse,
  ApiErrorHandler,
  ApiSuccessHandler,
} from './api.types';

// Export constants
export { ApiStatusCode, ApiContentType, ApiResponseFormat } from './api.types';

// Export utility functions and classes
export {
  isApiErrorResponse,
  isApiSuccessResponse,
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  ApiResponseWrapper,
  ApiRequestBuilder,
} from './api.types';
