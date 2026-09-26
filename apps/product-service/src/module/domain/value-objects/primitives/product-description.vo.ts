import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class ProductDescriptionVO extends BaseVO<string> {
  static readonly MAX_LENGTH = 5000;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductDescriptionVO {
    if (raw.length > ProductDescriptionVO.MAX_LENGTH) {
      throw new InvalidValueError('product_description', `Description must not exceed ${ProductDescriptionVO.MAX_LENGTH} characters`);
    }
    return new ProductDescriptionVO(raw);
  }
}
