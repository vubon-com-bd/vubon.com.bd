/**
 * AttributeName Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ATTRIBUTE } from '@vubon/shared-constants/business';

export class AttributeNameVO extends BaseNameVO {
  private constructor(value: string) { super(value); }

  static create(raw: string): AttributeNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('AttributeName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < 1 || normalized.length > ATTRIBUTE.NAME_MAX_LENGTH) {
      throw new ValidationError(
        `AttributeName must be 1-${ATTRIBUTE.NAME_MAX_LENGTH} chars`,
        'name',
      );
    }
    return new AttributeNameVO(normalized);
  }

  static reconstitute(raw: string): AttributeNameVO { return new AttributeNameVO(raw); }
}
