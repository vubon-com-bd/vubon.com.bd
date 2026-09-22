import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { COUPON_TYPE } from '@vubon/shared-constants/cart';

const VALID = new Set<string>(Object.values(COUPON_TYPE));

export class CouponTypeVO extends BaseTypeVO<string> {
  static create(value: string): CouponTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid coupon type: ${value}`);
    }
    return new CouponTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
