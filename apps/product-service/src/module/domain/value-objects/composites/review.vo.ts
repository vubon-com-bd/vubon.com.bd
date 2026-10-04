/**
 * ReviewCompositeVO
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ReviewIdVO } from '../primitives/review-id.vo.js';
import { ReviewRatingVO } from '../primitives/review-rating.vo.js';
import { ReviewCommentVO } from '../primitives/review-comment.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { REVIEW, REVIEW_STATUS } from '@vubon/shared-constants/business/product';

export interface ReviewCompositeProps {
  readonly id: ReviewIdVO;
  readonly productId: ProductIdVO;
  readonly userId: string;
  readonly orderId?: string;
  readonly rating: ReviewRatingVO;
  readonly title?: string;
  readonly comment: ReviewCommentVO;
  readonly images: readonly string[];
  readonly status: string;
  readonly isVerifiedPurchase: boolean;
  readonly helpfulCount: number;
  readonly reportCount: number;
  readonly createdAt: string;
}

export class ReviewCompositeVO extends BaseVO<ReviewCompositeProps> {
  private constructor(props: ReviewCompositeProps) {
    super(props);
  }

  static create(props: ReviewCompositeProps): ReviewCompositeVO {
    if (props.images.length > REVIEW.MAX_IMAGES) {
      throw new Error(`Review cannot have more than ${REVIEW.MAX_IMAGES} images`);
    }
    if (props.title && props.title.length > REVIEW.TITLE_MAX_LENGTH) {
      throw new Error(`Review title cannot exceed ${REVIEW.TITLE_MAX_LENGTH} chars`);
    }
    if (props.helpfulCount < 0 || props.reportCount < 0) {
      throw new Error('Counts cannot be negative');
    }
    return new ReviewCompositeVO(props);
  }

  static reconstitute(props: ReviewCompositeProps): ReviewCompositeVO {
    return new ReviewCompositeVO(props);
  }

  get id(): ReviewIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get userId(): string { return this.value.userId; }
  get rating(): ReviewRatingVO { return this.value.rating; }
  get comment(): ReviewCommentVO { return this.value.comment; }
  get status(): string { return this.value.status; }
  get isVerifiedPurchase(): boolean { return this.value.isVerifiedPurchase; }
  get helpfulCount(): number { return this.value.helpfulCount; }

  /**
   * Business rule: is review within edit window
   */
  isEditable(now: string): boolean {
    if (this.value.status !== REVIEW_STATUS.APPROVED && this.value.status !== REVIEW_STATUS.PENDING) {
      return false;
    }
    const created = new Date(this.value.createdAt).getTime();
    const current = new Date(now).getTime();
    const hoursDiff = (current - created) / (1000 * 60 * 60);
    return hoursDiff <= REVIEW.EDIT_WINDOW_HOURS;
  }

  /**
   * Business rule: is spam threshold exceeded
   */
  isSpamSuspicious(): boolean {
    return this.value.reportCount >= 5;
  }

  /**
   * Business rule: check if this review is high quality
   */
  isHighQuality(): boolean {
    const hasLongComment = this.value.comment.value.length >= 100;
    const hasImages = this.value.images.length > 0;
    const isPositive = this.value.rating.isPositive();
    return isPositive && (hasLongComment || hasImages);
  }
}
