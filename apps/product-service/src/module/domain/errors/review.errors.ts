import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ReviewNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(reviewId: string) {
    super(`Review not found: ${reviewId}`, { reviewId });
  }
}

export class ReviewAlreadySubmittedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(productId: string, userId: string) {
    super(`Review already submitted by user ${userId} for product ${productId}`, {
      productId,
      userId,
    });
  }
}

export class InvalidRatingError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(rating: number) {
    super(`Invalid rating: ${rating} (must be 1-5)`, { rating });
  }
}
