/**
 * Base response interface
 */
export interface BaseResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  code?: string;
  timestamp: Date;
}

/**
 * Success response interface
 */
export interface SuccessResponse<T> extends BaseResponse<T> {
  success: true;
  data: T;
}

/**
 * Error response interface
 */
export interface ErrorResponse extends BaseResponse<never> {
  success: false;
  error: string;
  details?: unknown;
}
