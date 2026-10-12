/**
 * Courier application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class CourierNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.COURIER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly courierId: string) {
    super(`Courier "${courierId}" not found`, { courierId });
    this.name = 'CourierNotFoundApplicationError';
  }
}

export class CourierOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly courierId?: string) {
    super(`Courier ${operation} failed: ${reason}`, { operation, courierId });
    this.name = 'CourierOperationFailedApplicationError';
  }
}

export class CourierUnavailableApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.COURIER_UNAVAILABLE;
  readonly httpStatus = 409;
  constructor(public readonly courierId: string, reason: string) {
    super(`Courier "${courierId}" unavailable: ${reason}`, { courierId, reason });
    this.name = 'CourierUnavailableApplicationError';
  }
}
