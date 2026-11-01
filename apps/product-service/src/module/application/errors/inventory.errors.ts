/**
 * Inventory Application Errors
 * @module product-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { CommandError } from '@vubon/shared-kernel/application/errors';
import { QueryError } from '@vubon/shared-kernel/application/errors';

export class InventoryNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(inventoryId: string) {
    super('Inventory', inventoryId);
    this.name = 'InventoryNotFoundApplicationError';
  }
}

export class InventoryValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'InventoryValidationError';
  }
}

export class InventoryAdjustError extends CommandError {
  constructor(inventoryId: string, reason: string) {
    super(`Inventory "${inventoryId}" adjust failed: ${reason}`, 'AdjustInventory');
    this.name = 'InventoryAdjustError';
  }
}

export class InventoryReserveError extends CommandError {
  constructor(inventoryId: string, reason: string) {
    super(`Inventory "${inventoryId}" reserve failed: ${reason}`, 'ReserveInventory');
    this.name = 'InventoryReserveError';
  }
}

export class InventoryInsufficientStockApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_OUT_OF_STOCK;
  readonly httpStatus = 409;

  constructor(inventoryId: string, available: number, requested: number) {
    super(
      `Insufficient stock for "${inventoryId}": available ${available}, requested ${requested}`,
      { inventoryId, available, requested },
    );
    this.name = 'InventoryInsufficientStockApplicationError';
  }
}

export class InventoryQueryError extends QueryError {
  constructor(reason: string) {
    super(`Inventory query failed: ${reason}`, 'InventoryQuery');
    this.name = 'InventoryQueryError';
  }
}
