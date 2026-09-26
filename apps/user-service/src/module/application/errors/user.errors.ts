import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class UserOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`User operation failed: ${reason}`, { reason });
  }
}

export class UserValidationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(field: string, reason: string) {
    super(`Validation failed for ${field}: ${reason}`, { field, reason });
  }
}

export class UserNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`User not found: ${userId}`, { userId });
  }
}
