/**
 * VendorReviewVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * একটি buyer review, যা vendor aggregate-এর সাথে যুক্ত।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_REVIEW } from '@vubon/shared-constants/business';

import { ReviewIdVO } from '../primitives/review-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { RatingValueVO } from '../primitives/rating-value.vo.js';
import { ReviewContentVO } from '../primitives/review-content.vo.js';
import { ReviewStatusVO } from '../primitives/review-status.vo.js';

export interface VendorReviewVOProps {
  readonly id: ReviewIdVO;
  readonly vendorId: VendorIdVO;
  readonly userId: UserIdVO;
  readonly orderId?: OrderIdVO;
  readonly productId?: ProductIdVO;
  readonly rating: RatingValueVO;
  readonly content: ReviewContentVO;
  readonly title?: string;
  readonly status: ReviewStatusVO;
  readonly isVerifiedPurchase: boolean;
  readonly helpfulCount: number;
  readonly flaggedCount: number;
  readonly vendorReply?: string;
  readonly vendorRepliedAt?: string;
  readonly submittedAt: string;
  readonly moderatedAt?: string;
  readonly moderatedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorReviewVO extends BaseVO<VendorReviewVOProps> {
  private constructor(props: VendorReviewVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorReviewVOProps): VendorReviewVO {
    const vo = new VendorReviewVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorReviewVOProps): VendorReviewVO {
    return new VendorReviewVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.title && v.title.length > 200) {
      throw new ValidationError('Review title max 200 chars', 'title');
    }

    if (!Number.isInteger(v.helpfulCount) || v.helpfulCount < 0) {
      throw new ValidationError('helpfulCount must be non-negative integer', 'helpfulCount');
    }
    if (!Number.isInteger(v.flaggedCount) || v.flaggedCount < 0) {
      throw new ValidationError('flaggedCount must be non-negative integer', 'flaggedCount');
    }

    if (v.vendorReply) {
      if (v.vendorReply.length > 2000) {
        throw new ValidationError('vendorReply max 2000 chars', 'vendorReply');
      }
      if (!v.vendorRepliedAt) {
        throw new ValidationError('vendorReply must have vendorRepliedAt', 'vendorRepliedAt');
      }
    }
    if (!v.vendorReply && v.vendorRepliedAt) {
      throw new ValidationError('vendorRepliedAt requires vendorReply', 'vendorReply');
    }

    if (v.isVerifiedPurchase && !v.orderId) {
      throw new ValidationError('Verified purchase must have orderId', 'orderId');
    }

    if (v.status.isApproved() && !v.moderatedAt) {
      throw new ValidationError('Approved review must have moderatedAt', 'moderatedAt');
    }
    if (v.status.isRejected() && !v.moderatedAt) {
      throw new ValidationError('Rejected review must have moderatedAt', 'moderatedAt');
    }
  }

  // ─── Getters ───
  get id(): ReviewIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get userId(): UserIdVO { return this.value.userId; }
  get orderId(): OrderIdVO | undefined { return this.value.orderId; }
  get productId(): ProductIdVO | undefined { return this.value.productId; }
  get rating(): RatingValueVO { return this.value.rating; }
  get content(): ReviewContentVO { return this.value.content; }
  get title(): string | undefined { return this.value.title; }
  get status(): ReviewStatusVO { return this.value.status; }
  get isVerifiedPurchase(): boolean { return this.value.isVerifiedPurchase; }
  get helpfulCount(): number { return this.value.helpfulCount; }
  get flaggedCount(): number { return this.value.flaggedCount; }
  get vendorReply(): string | undefined { return this.value.vendorReply; }
  get vendorRepliedAt(): string | undefined { return this.value.vendorRepliedAt; }
  get submittedAt(): string { return this.value.submittedAt; }
  get moderatedAt(): string | undefined { return this.value.moderatedAt; }
  get moderatedBy(): string | undefined { return this.value.moderatedBy; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isPending(): boolean { return this.status.isPending(); }
  isApproved(): boolean { return this.status.isApproved(); }
  isRejected(): boolean { return this.status.isRejected(); }
  isFlagged(): boolean { return this.status.isFlagged(); }
  isHidden(): boolean { return this.status.isHidden(); }

  isPositive(): boolean { return this.rating.isPositive(); }
  isNegative(): boolean { return this.rating.isNegative(); }
  isNeutral(): boolean { return this.rating.isNeutral(); }

  hasTitle(): boolean { return this.title !== undefined; }
  hasReply(): boolean { return this.vendorReply !== undefined; }
  hasProduct(): boolean { return this.productId !== undefined; }
  hasOrder(): boolean { return this.orderId !== undefined; }

  /** Counts toward vendor rating */
  countsTowardRating(): boolean {
    return this.status.countsTowardRating();
  }

  /** Publicly visible */
  isVisible(): boolean {
    return this.status.isVisible();
  }

  /** Needs moderator action */
  needsModeration(): boolean {
    return this.status.needsModeration();
  }

  /** Vendor can reply (no reply yet, is approved) */
  canReply(): boolean {
    return this.isApproved() && !this.hasReply();
  }

  /** Is flagged for review (many flags) */
  hasManyFlags(threshold = VENDOR_REVIEW.FLAG_THRESHOLD): boolean {
    return this.flaggedCount >= threshold;
  }

  /** Age in days */
  get ageInDays(): number {
    const diff = Date.now() - new Date(this.submittedAt).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /** Is recent (within last 30 days) */
  isRecent(): boolean {
    return this.ageInDays <= 30;
  }
}
