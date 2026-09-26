import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class FeatureIdVO extends BaseIdVO {
  static create(value: string): FeatureIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('FeatureId cannot be empty');
    }
    return new FeatureIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
