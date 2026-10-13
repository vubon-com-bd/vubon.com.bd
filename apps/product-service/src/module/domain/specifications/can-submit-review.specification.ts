/**
 * CanSubmitReviewSpecification
 * @module product-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { REVIEW } from '@vubon/shared-constants/business';
import type { ProductEntity } from '../entities/product.entity.js';

export interface SubmitReviewContext {
  readonly userId: string;
  readonly hasPurchased: boolean;
  readonly hasExistingReview: boolean;
  readonly hasReachedDailyLimit?: boolean;
  readonly rating: number;
  readonly commentLength?: number;
}

export interface SubmitReviewCandidate {
  readonly product: ProductEntity;
  readonly ctx: SubmitReviewContext;
}

export class CanSubmitReviewSpecification extends Specification<SubmitReviewCandidate> {
  isSatisfiedBy(c: SubmitReviewCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: SubmitReviewCandidate): string | null {
    const { product, ctx } = c;

    if (product.status.isDeleted()) {
      return 'product is deleted';
    }
    if (product.status.isArchived()) {
      return 'product is archived';
    }
    if (!product.status.isPublished() && !product.status.isOutOfStock()) {
      return 'product is not available for reviews';
    }

    if (!ctx.userId || ctx.userId.trim().length === 0) {
      return 'user is required';
    }
    if (ctx.hasExistingReview) {
      return 'user has already reviewed this product';
    }
    if (REVIEW.VERIFIED_PURCHASE_REQUIRED && !ctx.hasPurchased) {
      return 'only verified purchasers can review this product';
    }
    if (ctx.hasReachedDailyLimit) {
      return 'daily review limit reached';
    }

    if (!Number.isInteger(ctx.rating) || ctx.rating < 1 || ctx.rating > 5) {
      return `rating must be integer 1-5 (got ${ctx.rating})`;
    }

    if (ctx.commentLength !== undefined) {
      if (ctx.commentLength < REVIEW.COMMENT_MIN_LENGTH) {
        return `comment too short (min ${REVIEW.COMMENT_MIN_LENGTH})`;
      }
      if (ctx.commentLength > REVIEW.COMMENT_MAX_LENGTH) {
        return `comment too long (max ${REVIEW.COMMENT_MAX_LENGTH})`;
      }
    }

    return null;
  }

  static strict(): CanSubmitReviewSpecification {
    return new CanSubmitReviewSpecification();
  }

  static openToAll(): CanSubmitReviewSpecification {
    return new CanSubmitReviewSpecification();
  }
}
