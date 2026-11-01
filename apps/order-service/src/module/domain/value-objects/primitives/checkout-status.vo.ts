/**
 * CheckoutStatus Value Object
 * @module order-service/domain/value-objects/primitives
 *
 * State machine:
 *   started → in_progress → completed
 *   Any non-terminal → abandoned | expired
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type CheckoutStatusValue = 'started' | 'in_progress' | 'completed' | 'abandoned' | 'expired';

const VALID_STATUSES: readonly string[] = ['started', 'in_progress', 'completed', 'abandoned', 'expired'];

const VALID_TRANSITIONS: Readonly<Record<CheckoutStatusValue, readonly CheckoutStatusValue[]>> = {
  started: ['in_progress', 'abandoned', 'expired'],
  in_progress: ['completed', 'abandoned', 'expired'],
  completed: [],
  abandoned: [],
  expired: [],
} as Readonly<Record<CheckoutStatusValue, readonly CheckoutStatusValue[]>>;

export class CheckoutStatusVO extends BaseStatusVO<CheckoutStatusValue> {
  private constructor(value: CheckoutStatusValue) {
    super(value);
  }

  static create(raw: string): CheckoutStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CheckoutStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid CheckoutStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new CheckoutStatusVO(normalized as CheckoutStatusValue);
  }

  static reconstitute(raw: string): CheckoutStatusVO {
    return new CheckoutStatusVO(raw as CheckoutStatusValue);
  }

  static started(): CheckoutStatusVO { return new CheckoutStatusVO('started'); }
  static inProgress(): CheckoutStatusVO { return new CheckoutStatusVO('in_progress'); }
  static completed(): CheckoutStatusVO { return new CheckoutStatusVO('completed'); }
  static abandoned(): CheckoutStatusVO { return new CheckoutStatusVO('abandoned'); }
  static expired(): CheckoutStatusVO { return new CheckoutStatusVO('expired'); }

  isStarted(): boolean { return this.value === 'started'; }
  isInProgress(): boolean { return this.value === 'in_progress'; }
  isCompleted(): boolean { return this.value === 'completed'; }
  isAbandoned(): boolean { return this.value === 'abandoned'; }
  isExpired(): boolean { return this.value === 'expired'; }

  isTerminal(): boolean {
    return this.isCompleted() || this.isAbandoned() || this.isExpired();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as CheckoutStatusValue);
  }
}
