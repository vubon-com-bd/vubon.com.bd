/**
 * VendorId Value Object (reference to vendor-service)
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CartVendorIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartVendorIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('VendorId cannot be empty', 'vendorId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('VendorId must be a valid UUID', 'vendorId');
    }
    return new CartVendorIdVO(trimmed);
  }

  static reconstitute(raw: string): CartVendorIdVO {
    return new CartVendorIdVO(raw);
  }
}
