import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class ProductIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('ProductId cannot be empty');
    }
    return new ProductIdVO(raw);
  }
}
