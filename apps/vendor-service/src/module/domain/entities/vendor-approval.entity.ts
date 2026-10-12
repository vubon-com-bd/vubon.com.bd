/**
 * VendorApprovalEntity — approval workflow state
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_APPROVAL } from '@vubon/shared-constants/business';
import { ApprovalStatusVO } from '../value-objects/primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../value-objects/primitives/approval-reason.vo.js';

export interface VendorApprovalEntityProps {
  readonly vendorId: string;
  readonly status: ApprovalStatusVO;
  readonly reason?: ApprovalReasonVO;
  readonly reviewerNote?: string;
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly reviewedBy?: string;
  readonly resubmissionCount: number;
  readonly appealDeadline?: string;
  readonly appealSubmittedAt?: string;
  readonly slaDeadline?: string;
}

export class VendorApprovalEntity extends AggregateRoot<string> {
  private _status: ApprovalStatusVO;
  private _reason?: ApprovalReasonVO;
  private _reviewerNote?: string;
  private _reviewedAt?: string;
  private _reviewedBy?: string;
  private _resubmissionCount: number;
  private _appealDeadline?: string;
  private _appealSubmittedAt?: string;

  private readonly _vendorId: string;
  private readonly _submittedAt: string;
  private readonly _slaDeadline?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorApprovalEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._status = props.status;
    this._reason = props.reason;
    this._reviewerNote = props.reviewerNote;
    this._submittedAt = props.submittedAt;
    this._reviewedAt = props.reviewedAt;
    this._reviewedBy = props.reviewedBy;
    this._resubmissionCount = props.resubmissionCount;
    this._appealDeadline = props.appealDeadline;
    this._appealSubmittedAt = props.appealSubmittedAt;
    this._slaDeadline = props.slaDeadline;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (Number.isNaN(Date.parse(this._submittedAt))) {
      throw new ValidationError('submittedAt must be a valid ISO timestamp', 'submittedAt');
    }
    if (this._resubmissionCount < 0 || !Number.isInteger(this._resubmissionCount)) {
      throw new ValidationError('Resubmission count must be a non-negative integer', 'resubmissionCount');
    }
    if (this._resubmissionCount > VENDOR_APPROVAL.MAX_RESUBMISSIONS) {
      throw new ValidationError(
        `Resubmission count cannot exceed ${VENDOR_APPROVAL.MAX_RESUBMISSIONS}`,
        'resubmissionCount',
      );
    }
    if (this._status.isRejected() && !this._reason) {
      throw new ValidationError('Rejected approval requires a reason', 'reason');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get status(): ApprovalStatusVO { return this._status; }
  get reason(): ApprovalReasonVO | undefined { return this._reason; }
  get submittedAt(): string { return this._submittedAt; }
  get reviewedAt(): string | undefined { return this._reviewedAt; }
  get resubmissionCount(): number { return this._resubmissionCount; }
  get appealDeadline(): string | undefined { return this._appealDeadline; }

  get reviewedBy(): string | undefined { return this._reviewedBy; }
  get reviewerNote(): string | undefined { return this._reviewerNote; }
  get appealSubmittedAt(): string | undefined { return this._appealSubmittedAt; }
  get slaDeadline(): string | undefined { return this._slaDeadline; }

  isSlaBreached(at: Date = new Date()): boolean {
    if (this._status.isFinal()) return false;
    if (!this._slaDeadline) return false;
    return at.getTime() > Date.parse(this._slaDeadline);
  }

  canResubmit(): boolean {
    return this._status.isActionableByVendor()
      && this._resubmissionCount < VENDOR_APPROVAL.MAX_RESUBMISSIONS;
  }

  canAppeal(at: Date = new Date()): boolean {
    if (!this._status.isRejected()) return false;
    if (this._appealSubmittedAt) return false;
    if (!this._appealDeadline) return false;
    return at.getTime() <= Date.parse(this._appealDeadline);
  }

  approve(reviewedBy: string, note?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('approved');
    this._status = ApprovalStatusVO.approved();
    this._reviewedAt = now;
    this._reviewedBy = reviewedBy;
    this._reviewerNote = note;
    this._reason = ApprovalReasonVO.complete();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  reject(reviewedBy: string, reason: ApprovalReasonVO, note?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('rejected');
    if (!(reason instanceof ApprovalReasonVO)) {
      throw new ValidationError('Reason must be ApprovalReasonVO', 'reason');
    }
    this._status = ApprovalStatusVO.rejected();
    this._reason = reason;
    this._reviewerNote = note;
    this._reviewedAt = now;
    this._reviewedBy = reviewedBy;
    this._appealDeadline = VendorApprovalEntity.computeAppealDeadline(now);
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  requestInfo(reviewedBy: string, note: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('info_requested');
    if (!note || note.trim().length === 0) {
      throw new ValidationError('Info request note is required', 'note');
    }
    this._status = ApprovalStatusVO.infoRequested();
    this._reviewerNote = note.trim();
    this._reviewedAt = now;
    this._reviewedBy = reviewedBy;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  resubmit(now: string = new Date().toISOString()): void {
    if (!this.canResubmit()) {
      throw new BusinessRuleError(
        `Cannot resubmit (status: ${this._status.value}, resubmissions: ${this._resubmissionCount}/${VENDOR_APPROVAL.MAX_RESUBMISSIONS})`,
        'APPROVAL_CANNOT_RESUBMIT',
        { approvalId: this.id, status: this._status.value, resubmissions: this._resubmissionCount },
      );
    }
    this._status = ApprovalStatusVO.pending();
    this._resubmissionCount += 1;
    this._reviewedAt = undefined;
    this._reviewedBy = undefined;
    this._reviewerNote = undefined;
    this._reason = undefined;
    this._appealDeadline = undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  fileAppeal(now: string = new Date().toISOString()): void {
    if (!this.canAppeal(new Date(now))) {
      throw new BusinessRuleError(
        'Cannot file appeal',
        'APPEAL_WINDOW_CLOSED',
        { approvalId: this.id, appealDeadline: this._appealDeadline },
      );
    }
    this._status = ApprovalStatusVO.underAppeal();
    this._appealSubmittedAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid approval transition: "${this._status.value}" → "${target}"`,
        'INVALID_APPROVAL_TRANSITION',
        { from: this._status.value, to: target },
      );
    }
  }

  static computeAppealDeadline(rejectedAt: string): string {
    const base = new Date(rejectedAt);
    return new Date(base.getTime() + VENDOR_APPROVAL.APPEAL_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();
  }

  static computeSlaDeadline(submittedAt: string): string {
    const base = new Date(submittedAt);
    return new Date(base.getTime() + VENDOR_APPROVAL.REVIEW_SLA_HOURS * 60 * 60 * 1000).toISOString();
  }

  static create(params: {
    id: string;
    vendorId: string;
    now: string;
  }): VendorApprovalEntity {
    return new VendorApprovalEntity(
      params.id,
      params.now,
      params.now,
      {
        vendorId: params.vendorId,
        status: ApprovalStatusVO.pending(),
        submittedAt: params.now,
        resubmissionCount: 0,
        slaDeadline: VendorApprovalEntity.computeSlaDeadline(params.now),
      },
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorApprovalEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorApprovalEntity {
    const entity = new VendorApprovalEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
