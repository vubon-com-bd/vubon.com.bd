/**
 * Warehouse Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class WarehouseNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('Warehouse', id); this.name = 'WarehouseNotFoundApplicationError'; }
}
export class WarehouseByCodeNotFoundError extends ApplicationNotFoundError {
  constructor(code: string) { super('Warehouse', `code:${code}`); this.name = 'WarehouseByCodeNotFoundError'; }
}

export class CreateWarehouseError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Warehouse.create] ${msg}`, field); this.name = 'CreateWarehouseError'; }
}
export class UpdateWarehouseError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Warehouse.update] ${msg}`, field); this.name = 'UpdateWarehouseError'; }
}
export class ActivateWarehouseError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Warehouse.activate] ${msg}`, field); this.name = 'ActivateWarehouseError'; }
}
export class DeactivateWarehouseError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Warehouse.deactivate] ${msg}`, field); this.name = 'DeactivateWarehouseError'; }
}
export class MaintenanceWarehouseError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Warehouse.maintenance] ${msg}`, field); this.name = 'MaintenanceWarehouseError'; }
}
export class CloseWarehouseError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Warehouse.close] ${msg}`, field); this.name = 'CloseWarehouseError'; }
}
export class ArchiveWarehouseError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Warehouse.archive] ${msg}`, field); this.name = 'ArchiveWarehouseError'; }
}
export class UpdateCapacityError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Warehouse.updateCapacity] ${msg}`, field); this.name = 'UpdateCapacityError'; }
}

export class WarehouseAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.WAREHOUSE_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(code: string) { super(`Warehouse with code "${code}" already exists`, { code }); this.name = 'WarehouseAlreadyExistsError'; }
}
export class WarehouseStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_WAREHOUSE_STATUS_TRANSITION;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Warehouse "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'WarehouseStateConflictError';
  }
}
export class WarehouseCapacityExceededError extends ApplicationError {
  readonly code = ERROR_CODE.WAREHOUSE_CAPACITY_EXCEEDED;
  readonly httpStatus = 400;
  constructor(id: string, used: number, capacity: number) {
    super(`Warehouse "${id}" capacity exceeded (${used}/${capacity})`, { id, used, capacity });
    this.name = 'WarehouseCapacityExceededError';
  }
}
export class WarehouseOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`Warehouse.${op} failed: ${cause}`, { op }); this.name = 'WarehouseOperationError'; }
}
