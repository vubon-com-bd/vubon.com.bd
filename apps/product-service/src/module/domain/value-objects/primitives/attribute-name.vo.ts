/**
 * AttributeName Value Object
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ATTRIBUTE } from '@vubon/shared-constants/business/product';

export class AttributeNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AttributeNameVO {
    if (typeof raw !== 'string') {
      throw new Error('AttributeName must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('AttributeName cannot be empty');
    }
    if (trimmed.length > ATTRIBUTE.NAME_MAX_LENGTH) {
      throw new Error(`AttributeName cannot exceed ${ATTRIBUTE.NAME_MAX_LENGTH} chars`);
    }
    return new AttributeNameVO(trimmed);
  }

  static reconstitute(raw: string): AttributeNameVO {
    return new AttributeNameVO(raw);
  }
}
