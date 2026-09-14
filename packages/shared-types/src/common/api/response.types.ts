/**
 * Base Response Types
 * @module shared-types/common/api
 */

import type { ApiError } from './error.types';

export interface BaseResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: ApiError;
  readonly timestamp: string;
  readonly requestId?: string;
}

export interface SuccessResponse<T> extends BaseResponse<T> {
  readonly success: true;
  readonly data: T;
  readonly error?: never;
}

export interface ErrorResponse extends BaseResponse<never> {
  readonly success: false;
  readonly data?: never;
  readonly error: ApiError;
}

export interface MessageResponse {
  readonly success: boolean;
  readonly message: string;
  readonly timestamp: string;
}

export interface CreatedResponse<T> extends SuccessResponse<T> {
  readonly status: 201;
  readonly location?: string;
}
