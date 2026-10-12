/**
 * VendorApprovalSummaryVO — approval state + reason + SLA tracking
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ApprovalStatusVO } from '../primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../primitives/approval-reason.vo.js';
import { VENDOR_APPROVAL } from '@vubon/shared-constants/business';

export interface VendorApprovalSummaryVOProps {
  readonly status: ApprovalStatusVO;
  readonly reason?: ApprovalReasonVO;
  readonly reviewerNote?: string;
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly reviewedBy?: string;
  readonly resubmissionCount: number;
  readonly appealDeadline?: string;
}

export class VendorApprovalSummaryVO extends BaseVO<VendorApprovalSummaryVOProps> {
  private constructor(props: VendorApprovalSummaryVOProps) {
    super(props);
  }

  static create(props: VendorApprovalSummaryVOProps): VendorApprovalSummaryVO {
    if (!(props.status instanceof ApprovalStatusVO)) {
      throw new ValidationError('Approval summary requires ApprovalStatusVO', 'status');
    }
    if (props.reason !== undefined && !(props.reason instanceof ApprovalReasonVO)) {
      throw new ValidationError('Approval reason must be ApprovalReasonVO', 'reason');
    }
    if (typeof props.submittedAt !== 'string' || Number.isNaN(Date.parse(props.submittedAt))) {
      throw new ValidationError('Approval submittedAt must be a valid ISO timestamp', 'submittedAt');
    }
    if (props.resubmissionCount < 0 || !Number.isInteger(props.resubmissionCount)) {
      throw new ValidationError('Resubmission count must be a non-negative integer', 'resubmissionCount');
    }
    if (props.resubmissionCount > VENDOR_APPROVAL.MAX_RESUBMISSIONS) {
      throw new ValidationError(
        `Resubmission count cannot exceed ${VENDOR_APPROVAL.MAX_RESUBMISSIONS}`,
        'resubmissionCount',
      );
    }
    // Rejected approvals require a reason
    if (props.status.isRejected() && !props.reason) {
      throw new ValidationError('Rejected approval requires a reason', 'reason');
    }
    // Approved/rejected must have reviewedAt
    if (props.status.isFinal() && !props.reviewedAt) {
      throw new ValidationError('Final approval requires reviewedAt', 'reviewedAt');
    }
    return new VendorApprovalSummaryVO(props);
  }

  static reconstitute(props: VendorApprovalSummaryVOProps): VendorApprovalSummaryVO {
    return new VendorApprovalSummaryVO(props);
  }

  get status(): ApprovalStatusVO { return this.value.status; }
  get reason(): ApprovalReasonVO | undefined { return this.value.reason; }
  get submittedAt(): string { return this.value.submittedAt; }
  get reviewedAt(): string | undefined { return this.value.reviewedAt; }
  get resubmissionCount(): number { return this.value.resubmissionCount; }
  get appealDeadline(): string | undefined { return this.value.appealDeadline; }

  /** Has the review SLA been breached? */
  isSlaBreached(at: Date = new Date()): boolean {
    if (this.value.status.isFinal()) return false;
    const submitted = Date.parse(this.value.submittedAt);
    const slaMs = VENDOR_APPROVAL.REVIEW_SLA_HOURS * 60 * 60 * 1000;
    return at.getTime() - submitted > slaMs;
  }

  hoursInReview(at: Date = new Date()): number {
    const submitted = Date.parse(this.value.submittedAt);
    return Math.floor((at.getTime() - submitted) / (60 * 60 * 1000));
  }

  canResubmit(): boolean {
    return this.value.status.isActionableByVendor()
      && this.value.resubmissionCount < VENDOR_APPROVAL.MAX_RESUBMISSIONS;
  }

  canAppeal(at: Date = new Date()): boolean {
    if (!this.value.status.isRejected()) return false;
    if (!this.value.appealDeadline) return false;
    return at.getTime() <= Date.parse(this.value.appealDeadline);
  }

  /** Compute appeal deadline from rejection date. */
  static computeAppealDeadline(reviewedAt: string): string {
    const base = new Date(reviewedAt);
    const deadline = new Date(base.getTime() + VENDOR_APPROVAL.APPEAL_WINDOW_DAYS * 24 * 60 * 60 * 1000);
    return deadline.toISOString();
  }
}
