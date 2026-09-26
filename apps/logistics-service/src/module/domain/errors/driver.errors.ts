import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class DriverNotAvailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.DRIVER_NOT_AVAILABLE;
  readonly httpStatus = 409;

  constructor(driverId: string) {
    super(`Driver not available: ${driverId}`, { driverId });
  }
}

export class DriverNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.DRIVER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(driverId: string) {
    super(`Driver not found: ${driverId}`, { driverId });
  }
}
