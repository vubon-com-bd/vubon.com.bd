/**
 * Application Error Types
 * @module shared-types/common/errors
 */

import type { ErrorCode } from './base-error.types';

export interface ApplicationError {
  readonly name: 'ApplicationError';
  readonly code: ErrorCode | string;
  readonly message: string;
  readonly statusCode: number;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface UnauthorizedError extends ApplicationError {
  readonly statusCode: 401;
}

export interface ForbiddenError extends ApplicationError {
  readonly statusCode: 403;
  readonly requiredPermission?: string;
}

export interface NotFoundError extends ApplicationError {
  readonly statusCode: 404;
  readonly resource: string;
}

export interface ConflictError extends ApplicationError {
  readonly statusCode: 409;
}

export interface RateLimitError extends ApplicationError {
  readonly statusCode: 429;
  readonly retryAfter: number;
}
