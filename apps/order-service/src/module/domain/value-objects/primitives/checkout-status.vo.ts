/**
 * CheckoutStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { CHECKOUT_STATUS } from '@vubon/shared-constants/business/checkout';
import { InvalidCheckoutStatusError } from '../../errors/checkout.errors.js';

const ALLOWED = Object.values(CHECKOUT_STATUS) as readonly string[];

export class CheckoutStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): CheckoutStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidCheckoutStatusError(raw, ALLOWED);
    }
    return new CheckoutStatusVO(raw);
  }

  static pending(): CheckoutStatusVO { return new CheckoutStatusVO(CHECKOUT_STATUS.PENDING); }
  static inProgress(): CheckoutStatusVO { return new CheckoutStatusVO(CHECKOUT_STATUS.IN_PROGRESS); }

  static reconstitute(raw: string): CheckoutStatusVO { return new CheckoutStatusVO(raw); }

  isPending(): boolean { return this.value === CHECKOUT_STATUS.PENDING; }
  isInProgress(): boolean { return this.value === CHECKOUT_STATUS.IN_PROGRESS; }
  isCompleted(): boolean { return this.value === CHECKOUT_STATUS.COMPLETED; }
  isAbandoned(): boolean { return this.value === CHECKOUT_STATUS.ABANDONED; }
  isFailed(): boolean { return this.value === CHECKOUT_STATUS.FAILED; }
  isExpired(): boolean { return this.value === CHECKOUT_STATUS.EXPIRED; }
  isCancelled(): boolean { return this.value === CHECKOUT_STATUS.CANCELLED; }

  isFinal(): boolean {
    return [
      CHECKOUT_STATUS.COMPLETED,
      CHECKOUT_STATUS.ABANDONED,
      CHECKOUT_STATUS.FAILED,
      CHECKOUT_STATUS.EXPIRED,
      CHECKOUT_STATUS.CANCELLED,
    ].includes(this.value as never);
  }

  isActive(): boolean { return !this.isFinal(); }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [CHECKOUT_STATUS.PENDING]: [
        CHECKOUT_STATUS.IN_PROGRESS,
        CHECKOUT_STATUS.ABANDONED,
        CHECKOUT_STATUS.EXPIRED,
        CHECKOUT_STATUS.CANCELLED,
      ],
      [CHECKOUT_STATUS.IN_PROGRESS]: [
        CHECKOUT_STATUS.COMPLETED,
        CHECKOUT_STATUS.ABANDONED,
        CHECKOUT_STATUS.FAILED,
        CHECKOUT_STATUS.EXPIRED,
        CHECKOUT_STATUS.CANCELLED,
      ],
      [CHECKOUT_STATUS.FAILED]: [CHECKOUT_STATUS.PENDING, CHECKOUT_STATUS.CANCELLED],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
