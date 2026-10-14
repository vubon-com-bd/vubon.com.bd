/**
 * VendorApprovalVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর approval workflow record।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_APPROVAL } from '@vubon/shared-constants/business';

import { ApprovalIdVO } from '../primitives/approval-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { ApprovalStatusVO } from '../primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../primitives/approval-reason.vo.js';

export interface VendorApprovalVOProps {
  readonly id: ApprovalIdVO;
  readonly vendorId: VendorIdVO;
  readonly status: ApprovalStatusVO;
  readonly reason?: ApprovalReasonVO;
  readonly notes?: string;
  readonly requestedAt: string;
  readonly decidedAt?: string;
  readonly decidedBy?: string;
  readonly score?: number;
  readonly resubmissionCount: number;
  readonly appealDeadline?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorApprovalVO extends BaseVO<VendorApprovalVOProps> {
  private constructor(props: VendorApprovalVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorApprovalVOProps): VendorApprovalVO {
    const vo = new VendorApprovalVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorApprovalVOProps): VendorApprovalVO {
    return new VendorApprovalVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!Number.isInteger(v.resubmissionCount) || v.resubmissionCount < 0) {
      throw new ValidationError('resubmissionCount must be a non-negative integer', 'resubmissionCount');
    }
    if (v.resubmissionCount > VENDOR_APPROVAL.MAX_RESUBMISSIONS) {
      throw new ValidationError(
        `resubmissionCount cannot exceed ${VENDOR_APPROVAL.MAX_RESUBMISSIONS}`,
        'resubmissionCount',
      );
    }

    if (v.score !== undefined) {
      if (!Number.isFinite(v.score) || v.score < 0 || v.score > 100) {
        throw new ValidationError('score must be between 0 and 100', 'score');
      }
    }

    if (v.notes && v.notes.length > 2000) {
      throw new ValidationError('notes max 2000 chars', 'notes');
    }

    if (v.status.isApproved() && !v.decidedAt) {
      throw new ValidationError('Approved approval must have decidedAt', 'decidedAt');
    }
    if (v.status.isRejected() && !v.reason) {
      throw new ValidationError('Rejected approval must have a reason', 'reason');
    }
    if (v.status.isRejected() && !v.decidedAt) {
      throw new ValidationError('Rejected approval must have decidedAt', 'decidedAt');
    }

    if (v.appealDeadline && v.status.isRejected()) {
      if (new Date(v.appealDeadline) < new Date(v.decidedAt ?? v.requestedAt)) {
        throw new ValidationError('appealDeadline must be after decidedAt', 'appealDeadline');
      }
    }
  }

  // ─── Getters ───
  get id(): ApprovalIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get status(): ApprovalStatusVO { return this.value.status; }
  get reason(): ApprovalReasonVO | undefined { return this.value.reason; }
  get notes(): string | undefined { return this.value.notes; }
  get requestedAt(): string { return this.value.requestedAt; }
  get decidedAt(): string | undefined { return this.value.decidedAt; }
  get decidedBy(): string | undefined { return this.value.decidedBy; }
  get score(): number | undefined { return this.value.score; }
  get resubmissionCount(): number { return this.value.resubmissionCount; }
  get appealDeadline(): string | undefined { return this.value.appealDeadline; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isPending(): boolean { return this.status.isPending(); }
  isApproved(): boolean { return this.status.isApproved(); }
  isRejected(): boolean { return this.status.isRejected(); }
  isInfoRequested(): boolean { return this.status.isInfoRequested(); }
  isUnderAppeal(): boolean { return this.status.isUnderAppeal(); }

  hasReason(): boolean { return this.reason !== undefined; }
  hasNotes(): boolean { return this.notes !== undefined; }
  hasScore(): boolean { return this.score !== undefined; }
  hasDecider(): boolean { return this.decidedBy !== undefined; }

  /** Can be auto-approved (score-based) */
  canBeAutoApproved(): boolean {
    return (
      this.hasScore() &&
      (this.score ?? 0) >= VENDOR_APPROVAL.AUTO_APPROVE_THRESHOLD &&
      !this.isApproved() &&
      !this.isRejected()
    );
  }

  /** Can be resubmitted */
  canResubmit(): boolean {
    return (
      this.resubmissionCount < VENDOR_APPROVAL.MAX_RESUBMISSIONS &&
      (this.isInfoRequested() || this.isRejected())
    );
  }

  /** Can be appealed */
  canAppeal(): boolean {
    if (!this.isRejected() || !this.appealDeadline) return false;
    return new Date() < new Date(this.appealDeadline);
  }

  /** Days since request */
  get pendingDays(): number {
    if (this.decidedAt) {
      const diff = new Date(this.decidedAt).getTime() - new Date(this.requestedAt).getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
    const diff = Date.now() - new Date(this.requestedAt).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /** Exceeded review SLA */
  isOverdue(): boolean {
    if (!this.isPending() && !this.isInfoRequested()) return false;
    return this.pendingDays * 24 > VENDOR_APPROVAL.REVIEW_SLA_HOURS;
  }
}
