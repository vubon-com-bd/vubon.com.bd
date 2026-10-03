/**
 * API Error Types
 * @module shared-types/common/api
 */

export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly statusCode: number;
  readonly details?: readonly ErrorDetail[];
  readonly field?: string;
  readonly path?: string;
  readonly timestamp?: string;
  readonly requestId?: string;
}

export interface ErrorDetail {
  readonly field?: string;
  readonly message: string;
  readonly code?: string;
  readonly value?: unknown;
}

export interface ValidationErrorResponse extends ApiError {
  readonly details: readonly ErrorDetail[];
}
