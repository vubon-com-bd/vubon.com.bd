import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ProductOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Product operation failed: ${reason}`, { reason });
  }
}

export class ProductValidationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(field: string, reason: string) {
    super(`Product validation failed for ${field}: ${reason}`, { field, reason });
  }
}

export class ProductNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(productId: string) {
    super(`Product not found: ${productId}`, { productId });
  }
}
