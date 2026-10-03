/**
 * Pricing application errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class PricingNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(productId: string) {
    super(`Pricing for product "${productId}" not found`, { productId });
    this.name = 'PricingNotFoundApplicationError';
  }
}

export class PricingOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Pricing operation failed: ${reason}`, { reason });
    this.name = 'PricingOperationFailedError';
  }
}
