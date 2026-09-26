import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class DeliveryFailedApplicationError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Delivery failed: ${reason}`, { reason });
  }
}

export class RetryExhaustedApplicationError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_UNAVAILABLE;
  readonly httpStatus = 503;

  constructor(attempts: number) {
    super(`Retry exhausted after ${attempts} attempts`, { attempts });
  }
}
