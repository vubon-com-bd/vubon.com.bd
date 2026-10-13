/**
 * BrandName Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BRAND } from '@vubon/shared-constants/business';

export class BrandNameVO extends BaseNameVO {
  private constructor(value: string) { super(value); }

  static create(raw: string): BrandNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('BrandName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < BRAND.NAME_MIN_LENGTH || normalized.length > BRAND.NAME_MAX_LENGTH) {
      throw new ValidationError(
        `BrandName must be ${BRAND.NAME_MIN_LENGTH}-${BRAND.NAME_MAX_LENGTH} chars`,
        'name',
      );
    }
    return new BrandNameVO(normalized);
  }

  static reconstitute(raw: string): BrandNameVO { return new BrandNameVO(raw); }
}
