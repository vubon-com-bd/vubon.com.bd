import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class CartMergerIdVO extends BaseIdVO {
  static create(value: string): CartMergerIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid cart merger id');
    }
    return new CartMergerIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
