/**
 * CartStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { CART_STATUS } from '@vubon/shared-constants/business/cart';
import { InvalidCartStatusError } from '../../errors/cart.errors.js';

const ALLOWED = Object.values(CART_STATUS) as readonly string[];

export class CartStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidCartStatusError(String(raw), ALLOWED);
    }
    if (!ALLOWED.includes(raw)) {
      throw new InvalidCartStatusError(raw, ALLOWED);
    }
    return new CartStatusVO(raw);
  }

  static reconstitute(raw: string): CartStatusVO {
    return new CartStatusVO(raw);
  }

  isAbandoned(): boolean {
    return this.value === CART_STATUS.ABANDONED;
  }

  isConverted(): boolean {
    return this.value === CART_STATUS.CONVERTED;
  }

  isExpired(): boolean {
    return this.value === CART_STATUS.EXPIRED;
  }

  isMerged(): boolean {
    return this.value === CART_STATUS.MERGED;
  }

  isCleared(): boolean {
    return this.value === CART_STATUS.CLEARED;
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [CART_STATUS.ACTIVE]: [
        CART_STATUS.ABANDONED,
        CART_STATUS.CONVERTED,
        CART_STATUS.EXPIRED,
        CART_STATUS.MERGED,
        CART_STATUS.CLEARED,
      ],
      [CART_STATUS.ABANDONED]: [
        CART_STATUS.CONVERTED,
        CART_STATUS.EXPIRED,
        CART_STATUS.MERGED,
      ],
      [CART_STATUS.INACTIVE]: [CART_STATUS.ACTIVE, CART_STATUS.EXPIRED],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
