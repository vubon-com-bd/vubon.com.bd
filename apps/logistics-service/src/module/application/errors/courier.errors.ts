import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class CourierOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Courier operation failed: ${reason}`, { reason });
  }
}

export class CourierIntegrationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_UNAVAILABLE;
  readonly httpStatus = 503;

  constructor(courierId: string, reason: string) {
    super(`Courier integration failed: ${reason}`, { courierId, reason });
  }
}

export class CourierRateCalculationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Courier rate calculation failed: ${reason}`, { reason });
  }
}
