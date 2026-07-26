/**
 * Common API response types
 * Generic types for consistent API responses
 */

/**
 * Standard API response wrapper
 * @template T - Type of the data payload
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  timestamp: Date;
}

/**
 * Error response for API failures
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

/**
 * Paginated response wrapper
 * @template T - Type of items in the data array
 */
export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  message: string;
  timestamp: Date;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Empty response for operations that return no data
 */
export interface EmptyResponse {
  success: true;
  message: string;
  timestamp: Date;
}

/**
 * Registration response type alias
 */
export type RegisterResponse = ApiResponse<{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
}>;

/**
 * Type guard to check if response is successful
 */
export function isSuccessResponse<T>(
  response: ApiResponse<T> | ApiErrorResponse,
): response is ApiResponse<T> {
  return response.success === true;
}
