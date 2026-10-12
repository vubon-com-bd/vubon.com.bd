/**
 * InsuranceClaimStatus Value Object — state machine
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { INSURANCE_CLAIM_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidInsuranceClaimStatusError } from '../../errors/insurance.errors.js';

const ALLOWED = Object.values(INSURANCE_CLAIM_STATUS) as readonly string[];

export class InsuranceClaimStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): InsuranceClaimStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidInsuranceClaimStatusError(String(raw));
    }
    return new InsuranceClaimStatusVO(raw);
  }

  static reconstitute(raw: string): InsuranceClaimStatusVO { return new InsuranceClaimStatusVO(raw); }

  static submitted(): InsuranceClaimStatusVO { return new InsuranceClaimStatusVO(INSURANCE_CLAIM_STATUS.SUBMITTED); }
  static underReview(): InsuranceClaimStatusVO { return new InsuranceClaimStatusVO(INSURANCE_CLAIM_STATUS.UNDER_REVIEW); }
  static approved(): InsuranceClaimStatusVO { return new InsuranceClaimStatusVO(INSURANCE_CLAIM_STATUS.APPROVED); }
  static rejected(): InsuranceClaimStatusVO { return new InsuranceClaimStatusVO(INSURANCE_CLAIM_STATUS.REJECTED); }
  static paid(): InsuranceClaimStatusVO { return new InsuranceClaimStatusVO(INSURANCE_CLAIM_STATUS.PAID); }
  static appealed(): InsuranceClaimStatusVO { return new InsuranceClaimStatusVO(INSURANCE_CLAIM_STATUS.APPEALED); }

  isSubmitted(): boolean { return this.value === INSURANCE_CLAIM_STATUS.SUBMITTED; }
  isUnderReview(): boolean { return this.value === INSURANCE_CLAIM_STATUS.UNDER_REVIEW; }
  isApproved(): boolean { return this.value === INSURANCE_CLAIM_STATUS.APPROVED; }
  isRejected(): boolean { return this.value === INSURANCE_CLAIM_STATUS.REJECTED; }
  isPaid(): boolean { return this.value === INSURANCE_CLAIM_STATUS.PAID; }
  isAppealed(): boolean { return this.value === INSURANCE_CLAIM_STATUS.APPEALED; }

  isFinal(): boolean { return this.isPaid(); }

  /** Claim was decided in favor of claimant. */
  isFavorable(): boolean { return this.isApproved() || this.isPaid(); }

  canBeAppealed(): boolean { return this.isRejected(); }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [INSURANCE_CLAIM_STATUS.SUBMITTED]: [
        INSURANCE_CLAIM_STATUS.UNDER_REVIEW,
        INSURANCE_CLAIM_STATUS.REJECTED,
      ],
      [INSURANCE_CLAIM_STATUS.UNDER_REVIEW]: [
        INSURANCE_CLAIM_STATUS.APPROVED,
        INSURANCE_CLAIM_STATUS.REJECTED,
      ],
      [INSURANCE_CLAIM_STATUS.APPROVED]: [INSURANCE_CLAIM_STATUS.PAID],
      [INSURANCE_CLAIM_STATUS.REJECTED]: [INSURANCE_CLAIM_STATUS.APPEALED],
      [INSURANCE_CLAIM_STATUS.APPEALED]: [
        INSURANCE_CLAIM_STATUS.UNDER_REVIEW,
        INSURANCE_CLAIM_STATUS.APPROVED,
        INSURANCE_CLAIM_STATUS.REJECTED,
      ],
      [INSURANCE_CLAIM_STATUS.PAID]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
