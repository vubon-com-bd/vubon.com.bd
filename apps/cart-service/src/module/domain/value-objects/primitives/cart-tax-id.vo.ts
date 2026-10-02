/**
 * CartTaxId Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CartTaxIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartTaxIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CartTaxId cannot be empty', 'taxId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('CartTaxId must be a valid UUID', 'taxId');
    }
    return new CartTaxIdVO(trimmed);
  }

  static reconstitute(raw: string): CartTaxIdVO {
    return new CartTaxIdVO(raw);
  }
}
