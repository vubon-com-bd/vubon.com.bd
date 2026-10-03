/**
 * AddressId Value Object (reference to user-service address)
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CartAddressIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartAddressIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('AddressId cannot be empty', 'addressId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('AddressId must be a valid UUID', 'addressId');
    }
    return new CartAddressIdVO(trimmed);
  }

  static reconstitute(raw: string): CartAddressIdVO {
    return new CartAddressIdVO(raw);
  }
}
