/**
 * Shipment application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ShipmentNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SHIPMENT_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly shipmentId: string) {
    super(`Shipment "${shipmentId}" not found`, { shipmentId });
    this.name = 'ShipmentNotFoundApplicationError';
  }
}

export class ShipmentTrackingNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.TRACKING_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly trackingNumber: string) {
    super(`Shipment with tracking "${trackingNumber}" not found`, { trackingNumber });
    this.name = 'ShipmentTrackingNotFoundApplicationError';
  }
}

export class ShipmentCreationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(reason: string) {
    super(`Failed to create shipment: ${reason}`);
    this.name = 'ShipmentCreationFailedApplicationError';
  }
}

export class ShipmentOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly shipmentId?: string) {
    super(`Shipment ${operation} failed: ${reason}`, { operation, shipmentId });
    this.name = 'ShipmentOperationFailedApplicationError';
  }
}

export class ShipmentCancelNotAllowedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SHIPMENT_CANNOT_BE_CANCELLED;
  readonly httpStatus = 409;
  constructor(public readonly shipmentId: string, public readonly status: string) {
    super(`Shipment "${shipmentId}" cannot be cancelled in status "${status}"`, { shipmentId, status });
    this.name = 'ShipmentCancelNotAllowedApplicationError';
  }
}

export class ShipmentDuplicatedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(public readonly trackingNumber: string) {
    super(`Shipment with tracking "${trackingNumber}" already exists`, { trackingNumber });
    this.name = 'ShipmentDuplicatedApplicationError';
  }
}
