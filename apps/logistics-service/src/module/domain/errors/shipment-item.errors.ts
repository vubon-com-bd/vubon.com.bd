/**
 * ShipmentItem Domain Errors
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
export class ShipmentItemNotFoundError extends NotFoundError {
  constructor(itemId: string) {
    super('ShipmentItem', itemId);
    this.name = 'ShipmentItemNotFoundError';
  }
}

// ═══════════════════════════════════════
// ─── Conflict (409) ────────────────────
// ═══════════════════════════════════════
export class DuplicateShipmentItemError extends ConflictError {
  constructor(shipmentId: string, sku: string) {
    super(
      `Shipment "${shipmentId}" already contains SKU "${sku}"`,
      'sku',
    );
    this.name = 'DuplicateShipmentItemError';
  }
}

// ═══════════════════════════════════════
// ─── Validation (422) ──────────────────
// ═══════════════════════════════════════
export class InvalidShipmentItemQuantityError extends ValidationError {
  constructor(value: number, min: number, max: number) {
    super(
      `ShipmentItem quantity ${value} must be between ${min} and ${max}`,
      'quantity',
    );
    this.name = 'InvalidShipmentItemQuantityError';
  }
}

export class InvalidShipmentItemStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid shipment item status "${value}". Allowed: ${allowed.join(', ')}`,
      'status',
    );
    this.name = 'InvalidShipmentItemStatusError';
  }
}

export class InvalidShipmentItemPriceError extends ValidationError {
  constructor(value: number, reason?: string) {
    super(
      `Invalid shipment item price ${value}${reason ? `: ${reason}` : ''}`,
      'price',
    );
    this.name = 'InvalidShipmentItemPriceError';
  }
}

// ═══════════════════════════════════════
// ─── Business Rule (400) ───────────────
// ═══════════════════════════════════════
export class ShipmentItemCannotBeModifiedError extends BusinessRuleError {
  constructor(itemId: string, shipmentStatus: string) {
    super(
      `ShipmentItem "${itemId}" cannot be modified (parent shipment status: "${shipmentStatus}")`,
      'SHIPMENT_ITEM_CANNOT_BE_MODIFIED',
      { itemId, shipmentStatus },
    );
    this.name = 'ShipmentItemCannotBeModifiedError';
  }
}

export class ShipmentItemAlreadyDeliveredError extends BusinessRuleError {
  constructor(itemId: string, deliveredAt: string) {
    super(
      `ShipmentItem "${itemId}" was already delivered at ${deliveredAt}`,
      'SHIPMENT_ITEM_ALREADY_DELIVERED',
      { itemId, deliveredAt },
    );
    this.name = 'ShipmentItemAlreadyDeliveredError';
  }
}

export class ShipmentItemAlreadyReturnedError extends BusinessRuleError {
  constructor(itemId: string, returnedAt: string) {
    super(
      `ShipmentItem "${itemId}" was already returned at ${returnedAt}`,
      'SHIPMENT_ITEM_ALREADY_RETURNED',
      { itemId, returnedAt },
    );
    this.name = 'ShipmentItemAlreadyReturnedError';
  }
}
