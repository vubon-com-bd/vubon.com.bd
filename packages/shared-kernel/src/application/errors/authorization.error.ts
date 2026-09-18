/**
 * Authorization Error
 * @module shared-kernel/application/errors
 *
 * Values আসে shared-constants/common/error.constants থেকে (value)।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from './application.error';

export class AuthorizationError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(
    message: string,
    public readonly requiredPermission?: string,
    public readonly userId?: string
  ) {
    super(message, { requiredPermission, userId });
    this.name = 'AuthorizationError';
  }
}

export class UnauthorizedError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_UNAUTHORIZED;
  readonly httpStatus = 401;

  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
