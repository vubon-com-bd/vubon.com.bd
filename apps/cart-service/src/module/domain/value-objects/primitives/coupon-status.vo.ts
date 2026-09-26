import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { COUPON_STATUS } from '@vubon/shared-constants/cart';

const VALID = new Set<string>(Object.values(COUPON_STATUS));

export class CouponStatusVO extends BaseStatusVO<string> {
  static create(value: string): CouponStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid coupon status: ${value}`);
    }
    return new CouponStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
