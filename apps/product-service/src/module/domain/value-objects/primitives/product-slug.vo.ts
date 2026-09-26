import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class ProductSlugVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductSlugVO {
    const normalized = raw.trim().toLowerCase();
    if (!REGEX.SLUG.test(normalized)) {
      throw new InvalidValueError('product_slug', `Invalid slug format: ${raw}`);
    }
    return new ProductSlugVO(normalized);
  }
}
