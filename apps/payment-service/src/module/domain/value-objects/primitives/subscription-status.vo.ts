/**
 * SubscriptionStatus Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * State machine:
 *   trialing → active → past_due → active
 *   active → cancelled → expired
 *   past_due → cancelled | expired
 *   paused → active
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type SubscriptionStatusValue =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'paused'
  | 'cancelled'
  | 'expired';

const VALID_STATUSES: readonly string[] = [
  'trialing',
  'active',
  'past_due',
  'paused',
  'cancelled',
  'expired',
];

const VALID_TRANSITIONS: Readonly<
  Record<SubscriptionStatusValue, readonly SubscriptionStatusValue[]>
> = {
  trialing: ['active', 'cancelled', 'expired'],
  active: ['past_due', 'paused', 'cancelled', 'expired'],
  past_due: ['active', 'cancelled', 'expired'],
  paused: ['active', 'cancelled', 'expired'],
  cancelled: ['expired'],
  expired: [],
};

export class SubscriptionStatusVO extends BaseStatusVO<SubscriptionStatusValue> {
  private constructor(value: SubscriptionStatusValue) {
    super(value);
  }

  static create(raw: string): SubscriptionStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('SubscriptionStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid SubscriptionStatus "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new SubscriptionStatusVO(normalized as SubscriptionStatusValue);
  }

  static trialing(): SubscriptionStatusVO { return new SubscriptionStatusVO('trialing'); }
  static active(): SubscriptionStatusVO { return new SubscriptionStatusVO('active'); }
  static pastDue(): SubscriptionStatusVO { return new SubscriptionStatusVO('past_due'); }
  static paused(): SubscriptionStatusVO { return new SubscriptionStatusVO('paused'); }
  static cancelled(): SubscriptionStatusVO { return new SubscriptionStatusVO('cancelled'); }
  static expired(): SubscriptionStatusVO { return new SubscriptionStatusVO('expired'); }

  isTrialing(): boolean { return this.value === 'trialing'; }
  isActive(): boolean { return this.value === 'active'; }
  isPastDue(): boolean { return this.value === 'past_due'; }
  isPaused(): boolean { return this.value === 'paused'; }
  isCancelled(): boolean { return this.value === 'cancelled'; }
  isExpired(): boolean { return this.value === 'expired'; }

  isEntitled(): boolean { return this.isTrialing() || this.isActive(); }

  isFinal(): boolean { return this.isExpired(); }

  isCancellable(): boolean {
    return !this.isCancelled() && !this.isExpired();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as SubscriptionStatusValue);
  }
}
