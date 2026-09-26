import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ReviewOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Review operation failed: ${reason}`, { reason });
  }
}

export class ReviewNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(reviewId: string) {
    super(`Review not found: ${reviewId}`, { reviewId });
  }
}

export class ReviewDuplicateAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(userId: string, productId: string) {
    super(`User ${userId} already reviewed product ${productId}`, { userId, productId });
  }
}
