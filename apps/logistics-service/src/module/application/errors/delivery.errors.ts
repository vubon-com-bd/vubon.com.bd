/**
 * Delivery Application Errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

// ─── Not Found ───
export class DeliveryNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(deliveryId: string) {
    super('Delivery', deliveryId);
    this.name = 'DeliveryNotFoundApplicationError';
  }
}
export class DeliveryByShipmentNotFoundError extends ApplicationNotFoundError {
  constructor(shipmentId: string) {
    super('Delivery', `shipment:${shipmentId}`);
    this.name = 'DeliveryByShipmentNotFoundError';
  }
}

// ─── Validation ───
export class CreateDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.create] ${message}`, field);
    this.name = 'CreateDeliveryError';
  }
}
export class ScheduleDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.schedule] ${message}`, field);
    this.name = 'ScheduleDeliveryError';
  }
}
export class AssignDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.assign] ${message}`, field);
    this.name = 'AssignDeliveryError';
  }
}
export class PickUpDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.pickUp] ${message}`, field);
    this.name = 'PickUpDeliveryError';
  }
}
export class DeliveryStartTransitError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.startTransit] ${message}`, field);
    this.name = 'DeliveryStartTransitError';
  }
}
export class DeliveryOutForDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.outForDelivery] ${message}`, field);
    this.name = 'DeliveryOutForDeliveryError';
  }
}
export class ArriveDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.arrive] ${message}`, field);
    this.name = 'ArriveDeliveryError';
  }
}
export class CompleteDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.complete] ${message}`, field);
    this.name = 'CompleteDeliveryError';
  }
}
export class FailDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.fail] ${message}`, field);
    this.name = 'FailDeliveryError';
  }
}
export class RescheduleDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.reschedule] ${message}`, field);
    this.name = 'RescheduleDeliveryError';
  }
}
export class CancelDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.cancel] ${message}`, field);
    this.name = 'CancelDeliveryError';
  }
}
export class RefuseDeliveryError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Delivery.refuse] ${message}`, field);
    this.name = 'RefuseDeliveryError';
  }
}

// ─── Conflict ───
export class DeliveryAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.DELIVERY_FAILED;
  readonly httpStatus = 409;
  constructor(shipmentId: string) {
    super(`Delivery already exists for shipment "${shipmentId}"`, { shipmentId });
    this.name = 'DeliveryAlreadyExistsError';
  }
}

export class DeliveryStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_DELIVERY_STATUS_TRANSITION;
  readonly httpStatus = 409;
  constructor(deliveryId: string, currentStatus: string, action: string) {
    super(
      `Delivery "${deliveryId}" in status "${currentStatus}" cannot perform "${action}"`,
      { deliveryId, currentStatus, action },
    );
    this.name = 'DeliveryStateConflictError';
  }
}

// ─── Business ───
export class DeliveryBusinessRuleError extends ApplicationError {
  readonly code = ERROR_CODE.DELIVERY_FAILED;
  readonly httpStatus = 400;
  constructor(message: string, rule: string, context?: Record<string, unknown>) {
    super(message, { rule, ...context });
    this.name = 'DeliveryBusinessRuleError';
  }
}
export class DeliveryAttemptsExceededError extends ApplicationError {
  readonly code = ERROR_CODE.DELIVERY_ATTEMPT_EXCEEDED;
  readonly httpStatus = 400;
  constructor(deliveryId: string, attempts: number, max: number) {
    super(`Delivery "${deliveryId}" exceeded max attempts (${attempts}/${max})`, {
      deliveryId,
      attempts,
      max,
    });
    this.name = 'DeliveryAttemptsExceededError';
  }
}
export class DeliveryNoDriverError extends ApplicationError {
  readonly code = ERROR_CODE.DRIVER_NOT_AVAILABLE;
  readonly httpStatus = 400;
  constructor(deliveryId: string) {
    super(`No driver assigned to delivery "${deliveryId}"`, { deliveryId });
    this.name = 'DeliveryNoDriverError';
  }
}
export class DeliveryOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(operation: string, cause: string) {
    super(`Delivery.${operation} failed: ${cause}`, { operation });
    this.name = 'DeliveryOperationError';
  }
}
