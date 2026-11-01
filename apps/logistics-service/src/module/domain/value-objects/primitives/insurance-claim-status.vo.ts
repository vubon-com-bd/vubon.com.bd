/**
 * InsuranceClaimStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { INSURANCE_CLAIM_STATUS } from '@vubon/shared-constants/logistics';

export type InsuranceClaimStatusValue =
  (typeof INSURANCE_CLAIM_STATUS)[keyof typeof INSURANCE_CLAIM_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(INSURANCE_CLAIM_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<InsuranceClaimStatusValue, readonly InsuranceClaimStatusValue[]>
> = {
  submitted: ['under_review', 'rejected'],
  under_review: ['approved', 'rejected'],
  approved: ['paid'],
  rejected: ['appealed'],
  paid: [], // final
  appealed: ['under_review', 'rejected'],
};

export class InsuranceClaimStatusVO extends BaseStatusVO<InsuranceClaimStatusValue> {
  private constructor(value: InsuranceClaimStatusValue) {
    super(value);
  }

  static create(raw: string): InsuranceClaimStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('InsuranceClaimStatus must be a string', 'claimStatus');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid InsuranceClaimStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'claimStatus',
      );
    }
    return new InsuranceClaimStatusVO(normalized as InsuranceClaimStatusValue);
  }

  static reconstitute(raw: string): InsuranceClaimStatusVO {
    return new InsuranceClaimStatusVO(raw as InsuranceClaimStatusValue);
  }

  static submitted(): InsuranceClaimStatusVO {
    return new InsuranceClaimStatusVO(INSURANCE_CLAIM_STATUS.SUBMITTED);
  }

  isSubmitted(): boolean { return this.value === INSURANCE_CLAIM_STATUS.SUBMITTED; }
  isUnderReview(): boolean { return this.value === INSURANCE_CLAIM_STATUS.UNDER_REVIEW; }
  isApproved(): boolean { return this.value === INSURANCE_CLAIM_STATUS.APPROVED; }
  isRejected(): boolean { return this.value === INSURANCE_CLAIM_STATUS.REJECTED; }
  isPaid(): boolean { return this.value === INSURANCE_CLAIM_STATUS.PAID; }
  isAppealed(): boolean { return this.value === INSURANCE_CLAIM_STATUS.APPEALED; }

  isFinal(): boolean { return this.isPaid(); }
  isResolved(): boolean {
    return this.isApproved() || this.isPaid() || this.isRejected();
  }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as InsuranceClaimStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
