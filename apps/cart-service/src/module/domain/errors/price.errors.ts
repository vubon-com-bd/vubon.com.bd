import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class PriceMismatchError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(productId: string, expected: number, actual: number) {
    super(
      `Price mismatch for ${productId}: expected ${expected}, got ${actual}`,
      { productId, expected, actual },
    );
  }
}

export class PriceUnavailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_INACTIVE;
  readonly httpStatus = 400;
  constructor(productId: string) {
    super(`Price unavailable for product: ${productId}`, { productId });
  }
}
