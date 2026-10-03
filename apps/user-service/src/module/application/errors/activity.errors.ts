/**
 * Activity Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ActivityNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 404;
  constructor(activityId: string) {
    super(`Activity "${activityId}" not found`, { activityId });
    this.name = 'ActivityNotFoundApplicationError';
  }
}

export class ActivityRecordFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(reason: string) {
    super(`Activity record failed: ${reason}`, { reason });
    this.name = 'ActivityRecordFailedError';
  }
}
