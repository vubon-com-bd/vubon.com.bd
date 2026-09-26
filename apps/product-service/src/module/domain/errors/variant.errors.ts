import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class VariantNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(variantId: string) {
    super(`Variant not found: ${variantId}`, { variantId });
  }
}

export class VariantSkuExistsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(sku: string) {
    super(`Variant SKU already exists: ${sku}`, { sku });
  }
}

export class VariantLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(limit: number) {
    super(`Variant limit exceeded: max ${limit}`, { limit });
  }
}
