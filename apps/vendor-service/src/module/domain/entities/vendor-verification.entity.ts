/**
 * VendorVerificationEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_VERIFICATION } from '@vubon/shared-constants/business';

import {
  VendorVerificationVO,
  type VendorVerificationVOProps,
} from '../value-objects/composites/vendor-verification.vo.js';
import { VerificationStatusVO } from '../value-objects/primitives/verification-status.vo.js';

export interface VendorVerificationEntityProps {
  readonly vo: VendorVerificationVO;
}

export class VendorVerificationEntity extends BaseEntity<string> {
  private _vo: VendorVerificationVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorVerificationEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorVerificationVO { return this._vo; }
  get verificationId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get type() { return this._vo.type; }
  get status() { return this._vo.status; }
  get referenceId(): string | undefined { return this._vo.referenceId; }
  get submittedAt(): string { return this._vo.submittedAt; }
  get reviewedAt(): string | undefined { return this._vo.reviewedAt; }
  get reviewedBy(): string | undefined { return this._vo.reviewedBy; }
  get expiresAt(): string | undefined { return this._vo.expiresAt; }
  get rejectionReason(): string | undefined { return this._vo.rejectionReason; }
  get attempts(): number { return this._vo.attempts; }
  get ageInDays(): number { return this._vo.ageInDays; }
  get daysUntilExpiry(): number | null { return this._vo.daysUntilExpiry; }

  // ═══ Predicates ═══
  isNotStarted(): boolean { return this._vo.isNotStarted(); }
  isPending(): boolean { return this._vo.isPending(); }
  isInReview(): boolean { return this._vo.isInReview(); }
  isApproved(): boolean { return this._vo.isApproved(); }
  isRejected(): boolean { return this._vo.isRejected(); }
  isExpired(): boolean { return this._vo.isExpired(); }
  canBeReviewed(): boolean { return this._vo.canBeReviewed(); }
  canResubmit(): boolean { return this._vo.canResubmit(); }
  isOverdue(): boolean { return this._vo.isOverdue(); }
  isExpiringSoon(days = 30): boolean { return this._vo.isExpiringSoon(days); }
  hasExceededAttempts(max = 3): boolean { return this._vo.hasExceededAttempts(max); }

  // ═══ Business Actions ═══
  submit(referenceId?: string, now: string = new Date().toISOString()): void {
    if (this.isPending() || this.isInReview()) {
      throw new BusinessRuleError(
        `Cannot submit verification already in "${this.status.value}"`,
        'VERIFICATION_ALREADY_SUBMITTED',
        { verificationId: this.id },
      );
    }
    if (this.hasExceededAttempts()) {
      throw new BusinessRuleError(
        `Verification exceeded max attempts`,
        'VERIFICATION_MAX_ATTEMPTS_EXCEEDED',
        { verificationId: this.id, attempts: this.attempts },
      );
    }
    const current = this._vo.value;
    this._vo = VendorVerificationVO.create({
      ...current,
      status: VerificationStatusVO.pending(),
      referenceId: referenceId ?? current.referenceId,
      submittedAt: now,
      attempts: this.attempts + 1,
      rejectionReason: undefined,
      reviewedAt: undefined,
      reviewedBy: undefined,
    });
    this.touch(now);
  }

  startReview(reviewedBy: string, now: string = new Date().toISOString()): void {
    if (!this.isPending()) {
      throw new BusinessRuleError(
        `Cannot start review for verification in status "${this.status.value}"`,
        'VERIFICATION_CANNOT_START_REVIEW',
        { verificationId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorVerificationVO.create({
      ...current,
      status: VerificationStatusVO.inReview(),
      reviewedBy,
    });
    this.touch(now);
  }

  approve(reviewedBy: string, now: string = new Date().toISOString()): void {
    if (!this.canBeReviewed()) {
      throw new BusinessRuleError(
        `Cannot approve verification in status "${this.status.value}"`,
        'VERIFICATION_CANNOT_BE_APPROVED',
        { verificationId: this.id, status: this.status.value },
      );
    }
    const expiryDate = new Date(now);
    expiryDate.setDate(expiryDate.getDate() + VENDOR_VERIFICATION.EXPIRY_DAYS);

    const current = this._vo.value;
    this._vo = VendorVerificationVO.create({
      ...current,
      status: VerificationStatusVO.approved(),
      reviewedAt: now,
      reviewedBy,
      expiresAt: expiryDate.toISOString(),
      rejectionReason: undefined,
    });
    this.touch(now);
  }

  reject(reason: string, reviewedBy: string, now: string = new Date().toISOString()): void {
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Rejection reason is required', 'rejectionReason');
    }
    if (!this.canBeReviewed()) {
      throw new BusinessRuleError(
        `Cannot reject verification in status "${this.status.value}"`,
        'VERIFICATION_CANNOT_BE_REJECTED',
        { verificationId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorVerificationVO.create({
      ...current,
      status: VerificationStatusVO.rejected(),
      reviewedAt: now,
      reviewedBy,
      rejectionReason: reason,
    });
    this.touch(now);
  }

  markExpired(now: string = new Date().toISOString()): void {
    if (!this.isApproved()) return;
    const current = this._vo.value;
    this._vo = VendorVerificationVO.create({
      ...current,
      status: VerificationStatusVO.expired(),
    });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorVerificationVO;
    now: string;
  }): VendorVerificationEntity {
    return new VendorVerificationEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorVerificationEntityProps;
  }): VendorVerificationEntity {
    return new VendorVerificationEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
