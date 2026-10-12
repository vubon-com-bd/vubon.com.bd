/**
 * ShippingMethod application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ShippingMethodNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SHIPPING_RATE_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly methodId: string) {
    super(`Shipping method "${methodId}" not found`, { methodId });
    this.name = 'ShippingMethodNotFoundApplicationError';
  }
}

export class ShippingMethodNotActiveApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 409;
  constructor(public readonly methodId: string, public readonly status: string) {
    super(`Shipping method "${methodId}" not active (status: ${status})`, { methodId, status });
    this.name = 'ShippingMethodNotActiveApplicationError';
  }
}

export class ShippingMethodOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly methodId?: string) {
    super(`ShippingMethod ${operation} failed: ${reason}`, { operation, methodId });
    this.name = 'ShippingMethodOperationFailedApplicationError';
  }
}
