/**
 * HTTP Error Translator — maps ApplicationError/DomainError → HTTP response
 * @module identity-service/interfaces/errors
 *
 * Used by global exception filter chain — never thrown directly.
 */
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  DomainError,
} from '@vubon/shared-kernel/domain/errors/domain.error';
import {
  ValidationError,
} from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  NotFoundError,
} from '@vubon/shared-kernel/domain/errors/not-found.error';
import {
  ConflictError,
} from '@vubon/shared-kernel/domain/errors/conflict.error';
import {
  BusinessRuleError,
} from '@vubon/shared-kernel/domain/errors/business-rule.error';
import {
  InvariantViolationError,
} from '@vubon/shared-kernel/domain/errors/invariant.error';
import {
  ApplicationError,
} from '@vubon/shared-kernel/application/errors/application.error';
import {
  ApplicationValidationError,
} from '@vubon/shared-kernel/application/errors/validation.error';
import {
  ApplicationNotFoundError,
} from '@vubon/shared-kernel/application/errors/not-found.error';
import {
  AuthorizationError,
  UnauthorizedError,
} from '@vubon/shared-kernel/application/errors/authorization.error';

// ─── Response Shape ────────────────────────
export interface HttpErrorResponse {
  readonly success: false;
  readonly statusCode: number;
  readonly code: string;
  readonly message: string;
  readonly field?: string;
  readonly details?: readonly {
    readonly field: string;
    readonly message: string;
  }[];
  readonly timestamp: string;
  readonly path?: string;
}

// ─── Translator ────────────────────────────
export class HttpErrorTranslator {
  /**
   * Convert any thrown error → HTTP-shaped response DTO.
   */
  static toResponse(
    err: unknown,
    path?: string,
  ): HttpErrorResponse {
    const timestamp = new Date().toISOString();

    // ─── Application Layer ─────────────────
    if (err instanceof ApplicationValidationError) {
      return {
        success: false,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        code: err.code,
        message: err.message,
        field: err.field,
        details: err.details,
        timestamp,
        path,
      };
    }

    if (err instanceof ApplicationNotFoundError) {
      return {
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    if (err instanceof AuthorizationError) {
      return {
        success: false,
        statusCode: HttpStatus.FORBIDDEN,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    if (err instanceof UnauthorizedError) {
      return {
        success: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    if (err instanceof ApplicationError) {
      return {
        success: false,
        statusCode: err.httpStatus,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── Domain Layer ──────────────────────
    if (err instanceof ValidationError) {
      return {
        success: false,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        code: err.code,
        message: err.message,
        field: err.field,
        timestamp,
        path,
      };
    }

    if (err instanceof NotFoundError) {
      return {
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    if (err instanceof ConflictError) {
      return {
        success: false,
        statusCode: HttpStatus.CONFLICT,
        code: err.code,
        message: err.message,
        field: err.conflictingField,
        timestamp,
        path,
      };
    }

    if (err instanceof BusinessRuleError) {
      // Auth-specific errors → 401 Unauthorized
      const name = err.name || '';
      const code = String((err as unknown as { code?: string }).code ?? '');
      const rule = String((err as unknown as { rule?: string }).rule ?? '');
      const isAuthError =
        name.includes('InvalidCredential') ||
        name.includes('AuthLocked') ||
        name.includes('AuthExpired') ||
        name.includes('Unverified') ||
        code.includes('AUTH_') ||
        rule.includes('AUTH_');
      return {
        success: false,
        statusCode: isAuthError ? HttpStatus.UNAUTHORIZED : HttpStatus.BAD_REQUEST,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    if (err instanceof InvariantViolationError) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    if (err instanceof DomainError) {
      return {
        success: false,
        statusCode: err.httpStatus,
        code: err.code,
        message: err.message,
        timestamp,
        path,
      };
    }

    // ─── NestJS HttpException ──────────────
    if (err instanceof HttpException) {
      const status = err.getStatus();
      const response = err.getResponse();
      const message =
        typeof response === 'string'
          ? response
          : ((response as { message?: string | string[] }).message ??
             'Http exception');

      return {
        success: false,
        statusCode: status,
        code: `HTTP_${status}`,
        message: Array.isArray(message) ? message.join(', ') : String(message),
        timestamp,
        path,
      };
    }

    // ─── Unknown ───────────────────────────
    return {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'SERVER_INTERNAL',
      message: 'Internal server error',
      timestamp,
      path,
    };
  }

  /**
   * Convert to HttpException (for direct throw).
   */
  static toException(err: unknown, path?: string): HttpException {
    const response = this.toResponse(err, path);
    return new HttpException(response, response.statusCode);
  }

  /**
   * Check if error is safe to expose to client.
   */
  static isSafeToExpose(err: unknown): boolean {
    return (
      err instanceof DomainError ||
      err instanceof ApplicationError ||
      err instanceof HttpException
    );
  }
}
