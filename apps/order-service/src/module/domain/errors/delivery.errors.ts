import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class DeliveryNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(deliveryId: string) {
    super(`Delivery not found: ${deliveryId}`, { deliveryId });
  }
}

export class DeliveryNotAvailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(region: string) {
    super(`Delivery not available in region: ${region}`, { region });
  }
}

export class InvalidDeliveryAddressError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Invalid delivery address: ${reason}`, { reason });
  }
}
