import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';

const MIN_LENGTH = 2;
const MAX_LENGTH = 50;

export class ProviderNameVO extends BaseNameVO {
  static create(raw: string): ProviderNameVO {
    if (typeof raw !== 'string') {
      throw new Error('ProviderName must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new Error(`ProviderName must be at least ${MIN_LENGTH} characters`);
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`ProviderName cannot exceed ${MAX_LENGTH} characters`);
    }
    return new ProviderNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
