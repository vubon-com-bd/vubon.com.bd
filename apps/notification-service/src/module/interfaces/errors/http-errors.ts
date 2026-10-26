/**
 * HTTP Error Translator — ApplicationError → HTTP response
 * @module notification-service/interfaces/errors
 *
 * Used by global exception filter chain — never thrown directly.
 * Maps notification-specific errors to appropriate HTTP status codes.
 */
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  ApplicationError,
  ApplicationNotFoundError,
  ApplicationValidationError,
  AuthorizationError,
  CommandError,
  QueryError,
  SagaError,
} from '@vubon/shared-kernel/application/errors';

export interface HttpErrorResponse {
  readonly statusCode: number;
  readonly code: string;
  readonly message: string;
  readonly field?: string;
  readonly details?: readonly { readonly field: string; readonly message: string }[];
  readonly context?: Readonly<Record<string, unknown>>;
  readonly timestamp: string;
  readonly path?: string;
}

export class HttpErrorTranslator {
  static toHttp(err: unknown, path?: string): HttpErrorResponse {
    const timestamp = new Date().toISOString();

    // ─── Validation (422) ───
    if (err instanceof ApplicationValidationError) {
      return {
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        code: err.code,
        message: err.message,
        field: err.field,
        details: err.details,
        timestamp,
        path,
      };
    }

    // ─── Not Found (404) ───
    if (err instanceof ApplicationNotFoundError) {
      return {
        statusCode: HTTP_STATUS.NOT_FOUND,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── Authorization (403) ───
    if (err instanceof AuthorizationError) {
      return {
        statusCode: err.httpStatus,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── Saga errors (500) ───
    if (err instanceof SagaError) {
      return {
        statusCode: err.httpStatus,
        code: err.code,
        message: err.message,
        context: err.context,
        timestamp,
        path,
      };
    }

    // ─── Command errors (400) ───
    if (err instanceof CommandError) {
      return {
        statusCode: err.httpStatus,
        code: err.code,
        message: err.message,
        context: err.context,
        timestamp,
        path,
      };
    }

    // ─── Query errors (400) ───
    if (err instanceof QueryError) {
      return {
        statusCode: err.httpStatus,
        code: err.code,
        message: err.message,
        context: err.context,
        timestamp,
        path,
      };
    }

    // ─── Any ApplicationError (base) ───
    if (err instanceof ApplicationError) {
      return {
        statusCode: err.httpStatus,
        code: err.code,
        message: err.message,
        context: err.context,
        timestamp,
        path,
      };
    }

    // ─── Domain errors (with httpStatus + code) ───
    if (isDomainErrorLike(err)) {
      return {
        statusCode: err.httpStatus,
        code: err.code ?? ERROR_CODE.SERVER_INTERNAL,
        message: err.message,
        context: err.context,
        timestamp,
        path,
      };
    }

    // ─── Fallback (500) ───
    return {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      code: ERROR_CODE.SERVER_INTERNAL,
      message: err instanceof Error ? err.message : 'Internal server error',
      timestamp,
      path,
    };
  }
}

interface DomainErrorShape {
  readonly httpStatus: number;
  readonly code?: string;
  readonly message: string;
  readonly context?: Readonly<Record<string, unknown>>;
}

function isDomainErrorLike(value: unknown): value is DomainErrorShape {
  return (
    typeof value === 'object' &&
    value !== null &&
    'httpStatus' in value &&
    typeof (value as { httpStatus: unknown }).httpStatus === 'number' &&
    'message' in value &&
    typeof (value as { message: unknown }).message === 'string'
  );
}
