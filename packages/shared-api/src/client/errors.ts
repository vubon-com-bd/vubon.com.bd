/**
 * API Error classes.
 * @module shared-api/client/errors
 */

import { ERROR_CODE } from '@vubon/shared-constants/src/common/error-code.constants';
import { HTTP_STATUS } from '@vubon/shared-constants/src/common/http-status.constants';
import type { ErrorCode } from '@vubon/shared-types';

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: ErrorCode | string,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

export const isNetworkError = (error: unknown): error is NetworkError =>
  error instanceof NetworkError;

export const isTimeoutError = (error: unknown): error is TimeoutError =>
  error instanceof TimeoutError;

/** Maps an HTTP status to an application error code. */
export const statusToErrorCode = (status: number): ErrorCode | string => {
  switch (status) {
    case HTTP_STATUS.UNAUTHORIZED:
      return ERROR_CODE.UNAUTHORIZED;
    case HTTP_STATUS.FORBIDDEN:
      return ERROR_CODE.FORBIDDEN;
    case HTTP_STATUS.NOT_FOUND:
      return ERROR_CODE.NOT_FOUND;
    case HTTP_STATUS.BAD_REQUEST:
      return ERROR_CODE.BAD_REQUEST;
    case HTTP_STATUS.TOO_MANY_REQUESTS:
      return ERROR_CODE.RATE_LIMIT_EXCEEDED;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return ERROR_CODE.INTERNAL_SERVER_ERROR;
    default:
      return ERROR_CODE.UNKNOWN_ERROR;
  }
};
