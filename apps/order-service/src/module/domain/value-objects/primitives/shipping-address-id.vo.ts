/**
 * ShippingAddressId Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ShippingAddressIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ShippingAddressIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ShippingAddressId cannot be empty', 'shippingAddressId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('ShippingAddressId must be a valid UUID', 'shippingAddressId');
    }
    return new ShippingAddressIdVO(trimmed);
  }

  static reconstitute(raw: string): ShippingAddressIdVO {
    return new ShippingAddressIdVO(raw);
  }
}
