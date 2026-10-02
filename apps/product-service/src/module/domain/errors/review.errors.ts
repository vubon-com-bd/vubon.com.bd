/**
 * Review domain errors
 * @module product-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class ReviewNotFoundError extends NotFoundError {
  constructor(reviewId: string) {
    super('ProductReview', reviewId);
    this.name = 'ReviewNotFoundError';
  }
}

export class ReviewAlreadySubmittedError extends ConflictError {
  constructor(productId: string, userId: string) {
    super(`User "${userId}" already reviewed product "${productId}"`, 'review');
    this.name = 'ReviewAlreadySubmittedError';
  }
}

export class ReviewEditWindowExpiredError extends BusinessRuleError {
  constructor(reviewId: string, hours: number) {
    super(`Review "${reviewId}" edit window of ${hours}h expired`, 'REVIEW_EDIT_WINDOW_EXPIRED', { reviewId, hours });
    this.name = 'ReviewEditWindowExpiredError';
  }
}

export class InvalidRatingError extends BusinessRuleError {
  constructor(value: number, min: number, max: number) {
    super(`Rating ${value} out of range [${min}, ${max}]`, 'INVALID_RATING', { value, min, max });
    this.name = 'InvalidRatingError';
  }
}
