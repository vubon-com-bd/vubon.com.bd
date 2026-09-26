import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class CategorySlugVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CategorySlugVO {
    const normalized = raw.trim().toLowerCase();
    if (!REGEX.SLUG.test(normalized)) {
      throw new InvalidValueError('category_slug', `Invalid category slug: ${raw}`);
    }
    return new CategorySlugVO(normalized);
  }
}
