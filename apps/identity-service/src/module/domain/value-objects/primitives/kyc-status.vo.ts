/**
 * KycStatus Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidKycStatusError } from '../../errors/kyc.errors.js';

export type KycStatusValue = 'pending' | 'verified' | 'rejected' | 'expired' | 'resubmitted';

const VALID_STATUSES: readonly KycStatusValue[] = [
  'pending',
  'verified',
  'rejected',
  'expired',
  'resubmitted',
];

const VALID_TRANSITIONS: Readonly<Record<KycStatusValue, readonly KycStatusValue[]>> = {
  pending: ['verified', 'rejected', 'expired'],
  resubmitted: ['verified', 'rejected', 'expired'],
  verified: ['expired'],
  rejected: ['resubmitted'],
  expired: ['resubmitted'],
};

export class KycStatusVO extends BaseStatusVO<KycStatusValue> {
  private constructor(value: KycStatusValue) {
    super(value);
  }

  static create(raw: string): KycStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidKycStatusError(String(raw), VALID_STATUSES);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized as KycStatusValue)) {
      throw new InvalidKycStatusError(normalized, VALID_STATUSES);
    }
    return new KycStatusVO(normalized as KycStatusValue);
  }

  static pending(): KycStatusVO { return new KycStatusVO('pending'); }
  static verified(): KycStatusVO { return new KycStatusVO('verified'); }
  static rejected(): KycStatusVO { return new KycStatusVO('rejected'); }
  static expired(): KycStatusVO { return new KycStatusVO('expired'); }
  static resubmitted(): KycStatusVO { return new KycStatusVO('resubmitted'); }

  static reconstitute(raw: string): KycStatusVO {
    return new KycStatusVO(raw as KycStatusValue);
  }

  isPending(): boolean { return this.value === 'pending'; }
  isVerified(): boolean { return this.value === 'verified'; }
  isRejected(): boolean { return this.value === 'rejected'; }
  isExpired(): boolean { return this.value === 'expired'; }
  isResubmitted(): boolean { return this.value === 'resubmitted'; }
  isFinal(): boolean { return this.isVerified() || this.isExpired(); }
  canRetry(): boolean { return this.isRejected() || this.isExpired(); }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as KycStatusValue);
  }
}
