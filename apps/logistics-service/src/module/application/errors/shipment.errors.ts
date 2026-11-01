/**
 * Shipment Application Errors
 * @module logistics-service/application/errors
 *
 * Application-layer error wrappers for shipment use cases.
 * Wraps domain errors + adds use-case context (actor, request id).
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

// ═══════════════════════════════════════
// ─── Not Found (404) ───────────────────
// ═══════════════════════════════════════
export class ShipmentNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(shipmentId: string) {
    super('Shipment', shipmentId);
    this.name = 'ShipmentNotFoundApplicationError';
  }
}

export class ShipmentByNumberNotFoundError extends ApplicationNotFoundError {
  constructor(shipmentNumber: string) {
    super('Shipment', `number:${shipmentNumber}`);
    this.name = 'ShipmentByNumberNotFoundError';
  }
}

export class ShipmentByTrackingNotFoundError extends ApplicationNotFoundError {
  constructor(trackingNumber: string) {
    super('Shipment', `tracking:${trackingNumber}`);
    this.name = 'ShipmentByTrackingNotFoundError';
  }
}

// ═══════════════════════════════════════
// ─── Validation (422) ──────────────────
// ═══════════════════════════════════════
export class CreateShipmentError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.create] ${message}`, field);
    this.name = 'CreateShipmentError';
  }
}

export class UpdateShipmentError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.update] ${message}`, field);
    this.name = 'UpdateShipmentError';
  }
}

export class CancelShipmentError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.cancel] ${message}`, field);
    this.name = 'CancelShipmentError';
  }
}

export class ConfirmShipmentError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.confirm] ${message}`, field);
    this.name = 'ConfirmShipmentError';
  }
}

export class StartProcessingError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.startProcessing] ${message}`, field);
    this.name = 'StartProcessingError';
  }
}

export class PackShipmentError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.pack] ${message}`, field);
    this.name = 'PackShipmentError';
  }
}

export class PickUpShipmentError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.pickUp] ${message}`, field);
    this.name = 'PickUpShipmentError';
  }
}

export class StartTransitError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.startTransit] ${message}`, field);
    this.name = 'StartTransitError';
  }
}

export class OutForDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.outForDelivery] ${message}`, field);
    this.name = 'OutForDeliveryError';
  }
}

export class DeliverShipmentError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.deliver] ${message}`, field);
    this.name = 'DeliverShipmentError';
  }
}

export class FailShipmentError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.fail] ${message}`, field);
    this.name = 'FailShipmentError';
  }
}

export class ReturnShipmentError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.return] ${message}`, field);
    this.name = 'ReturnShipmentError';
  }
}

export class PutOnHoldError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.putOnHold] ${message}`, field);
    this.name = 'PutOnHoldError';
  }
}

export class MarkDelayedError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.markDelayed] ${message}`, field);
    this.name = 'MarkDelayedError';
  }
}

export class ResumeFromHoldError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.resumeFromHold] ${message}`, field);
    this.name = 'ResumeFromHoldError';
  }
}

export class AssignCourierError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.assignCourier] ${message}`, field);
    this.name = 'AssignCourierError';
  }
}

export class AssignWarehouseError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Shipment.assignWarehouse] ${message}`, field);
    this.name = 'AssignWarehouseError';
  }
}

// ═══════════════════════════════════════
// ─── Conflict (409) ────────────────────
// ═══════════════════════════════════════
export class ShipmentAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.SHIPMENT_NOT_FOUND;
  readonly httpStatus = 409;

  constructor(reference: string) {
    super(`Shipment "${reference}" already exists`, { reference });
    this.name = 'ShipmentAlreadyExistsError';
  }
}

export class ShipmentStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_SHIPMENT_STATUS_TRANSITION;
  readonly httpStatus = 409;

  constructor(shipmentId: string, currentStatus: string, attemptedAction: string) {
    super(
      `Shipment "${shipmentId}" in status "${currentStatus}" cannot perform "${attemptedAction}"`,
      { shipmentId, currentStatus, attemptedAction },
    );
    this.name = 'ShipmentStateConflictError';
  }
}

// ═══════════════════════════════════════
// ─── Business Rule (400) ───────────────
// ═══════════════════════════════════════
export class ShipmentBusinessRuleError extends ApplicationError {
  readonly code = ERROR_CODE.SHIPMENT_CANNOT_BE_MODIFIED;
  readonly httpStatus = 400;

  constructor(message: string, rule: string, context?: Readonly<Record<string, unknown>>) {
    super(message, { rule, ...context });
    this.name = 'ShipmentBusinessRuleError';
  }
}

export class OrderNotFoundForShipmentError extends ApplicationError {
  readonly code = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 400;

  constructor(orderId: string) {
    super(`Order "${orderId}" not found — cannot create shipment`, { orderId });
    this.name = 'OrderNotFoundForShipmentError';
  }
}

export class CourierAssignmentRequiredError extends ApplicationError {
  readonly code = ERROR_CODE.COURIER_NOT_FOUND;
  readonly httpStatus = 400;

  constructor(shipmentId: string) {
    super(`Courier must be assigned before this action (shipment: ${shipmentId})`, {
      shipmentId,
    });
    this.name = 'CourierAssignmentRequiredError';
  }
}

// ═══════════════════════════════════════
// ─── Generic Fallback ──────────────────
// ═══════════════════════════════════════
export class ShipmentOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;

  constructor(operation: string, cause: string) {
    super(`Shipment.${operation} failed: ${cause}`, { operation });
    this.name = 'ShipmentOperationError';
  }
}
