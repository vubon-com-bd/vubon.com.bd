/**
 * Delivery Application Errors
 * @module notification-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import {
  ApplicationError,
  ApplicationNotFoundError,
  CommandError,
  QueryError,
} from '@vubon/shared-kernel/application/errors';

export class DeliveryNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(deliveryId: string) {
    super('Delivery', deliveryId);
    this.name = 'DeliveryNotFoundApplicationError';
  }
}

export class DeliverySendError extends CommandError {
  constructor(reason: string) {
    super(`Delivery send failed: ${reason}`, 'SendDelivery');
    this.name = 'DeliverySendError';
  }
}

export class DeliveryRetryError extends CommandError {
  constructor(deliveryId: string, reason: string) {
    super(`Delivery "${deliveryId}" retry failed: ${reason}`, 'RetryDelivery');
    this.name = 'DeliveryRetryError';
  }
}

export class DeliveryMaxRetriesExceededApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;

  constructor(deliveryId: string, maxRetries: number) {
    super(
      `Delivery "${deliveryId}" exceeded max retries (${maxRetries})`,
      { deliveryId, maxRetries },
    );
    this.name = 'DeliveryMaxRetriesExceededApplicationError';
  }
}

export class DeliveryQueryError extends QueryError {
  constructor(reason: string) {
    super(`Delivery query failed: ${reason}`, 'DeliveryQuery');
    this.name = 'DeliveryQueryError';
  }
}
