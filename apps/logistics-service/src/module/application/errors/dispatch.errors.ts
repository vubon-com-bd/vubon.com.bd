/**
 * Dispatch application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class DispatchNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.DISPATCH_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly dispatchId: string) {
    super(`Dispatch "${dispatchId}" not found`, { dispatchId });
    this.name = 'DispatchNotFoundApplicationError';
  }
}

export class DispatchAlreadyStartedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.DISPATCH_ALREADY_STARTED;
  readonly httpStatus = 409;
  constructor(public readonly dispatchId: string) {
    super(`Dispatch "${dispatchId}" has already started`, { dispatchId });
    this.name = 'DispatchAlreadyStartedApplicationError';
  }
}

export class DispatchOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly dispatchId?: string) {
    super(`Dispatch ${operation} failed: ${reason}`, { operation, dispatchId });
    this.name = 'DispatchOperationFailedApplicationError';
  }
}
