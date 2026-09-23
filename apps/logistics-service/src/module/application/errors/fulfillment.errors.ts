import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class FulfillmentOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Fulfillment operation failed: ${reason}`, { reason });
  }
}

export class PickingFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(fulfillmentId: string, reason: string) {
    super(`Picking failed: ${reason}`, { fulfillmentId, reason });
  }
}

export class PackingFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(fulfillmentId: string, reason: string) {
    super(`Packing failed: ${reason}`, { fulfillmentId, reason });
  }
}
