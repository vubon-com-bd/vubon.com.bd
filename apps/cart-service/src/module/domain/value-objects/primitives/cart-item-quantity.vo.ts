import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export class CartItemQuantityVO extends BaseVO<number> {
  static create(value: number): CartItemQuantityVO {
    if (!Number.isInteger(value) || value < 1) {
      throw new Error('Cart item quantity must be a positive integer');
    }
    if (value > 999) {
      throw new Error('Cart item quantity exceeds max limit');
    }
    return new CartItemQuantityVO(value);
  }

  get quantity(): number {
    return this.value;
  }

  private constructor(value: number) {
    super(value);
  }
}
