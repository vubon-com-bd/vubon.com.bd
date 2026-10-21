/**
 * VerificationStatus Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → in_progress → verified
 *   pending → expired | failed
 *   in_progress → failed
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type VerificationStatusValue =
  | 'pending'
  | 'in_progress'
  | 'verified'
  | 'failed'
  | 'expired';

const VALID_STATUSES: readonly string[] = [
  'pending',
  'in_progress',
  'verified',
  'failed',
  'expired',
];

const VALID_TRANSITIONS: Readonly<
  Record<VerificationStatusValue, readonly VerificationStatusValue[]>
> = {
  pending: ['in_progress', 'verified', 'failed', 'expired'],
  in_progress: ['verified', 'failed', 'expired'],
  verified: [],
  failed: ['pending'],
  expired: [],
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
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid VerificationStatus "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new VerificationStatusVO(normalized as VerificationStatusValue);
  }

  static pending(): VerificationStatusVO { return new VerificationStatusVO('pending'); }
  static verified(): VerificationStatusVO { return new VerificationStatusVO('verified'); }
  static failed(): VerificationStatusVO { return new VerificationStatusVO('failed'); }
  static expired(): VerificationStatusVO { return new VerificationStatusVO('expired'); }

  isPending(): boolean { return this.value === 'pending'; }
  isInProgress(): boolean { return this.value === 'in_progress'; }
  isVerified(): boolean { return this.value === 'verified'; }
  isFailed(): boolean { return this.value === 'failed'; }
  isExpired(): boolean { return this.value === 'expired'; }

  isFinal(): boolean {
    return this.isVerified() || this.isExpired();
  }

  isSuccess(): boolean {
    return this.isVerified();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as VerificationStatusValue);
  }
}
