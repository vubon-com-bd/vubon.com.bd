import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidFeatureTypeError } from '../../errors/vendor.errors';

export class FeatureCodeVO extends BaseCodeVO {
  static create(value: string): FeatureCodeVO {
    const trimmed = value.trim();
    if (trimmed.length === 0 || trimmed.length > 100) {
      throw new InvalidFeatureTypeError(value);
    }
    return new FeatureCodeVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
