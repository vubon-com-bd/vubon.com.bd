/**
 * VendorApprovalEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_APPROVAL } from '@vubon/shared-constants/business';

import {
  VendorApprovalVO,
  type VendorApprovalVOProps,
} from '../value-objects/composites/vendor-approval.vo.js';
import { ApprovalStatusVO } from '../value-objects/primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../value-objects/primitives/approval-reason.vo.js';

export interface VendorApprovalEntityProps {
  readonly vo: VendorApprovalVO;
}

export class VendorApprovalEntity extends BaseEntity<string> {
  private _vo: VendorApprovalVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorApprovalEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorApprovalVO { return this._vo; }
  get approvalId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get status() { return this._vo.status; }
  get reason() { return this._vo.reason; }
  get notes(): string | undefined { return this._vo.notes; }
  get requestedAt(): string { return this._vo.requestedAt; }
  get decidedAt(): string | undefined { return this._vo.decidedAt; }
  get decidedBy(): string | undefined { return this._vo.decidedBy; }
  get score(): number | undefined { return this._vo.score; }
  get resubmissionCount(): number { return this._vo.resubmissionCount; }
  get appealDeadline(): string | undefined { return this._vo.appealDeadline; }
  get pendingDays(): number { return this._vo.pendingDays; }

  // ═══ Predicates ═══
  isPending(): boolean { return this._vo.isPending(); }
  isApproved(): boolean { return this._vo.isApproved(); }
  isRejected(): boolean { return this._vo.isRejected(); }
  isInfoRequested(): boolean { return this._vo.isInfoRequested(); }
  isUnderAppeal(): boolean { return this._vo.isUnderAppeal(); }
  canBeAutoApproved(): boolean { return this._vo.canBeAutoApproved(); }
  canResubmit(): boolean { return this._vo.canResubmit(); }
  canAppeal(): boolean { return this._vo.canAppeal(); }
  isOverdue(): boolean { return this._vo.isOverdue(); }

  // ═══ Business Actions ═══
  approve(decidedBy: string, notes?: string, now: string = new Date().toISOString()): void {
    if (!this.status.isAwaitingAction()) {
      throw new BusinessRuleError(
        `Cannot approve in status "${this.status.value}"`,
        'APPROVAL_CANNOT_BE_APPROVED',
        { approvalId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorApprovalVO.create({
      ...current,
      status: ApprovalStatusVO.approved(),
      decidedAt: now,
      decidedBy,
      notes: notes ?? current.notes,
    });
    this.touch(now);
  }

  reject(
    reason: ApprovalReasonVO,
    decidedBy: string,
    notes?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.status.isAwaitingAction()) {
      throw new BusinessRuleError(
        `Cannot reject in status "${this.status.value}"`,
        'APPROVAL_CANNOT_BE_REJECTED',
        { approvalId: this.id, status: this.status.value },
      );
    }
    const appealDeadline = new Date(now);
    appealDeadline.setDate(appealDeadline.getDate() + VENDOR_APPROVAL.APPEAL_WINDOW_DAYS);

    const current = this._vo.value;
    this._vo = VendorApprovalVO.create({
      ...current,
      status: ApprovalStatusVO.rejected(),
      reason,
      decidedAt: now,
      decidedBy,
      notes: notes ?? current.notes,
      appealDeadline: appealDeadline.toISOString(),
    });
    this.touch(now);
  }

  requestInfo(
    infoNeeded: string,
    decidedBy: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!infoNeeded || infoNeeded.trim().length === 0) {
      throw new ValidationError('infoNeeded is required', 'notes');
    }
    if (!this.status.isAwaitingAction()) {
      throw new BusinessRuleError(
        `Cannot request info in status "${this.status.value}"`,
        'APPROVAL_CANNOT_REQUEST_INFO',
        { approvalId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorApprovalVO.create({
      ...current,
      status: ApprovalStatusVO.infoRequested(),
      decidedAt: now,
      decidedBy,
      notes: infoNeeded,
    });
    this.touch(now);
  }

  resubmit(now: string = new Date().toISOString()): void {
    if (!this.canResubmit()) {
      throw new BusinessRuleError(
        `Cannot resubmit: exceeded max resubmissions (${VENDOR_APPROVAL.MAX_RESUBMISSIONS})`,
        'MAX_RESUBMISSIONS_EXCEEDED',
        { approvalId: this.id, count: this.resubmissionCount },
      );
    }
    const current = this._vo.value;
    this._vo = VendorApprovalVO.create({
      ...current,
      status: ApprovalStatusVO.pending(),
      resubmissionCount: this.resubmissionCount + 1,
      decidedAt: undefined,
      decidedBy: undefined,
    });
    this.touch(now);
  }

  appeal(now: string = new Date().toISOString()): void {
    if (!this.canAppeal()) {
      throw new BusinessRuleError(
        'Cannot appeal: not rejected or appeal window closed',
        'APPEAL_WINDOW_CLOSED',
        { approvalId: this.id },
      );
    }
    const current = this._vo.value;
    this._vo = VendorApprovalVO.create({
      ...current,
      status: ApprovalStatusVO.underAppeal(),
    });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorApprovalVO;
    now: string;
  }): VendorApprovalEntity {
    return new VendorApprovalEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorApprovalEntityProps;
  }): VendorApprovalEntity {
    return new VendorApprovalEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
