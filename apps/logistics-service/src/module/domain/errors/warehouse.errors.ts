/**
 * Warehouse Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

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
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid warehouse status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidWarehouseStatusError';
  }
}

export class InvalidWarehouseTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid warehouse type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidWarehouseTypeError';
  }
}

export class WarehouseCapacityExceededError extends BusinessRuleError {
  constructor(warehouseId: string, used: number, max: number) {
    super(
      `Warehouse "${warehouseId}" capacity exceeded (${used}/${max})`,
      'WAREHOUSE_CAPACITY_EXCEEDED',
      { warehouseId, used, max },
    );
    this.name = 'WarehouseCapacityExceededError';
  }
}

export class WarehouseFullError extends BusinessRuleError {
  constructor(warehouseId: string, utilizationPercent: number) {
    super(
      `Warehouse "${warehouseId}" is full (${utilizationPercent.toFixed(1)}%)`,
      'WAREHOUSE_FULL',
      { warehouseId, utilizationPercent },
    );
    this.name = 'WarehouseFullError';
  }
}

export class WarehouseNotOperationalError extends BusinessRuleError {
  constructor(warehouseId: string, status: string) {
    super(
      `Warehouse "${warehouseId}" is not operational (status: "${status}")`,
      'WAREHOUSE_NOT_OPERATIONAL',
      { warehouseId, status },
    );
    this.name = 'WarehouseNotOperationalError';
  }
}

export class WarehouseCannotBeArchivedError extends BusinessRuleError {
  constructor(warehouseId: string, status: string) {
    super(
      `Warehouse "${warehouseId}" cannot be archived in status "${status}"`,
      'WAREHOUSE_CANNOT_BE_ARCHIVED',
      { warehouseId, status },
    );
    this.name = 'WarehouseCannotBeArchivedError';
  }
}
