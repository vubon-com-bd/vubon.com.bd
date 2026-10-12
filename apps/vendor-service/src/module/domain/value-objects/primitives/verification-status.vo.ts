/**
 * VerificationStatus Value Object — includes transition state machine
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_VERIFICATION_STATUS } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_VERIFICATION_STATUS) as readonly string[];

export class VerificationStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VerificationStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid verification status "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'status',
      );
    }
    return new VerificationStatusVO(raw);
  }

  static notStarted(): VerificationStatusVO { return new VerificationStatusVO(VENDOR_VERIFICATION_STATUS.NOT_STARTED); }
  static pending(): VerificationStatusVO { return new VerificationStatusVO(VENDOR_VERIFICATION_STATUS.PENDING); }
  static inReview(): VerificationStatusVO { return new VerificationStatusVO(VENDOR_VERIFICATION_STATUS.IN_REVIEW); }
  static approved(): VerificationStatusVO { return new VerificationStatusVO(VENDOR_VERIFICATION_STATUS.APPROVED); }
  static rejected(): VerificationStatusVO { return new VerificationStatusVO(VENDOR_VERIFICATION_STATUS.REJECTED); }
  static expired(): VerificationStatusVO { return new VerificationStatusVO(VENDOR_VERIFICATION_STATUS.EXPIRED); }
  static resubmitted(): VerificationStatusVO { return new VerificationStatusVO(VENDOR_VERIFICATION_STATUS.RESUBMITTED); }

  static reconstitute(raw: string): VerificationStatusVO {
    return new VerificationStatusVO(raw);
  }

  isNotStarted(): boolean { return this.value === VENDOR_VERIFICATION_STATUS.NOT_STARTED; }
  isPending(): boolean { return this.value === VENDOR_VERIFICATION_STATUS.PENDING; }
  isInReview(): boolean { return this.value === VENDOR_VERIFICATION_STATUS.IN_REVIEW; }
  isApproved(): boolean { return this.value === VENDOR_VERIFICATION_STATUS.APPROVED; }
  isRejected(): boolean { return this.value === VENDOR_VERIFICATION_STATUS.REJECTED; }
  isExpired(): boolean { return this.value === VENDOR_VERIFICATION_STATUS.EXPIRED; }
  isResubmitted(): boolean { return this.value === VENDOR_VERIFICATION_STATUS.RESUBMITTED; }

  isSuccessful(): boolean {
    return this.value === VENDOR_VERIFICATION_STATUS.APPROVED;
  }

  isTerminal(): boolean {
    return this.value === VENDOR_VERIFICATION_STATUS.EXPIRED;
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [VENDOR_VERIFICATION_STATUS.NOT_STARTED]: [
        VENDOR_VERIFICATION_STATUS.PENDING,
      ],
      [VENDOR_VERIFICATION_STATUS.PENDING]: [
        VENDOR_VERIFICATION_STATUS.IN_REVIEW,
        VENDOR_VERIFICATION_STATUS.REJECTED,
        VENDOR_VERIFICATION_STATUS.EXPIRED,
      ],
      [VENDOR_VERIFICATION_STATUS.IN_REVIEW]: [
        VENDOR_VERIFICATION_STATUS.APPROVED,
        VENDOR_VERIFICATION_STATUS.REJECTED,
      ],
      [VENDOR_VERIFICATION_STATUS.APPROVED]: [
        VENDOR_VERIFICATION_STATUS.EXPIRED,
      ],
      [VENDOR_VERIFICATION_STATUS.REJECTED]: [
        VENDOR_VERIFICATION_STATUS.RESUBMITTED,
        VENDOR_VERIFICATION_STATUS.EXPIRED,
      ],
      [VENDOR_VERIFICATION_STATUS.RESUBMITTED]: [
        VENDOR_VERIFICATION_STATUS.PENDING,
        VENDOR_VERIFICATION_STATUS.IN_REVIEW,
      ],
      [VENDOR_VERIFICATION_STATUS.EXPIRED]: [
        VENDOR_VERIFICATION_STATUS.PENDING,
      ],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
