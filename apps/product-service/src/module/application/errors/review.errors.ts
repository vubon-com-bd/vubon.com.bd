/**
 * Review Application Errors
 * @module product-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { CommandError } from '@vubon/shared-kernel/application/errors';
import { QueryError } from '@vubon/shared-kernel/application/errors';

export class ReviewNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(reviewId: string) {
    super('Review', reviewId);
    this.name = 'ReviewNotFoundApplicationError';
  }
}

export class ReviewValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'ReviewValidationError';
  }
}

export class ReviewSubmitError extends CommandError {
  constructor(reason: string) {
    super(`Review submission failed: ${reason}`, 'SubmitReview');
    this.name = 'ReviewSubmitError';
  }
}

export class ReviewModerationError extends CommandError {
  constructor(reviewId: string, reason: string) {
    super(`Review "${reviewId}" moderation failed: ${reason}`, 'ModerateReview');
    this.name = 'ReviewModerationError';
  }
}

export class DuplicateReviewApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(productId: string, userId: string) {
    super(
      `User "${userId}" already reviewed product "${productId}"`,
      { productId, userId },
    );
    this.name = 'DuplicateReviewApplicationError';
  }
}

export class ReviewQueryError extends QueryError {
  constructor(reason: string) {
    super(`Review query failed: ${reason}`, 'ReviewQuery');
    this.name = 'ReviewQueryError';
  }
}
