/**
 * HTTP Error Translator
 * @module logistics-service/interfaces/errors
 *
 * Maps ApplicationError/DomainError → HTTP response shape.
 * NEVER thrown — used by global filters + controller try/catch.
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { AuthorizationError } from '@vubon/shared-kernel/application/errors/authorization.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';

export interface HttpErrorResponse {
  readonly statusCode: number;
  readonly code: string;
  readonly message: string;
  readonly field?: string;
  readonly details?: readonly { readonly field: string; readonly message: string }[];
  readonly timestamp: string;
  readonly path?: string;
}

// ⚠️ Local constants — do NOT depend on shared HTTP_STATUS value existence
const HTTP_STATUS_LOCAL = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  REQUEST_TIMEOUT: 408,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export class HttpErrorTranslator {
  static toHttp(err: unknown, path?: string): HttpErrorResponse {
    const timestamp = new Date().toISOString();

    if (err instanceof ApplicationValidationError) {
      return {
        statusCode: HTTP_STATUS_LOCAL.UNPROCESSABLE_ENTITY,
        code: ERROR_CODE.VAL_REQUIRED,
        message: err.message,
        field: err.field,
        details: err.details,
        timestamp,
        path,
      };
    }

    if (err instanceof ApplicationNotFoundError) {
      return {
        statusCode: HTTP_STATUS_LOCAL.NOT_FOUND,
        code: ERROR_CODE.USER_NOT_FOUND,
        message: err.message,
        timestamp,
        path,
      };
    }

    if (err instanceof AuthorizationError) {
      return {
        statusCode: HTTP_STATUS_LOCAL.FORBIDDEN,
        code: ERROR_CODE.AUTH_FORBIDDEN,
        message: err.message,
        timestamp,
        path,
      };
    }

    if (err instanceof ConflictError) {
      return {
        statusCode: HTTP_STATUS_LOCAL.CONFLICT,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    if (err instanceof ApplicationError) {
      return {
        statusCode: err.httpStatus,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    return {
      statusCode: HTTP_STATUS_LOCAL.INTERNAL_SERVER_ERROR,
      code: ERROR_CODE.SERVER_INTERNAL,
      message: 'Internal server error',
      timestamp,
      path,
    };
  }
}
