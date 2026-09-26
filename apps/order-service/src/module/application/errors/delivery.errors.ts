import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class DeliveryOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Delivery operation failed: ${reason}`, { reason });
  }
}

export class DeliveryNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(deliveryId: string) {
    super(`Delivery not found: ${deliveryId}`, { deliveryId });
  }
}
