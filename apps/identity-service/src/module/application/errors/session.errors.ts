import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class SessionOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(operation: string, reason: string) {
    super(`Session ${operation} failed: ${reason}`, { operation, reason });
    this.name = 'SessionOperationFailedError';
  }
}
