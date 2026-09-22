import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class CartItemIdVO extends BaseIdVO {
  static create(value: string): CartItemIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid cart item id');
    }
    return new CartItemIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
