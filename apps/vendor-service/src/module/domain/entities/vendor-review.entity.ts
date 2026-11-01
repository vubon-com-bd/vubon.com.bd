/**
 * VendorReviewEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_REVIEW } from '@vubon/shared-constants/business';

import {
  VendorReviewVO,
  type VendorReviewVOProps,
} from '../value-objects/composites/vendor-review.vo.js';
import { ReviewStatusVO } from '../value-objects/primitives/review-status.vo.js';

export interface VendorReviewEntityProps {
  readonly vo: VendorReviewVO;
}

export class VendorReviewEntity extends BaseEntity<string> {
  private _vo: VendorReviewVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorReviewEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorReviewVO { return this._vo; }
  get reviewId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get userId() { return this._vo.userId; }
  get orderId() { return this._vo.orderId; }
  get productId() { return this._vo.productId; }
  get rating() { return this._vo.rating; }
  get content() { return this._vo.content; }
  get title(): string | undefined { return this._vo.title; }
  get status() { return this._vo.status; }
  get isVerifiedPurchase(): boolean { return this._vo.isVerifiedPurchase; }
  get helpfulCount(): number { return this._vo.helpfulCount; }
  get flaggedCount(): number { return this._vo.flaggedCount; }
  get vendorReply(): string | undefined { return this._vo.vendorReply; }
  get vendorRepliedAt(): string | undefined { return this._vo.vendorRepliedAt; }
  get submittedAt(): string { return this._vo.submittedAt; }
  get moderatedAt(): string | undefined { return this._vo.moderatedAt; }
  get moderatedBy(): string | undefined { return this._vo.moderatedBy; }
  get ageInDays(): number { return this._vo.ageInDays; }

  // ═══ Predicates ═══
  isPending(): boolean { return this._vo.isPending(); }
  isApproved(): boolean { return this._vo.isApproved(); }
  isRejected(): boolean { return this._vo.isRejected(); }
  isFlagged(): boolean { return this._vo.isFlagged(); }
  isHidden(): boolean { return this._vo.isHidden(); }
  isPositive(): boolean { return this._vo.isPositive(); }
  isNegative(): boolean { return this._vo.isNegative(); }
  isVisible(): boolean { return this._vo.isVisible(); }
  needsModeration(): boolean { return this._vo.needsModeration(); }
  canReply(): boolean { return this._vo.canReply(); }
  isRecent(): boolean { return this._vo.isRecent(); }
  hasManyFlags(threshold = VENDOR_REVIEW.FLAG_THRESHOLD): boolean {
    return this._vo.hasManyFlags(threshold);
  }

  // ═══ Business Actions ═══
  approve(moderatedBy: string, now: string = new Date().toISOString()): void {
    if (!this.needsModeration()) {
      throw new BusinessRuleError(
        `Cannot approve review in status "${this.status.value}"`,
        'REVIEW_CANNOT_BE_APPROVED',
        { reviewId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorReviewVO.create({
      ...current,
      status: ReviewStatusVO.approved(),
      moderatedAt: now,
      moderatedBy,
    });
    this.touch(now);
  }

  reject(moderatedBy: string, now: string = new Date().toISOString()): void {
    if (!this.needsModeration()) {
      throw new BusinessRuleError(
        `Cannot reject review in status "${this.status.value}"`,
        'REVIEW_CANNOT_BE_REJECTED',
        { reviewId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorReviewVO.create({
      ...current,
      status: ReviewStatusVO.rejected(),
      moderatedAt: now,
      moderatedBy,
    });
    this.touch(now);
  }

  flag(reason: string, flaggedBy: string, now: string = new Date().toISOString()): void {
    if (this.isRejected() || this.isHidden()) {
      throw new BusinessRuleError(
        `Cannot flag review in status "${this.status.value}"`,
        'REVIEW_CANNOT_BE_FLAGGED',
        { reviewId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorReviewVO.create({
      ...current,
      status: ReviewStatusVO.flagged(),
      flaggedCount: this.flaggedCount + 1,
      moderatedBy: flaggedBy,
    });
    this.touch(now);
  }

  hide(reason: string, hiddenBy: string, now: string = new Date().toISOString()): void {
    if (this.isRejected()) {
      throw new BusinessRuleError(
        `Cannot hide review in status "${this.status.value}"`,
        'REVIEW_CANNOT_BE_HIDDEN',
        { reviewId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorReviewVO.create({
      ...current,
      status: ReviewStatusVO.hidden(),
      moderatedAt: now,
      moderatedBy: hiddenBy,
    });
    this.touch(now);
  }

  reply(replyText: string, repliedBy: string, now: string = new Date().toISOString()): void {
    if (!this.canReply()) {
      throw new BusinessRuleError(
        `Cannot reply to review (already replied or not approved)`,
        'REVIEW_CANNOT_BE_REPLIED',
        { reviewId: this.id, status: this.status.value },
      );
    }
    if (!replyText || replyText.trim().length === 0) {
      throw new ValidationError('Reply text is required', 'vendorReply');
    }
    if (replyText.length > 2000) {
      throw new ValidationError('Reply max 2000 chars', 'vendorReply');
    }
    const current = this._vo.value;
    this._vo = VendorReviewVO.create({
      ...current,
      vendorReply: replyText,
      vendorRepliedAt: now,
    });
    this.touch(now);
  }

  markHelpful(now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorReviewVO.create({
      ...current,
      helpfulCount: this.helpfulCount + 1,
    });
    this.touch(now);
  }

  unmarkHelpful(now: string = new Date().toISOString()): void {
    if (this.helpfulCount === 0) return;
    const current = this._vo.value;
    this._vo = VendorReviewVO.create({
      ...current,
      helpfulCount: this.helpfulCount - 1,
    });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorReviewVO;
    now: string;
  }): VendorReviewEntity {
    return new VendorReviewEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorReviewEntityProps;
  }): VendorReviewEntity {
    return new VendorReviewEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
