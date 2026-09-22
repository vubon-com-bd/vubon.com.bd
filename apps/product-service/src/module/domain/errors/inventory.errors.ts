import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class InsufficientStockError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_OUT_OF_STOCK;
  readonly httpStatus = 400;

  constructor(available: number, requested: number) {
    super(`Insufficient stock: available ${available}, requested ${requested}`, {
      available,
      requested,
    });
  }
}

export class InvalidQuantityError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(quantity: number) {
    super(`Invalid quantity: ${quantity}`, { quantity });
  }
}

export class InventoryNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(productId: string) {
    super(`Inventory not found for product: ${productId}`, { productId });
  }
}
