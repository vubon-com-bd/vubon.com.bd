import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ReturnOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Return operation failed: ${reason}`, { reason });
  }
}

export class ReturnNotEligibleError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(shipmentId: string, reason: string) {
    super(`Return not eligible: ${reason}`, { shipmentId, reason });
  }
}
