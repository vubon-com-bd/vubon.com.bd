import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class UserNotFoundError extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(userId?: string) {
    super(`User not found${userId ? `: ${userId}` : ''}`, { userId });
    this.name = 'UserNotFoundError';
  }
}

export class UserOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(operation: string, reason: string) {
    super(`User ${operation} failed: ${reason}`, { operation, reason });
    this.name = 'UserOperationFailedError';
  }
}
