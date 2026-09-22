import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class ProductIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidValueError('product_id', 'ProductId cannot be empty');
    }
    return new ProductIdVO(raw);
  }
}
