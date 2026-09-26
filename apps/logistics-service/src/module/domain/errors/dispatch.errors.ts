import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class DispatchAlreadyStartedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.DISPATCH_ALREADY_STARTED;
  readonly httpStatus = 409;

  constructor(dispatchId: string) {
    super(`Dispatch already started: ${dispatchId}`, { dispatchId });
  }
}

export class DispatchNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.DISPATCH_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(dispatchId: string) {
    super(`Dispatch not found: ${dispatchId}`, { dispatchId });
  }
}
