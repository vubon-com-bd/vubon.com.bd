import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class DriverOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Driver operation failed: ${reason}`, { reason });
  }
}

export class DriverRegistrationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(license: string) {
    super(`Driver registration failed: license ${license} exists`, { license });
  }
}
