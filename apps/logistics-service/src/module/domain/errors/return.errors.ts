import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ReturnWindowExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.RETURN_WINDOW_EXPIRED;
  readonly httpStatus = 410;

  constructor(shipmentId: string) {
    super(`Return window expired: ${shipmentId}`, { shipmentId });
  }
}

export class ReturnShipmentNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.RETURN_SHIPMENT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(returnShipmentId: string) {
    super(`Return shipment not found: ${returnShipmentId}`, { returnShipmentId });
  }
}
