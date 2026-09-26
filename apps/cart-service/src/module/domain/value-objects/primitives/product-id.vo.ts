import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class ProductIdVO extends BaseIdVO {
  static create(value: string): ProductIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid product id');
    }
    return new ProductIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
