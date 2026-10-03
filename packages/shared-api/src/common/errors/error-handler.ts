import { ApiError } from './api-error';
import { ErrorFactory } from './error-factory';

/**
 * Normalize ANY thrown value into an ApiError.
 * Every public API method should wrap its body with this.
 */
export function normalizeError(cause: unknown): ApiError {
  return ErrorFactory.fromUnknown(cause);
}

/**
 * Re-throw helper — ensures the thrown value is always an ApiError.
 */
export function rethrowAsApiError(cause: unknown): never {
  throw normalizeError(cause);
}

/**
 * Type guard.
 */
export function isApiError(value: unknown): value is ApiError {
  return value instanceof ApiError;
}
