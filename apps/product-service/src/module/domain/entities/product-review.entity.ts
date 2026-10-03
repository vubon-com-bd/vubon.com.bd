/**
 * ProductReviewEntity — Aggregate Root
 * @module product-service/domain/entities
 *
 * Business rules:
 * - Only APPROVED or PENDING reviews can be edited within 24h
 * - Report count >= 5 marks suspicious
 * - Helpful count cannot go negative (guarded on release)
 * - Rating must be 1-5
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { REVIEW, REVIEW_STATUS } from '@vubon/shared-constants/business/product';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ReviewIdVO } from '../value-objects/primitives/review-id.vo.js';
import { ReviewRatingVO } from '../value-objects/primitives/review-rating.vo.js';
import { ReviewCommentVO } from '../value-objects/primitives/review-comment.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import {
  ReviewSubmittedEvent,
  ReviewApprovedEvent,
  ReviewRejectedEvent,
  ReviewDeletedEvent,
  ReviewUpdatedEvent,
  ReviewHelpfulMarkedEvent,
  ReviewReportedEvent,
} from '../events/review.events.js';

export interface ProductReviewEntityProps {
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
  readonly updatedAt: string;
}

export class ProductReviewEntity extends AggregateRoot<string> {
  private readonly _productId: ProductIdVO;
  private readonly _userId: string;
  private readonly _orderId?: string;
  private _rating: ReviewRatingVO;
  private _title?: string;
  private _comment: ReviewCommentVO;
  private _images: readonly string[];
  private _status: string;
  private readonly _isVerifiedPurchase: boolean;
  private _helpfulCount: number;
  private _reportCount: number;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ProductReviewEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._userId = props.userId;
    this._orderId = props.orderId;
    this._rating = props.rating;
    this._title = props.title;
    this._comment = props.comment;
    this._images = Object.freeze([...props.images]);
    this._status = props.status;
    this._isVerifiedPurchase = props.isVerifiedPurchase;
    this._helpfulCount = props.helpfulCount;
    this._reportCount = props.reportCount;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._images.length > REVIEW.MAX_IMAGES) {
      throw new ValidationError(
        `Review cannot have more than ${REVIEW.MAX_IMAGES} images`,
        'images',
      );
    }
    if (this._title && this._title.length > REVIEW.TITLE_MAX_LENGTH) {
      throw new ValidationError(
        `Title cannot exceed ${REVIEW.TITLE_MAX_LENGTH} chars`,
        'title',
      );
    }
    if (this._helpfulCount < 0 || this._reportCount < 0) {
      throw new ValidationError('Counts cannot be negative', 'counts');
    }
  }

  // Getters
  get productId(): ProductIdVO { return this._productId; }
  get userId(): string { return this._userId; }
  get orderId(): string | undefined { return this._orderId; }
  get rating(): ReviewRatingVO { return this._rating; }
  get title(): string | undefined { return this._title; }
  get comment(): ReviewCommentVO { return this._comment; }
  get images(): readonly string[] { return this._images; }
  get status(): string { return this._status; }
  get isVerifiedPurchase(): boolean { return this._isVerifiedPurchase; }
  get helpfulCount(): number { return this._helpfulCount; }
  get reportCount(): number { return this._reportCount; }

  // ─── Business methods ─────────────────────────────────────

  public updateContent(params: {
    rating?: ReviewRatingVO;
    title?: string;
    comment?: ReviewCommentVO;
    images?: readonly string[];
    now: string;
  }): void {
    if (!this.isEditable(params.now)) {
      throw new BusinessRuleError(
        `Review "${this.id}" cannot be edited (window expired or status="${this._status}")`,
        'REVIEW_NOT_EDITABLE',
        { reviewId: this.id, status: this._status },
      );
    }

    const changedFields: string[] = [];
    const oldRating = this._rating.value;

    if (params.rating && params.rating.value !== oldRating) {
      this._rating = params.rating;
      changedFields.push('rating');
    }
    if (params.title !== undefined && params.title !== this._title) {
      if (params.title.length > REVIEW.TITLE_MAX_LENGTH) {
        throw new ValidationError(
          `Title cannot exceed ${REVIEW.TITLE_MAX_LENGTH} chars`,
          'title',
        );
      }
      this._title = params.title;
      changedFields.push('title');
    }
    if (params.comment && !params.comment.equals(this._comment)) {
      this._comment = params.comment;
      changedFields.push('comment');
    }
    if (params.images) {
      if (params.images.length > REVIEW.MAX_IMAGES) {
        throw new ValidationError(
          `Cannot have more than ${REVIEW.MAX_IMAGES} images`,
          'images',
        );
      }
      this._images = Object.freeze([...params.images]);
      changedFields.push('images');
    }

    if (changedFields.length === 0) return;

    this.addDomainEvent(new ReviewUpdatedEvent({
      aggregateId: this.id,
      payload: {
        reviewId: this.id,
        productId: this._productId.value,
        oldRating,
        newRating: this._rating.value,
        changedFields,
      },
      version: this.version + 1,
    }));
    this.incrementVersion();
  }

  public approve(moderatorId: string, reason?: string): void {
    if (this._status === REVIEW_STATUS.APPROVED) return;
    if (this._status === REVIEW_STATUS.DELETED) {
      throw new BusinessRuleError(
        'Cannot approve a deleted review',
        'REVIEW_DELETED',
      );
    }
    this._status = REVIEW_STATUS.APPROVED;
    this.addDomainEvent(new ReviewApprovedEvent({
      aggregateId: this.id,
      payload: {
        reviewId: this.id,
        productId: this._productId.value,
        moderatedBy: moderatorId,
        reason,
      },
      version: this.version + 1,
      metadata: { userId: moderatorId },
    }));
    this.incrementVersion();
  }

  public reject(moderatorId: string, reason: string): void {
    if (this._status === REVIEW_STATUS.DELETED) {
      throw new BusinessRuleError('Cannot reject a deleted review', 'REVIEW_DELETED');
    }
    this._status = REVIEW_STATUS.REJECTED;
    this.addDomainEvent(new ReviewRejectedEvent({
      aggregateId: this.id,
      payload: {
        reviewId: this.id,
        productId: this._productId.value,
        moderatedBy: moderatorId,
        reason,
      },
      version: this.version + 1,
      metadata: { userId: moderatorId },
    }));
    this.incrementVersion();
  }

  public markAsSpam(moderatorId: string): void {
    this._status = REVIEW_STATUS.SPAM;
    this.addDomainEvent(new ReviewRejectedEvent({
      aggregateId: this.id,
      payload: {
        reviewId: this.id,
        productId: this._productId.value,
        moderatedBy: moderatorId,
        reason: 'spam',
      },
      version: this.version + 1,
    }));
    this.incrementVersion();
  }

  public softDelete(deletedBy: string): void {
    if (this._status === REVIEW_STATUS.DELETED) return;
    this._status = REVIEW_STATUS.DELETED;
    this.addDomainEvent(new ReviewDeletedEvent({
      aggregateId: this.id,
      payload: {
        reviewId: this.id,
        productId: this._productId.value,
        deletedBy,
      },
      version: this.version + 1,
      metadata: { userId: deletedBy },
    }));
    this.incrementVersion();
  }

  public markHelpful(userId: string): void {
    if (this._status === REVIEW_STATUS.DELETED) {
      throw new BusinessRuleError('Cannot mark a deleted review', 'REVIEW_DELETED');
    }
    this._helpfulCount += 1;
    this.addDomainEvent(new ReviewHelpfulMarkedEvent({
      aggregateId: this.id,
      payload: {
        reviewId: this.id,
        productId: this._productId.value,
        markedBy: userId,
        helpfulCount: this._helpfulCount,
      },
      version: this.version + 1,
      metadata: { userId },
    }));
    this.incrementVersion();
  }

  public report(reporterId: string, reason: string): void {
    if (this._status === REVIEW_STATUS.DELETED) {
      throw new BusinessRuleError('Cannot report a deleted review', 'REVIEW_DELETED');
    }
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Report reason is required', 'reason');
    }
    this._reportCount += 1;
    this.addDomainEvent(new ReviewReportedEvent({
      aggregateId: this.id,
      payload: {
        reviewId: this.id,
        productId: this._productId.value,
        reportedBy: reporterId,
        reason,
        reportCount: this._reportCount,
      },
      version: this.version + 1,
      metadata: { userId: reporterId },
    }));
    this.incrementVersion();
  }

  // ─── Queries ──────────────────────────────────────────────

  public isEditable(now: string): boolean {
    const editableStatuses: readonly string[] = [REVIEW_STATUS.APPROVED, REVIEW_STATUS.PENDING];
    if (!editableStatuses.includes(this._status)) return false;
    const created = new Date(this.createdAt).getTime();
    const current = new Date(now).getTime();
    const hoursDiff = (current - created) / (1000 * 60 * 60);
    return hoursDiff <= REVIEW.EDIT_WINDOW_HOURS;
  }

  public isSpamSuspicious(): boolean {
    return this._reportCount >= 5;
  }

  public isHighQuality(): boolean {
    const hasLongComment = this._comment.value.length >= 100;
    const hasImages = this._images.length > 0;
    const isPositive = this._rating.isPositive();
    return isPositive && (hasLongComment || hasImages);
  }

  public isApproved(): boolean {
    return this._status === REVIEW_STATUS.APPROVED;
  }

  public isVisible(): boolean {
    return this._status === REVIEW_STATUS.APPROVED;
  }

  // Factories
  public static create(params: {
    id: string;
    props: ProductReviewEntityProps;
    now: string;
  }): ProductReviewEntity {
    const entity = new ProductReviewEntity(
      params.id,
      params.now,
      params.now,
      params.props,
    );
    entity.addDomainEvent(new ReviewSubmittedEvent({
      aggregateId: params.id,
      payload: {
        reviewId: params.id,
        productId: params.props.productId.value,
        userId: params.props.userId,
        rating: params.props.rating.value,
        hasComment: params.props.comment.value.length > 0,
        imageCount: params.props.images.length,
        isVerifiedPurchase: params.props.isVerifiedPurchase,
      },
      version: 1,
      metadata: { userId: params.props.userId },
    }));
    entity.incrementVersion();
    return entity;
  }

  public static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: ProductReviewEntityProps;
  }): ProductReviewEntity {
    return new ProductReviewEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
