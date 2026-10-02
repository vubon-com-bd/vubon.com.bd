/**
 * CouponStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { COUPON_STATUS } from '@vubon/shared-constants/business/cart';
import { InvalidCouponStatusError } from '../../errors/coupon.errors.js';

const ALLOWED = Object.values(COUPON_STATUS) as readonly string[];

export class CouponStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CouponStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidCouponStatusError(String(raw), ALLOWED);
    }
    return new CouponStatusVO(raw);
  }

  static reconstitute(raw: string): CouponStatusVO {
    return new CouponStatusVO(raw);
  }

  isUsable(): boolean {
    return this.value === COUPON_STATUS.ACTIVE;
  }

  isExpired(): boolean {
    return this.value === COUPON_STATUS.EXPIRED;
  }

  isExhausted(): boolean {
    return this.value === COUPON_STATUS.EXHAUSTED;
  }

  isScheduled(): boolean {
    return this.value === COUPON_STATUS.SCHEDULED;
  }

  isDisabled(): boolean {
    return this.value === COUPON_STATUS.DISABLED;
  }
}
