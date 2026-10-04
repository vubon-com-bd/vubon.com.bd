/**
 * Settings Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class SettingsUpdateFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(userId: string, reason: string) {
    super(`Settings update failed for "${userId}": ${reason}`, { userId, reason });
    this.name = 'SettingsUpdateFailedError';
  }
}

export class SettingsNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(userId: string) {
    super(`Settings for user "${userId}" not found`, { userId });
    this.name = 'SettingsNotFoundApplicationError';
  }
}
