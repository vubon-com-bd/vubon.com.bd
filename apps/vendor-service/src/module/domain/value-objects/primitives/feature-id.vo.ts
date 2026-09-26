import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidFeatureIdError } from '../../errors/vendor.errors';

export class FeatureIdVO extends BaseIdVO {
  static create(value: string): FeatureIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidFeatureIdError(value);
    }
    return new FeatureIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
