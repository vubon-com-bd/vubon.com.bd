import { SuccessResponse, ErrorResponse } from './base-response.types';

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

export interface ApiResponseMeta {
  requestId: string;
  duration: number;
  timestamp: Date;
}
