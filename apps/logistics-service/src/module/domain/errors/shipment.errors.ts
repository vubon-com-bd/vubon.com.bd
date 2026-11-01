/**
 * Shipment Domain Errors
 * @module logistics-service/domain/errors
 *
 * Typed error hierarchy — HTTP layer-এ auto-map হয়।
 * Pattern: Payment-style typed errors (Pattern 1 Template 0)
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ═══════════════════════════════════════
// ─── Not Found (404) ───────────────────
// ═══════════════════════════════════════
export class ShipmentNotFoundError extends NotFoundError {
  constructor(shipmentId: string) {
    super('Shipment', shipmentId);
    this.name = 'ShipmentNotFoundError';
  }
}

// ═══════════════════════════════════════
// ─── Conflict (409) ────────────────────
// ═══════════════════════════════════════
export class ShipmentAlreadyExistsError extends ConflictError {
  constructor(reference: string) {
    super(`Shipment "${reference}" already exists`, 'reference');
    this.name = 'ShipmentAlreadyExistsError';
  }
}

export class DuplicateTrackingNumberError extends ConflictError {
  constructor(trackingNumber: string) {
    super(`Tracking number "${trackingNumber}" already in use`, 'trackingNumber');
    this.name = 'DuplicateTrackingNumberError';
  }
}

export class DuplicateShipmentNumberError extends ConflictError {
  constructor(shipmentNumber: string) {
    super(`Shipment number "${shipmentNumber}" already in use`, 'shipmentNumber');
    this.name = 'DuplicateShipmentNumberError';
  }
}

// ═══════════════════════════════════════
// ─── Validation (422) ──────────────────
// ═══════════════════════════════════════
export class InvalidShipmentStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid shipment status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidShipmentStatusError';
  }
}

export class InvalidShipmentTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid shipment type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidShipmentTypeError';
  }
}

export class InvalidShipmentPriorityError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid shipment priority "${value}". Allowed: ${allowed.join(', ')}`, 'priority');
    this.name = 'InvalidShipmentPriorityError';
  }
}

export class InvalidTrackingNumberError extends ValidationError {
  constructor(value: string, reason?: string) {
    super(`Invalid tracking number "${value}"${reason ? `: ${reason}` : ''}`, 'trackingNumber');
    this.name = 'InvalidTrackingNumberError';
  }
}

export class InvalidShipmentNumberError extends ValidationError {
  constructor(value: string, reason?: string) {
    super(`Invalid shipment number "${value}"${reason ? `: ${reason}` : ''}`, 'shipmentNumber');
    this.name = 'InvalidShipmentNumberError';
  }
}

export class ShipmentWeightLimitExceededError extends ValidationError {
  constructor(actualKg: number, maxKg: number) {
    super(`Shipment weight ${actualKg}kg exceeds limit ${maxKg}kg`, 'weight');
    this.name = 'ShipmentWeightLimitExceededError';
  }
}

// ═══════════════════════════════════════
// ─── Business Rule (400) ───────────────
// ═══════════════════════════════════════
export class InvalidShipmentStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, shipmentId?: string) {
    super(
      `Cannot transition shipment status from "${from}" to "${to}"`,
      'INVALID_SHIPMENT_STATUS_TRANSITION',
      { from, to, shipmentId },
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

export class ShipmentAlreadyDeliveredError extends BusinessRuleError {
  constructor(shipmentId: string, deliveredAt: string) {
    super(
      `Shipment "${shipmentId}" was already delivered at ${deliveredAt}`,
      'SHIPMENT_ALREADY_DELIVERED',
      { shipmentId, deliveredAt },
    );
    this.name = 'ShipmentAlreadyDeliveredError';
  }
}

export class ShipmentExpiredError extends BusinessRuleError {
  constructor(shipmentId: string, expiredAt: string) {
    super(`Shipment "${shipmentId}" expired at ${expiredAt}`, 'SHIPMENT_EXPIRED', {
      shipmentId,
      expiredAt,
    });
    this.name = 'ShipmentExpiredError';
  }
}

export class ShipmentCODExceededError extends BusinessRuleError {
  constructor(actualAmount: number, maxAmount: number, currency: string) {
    super(
      `COD amount ${actualAmount} ${currency} exceeds limit ${maxAmount} ${currency}`,
      'SHIPMENT_COD_EXCEEDED',
      { actualAmount, maxAmount, currency },
    );
    this.name = 'ShipmentCODExceededError';
  }
}

export class ShipmentInsuranceExceededError extends BusinessRuleError {
  constructor(actualValue: number, maxValue: number, currency: string) {
    super(
      `Insurance declared value ${actualValue} ${currency} exceeds limit ${maxValue} ${currency}`,
      'SHIPMENT_INSURANCE_EXCEEDED',
      { actualValue, maxValue, currency },
    );
    this.name = 'ShipmentInsuranceExceededError';
  }
}

export class ShipmentNoItemsError extends BusinessRuleError {
  constructor(shipmentId: string) {
    super(
      `Shipment "${shipmentId}" must contain at least one item`,
      'SHIPMENT_NO_ITEMS',
      { shipmentId },
    );
    this.name = 'ShipmentNoItemsError';
  }
}

export class ShipmentItemLimitExceededError extends BusinessRuleError {
  constructor(actualCount: number, maxCount: number) {
    super(
      `Shipment has ${actualCount} items, exceeds limit ${maxCount}`,
      'SHIPMENT_ITEM_LIMIT_EXCEEDED',
      { actualCount, maxCount },
    );
    this.name = 'ShipmentItemLimitExceededError';
  }
}
