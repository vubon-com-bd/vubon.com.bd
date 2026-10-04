/**
 * GuestCartStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { GUEST_CART_STATUS } from '@vubon/shared-constants/business/cart';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(GUEST_CART_STATUS) as readonly string[];

export class GuestCartStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): GuestCartStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid guest cart status "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'status',
      );
    }
    return new GuestCartStatusVO(raw);
  }

  static reconstitute(raw: string): GuestCartStatusVO {
    return new GuestCartStatusVO(raw);
  }

  isActive(): boolean {
    return this.value === GUEST_CART_STATUS.ACTIVE;
  }

  isMerged(): boolean {
    return this.value === GUEST_CART_STATUS.MERGED;
  }

  isExpired(): boolean {
    return this.value === GUEST_CART_STATUS.EXPIRED;
  }

  isAbandoned(): boolean {
    return this.value === GUEST_CART_STATUS.ABANDONED;
  }

  canBeMerged(): boolean {
    return this.value === GUEST_CART_STATUS.ACTIVE;
  }
}
