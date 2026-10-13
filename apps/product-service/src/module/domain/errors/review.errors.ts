/**
 * Review Domain Errors
 * @module product-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ReviewNotFoundError extends NotFoundError {
  constructor(reviewId: string) {
    super('Review', reviewId);
    this.name = 'ReviewNotFoundError';
  }
}

export class DuplicateReviewError extends ConflictError {
  constructor(productId: string, userId: string) {
    super(`User "${userId}" already reviewed product "${productId}"`, 'userId');
    this.name = 'DuplicateReviewError';
  }
}

export class InvalidReviewRatingError extends ValidationError {
  constructor(value: number) {
    super(`Review rating must be integer 1-5 (got ${value})`, 'rating');
    this.name = 'InvalidReviewRatingError';
  }
}

export class InvalidReviewStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid review status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidReviewStatusError';
  }
}

export class ReviewEditWindowExpiredError extends BusinessRuleError {
  constructor(reviewId: string, windowHours: number) {
    super(
      `Review "${reviewId}" edit window (${windowHours}h) expired`,
      'REVIEW_EDIT_WINDOW_EXPIRED',
      { reviewId, windowHours },
    );
    this.name = 'ReviewEditWindowExpiredError';
  }
}

export class ReviewNotEligibleError extends BusinessRuleError {
  constructor(productId: string, userId: string, reason: string) {
    super(
      `User "${userId}" not eligible to review product "${productId}": ${reason}`,
      'REVIEW_NOT_ELIGIBLE',
      { productId, userId, reason },
    );
    this.name = 'ReviewNotEligibleError';
  }
}
