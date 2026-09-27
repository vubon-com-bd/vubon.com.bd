/**
 * User Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class UserCreationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(reason: string) {
    super(`User creation failed: ${reason}`, { reason });
    this.name = 'UserCreationFailedError';
  }
}

export class UserUpdateFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(userId: string, reason: string) {
    super(`User update failed for "${userId}": ${reason}`, { userId, reason });
    this.name = 'UserUpdateFailedError';
  }
}

export class UserDeletionFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(userId: string, reason: string) {
    super(`User deletion failed for "${userId}": ${reason}`, { userId, reason });
    this.name = 'UserDeletionFailedError';
  }
}

export class UserNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(userId: string) {
    super(`User "${userId}" not found`, { userId });
    this.name = 'UserNotFoundApplicationError';
  }
}

export class UserAlreadyExistsApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.USER_ALREADY_EXISTS;
  readonly httpStatus = 409;
  constructor(email: string) {
    super(`User already exists with email "${email}"`, { email });
    this.name = 'UserAlreadyExistsApplicationError';
  }
}
