import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import {
  COUPON_DISCOUNT_TYPE,
  COUPON_APPLIES_TO,
} from '@vubon/shared-constants/cart';

const VALID_DISCOUNT = new Set<string>(Object.values(COUPON_DISCOUNT_TYPE));
const VALID_APPLIES = new Set<string>(Object.values(COUPON_APPLIES_TO));

export class CouponDiscountTypeVO extends BaseTypeVO<string> {
  static create(value: string): CouponDiscountTypeVO {
    if (!VALID_DISCOUNT.has(value)) {
      throw new Error(`Invalid coupon discount type: ${value}`);
    }
    return new CouponDiscountTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}

export class CouponAppliesToVO extends BaseTypeVO<string> {
  static create(value: string): CouponAppliesToVO {
    if (!VALID_APPLIES.has(value)) {
      throw new Error(`Invalid coupon applies-to: ${value}`);
    }
    return new CouponAppliesToVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
