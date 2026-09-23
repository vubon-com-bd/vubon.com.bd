import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ShipmentOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Shipment operation failed: ${reason}`, { reason });
  }
}

export class ShipmentAlreadyExistsError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(shipmentNumber: string) {
    super(`Shipment already exists: ${shipmentNumber}`, { shipmentNumber });
  }
}

export class ShipmentCreateFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Shipment creation failed: ${reason}`, { reason });
  }
}
