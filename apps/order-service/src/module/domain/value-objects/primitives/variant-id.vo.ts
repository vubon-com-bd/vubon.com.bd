/**
 * VariantId Value Object (cross-service reference → product-service)
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VariantIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VariantIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('VariantId cannot be empty', 'variantId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('VariantId must be a valid UUID', 'variantId');
    }
    return new VariantIdVO(trimmed);
  }

  static reconstitute(raw: string): VariantIdVO {
    return new VariantIdVO(raw);
  }
}
