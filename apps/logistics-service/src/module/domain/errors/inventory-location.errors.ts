/**
 * InventoryLocation Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ═══ Not Found (404) ═══
export class InventoryLocationNotFoundError extends NotFoundError {
  constructor(id: string) {
    super('InventoryLocation', id);
    this.name = 'InventoryLocationNotFoundError';
  }
}

export class InventoryLocationByCodeNotFoundError extends NotFoundError {
  constructor(code: string) {
    super('InventoryLocation', `code:${code}`);
    this.name = 'InventoryLocationByCodeNotFoundError';
  }
}

export class InventoryLocationByBarcodeNotFoundError extends NotFoundError {
  constructor(barcode: string) {
    super('InventoryLocation', `barcode:${barcode}`);
    this.name = 'InventoryLocationByBarcodeNotFoundError';
  }
}

// ═══ Conflict (409) ═══
export class InventoryLocationCodeAlreadyExistsError extends ConflictError {
  constructor(code: string) {
    super(`Inventory location with code "${code}" already exists`, 'code');
    this.name = 'InventoryLocationCodeAlreadyExistsError';
  }
}

export class InventoryLocationBarcodeAlreadyExistsError extends ConflictError {
  constructor(barcode: string) {
    super(`Inventory location with barcode "${barcode}" already exists`, 'barcode');
    this.name = 'InventoryLocationBarcodeAlreadyExistsError';
  }
}

// ═══ Validation (422) ═══
export class InvalidInventoryLocationStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid inventory location status "${value}". Allowed: ${allowed.join(', ')}`,
      'status',
    );
    this.name = 'InvalidInventoryLocationStatusError';
  }
}

export class InventoryLocationCapacityExceededError extends ValidationError {
  constructor(id: string, requested: number, max: number, unit: string) {
    super(
      `Inventory location "${id}" capacity exceeded (${requested}/${max} ${unit})`,
      'capacity',
    );
    this.name = 'InventoryLocationCapacityExceededError';
  }
}

// ═══ Business Rule (400) ═══
export class InventoryLocationCannotBeModifiedError extends BusinessRuleError {
  constructor(id: string, reason: string) {
    super(
      `Inventory location "${id}" cannot be modified: ${reason}`,
      'INVENTORY_LOCATION_CANNOT_BE_MODIFIED',
      { id, reason },
    );
    this.name = 'InventoryLocationCannotBeModifiedError';
  }
}

export class InventoryLocationQuarantineError extends BusinessRuleError {
  constructor(id: string, action: string) {
    super(
      `Inventory location "${id}" is in quarantine — "${action}" not allowed`,
      'INVENTORY_LOCATION_QUARANTINE',
      { id, action },
    );
    this.name = 'InventoryLocationQuarantineError';
  }
}

export class InventoryLocationNotPickableError extends BusinessRuleError {
  constructor(id: string) {
    super(
      `Inventory location "${id}" is not pickable`,
      'INVENTORY_LOCATION_NOT_PICKABLE',
      { id },
    );
    this.name = 'InventoryLocationNotPickableError';
  }
}

export class InventoryLocationInsufficientCapacityError extends BusinessRuleError {
  constructor(id: string, available: number, requested: number) {
    super(
      `Inventory location "${id}" has insufficient capacity (available: ${available}, requested: ${requested})`,
      'INVENTORY_LOCATION_INSUFFICIENT_CAPACITY',
      { id, available, requested },
    );
    this.name = 'InventoryLocationInsufficientCapacityError';
  }
}
