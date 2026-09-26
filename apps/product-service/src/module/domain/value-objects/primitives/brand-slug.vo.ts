import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class BrandSlugVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BrandSlugVO {
    const normalized = raw.trim().toLowerCase();
    if (!REGEX.SLUG.test(normalized)) {
      throw new InvalidValueError('brand_slug', `Invalid brand slug: ${raw}`);
    }
    return new BrandSlugVO(normalized);
  }
}
