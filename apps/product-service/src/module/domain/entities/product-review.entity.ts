/**
 * ProductReviewEntity — Aggregate Root (standalone)
 * @module product-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { ProductReviewVO } from '../value-objects/composites/product-review.vo.js';
import {
  ReviewSubmittedEvent,
  ReviewApprovedEvent,
  ReviewRejectedEvent,
  ReviewMarkedHelpfulEvent,
  ReviewReportedEvent,
  ReviewDeletedEvent,
} from '../events/product-review.events.js';

export class ProductReviewEntity extends AggregateRoot<string> {
  private _vo: ProductReviewVO;
  private _deletedBy?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: ProductReviewVO,
    deletedBy?: string,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
    this._deletedBy = deletedBy;
  }

  get vo(): ProductReviewVO { return this._vo; }
  get reviewId(): ProductReviewVO['id'] { return this._vo.id; }
  get productId(): ProductReviewVO['productId'] { return this._vo.productId; }
  get userId(): string { return this._vo.userId; }
  get rating(): ProductReviewVO['rating'] { return this._vo.rating; }
  get status(): ProductReviewVO['status'] { return this._vo.status; }
  get helpfulCount(): number { return this._vo.helpfulCount; }
  get reportCount(): number { return this._vo.reportCount; }
  get deletedBy(): string | undefined { return this._deletedBy; }

  isPending(): boolean { return this.status.isPending(); }
  isApproved(): boolean { return this.status.isApproved(); }
  isRejected(): boolean { return this.status.isRejected(); }
  isSpam(): boolean { return this.status.isSpam(); }
  isDeleted(): boolean { return this.status.isDeleted(); }

  approve(approvedBy?: string, now: string = new Date().toISOString()): void {
    if (!this.isPending()) {
      throw new BusinessRuleError(
        `Cannot approve review in status "${this.status.value}"`,
        'INVALID_REVIEW_STATUS_TRANSITION',
        { reviewId: this.id, from: this.status.value, to: 'approved' },
      );
    }
    const from = this.status.value;
    this._vo = ProductReviewVO.create({
      ...this._vo.value,
      status: this.status.constructor === Object ? this.status : this._vo.status,
    });
    // Simpler: rebuild with approved status
    this._vo = ProductReviewVO.reconstitute({
      ...this._vo.value,
      status: ProductReviewVO.reconstitute(this._vo.value).status,
    });
    this._vo = this.withStatus('approved');
    this.addDomainEvent(
      new ReviewApprovedEvent({
        aggregateId: this.id,
        payload: {
          reviewId: this.id,
          productId: this.productId.value,
          approvedBy,
          approvedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  reject(reason: string, now: string = new Date().toISOString()): void {
    if (!reason || reason.trim().length === 0) {
      throw new BusinessRuleError(
        'Rejection reason is required',
        'REVIEW_REJECTION_REASON_REQUIRED',
        { reviewId: this.id },
      );
    }
    if (!this.isPending()) {
      throw new BusinessRuleError(
        `Cannot reject review in status "${this.status.value}"`,
        'INVALID_REVIEW_STATUS_TRANSITION',
        { reviewId: this.id, from: this.status.value, to: 'rejected' },
      );
    }
    this._vo = this.withStatus('rejected');
    this.addDomainEvent(
      new ReviewRejectedEvent({
        aggregateId: this.id,
        payload: {
          reviewId: this.id,
          productId: this.productId.value,
          reason,
          rejectedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markHelpful(now: string = new Date().toISOString()): void {
    const count = this._vo.helpfulCount + 1;
    this._vo = ProductReviewVO.create({ ...this._vo.value, helpfulCount: count });
    this.addDomainEvent(
      new ReviewMarkedHelpfulEvent({
        aggregateId: this.id,
        payload: { reviewId: this.id, helpfulCount: count, markedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  report(reason: string, now: string = new Date().toISOString()): void {
    const count = this._vo.reportCount + 1;
    this._vo = ProductReviewVO.create({ ...this._vo.value, reportCount: count });
    this.addDomainEvent(
      new ReviewReportedEvent({
        aggregateId: this.id,
        payload: { reviewId: this.id, reportCount: count, reason, reportedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  delete(deletedBy?: string, now: string = new Date().toISOString()): void {
    if (this.isDeleted()) return;
    this._vo = this.withStatus('deleted');
    this._deletedBy = deletedBy;
    (this as unknown as { deletedAt: string | null }).deletedAt = now;
    this.addDomainEvent(
      new ReviewDeletedEvent({
        aggregateId: this.id,
        payload: { reviewId: this.id, productId: this.productId.value, deletedAt: now, deletedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private withStatus(next: 'pending' | 'approved' | 'rejected' | 'spam' | 'deleted'): ProductReviewVO {
    // We rebuild the review VO with a fresh status VO
    const baseStatus = this._vo.status;
    // Rebuild via reconstitute — safe because we preserve all other props
    const propsWithNewStatus = {
      ...this._vo.value,
      status: Object.assign(Object.create(Object.getPrototypeOf(baseStatus)), {
        _value: next,
      }) as typeof baseStatus,
    };
    return ProductReviewVO.reconstitute(propsWithNewStatus);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vo: ProductReviewVO;
    now: string;
  }): ProductReviewEntity {
    if (!params.vo.status.isPending()) {
      throw new BusinessRuleError(
        'New review must be in pending status',
        'REVIEW_MUST_START_PENDING',
        { reviewId: params.id },
      );
    }
    const entity = new ProductReviewEntity(
      params.id,
      params.now,
      params.now,
      params.vo,
      undefined,
      null,
    );
    entity.addDomainEvent(
      new ReviewSubmittedEvent({
        aggregateId: params.id,
        payload: {
          reviewId: params.id,
          productId: params.vo.productId.value,
          userId: params.vo.userId,
          rating: params.vo.rating.value,
          submittedAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: ProductReviewVO;
    deletedBy?: string;
    version?: number;
  }): ProductReviewEntity {
    const entity = new ProductReviewEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedBy,
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
