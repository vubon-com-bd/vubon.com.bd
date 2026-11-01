/**
 * PayoutStatus Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → processing → approved → paid
 *   pending/processing → rejected | cancelled | on_hold
 *   processing/approved → failed
 *   on_hold → processing | cancelled
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_PAYOUT_STATUS } from '@vubon/shared-constants/business';

export type PayoutStatusValue =
  (typeof VENDOR_PAYOUT_STATUS)[keyof typeof VENDOR_PAYOUT_STATUS];

const VALID_STATUSES = new Set<string>(Object.values(VENDOR_PAYOUT_STATUS));

const VALID_TRANSITIONS: Readonly<
  Record<PayoutStatusValue, readonly PayoutStatusValue[]>
> = {
  pending: ['processing', 'rejected', 'cancelled', 'on_hold'],
  processing: ['approved', 'rejected', 'failed', 'on_hold', 'cancelled'],
  approved: ['paid', 'failed'],
  paid: [],
  failed: ['pending', 'cancelled'],
  rejected: [],
  cancelled: [],
  on_hold: ['processing', 'cancelled', 'rejected'],
};

export class PayoutStatusVO extends BaseStatusVO<PayoutStatusValue> {
  private constructor(value: PayoutStatusValue) {
    super(value);
  }

  static create(raw: string): PayoutStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('PayoutStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.has(normalized)) {
      throw new ValidationError(
        `Invalid PayoutStatus: "${normalized}". Allowed: ${[...VALID_STATUSES].join(', ')}`,
        'status',
      );
    }
    return new PayoutStatusVO(normalized as PayoutStatusValue);
  }

  static reconstitute(raw: string): PayoutStatusVO {
    return new PayoutStatusVO(raw as PayoutStatusValue);
  }

  static pending(): PayoutStatusVO { return new PayoutStatusVO('pending'); }
  static processing(): PayoutStatusVO { return new PayoutStatusVO('processing'); }
  static approved(): PayoutStatusVO { return new PayoutStatusVO('approved'); }
  static paid(): PayoutStatusVO { return new PayoutStatusVO('paid'); }
  static failed(): PayoutStatusVO { return new PayoutStatusVO('failed'); }
  static rejected(): PayoutStatusVO { return new PayoutStatusVO('rejected'); }
  static cancelled(): PayoutStatusVO { return new PayoutStatusVO('cancelled'); }
  static onHold(): PayoutStatusVO { return new PayoutStatusVO('on_hold'); }

  // ─── Predicates ───
  isPending(): boolean { return this.value === 'pending'; }
  isProcessing(): boolean { return this.value === 'processing'; }
  isApproved(): boolean { return this.value === 'approved'; }
  isPaid(): boolean { return this.value === 'paid'; }
  isFailed(): boolean { return this.value === 'failed'; }
  isRejected(): boolean { return this.value === 'rejected'; }
  isCancelled(): boolean { return this.value === 'cancelled'; }
  isOnHold(): boolean { return this.value === 'on_hold'; }

  /** Terminal states */
  isFinal(): boolean {
    return this.isPaid() || this.isRejected() || this.isCancelled();
  }

  /** Can still be modified */
  isModifiable(): boolean {
    return this.isPending() || this.isOnHold();
  }

  /** Currently in progress */
  isInProgress(): boolean {
    return this.isProcessing() || this.isApproved() || this.isOnHold();
  }

  /** Has reached successful completion */
  isSuccessful(): boolean {
    return this.isPaid();
  }

  /** Has failed in some way */
  isUnsuccessful(): boolean {
    return this.isFailed() || this.isRejected() || this.isCancelled();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as PayoutStatusValue);
  }
}
