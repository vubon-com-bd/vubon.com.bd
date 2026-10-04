/**
 * VendorId Value Object (cross-service reference → vendor-service)
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VendorIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('VendorId cannot be empty', 'vendorId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('VendorId must be a valid UUID', 'vendorId');
    }
    return new VendorIdVO(trimmed);
  }

  static reconstitute(raw: string): VendorIdVO {
    return new VendorIdVO(raw);
  }
}
