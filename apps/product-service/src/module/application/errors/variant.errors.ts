/**
 * Variant application errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class VariantNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(variantId: string) {
    super(`Variant "${variantId}" not found`, { variantId });
    this.name = 'VariantNotFoundApplicationError';
  }
}

export class VariantSkuConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(sku: string) {
    super(`Variant SKU "${sku}" already exists`, { sku });
    this.name = 'VariantSkuConflictError';
  }
}

export class VariantOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(variantId: string, reason: string) {
    super(`Variant operation failed: ${reason}`, { variantId, reason });
    this.name = 'VariantOperationFailedError';
  }
}
