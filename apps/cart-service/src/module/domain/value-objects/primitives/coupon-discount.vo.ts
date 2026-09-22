import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export class CouponDiscountVO extends BaseVO<number> {
  static create(value: number): CouponDiscountVO {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error('Coupon discount must be a positive number');
    }
    return new CouponDiscountVO(value);
  }

  get discount(): number {
    return this.value;
  }

  private constructor(value: number) {
    super(value);
  }
}
