import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class CouponCodeVO extends BaseCodeVO {
  static create(value: string): CouponCodeVO {
    const normalized = value.trim().toUpperCase();
    if (!/^[A-Z0-9-]{4,32}$/.test(normalized)) {
      throw new Error('Invalid coupon code format');
    }
    return new CouponCodeVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }
}
