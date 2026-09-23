import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class CouponIdVO extends BaseIdVO {
  static create(raw: string): CouponIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('CouponId cannot be empty');
    }
    return new CouponIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
