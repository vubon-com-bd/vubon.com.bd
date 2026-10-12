/**
 * Delivery application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class DeliveryNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.DELIVERY_FAILED;
  readonly httpStatus = 404;
  constructor(public readonly deliveryId: string) {
    super(`Delivery "${deliveryId}" not found`, { deliveryId });
    this.name = 'DeliveryNotFoundApplicationError';
  }
}

export class DeliveryOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.DELIVERY_FAILED;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly deliveryId?: string) {
    super(`Delivery ${operation} failed: ${reason}`, { operation, deliveryId });
    this.name = 'DeliveryOperationFailedApplicationError';
  }
}

export class DeliveryAttemptLimitExceededApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.DELIVERY_ATTEMPT_EXCEEDED;
  readonly httpStatus = 409;
  constructor(public readonly deliveryId: string, public readonly attempts: number) {
    super(`Delivery "${deliveryId}" exceeded max attempts (${attempts})`, { deliveryId, attempts });
    this.name = 'DeliveryAttemptLimitExceededApplicationError';
  }
}
