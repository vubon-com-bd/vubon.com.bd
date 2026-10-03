/**
 * Review HTTP validator
 */
import { Injectable } from '@nestjs/common';
import { REVIEW_RATING, REVIEW } from '@vubon/shared-constants/business/product';

export const REVIEW_VALIDATOR = Symbol('REVIEW_VALIDATOR');

@Injectable()
export class ReviewValidator {
  assertRating(rating: number): void {
    if (!Number.isInteger(rating) || rating < REVIEW_RATING.MIN || rating > REVIEW_RATING.MAX) {
      throw new Error(`Rating must be between ${REVIEW_RATING.MIN} and ${REVIEW_RATING.MAX}`);
    }
  }

  assertComment(comment?: string): void {
    if (comment === undefined) return;
    if (comment.length < REVIEW.COMMENT_MIN_LENGTH) {
      throw new Error(`Comment must be at least ${REVIEW.COMMENT_MIN_LENGTH} chars`);
    }
    if (comment.length > REVIEW.COMMENT_MAX_LENGTH) {
      throw new Error(`Comment cannot exceed ${REVIEW.COMMENT_MAX_LENGTH} chars`);
    }
  }

  assertImagesCount(images?: readonly string[]): void {
    if (!images) return;
    if (images.length > REVIEW.MAX_IMAGES) {
      throw new Error(`Cannot have more than ${REVIEW.MAX_IMAGES} images`);
    }
  }
}
