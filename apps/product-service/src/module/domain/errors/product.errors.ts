import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ProductNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(productId: string) {
    super(`Product not found: ${productId}`, { productId });
  }
}

export class ProductAlreadyExistsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 409;

  constructor(sku: string) {
    super(`Product already exists with SKU: ${sku}`, { sku });
  }
}

export class ProductSlugExistsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Product slug already exists: ${slug}`, { slug });
  }
}

export class InvalidProductStatusError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(status: string) {
    super(`Invalid product status: ${status}`, { status });
  }
}
