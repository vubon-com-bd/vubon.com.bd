import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class CartItemNoteVO extends BaseCodeVO {
  static create(value: string): CartItemNoteVO {
    if (value.length > 500) {
      throw new Error('Cart item note too long (max 500)');
    }
    return new CartItemNoteVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
