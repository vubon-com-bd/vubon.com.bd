/**
 * Warehouse domain errors
 * @module logistics-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { WAREHOUSE_STATUS, WAREHOUSE_TYPE, WAREHOUSE_ZONE, WAREHOUSE } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(WAREHOUSE_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(WAREHOUSE_TYPE) as readonly string[];
const ALLOWED_ZONES = Object.values(WAREHOUSE_ZONE) as readonly string[];

export class WarehouseNotFoundError extends NotFoundError {
  constructor(warehouseId: string) {
    super('Warehouse', warehouseId);
    this.name = 'WarehouseNotFoundError';
  }
}

export class WarehouseCodeAlreadyExistsError extends ConflictError {
  constructor(code: string) {
    super(`Warehouse with code "${code}" already exists`, 'code');
    this.name = 'WarehouseCodeAlreadyExistsError';
  }
}

export class InvalidWarehouseStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid warehouse status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidWarehouseStatusError';
  }
}

export class InvalidWarehouseTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid warehouse type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidWarehouseTypeError';
  }
}

export class InvalidWarehouseZoneError extends ValidationError {
  constructor(value: string) {
    super(`Invalid warehouse zone "${value}". Allowed: ${ALLOWED_ZONES.join(', ')}`, 'zone');
    this.name = 'InvalidWarehouseZoneError';
  }
}

export class InvalidWarehouseStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition warehouse status from "${from}" to "${to}"`,
      'INVALID_WAREHOUSE_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidWarehouseStatusTransitionError';
  }
}

export class WarehouseCapacityExceededError extends BusinessRuleError {
  constructor(warehouseId: string, requestedKg: number, availableKg: number) {
    super(
      `Warehouse "${warehouseId}" capacity exceeded: requested ${requestedKg}kg, available ${availableKg}kg`,
      'WAREHOUSE_CAPACITY_EXCEEDED',
      { warehouseId, requestedKg, availableKg, max: WAREHOUSE.MAX_WEIGHT_KG },
    );
    this.name = 'WarehouseCapacityExceededError';
  }
}

export class WarehouseVolumeCapacityExceededError extends BusinessRuleError {
  constructor(warehouseId: string, requestedM3: number, availableM3: number) {
    super(
      `Warehouse "${warehouseId}" volume capacity exceeded: requested ${requestedM3}m³, available ${availableM3}m³`,
      'WAREHOUSE_VOLUME_CAPACITY_EXCEEDED',
      { warehouseId, requestedM3, availableM3, max: WAREHOUSE.MAX_CAPACITY_M3 },
    );
    this.name = 'WarehouseVolumeCapacityExceededError';
  }
}
