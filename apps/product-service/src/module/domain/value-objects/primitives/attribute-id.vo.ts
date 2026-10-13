/**
 * AttributeId Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class AttributeIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): AttributeIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('AttributeId cannot be empty', 'attributeId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('AttributeId must be a valid UUID', 'attributeId');
    }
    return new AttributeIdVO(trimmed);
  }

  static reconstitute(raw: string): AttributeIdVO { return new AttributeIdVO(raw); }
}
