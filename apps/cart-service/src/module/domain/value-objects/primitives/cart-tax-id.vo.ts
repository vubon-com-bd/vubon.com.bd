import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class CartTaxIdVO extends BaseIdVO {
  static create(value: string): CartTaxIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid cart tax id');
    }
    return new CartTaxIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
