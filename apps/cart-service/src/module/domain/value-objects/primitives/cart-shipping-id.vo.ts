import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class CartShippingIdVO extends BaseIdVO {
  static create(value: string): CartShippingIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid cart shipping id');
    }
    return new CartShippingIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
