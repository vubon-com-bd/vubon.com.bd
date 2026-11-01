/**
 * VariantName Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VARIANT } from '@vubon/shared-constants/business';

export class VariantNameVO extends BaseNameVO {
  private constructor(value: string) { super(value); }

  static create(raw: string): VariantNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('VariantName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < 1 || normalized.length > VARIANT.NAME_MAX_LENGTH) {
      throw new ValidationError(
        `VariantName must be 1-${VARIANT.NAME_MAX_LENGTH} chars`,
        'name',
      );
    }
    return new VariantNameVO(normalized);
  }

  static reconstitute(raw: string): VariantNameVO { return new VariantNameVO(raw); }
}
