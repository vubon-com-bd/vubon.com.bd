/**
 * VerificationStatus Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * State machine:
 *   not_started → pending → in_review → approved | rejected
 *   rejected → resubmitted → in_review
 *   approved → expired
 *   expired → resubmitted
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_VERIFICATION_STATUS } from '@vubon/shared-constants/business';

export type VerificationStatusValue =
  (typeof VENDOR_VERIFICATION_STATUS)[keyof typeof VENDOR_VERIFICATION_STATUS];

const VALID_STATUSES = new Set<string>(Object.values(VENDOR_VERIFICATION_STATUS));

const VALID_TRANSITIONS: Readonly<
  Record<VerificationStatusValue, readonly VerificationStatusValue[]>
> = {
  not_started: ['pending'],
  pending: ['in_review', 'rejected'],
  in_review: ['approved', 'rejected'],
  approved: ['expired'],
  rejected: ['resubmitted'],
  expired: ['resubmitted'],
  resubmitted: ['in_review', 'rejected'],
};

export class VerificationStatusVO extends BaseStatusVO<VerificationStatusValue> {
  private constructor(value: VerificationStatusValue) {
    super(value);
  }

  static create(raw: string): VerificationStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('VerificationStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.has(normalized)) {
      throw new ValidationError(
        `Invalid VerificationStatus: "${normalized}". Allowed: ${[...VALID_STATUSES].join(', ')}`,
        'status',
      );
    }
    return new VerificationStatusVO(normalized as VerificationStatusValue);
  }

  static reconstitute(raw: string): VerificationStatusVO {
    return new VerificationStatusVO(raw as VerificationStatusValue);
  }

  static notStarted(): VerificationStatusVO { return new VerificationStatusVO('not_started'); }
  static pending(): VerificationStatusVO { return new VerificationStatusVO('pending'); }
  static inReview(): VerificationStatusVO { return new VerificationStatusVO('in_review'); }
  static approved(): VerificationStatusVO { return new VerificationStatusVO('approved'); }
  static rejected(): VerificationStatusVO { return new VerificationStatusVO('rejected'); }
  static expired(): VerificationStatusVO { return new VerificationStatusVO('expired'); }
  static resubmitted(): VerificationStatusVO { return new VerificationStatusVO('resubmitted'); }

  // ─── Predicates ───
  isNotStarted(): boolean { return this.value === 'not_started'; }
  isPending(): boolean { return this.value === 'pending'; }
  isInReview(): boolean { return this.value === 'in_review'; }
  isApproved(): boolean { return this.value === 'approved'; }
  isRejected(): boolean { return this.value === 'rejected'; }
  isExpired(): boolean { return this.value === 'expired'; }
  isResubmitted(): boolean { return this.value === 'resubmitted'; }

  isFinal(): boolean { return this.isApproved() || this.isExpired(); }
  isActionable(): boolean {
    return this.isPending() || this.isInReview() || this.isResubmitted();
  }
  needsUserAction(): boolean {
    return this.isNotStarted() || this.isRejected() || this.isExpired();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as VerificationStatusValue);
  }
}
