/**
 * Profile Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ProfileNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(userId: string) {
    super(`Profile for user "${userId}" not found`, { userId });
    this.name = 'ProfileNotFoundApplicationError';
  }
}

export class ProfileUpdateFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(userId: string, reason: string) {
    super(`Profile update failed for "${userId}": ${reason}`, { userId, reason });
    this.name = 'ProfileUpdateFailedError';
  }
}
