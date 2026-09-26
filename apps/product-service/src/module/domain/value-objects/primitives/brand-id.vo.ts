import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class BrandIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BrandIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidValueError('brand_id', 'BrandId cannot be empty');
    }
    return new BrandIdVO(raw);
  }
}
