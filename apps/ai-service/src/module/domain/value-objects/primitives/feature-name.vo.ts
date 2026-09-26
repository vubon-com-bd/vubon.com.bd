import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';

const MIN_LENGTH = 2;
const MAX_LENGTH = 50;

export class FeatureNameVO extends BaseNameVO {
  static create(raw: string): FeatureNameVO {
    if (typeof raw !== 'string') {
      throw new Error('FeatureName must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new Error(`FeatureName must be at least ${MIN_LENGTH} characters`);
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`FeatureName cannot exceed ${MAX_LENGTH} characters`);
    }
    return new FeatureNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
