/**
 * Inventory application errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class InventoryNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(inventoryId: string) {
    super(`Inventory "${inventoryId}" not found`, { inventoryId });
    this.name = 'InventoryNotFoundApplicationError';
  }
}

export class InsufficientStockApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_OUT_OF_STOCK;
  readonly httpStatus = 409;

  constructor(available: number, requested: number) {
    super(`Insufficient stock: available ${available}, requested ${requested}`, {
      available,
      requested,
    });
    this.name = 'InsufficientStockApplicationError';
  }
}

export class InventoryOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Inventory operation failed: ${reason}`, { reason });
    this.name = 'InventoryOperationFailedError';
  }
}
