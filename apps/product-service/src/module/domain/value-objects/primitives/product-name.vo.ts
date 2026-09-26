import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class ProductNameVO extends BaseVO<string> {
  static readonly MIN_LENGTH = 3;
  static readonly MAX_LENGTH = 200;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductNameVO {
    const trimmed = raw.trim();
    if (trimmed.length < ProductNameVO.MIN_LENGTH) {
      throw new InvalidValueError('product_name', `Product name must be at least ${ProductNameVO.MIN_LENGTH} characters`);
    }
    if (trimmed.length > ProductNameVO.MAX_LENGTH) {
      throw new InvalidValueError('product_name', `Product name must not exceed ${ProductNameVO.MAX_LENGTH} characters`);
    }
    return new ProductNameVO(trimmed);
  }
}
