import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';

const MIN_LENGTH = 2;
const MAX_LENGTH = 100;

export class ModelNameVO extends BaseNameVO {
  static create(raw: string): ModelNameVO {
    if (typeof raw !== 'string') {
      throw new Error('ModelName must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new Error(`ModelName must be at least ${MIN_LENGTH} characters`);
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`ModelName cannot exceed ${MAX_LENGTH} characters`);
    }
    return new ModelNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
