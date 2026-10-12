/**
 * ReturnShipment application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ReturnShipmentNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.RETURN_SHIPMENT_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly returnId: string) {
    super(`Return shipment "${returnId}" not found`, { returnId });
    this.name = 'ReturnShipmentNotFoundApplicationError';
  }
}

export class ReturnWindowExpiredApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.RETURN_WINDOW_EXPIRED;
  readonly httpStatus = 409;
  constructor(public readonly orderId: string, public readonly maxDays: number) {
    super(`Return window for order "${orderId}" expired (max ${maxDays} days)`, { orderId, maxDays });
    this.name = 'ReturnWindowExpiredApplicationError';
  }
}

export class ReturnShipmentOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly returnId?: string) {
    super(`ReturnShipment ${operation} failed: ${reason}`, { operation, returnId });
    this.name = 'ReturnShipmentOperationFailedApplicationError';
  }
}
