/**
 * PriceId Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PriceIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): PriceIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('PriceId cannot be empty', 'priceId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('PriceId must be a valid UUID', 'priceId');
    }
    return new PriceIdVO(trimmed);
  }

  static reconstitute(raw: string): PriceIdVO { return new PriceIdVO(raw); }
}
