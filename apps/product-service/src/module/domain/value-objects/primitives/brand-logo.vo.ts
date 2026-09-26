import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class BrandLogoVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BrandLogoVO {
    if (!REGEX.URL.test(raw)) {
      throw new InvalidValueError('brand_logo', `Invalid brand logo URL: ${raw}`);
    }
    return new BrandLogoVO(raw);
  }
}
