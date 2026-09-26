import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class InventoryOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Inventory operation failed: ${reason}`, { reason });
  }
}

export class InventoryNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(productId: string) {
    super(`Inventory not found for product: ${productId}`, { productId });
  }
}

export class InsufficientStockAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_OUT_OF_STOCK;
  readonly httpStatus = 400;

  constructor(available: number, requested: number) {
    super(`Insufficient stock: available ${available}, requested ${requested}`, {
      available,
      requested,
    });
  }
}
