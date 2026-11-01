/**
 * InsuranceClaim Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { InsuranceClaimStatusVO } from '../primitives/insurance-claim-status.vo.js';

export interface InsuranceClaimVOProps {
  readonly id: string;
  readonly insuranceId: string;
  readonly claimNumber: string;
  readonly status: InsuranceClaimStatusVO;
  readonly reason: string;
  readonly description?: string;
  readonly images?: readonly string[];
  readonly amount: number;
  readonly currency: string;
  readonly approvedAmount?: number;
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly approvedAt?: string;
  readonly rejectedAt?: string;
  readonly rejectionReason?: string;
  readonly paidAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class InsuranceClaimVO extends BaseVO<InsuranceClaimVOProps> {
  private constructor(props: InsuranceClaimVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: InsuranceClaimVOProps): InsuranceClaimVO {
    const vo = new InsuranceClaimVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: InsuranceClaimVOProps): InsuranceClaimVO {
    return new InsuranceClaimVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.insuranceId) {
      throw new ValidationError('Insurance ID required', 'insuranceId');
    }
    if (!v.claimNumber) {
      throw new ValidationError('Claim number required', 'claimNumber');
    }
    if (!v.reason || v.reason.trim().length === 0) {
      throw new ValidationError('Claim reason required', 'reason');
    }
    if (v.amount <= 0) {
      throw new ValidationError('Claim amount must be positive', 'amount');
    }
    if (v.approvedAmount !== undefined && v.approvedAmount < 0) {
      throw new ValidationError('Approved amount cannot be negative', 'approvedAmount');
    }
    if (!v.currency || v.currency.length < 3) {
      throw new ValidationError('Currency must be at least 3 chars', 'currency');
    }
  }

  get id(): string { return this.value.id; }
  get insuranceId(): string { return this.value.insuranceId; }
  get claimNumber(): string { return this.value.claimNumber; }
  get status(): InsuranceClaimStatusVO { return this.value.status; }
  get reason(): string { return this.value.reason; }
  get description(): string | undefined { return this.value.description; }
  get images(): readonly string[] | undefined { return this.value.images; }
  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }
  get approvedAmount(): number | undefined { return this.value.approvedAmount; }
  get submittedAt(): string { return this.value.submittedAt; }
  get reviewedAt(): string | undefined { return this.value.reviewedAt; }
  get approvedAt(): string | undefined { return this.value.approvedAt; }
  get rejectedAt(): string | undefined { return this.value.rejectedAt; }
  get rejectionReason(): string | undefined { return this.value.rejectionReason; }
  get paidAt(): string | undefined { return this.value.paidAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isSubmitted(): boolean { return this.status.isSubmitted(); }
  isUnderReview(): boolean { return this.status.isUnderReview(); }
  isApproved(): boolean { return this.status.isApproved(); }
  isRejected(): boolean { return this.status.isRejected(); }
  isPaid(): boolean { return this.status.isPaid(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isResolved(): boolean { return this.status.isResolved(); }

  hasImages(): boolean {
    return (this.images?.length ?? 0) > 0;
  }

  get fullAmountApproved(): boolean {
    return this.approvedAmount !== undefined && this.approvedAmount === this.amount;
  }

  get partialApproval(): boolean {
    return (
      this.approvedAmount !== undefined &&
      this.approvedAmount > 0 &&
      this.approvedAmount < this.amount
    );
  }
}
