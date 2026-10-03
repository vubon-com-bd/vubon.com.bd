/**
 * Review application errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ReviewNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(reviewId: string) {
    super(`Review "${reviewId}" not found`, { reviewId });
    this.name = 'ReviewNotFoundApplicationError';
  }
}

export class ReviewAlreadySubmittedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(productId: string, userId: string) {
    super(`User "${userId}" already reviewed product "${productId}"`, { productId, userId });
    this.name = 'ReviewAlreadySubmittedApplicationError';
  }
}

export class ReviewOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Review operation failed: ${reason}`, { reason });
    this.name = 'ReviewOperationFailedError';
  }
}
