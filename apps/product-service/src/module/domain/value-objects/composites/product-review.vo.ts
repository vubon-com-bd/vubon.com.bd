/**
 * ProductReview Composite Value Object
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';
import { REVIEW } from '@vubon/shared-constants/business';

import { ReviewIdVO } from '../primitives/review-id.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { ReviewRatingVO } from '../primitives/review-rating.vo.js';
import { ReviewStatusVO } from '../primitives/review-status.vo.js';
import { ReviewContentVO } from '../primitives/review-content.vo.js';

export interface ProductReviewVOProps {
  readonly id: ReviewIdVO;
  readonly productId: ProductIdVO;
  readonly userId: string;
  readonly orderId?: string;
  readonly rating: ReviewRatingVO;
  readonly title?: string;
  readonly content?: ReviewContentVO;
  readonly images?: readonly string[];
  readonly status: ReviewStatusVO;
  readonly isVerifiedPurchase: boolean;
  readonly helpfulCount: number;
  readonly reportCount: number;
  readonly createdAt: string;
}

export class ProductReviewVO extends BaseVO<ProductReviewVOProps> {
  private constructor(props: ProductReviewVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ProductReviewVOProps): ProductReviewVO {
    const vo = new ProductReviewVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ProductReviewVOProps): ProductReviewVO {
    return new ProductReviewVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!v.userId || v.userId.trim().length === 0) {
      throw new ValidationError('Review userId is required', 'userId');
    }

    if (v.title !== undefined) {
      if (v.title.trim().length === 0 || v.title.length > REVIEW.TITLE_MAX_LENGTH) {
        throw new ValidationError(
          `Review title must be 1-${REVIEW.TITLE_MAX_LENGTH} chars`,
          'title',
        );
      }
    }

    if (v.images) {
      if (v.images.length > REVIEW.MAX_IMAGES) {
        throw new ValidationError(
          `Review images cannot exceed ${REVIEW.MAX_IMAGES}`,
          'images',
        );
      }
      for (const img of v.images) {
        if (!REGEX.URL.test(img)) {
          throw new ValidationError('Review image must be a valid URL', 'images');
        }
      }
    }

    if (!Number.isInteger(v.helpfulCount) || v.helpfulCount < 0) {
      throw new ValidationError('Review helpfulCount must be non-negative integer', 'helpfulCount');
    }

    if (!Number.isInteger(v.reportCount) || v.reportCount < 0) {
      throw new ValidationError('Review reportCount must be non-negative integer', 'reportCount');
    }
  }

  get id(): ReviewIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get userId(): string { return this.value.userId; }
  get orderId(): string | undefined { return this.value.orderId; }
  get rating(): ReviewRatingVO { return this.value.rating; }
  get title(): string | undefined { return this.value.title; }
  get content(): ReviewContentVO | undefined { return this.value.content; }
  get images(): readonly string[] | undefined { return this.value.images; }
  get status(): ReviewStatusVO { return this.value.status; }
  get isVerifiedPurchase(): boolean { return this.value.isVerifiedPurchase; }
  get helpfulCount(): number { return this.value.helpfulCount; }
  get reportCount(): number { return this.value.reportCount; }
  get createdAt(): string { return this.value.createdAt; }

  isPositive(): boolean { return this.rating.isPositive(); }
  isNeutral(): boolean { return this.rating.isNeutral(); }
  isNegative(): boolean { return this.rating.isNegative(); }
  hasContent(): boolean { return this.content !== undefined; }
  hasTitle(): boolean { return this.title !== undefined; }
  hasImages(): boolean { return (this.images?.length ?? 0) > 0; }
  isVerified(): boolean { return this.isVerifiedPurchase; }

  isEditableAt(at: string): boolean {
    const created = new Date(this.createdAt).getTime();
    const now = new Date(at).getTime();
    const hours = (now - created) / (1000 * 60 * 60);
    return hours <= REVIEW.EDIT_WINDOW_HOURS;
  }

  isHighQuality(): boolean {
    return (
      this.rating.value >= 4 &&
      this.hasContent() &&
      (this.content?.wordCount ?? 0) >= 20
    );
  }
}
