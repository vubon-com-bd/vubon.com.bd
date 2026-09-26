import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ProductIdVO extends BaseIdVO {
  static create(raw: string): ProductIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('ProductId cannot be empty');
    }
    return new ProductIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
