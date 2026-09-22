import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidFeatureTypeError } from '../../errors/vendor.errors';

export class SkuVO extends BaseVO<string> {
  static create(value: string): SkuVO {
    const trimmed = value.trim().toUpperCase();
    if (trimmed.length < 3 || trimmed.length > 50) {
      throw new InvalidFeatureTypeError(value);
    }
    return new SkuVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
