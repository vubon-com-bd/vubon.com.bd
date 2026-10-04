/**
 * Product application errors
 * @module product-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ProductNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(productId: string) {
    super(`Product "${productId}" not found`, { productId });
    this.name = 'ProductNotFoundApplicationError';
  }
}

export class ProductSlugConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Product slug "${slug}" already exists`, { slug });
    this.name = 'ProductSlugConflictError';
  }
}

export class ProductSkuConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(sku: string) {
    super(`Product SKU "${sku}" already exists`, { sku });
    this.name = 'ProductSkuConflictError';
  }
}

export class ProductOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(productId: string, reason: string) {
    super(`Product operation failed for "${productId}": ${reason}`, { productId, reason });
    this.name = 'ProductOperationFailedError';
  }
}
