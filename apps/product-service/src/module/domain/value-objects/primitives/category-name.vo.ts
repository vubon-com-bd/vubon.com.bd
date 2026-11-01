/**
 * CategoryName Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CATEGORY } from '@vubon/shared-constants/business';

export class CategoryNameVO extends BaseNameVO {
  private constructor(value: string) { super(value); }

  static create(raw: string): CategoryNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CategoryName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (
      normalized.length < CATEGORY.NAME_MIN_LENGTH ||
      normalized.length > CATEGORY.NAME_MAX_LENGTH
    ) {
      throw new ValidationError(
        `CategoryName must be ${CATEGORY.NAME_MIN_LENGTH}-${CATEGORY.NAME_MAX_LENGTH} chars`,
        'name',
      );
    }
    return new CategoryNameVO(normalized);
  }

  static reconstitute(raw: string): CategoryNameVO { return new CategoryNameVO(raw); }
}
