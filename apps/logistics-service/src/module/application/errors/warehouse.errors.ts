/**
 * Warehouse application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class WarehouseNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.WAREHOUSE_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly warehouseId: string) {
    super(`Warehouse "${warehouseId}" not found`, { warehouseId });
    this.name = 'WarehouseNotFoundApplicationError';
  }
}

export class WarehouseOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly warehouseId?: string) {
    super(`Warehouse ${operation} failed: ${reason}`, { operation, warehouseId });
    this.name = 'WarehouseOperationFailedApplicationError';
  }
}

export class WarehouseCapacityExceededApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.CAPACITY_EXCEEDED;
  readonly httpStatus = 409;
  constructor(public readonly warehouseId: string, reason: string) {
    super(`Warehouse "${warehouseId}" capacity exceeded: ${reason}`, { warehouseId, reason });
    this.name = 'WarehouseCapacityExceededApplicationError';
  }
}
