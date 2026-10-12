/**
 * Driver application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class DriverNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.DRIVER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly driverId: string) {
    super(`Driver "${driverId}" not found`, { driverId });
    this.name = 'DriverNotFoundApplicationError';
  }
}

export class DriverNotAvailableApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.DRIVER_NOT_AVAILABLE;
  readonly httpStatus = 409;
  constructor(public readonly driverId: string, reason: string) {
    super(`Driver "${driverId}" not available: ${reason}`, { driverId, reason });
    this.name = 'DriverNotAvailableApplicationError';
  }
}

export class DriverOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly driverId?: string) {
    super(`Driver ${operation} failed: ${reason}`, { operation, driverId });
    this.name = 'DriverOperationFailedApplicationError';
  }
}
