/**
 * BrandId Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class BrandIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): BrandIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('BrandId cannot be empty', 'brandId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('BrandId must be a valid UUID', 'brandId');
    }
    return new BrandIdVO(trimmed);
  }

  static reconstitute(raw: string): BrandIdVO { return new BrandIdVO(raw); }
}
