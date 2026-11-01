import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ActivityOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(op: string, reason: string) {
    super(`Activity ${op} failed: ${reason}`, { op, reason });
    this.name = 'ActivityOperationFailedError';
  }
}
