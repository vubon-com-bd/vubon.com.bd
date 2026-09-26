import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class RouteOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Route operation failed: ${reason}`, { reason });
  }
}

export class RouteOptimizationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_UNAVAILABLE;
  readonly httpStatus = 503;

  constructor(reason: string) {
    super(`Route optimization failed: ${reason}`, { reason });
  }
}
