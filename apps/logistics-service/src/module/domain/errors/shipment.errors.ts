/**
 * Shipment domain errors
 * @module logistics-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { SHIPMENT_STATUS, SHIPMENT_TYPE, SHIPMENT_PRIORITY } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(SHIPMENT_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(SHIPMENT_TYPE) as readonly string[];
const ALLOWED_PRIORITIES = Object.values(SHIPMENT_PRIORITY) as readonly string[];

export class ShipmentNotFoundError extends NotFoundError {
  constructor(shipmentId: string) {
    super('Shipment', shipmentId);
    this.name = 'ShipmentNotFoundError';
  }
}

export class ShipmentAlreadyExistsError extends ConflictError {
  constructor(trackingNumber: string) {
    super(`Shipment with tracking number "${trackingNumber}" already exists`, 'trackingNumber');
    this.name = 'ShipmentAlreadyExistsError';
  }
}

export class InvalidShipmentStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid shipment status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidShipmentStatusError';
  }
}

export class InvalidShipmentTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid shipment type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidShipmentTypeError';
  }
}

export class InvalidShipmentPriorityError extends ValidationError {
  constructor(value: string) {
    super(`Invalid shipment priority "${value}". Allowed: ${ALLOWED_PRIORITIES.join(', ')}`, 'priority');
    this.name = 'InvalidShipmentPriorityError';
  }
}

export class InvalidTrackingNumberError extends ValidationError {
  constructor(value: string) {
    super(`Invalid tracking number format: "${value}"`, 'trackingNumber');
    this.name = 'InvalidTrackingNumberError';
  }
}

export class InvalidShipmentStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition shipment status from "${from}" to "${to}"`,
      'INVALID_SHIPMENT_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidShipmentStatusTransitionError';
  }
}

export class ShipmentCannotBeCancelledError extends BusinessRuleError {
  constructor(shipmentId: string, status: string) {
    super(
      `Shipment "${shipmentId}" cannot be cancelled in status "${status}"`,
      'SHIPMENT_CANNOT_BE_CANCELLED',
      { shipmentId, status },
    );
    this.name = 'ShipmentCannotBeCancelledError';
  }
}

export class ShipmentCannotBeModifiedError extends BusinessRuleError {
  constructor(shipmentId: string, status: string) {
    super(
      `Shipment "${shipmentId}" cannot be modified in status "${status}"`,
      'SHIPMENT_CANNOT_BE_MODIFIED',
      { shipmentId, status },
    );
    this.name = 'ShipmentCannotBeModifiedError';
  }
}

export class ShipmentWeightLimitExceededError extends BusinessRuleError {
  constructor(actual: number, max: number) {
    super(
      `Shipment weight ${actual}kg exceeds maximum ${max}kg`,
      'WEIGHT_LIMIT_EXCEEDED',
      { actual, max },
    );
    this.name = 'ShipmentWeightLimitExceededError';
  }
}

export class ShipmentCodAmountExceededError extends BusinessRuleError {
  constructor(actual: number, max: number) {
    super(
      `COD amount ${actual} exceeds maximum ${max}`,
      'COD_AMOUNT_EXCEEDED',
      { actual, max },
    );
    this.name = 'ShipmentCodAmountExceededError';
  }
}

export class ShipmentDeclaredValueExceededError extends BusinessRuleError {
  constructor(actual: number, max: number) {
    super(
      `Declared value ${actual} exceeds maximum ${max}`,
      'INSURANCE_AMOUNT_EXCEEDED',
      { actual, max },
    );
    this.name = 'ShipmentDeclaredValueExceededError';
  }
}
