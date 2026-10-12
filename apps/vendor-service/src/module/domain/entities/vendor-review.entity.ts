/**
 * VendorReviewEntity — a single customer review
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_REVIEW } from '@vubon/shared-constants/business';
import { RatingScoreVO } from '../value-objects/primitives/rating-score.vo.js';
import { VendorReviewStatusVO } from '../value-objects/primitives/vendor-review-status.vo.js';
import { VendorReviewCategoryVO } from '../value-objects/primitives/vendor-review-category.vo.js';

export interface ReviewCategoryScore {
  readonly category: VendorReviewCategoryVO;
  readonly score: number;
}

export interface VendorReviewEntityProps {
  readonly vendorId: string;
  readonly userId: string;
  readonly orderId: string;
  readonly rating: RatingScoreVO;
  readonly comment?: string;
  readonly categories: readonly ReviewCategoryScore[];
  readonly status: VendorReviewStatusVO;
  readonly isVerifiedPurchase: boolean;
  readonly flagCount: number;
  readonly hiddenReason?: string;
  readonly createdAt: string;
}

export class VendorReviewEntity extends AggregateRoot<string> {
  private _status: VendorReviewStatusVO;
  private _comment?: string;
  private _categories: ReviewCategoryScore[];
  private _flagCount: number;
  private _hiddenReason?: string;

  private readonly _vendorId: string;
  private readonly _userId: string;
  private readonly _orderId: string;
  private readonly _rating: RatingScoreVO;
  private readonly _isVerifiedPurchase: boolean;
  private readonly _createdAtOriginal: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorReviewEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._userId = props.userId;
    this._orderId = props.orderId;
    this._rating = props.rating;
    this._comment = props.comment;
    this._categories = [...props.categories];
    this._status = props.status;
    this._isVerifiedPurchase = props.isVerifiedPurchase;
    this._flagCount = props.flagCount;
    this._hiddenReason = props.hiddenReason;
    this._createdAtOriginal = props.createdAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._comment !== undefined) {
      if (this._comment.length < VENDOR_REVIEW.MIN_CONTENT_LENGTH) {
        throw new ValidationError(
          `Review comment must be at least ${VENDOR_REVIEW.MIN_CONTENT_LENGTH} chars`,
          'comment',
        );
      }
      if (this._comment.length > VENDOR_REVIEW.MAX_CONTENT_LENGTH) {
        throw new ValidationError(
          `Review comment cannot exceed ${VENDOR_REVIEW.MAX_CONTENT_LENGTH} chars`,
          'comment',
        );
      }
    }
    if (this._categories.length > 20) {
      throw new ValidationError('Categories cannot exceed 20', 'categories');
    }
    if (this._flagCount < 0 || !Number.isInteger(this._flagCount)) {
      throw new ValidationError('Flag count must be a non-negative integer', 'flagCount');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get userId(): string { return this._userId; }
  get orderId(): string { return this._orderId; }
  get rating(): RatingScoreVO { return this._rating; }
  get comment(): string | undefined { return this._comment; }
  get categories(): readonly ReviewCategoryScore[] { return this._categories; }
  get status(): VendorReviewStatusVO { return this._status; }
  get isVerifiedPurchase(): boolean { return this._isVerifiedPurchase; }
  get flagCount(): number { return this._flagCount; }

  get hiddenReason(): string | undefined { return this._hiddenReason; }

  isApproved(): boolean { return this._status.isApproved(); }
  isFlagged(): boolean { return this._status.isFlagged(); }
  isHidden(): boolean { return this._status.isHidden(); }
  isPubliclyVisible(): boolean { return this._status.isPubliclyVisible(); }
  hasComment(): boolean { return this._comment !== undefined && this._comment.length > 0; }

  getCategoryScore(category: VendorReviewCategoryVO): number | undefined {
    return this._categories.find((c) => c.category.value === category.value)?.score;
  }

  approve(now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('approved')) {
      throw new BusinessRuleError(
        `Cannot approve from status "${this._status.value}"`,
        'REVIEW_NOT_APPROVABLE',
        { reviewId: this.id, status: this._status.value },
      );
    }
    this._status = VendorReviewStatusVO.approved();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  reject(reason: string, now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('rejected')) {
      throw new BusinessRuleError(
        `Cannot reject from status "${this._status.value}"`,
        'REVIEW_NOT_REJECTABLE',
        { reviewId: this.id, status: this._status.value },
      );
    }
    this._status = VendorReviewStatusVO.rejected();
    this._hiddenReason = reason;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  flag(reason: string, now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('flagged')) {
      throw new BusinessRuleError(
        `Cannot flag from status "${this._status.value}"`,
        'REVIEW_NOT_FLAGGABLE',
        { reviewId: this.id, status: this._status.value },
      );
    }
    this._flagCount += 1;
    this._hiddenReason = reason;
    if (this._flagCount >= VENDOR_REVIEW.FLAG_THRESHOLD) {
      this._status = VendorReviewStatusVO.hidden();
    } else {
      this._status = VendorReviewStatusVO.flagged();
    }
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  hide(reason: string, now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('hidden')) {
      throw new BusinessRuleError(
        `Cannot hide from status "${this._status.value}"`,
        'REVIEW_NOT_HIDEABLE',
        { reviewId: this.id, status: this._status.value },
      );
    }
    this._status = VendorReviewStatusVO.hidden();
    this._hiddenReason = reason;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  restore(now: string = new Date().toISOString()): void {
    if (!this._status.isHidden() && !this._status.isFlagged()) {
      throw new BusinessRuleError(
        `Cannot restore from status "${this._status.value}"`,
        'REVIEW_NOT_RESTORABLE',
        { reviewId: this.id, status: this._status.value },
      );
    }
    this._status = VendorReviewStatusVO.approved();
    this._flagCount = 0;
    this._hiddenReason = undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    vendorId: string;
    userId: string;
    orderId: string;
    rating: RatingScoreVO;
    comment?: string;
    categories?: readonly ReviewCategoryScore[];
    isVerifiedPurchase: boolean;
    now: string;
  }): VendorReviewEntity {
    return new VendorReviewEntity(params.id, params.now, params.now, {
      vendorId: params.vendorId,
      userId: params.userId,
      orderId: params.orderId,
      rating: params.rating,
      comment: params.comment,
      categories: params.categories ?? [],
      status: VendorReviewStatusVO.pending(),
      isVerifiedPurchase: params.isVerifiedPurchase,
      flagCount: 0,
      createdAt: params.now,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorReviewEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorReviewEntity {
    const entity = new VendorReviewEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
