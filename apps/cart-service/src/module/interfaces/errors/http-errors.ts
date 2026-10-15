/**
 * HTTP Error Translator — maps ApplicationError → HTTP response
 * @module cart-service/interfaces/errors
 *
 * Used by global exception filter chain — never thrown directly.
 */
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { AuthorizationError } from '@vubon/shared-kernel/application/errors/authorization.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

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

    // ─── ApplicationValidationError (422) ───
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

    // ─── ApplicationNotFoundError (404) ───
    if (err instanceof ApplicationNotFoundError) {
      return {
        statusCode: HTTP_STATUS.NOT_FOUND,
        code: ERROR_CODE.USER_NOT_FOUND,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── AuthorizationError (403) ───
    if (err instanceof AuthorizationError) {
      return {
        statusCode: HTTP_STATUS.FORBIDDEN,
        code: ERROR_CODE.AUTH_FORBIDDEN,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── ConflictError (409) ───
    if (err instanceof ConflictError) {
      return {
        statusCode: HTTP_STATUS.CONFLICT,
        code: err.code ?? ERROR_CODE.VAL_DUPLICATE,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── BusinessRuleError (400) ───
    if (err instanceof BusinessRuleError) {
      return {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        code: err.code ?? ERROR_CODE.SERVER_INTERNAL,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── Domain ValidationError (422) ───
    if (err instanceof ValidationError) {
      return {
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        code: err.code ?? ERROR_CODE.VAL_REQUIRED,
        message: err.message,
        field: err.field,
        timestamp,
        path,
      };
    }

    // ─── ApplicationError (any httpStatus) ───
    if (err instanceof ApplicationError) {
      return {
        statusCode: err.httpStatus,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── Fallback (500) ───
    return {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      code: ERROR_CODE.SERVER_INTERNAL,
      message: 'Internal server error',
      timestamp,
      path,
    };
  }
}
