/**
 * AddressId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class AddressIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AddressIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('AddressId cannot be empty', 'addressId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('AddressId must be a valid UUID', 'addressId');
    }
    return new AddressIdVO(trimmed);
  }

  static reconstitute(raw: string): AddressIdVO {
    return new AddressIdVO(raw);
  }
}
