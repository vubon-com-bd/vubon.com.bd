import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ProductIdVO extends BaseIdVO {
  static create(value: string): ProductIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('ProductId cannot be empty');
    }
    return new ProductIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
