/**
 * Auth Application Errors
 * @module auth-service/application/errors
 *
 * Layer-level errors — thrown by application services and command handlers
 * when an auth operation fails. Domain errors get translated to these.
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class InvalidCredentialsError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_CREDENTIALS;
  readonly httpStatus = 401;

  constructor(context?: Readonly<Record<string, unknown>>) {
    super('Invalid email or password', context);
  }
}

export class UnauthorizedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_UNAUTHORIZED;
  readonly httpStatus = 401;

  constructor(reason = 'Authentication required') {
    super(reason);
  }
}

export class ForbiddenError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(reason = 'Access denied') {
    super(reason);
  }
}

export class AccountLockedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_ACCOUNT_LOCKED;
  readonly httpStatus = 423;

  constructor(userId: string, until?: string) {
    super(
      until
        ? `Account is locked until ${until}`
        : 'Account is locked',
      { userId, until },
    );
  }
}

export class TooManyAttemptsAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_TOO_MANY_ATTEMPTS;
  readonly httpStatus = 429;

  constructor(attempts: number, context?: Readonly<Record<string, unknown>>) {
    super(`Too many failed attempts (${attempts})`, context);
  }
}

export class PasswordMismatchAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_PASSWORD_MISMATCH;
  readonly httpStatus = 400;

  constructor() {
    super('Password confirmation does not match');
  }
}

export class WeakPasswordAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_WEAK_PASSWORD;
  readonly httpStatus = 400;

  constructor(missing: readonly string[]) {
    super(`Password too weak. Missing: ${missing.join(', ')}`, { missing });
  }
}
