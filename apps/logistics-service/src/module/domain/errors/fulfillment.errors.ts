import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class FulfillmentFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.FULFILLMENT_FAILED;
  readonly httpStatus = 500;

  constructor(fulfillmentId: string, reason: string) {
    super(`Fulfillment failed: ${reason}`, { fulfillmentId, reason });
  }
}

export class ItemNotAvailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ITEM_NOT_AVAILABLE;
  readonly httpStatus = 404;

  constructor(productId: string) {
    super(`Item not available: ${productId}`, { productId });
  }
}
