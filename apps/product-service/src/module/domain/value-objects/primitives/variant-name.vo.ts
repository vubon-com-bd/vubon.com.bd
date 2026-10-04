/**
 * VariantName Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_LENGTH = 100;

export class VariantNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VariantNameVO {
    if (typeof raw !== 'string') {
      throw new Error('VariantName must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('VariantName cannot be empty');
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`VariantName cannot exceed ${MAX_LENGTH} characters`);
    }
    return new VariantNameVO(trimmed);
  }

  static reconstitute(raw: string): VariantNameVO {
    return new VariantNameVO(raw);
  }
}
