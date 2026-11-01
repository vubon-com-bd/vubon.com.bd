/**
 * InventoryLocation Application Errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class InventoryLocationNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('InventoryLocation', id); this.name = 'InventoryLocationNotFoundApplicationError'; }
}
export class InventoryLocationByCodeNotFoundError extends ApplicationNotFoundError {
  constructor(code: string) { super('InventoryLocation', `code:${code}`); this.name = 'InventoryLocationByCodeNotFoundError'; }
}

export class CreateInventoryLocationError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[InventoryLocation.create] ${msg}`, field); this.name = 'CreateInventoryLocationError'; }
}
export class UpdateInventoryLocationError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[InventoryLocation.update] ${msg}`, field); this.name = 'UpdateInventoryLocationError'; }
}
export class InventoryLocationActionError extends ApplicationValidationError {
  constructor(action: string, msg: string, field?: string) { super(`[InventoryLocation.${action}] ${msg}`, field); this.name = 'InventoryLocationActionError'; }
}

export class InventoryLocationAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 409;
  constructor(code: string) { super(`Inventory location "${code}" already exists`, { code }); this.name = 'InventoryLocationAlreadyExistsError'; }
}
export class InventoryLocationBarcodeExistsError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 409;
  constructor(barcode: string) { super(`Barcode "${barcode}" already in use`, { barcode }); this.name = 'InventoryLocationBarcodeExistsError'; }
}
export class InventoryLocationStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Inventory location "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'InventoryLocationStateConflictError';
  }
}
export class InventoryLocationInsufficientCapacityAppError extends ApplicationError {
  readonly code = ERROR_CODE.WAREHOUSE_CAPACITY_EXCEEDED;
  readonly httpStatus = 400;
  constructor(id: string, available: number, requested: number) {
    super(`Insufficient capacity (available: ${available}, requested: ${requested})`, { id, available, requested });
    this.name = 'InventoryLocationInsufficientCapacityAppError';
  }
}
export class InventoryLocationOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`InventoryLocation.${op} failed: ${cause}`, { op }); this.name = 'InventoryLocationOperationError'; }
}
