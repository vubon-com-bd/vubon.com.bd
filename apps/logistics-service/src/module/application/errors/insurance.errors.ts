import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class InsuranceOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Insurance operation failed: ${reason}`, { reason });
  }
}

export class InsuranceCalculationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Insurance calculation failed: ${reason}`, { reason });
  }
}

export class InsuranceClaimProcessingFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(insuranceId: string, reason: string) {
    super(`Insurance claim failed: ${reason}`, { insuranceId, reason });
  }
}
