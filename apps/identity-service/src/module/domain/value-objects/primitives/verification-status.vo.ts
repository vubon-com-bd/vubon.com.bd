/**
 * VerificationStatus Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { VERIFICATION_STATUS } from '@vubon/shared-constants/security';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type VerificationStatusValue = 'pending' | 'verified' | 'rejected' | 'expired' | 'resubmitted';

const VALID_STATUSES: readonly string[] = Object.values(VERIFICATION_STATUS);

const VALID_TRANSITIONS: Readonly<Record<VerificationStatusValue, readonly VerificationStatusValue[]>> = {
  pending: ['verified', 'rejected', 'expired'],
  resubmitted: ['verified', 'rejected', 'expired'],
  verified: [],
  rejected: ['resubmitted'],
  expired: ['resubmitted'],
};

export class VerificationStatusVO extends BaseStatusVO<VerificationStatusValue> {
  private constructor(value: VerificationStatusValue) {
    super(value);
  }

  static create(raw: string): VerificationStatusVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('VerificationStatus cannot be empty', 'verificationStatus');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid VerificationStatus "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'verificationStatus',
      );
    }
    return new VerificationStatusVO(normalized as VerificationStatusValue);
  }

  static pending(): VerificationStatusVO { return new VerificationStatusVO('pending'); }
  static verified(): VerificationStatusVO { return new VerificationStatusVO('verified'); }
  static rejected(): VerificationStatusVO { return new VerificationStatusVO('rejected'); }
  static expired(): VerificationStatusVO { return new VerificationStatusVO('expired'); }
  static resubmitted(): VerificationStatusVO { return new VerificationStatusVO('resubmitted'); }

  static reconstitute(raw: string): VerificationStatusVO {
    return new VerificationStatusVO(raw as VerificationStatusValue);
  }

  isPending(): boolean { return this.value === 'pending'; }
  isVerified(): boolean { return this.value === 'verified'; }
  isRejected(): boolean { return this.value === 'rejected'; }
  isExpired(): boolean { return this.value === 'expired'; }
  isResubmitted(): boolean { return this.value === 'resubmitted'; }
  isFinal(): boolean { return this.isVerified(); }
  canRetry(): boolean { return this.isRejected() || this.isExpired(); }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as VerificationStatusValue);
  }
}
