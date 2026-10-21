/**
 * HTTP Error Translator — maps ApplicationError → HTTP response
 * @module payment-service/interfaces/errors
 *
 * Centralized error shape used by exception filters and by controllers
 * when returning structured errors. Never thrown — only used to build
 * error response bodies.
 */
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { AuthorizationError } from '@vubon/shared-kernel/application/errors/authorization.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';

export interface HttpErrorDetail {
  readonly field: string;
  readonly message: string;
}

export interface HttpErrorResponse {
  readonly statusCode: number;
  readonly code: string;
  readonly message: string;
  readonly field?: string;
  readonly details?: readonly HttpErrorDetail[];
  readonly timestamp: string;
  readonly path?: string;
}

export class HttpErrorTranslator {
  /**
   * Convert any error into a normalized HTTP response body.
   */
  static toHttp(err: unknown, path?: string): HttpErrorResponse {
    const timestamp = new Date().toISOString();

    // ─── Application validation (422) ───
    if (err instanceof ApplicationValidationError) {
      return {
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        code: typeof err.code === 'string' ? err.code : ERROR_CODE.VAL_REQUIRED,
        message: err.message,
        field: err.field,
        details: err.details,
        timestamp,
        path,
      };
    }

    // ─── Not found (404) ───
    if (err instanceof ApplicationNotFoundError) {
      return {
        statusCode: HTTP_STATUS.NOT_FOUND,
        code: typeof err.code === 'string' ? err.code : ERROR_CODE.USER_NOT_FOUND,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── Authorization (403) ───
    if (err instanceof AuthorizationError) {
      return {
        statusCode: HTTP_STATUS.FORBIDDEN,
        code: typeof err.code === 'string' ? err.code : ERROR_CODE.AUTH_FORBIDDEN,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── Conflict (409) ───
    if (err instanceof ConflictError) {
      return {
        statusCode: HTTP_STATUS.CONFLICT,
        code: typeof err.code === 'string' ? err.code : ERROR_CODE.VAL_DUPLICATE,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── Generic ApplicationError ───
    if (err instanceof ApplicationError) {
      return {
        statusCode: err.httpStatus,
        code: typeof err.code === 'string' ? err.code : ERROR_CODE.SERVER_INTERNAL,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── Fallback: unknown error → 500 ───
    const message = err instanceof Error ? err.message : 'Internal server error';
    return {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      code: ERROR_CODE.SERVER_INTERNAL,
      message,
      timestamp,
      path,
    };
  }
}
