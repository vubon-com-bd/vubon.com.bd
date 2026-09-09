import { SuccessResponse, ErrorResponse } from './base-response.types';

/**
 * API response type
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

/**
 * API response metadata interface
 */
export interface ApiResponseMeta {
  requestId: string;
  duration: number;
  timestamp: Date;
}
