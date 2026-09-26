import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ShipmentNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SHIPMENT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(shipmentId: string) {
    super(`Shipment not found: ${shipmentId}`, { shipmentId });
  }
}

export class ShipmentCannotBeCancelledError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SHIPMENT_CANNOT_BE_CANCELLED;
  readonly httpStatus = 409;

  constructor(shipmentId: string) {
    super(`Shipment cannot be cancelled: ${shipmentId}`, { shipmentId });
  }
}

export class InvalidShipmentNumberError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.INVALID_SHIPMENT_NUMBER;
  readonly httpStatus = 400;

  constructor(shipmentNumber: string) {
    super(`Invalid shipment number: ${shipmentNumber}`, { shipmentNumber });
  }
}
