/**
 * HTTP Error Translator — maps ApplicationError → HTTP response
 * @module vendor-service/interfaces/errors
 *
 * Used by global exception filter chain — never thrown directly.
 */
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
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

export class HttpErrorTranslator {
  static toHttp(err: unknown, path?: string): HttpErrorResponse {
    const timestamp = new Date().toISOString();

    if (err instanceof ApplicationValidationError) {
      return {
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
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
        statusCode: HTTP_STATUS.NOT_FOUND,
        code: ERROR_CODE.USER_NOT_FOUND,
        message: err.message,
        timestamp,
        path,
      };
    }

    if (err instanceof ConflictError) {
      return {
        statusCode: HTTP_STATUS.CONFLICT,
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
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      code: ERROR_CODE.SERVER_INTERNAL,
      message: 'Internal server error',
      timestamp,
      path,
    };
  }
}
