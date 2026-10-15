/**
 * AbandonedCartStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type AbandonedCartStatusValue =
  | 'pending'
  | 'reminded'
  | 'recovered'
  | 'lost'
  | 'unsubscribed';

const VALID_STATUSES: readonly string[] = [
  'pending',
  'reminded',
  'recovered',
  'lost',
  'unsubscribed',
];

const VALID_TRANSITIONS: Readonly<
  Record<AbandonedCartStatusValue, readonly AbandonedCartStatusValue[]>
> = {
  pending: ['reminded', 'recovered', 'lost', 'unsubscribed'],
  reminded: ['reminded', 'recovered', 'lost', 'unsubscribed'],
  recovered: [],
  lost: [],
  unsubscribed: ['pending'],
};

export class AbandonedCartStatusVO extends BaseStatusVO<AbandonedCartStatusValue> {
  private constructor(value: AbandonedCartStatusValue) {
    super(value);
  }

  static create(raw: string): AbandonedCartStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid AbandonedCartStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new AbandonedCartStatusVO(normalized as AbandonedCartStatusValue);
  }

  static pending(): AbandonedCartStatusVO {
    return new AbandonedCartStatusVO('pending');
  }

  static reconstitute(raw: string): AbandonedCartStatusVO {
    return new AbandonedCartStatusVO(raw as AbandonedCartStatusValue);
  }

  isPending(): boolean { return this.value === 'pending'; }
  isReminded(): boolean { return this.value === 'reminded'; }
  isRecovered(): boolean { return this.value === 'recovered'; }
  isLost(): boolean { return this.value === 'lost'; }
  isUnsubscribed(): boolean { return this.value === 'unsubscribed'; }

  isRecoverable(): boolean {
    return this.isPending() || this.isReminded();
  }

  isFinal(): boolean {
    return this.isRecovered() || this.isLost() || this.isUnsubscribed();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as AbandonedCartStatusValue);
  }
}
