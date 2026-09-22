import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PRODUCT_TYPE } from '@vubon/shared-constants/business/product';
import { InvalidValueError } from '../../errors/invalid-value.errors';

const VALID = new Set<string>(Object.values(PRODUCT_TYPE as Record<string, string>));

export class ProductTypeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductTypeVO {
    if (VALID.size > 0 && !VALID.has(raw)) {
      throw new InvalidValueError('product_type', `Invalid product type: ${raw}`);
    }
    return new ProductTypeVO(raw);
  }
}
