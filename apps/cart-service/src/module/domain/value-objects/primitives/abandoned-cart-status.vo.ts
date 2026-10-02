/**
 * AbandonedCartStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ABANDONED_CART_STATUS } from '@vubon/shared-constants/business/cart';
import { InvalidAbandonedCartStatusError } from '../../errors/abandoned-cart.errors.js';

const ALLOWED = Object.values(ABANDONED_CART_STATUS) as readonly string[];

export class AbandonedCartStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AbandonedCartStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidAbandonedCartStatusError(String(raw), ALLOWED);
    }
    return new AbandonedCartStatusVO(raw);
  }

  static reconstitute(raw: string): AbandonedCartStatusVO {
    return new AbandonedCartStatusVO(raw);
  }

  isPending(): boolean {
    return this.value === ABANDONED_CART_STATUS.PENDING;
  }

  isReminded(): boolean {
    return this.value === ABANDONED_CART_STATUS.REMINDED;
  }

  isRecovered(): boolean {
    return this.value === ABANDONED_CART_STATUS.RECOVERED;
  }

  isLost(): boolean {
    return this.value === ABANDONED_CART_STATUS.LOST;
  }

  isUnsubscribed(): boolean {
    return this.value === ABANDONED_CART_STATUS.UNSUBSCRIBED;
  }

  isFinal(): boolean {
    return (
      this.value === ABANDONED_CART_STATUS.RECOVERED ||
      this.value === ABANDONED_CART_STATUS.LOST ||
      this.value === ABANDONED_CART_STATUS.UNSUBSCRIBED
    );
  }

  canSendReminder(): boolean {
    return (
      this.value === ABANDONED_CART_STATUS.PENDING ||
      this.value === ABANDONED_CART_STATUS.REMINDED
    );
  }
}
