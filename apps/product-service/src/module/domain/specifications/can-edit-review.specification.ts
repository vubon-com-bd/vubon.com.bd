/**
 * CanEditReview Specification
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ProductReviewEntity } from '../entities/product-review.entity.js';

export class CanEditReviewSpecification extends Specification<ProductReviewEntity> {
  constructor(private readonly now: string) {
    super();
  }

  isSatisfiedBy(review: ProductReviewEntity): boolean {
    if (review.isDeleted()) return false;
    return review.isEditable(this.now);
  }

  reason(review: ProductReviewEntity): string | undefined {
    if (review.isDeleted()) return 'review is deleted';
    if (!review.isEditable(this.now)) return 'edit window expired or status not editable';
    return undefined;
  }
}
