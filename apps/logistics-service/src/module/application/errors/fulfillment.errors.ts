/**
 * Fulfillment application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class FulfillmentNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.FULFILLMENT_FAILED;
  readonly httpStatus = 404;
  constructor(public readonly fulfillmentId: string) {
    super(`Fulfillment "${fulfillmentId}" not found`, { fulfillmentId });
    this.name = 'FulfillmentNotFoundApplicationError';
  }
}

export class FulfillmentOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.FULFILLMENT_FAILED;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly fulfillmentId?: string) {
    super(`Fulfillment ${operation} failed: ${reason}`, { operation, fulfillmentId });
    this.name = 'FulfillmentOperationFailedApplicationError';
  }
}
