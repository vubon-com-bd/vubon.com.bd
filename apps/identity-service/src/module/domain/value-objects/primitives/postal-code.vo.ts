/**
 * PostalCode Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { InvalidAddressError } from '../../errors/profile.errors.js';

export class PostalCodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PostalCodeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidAddressError('postalCode', 'PostalCode cannot be empty');
    }
    const normalized = raw.trim();
    if (!REGEX.POSTAL_BD.test(normalized)) {
      throw new InvalidAddressError('postalCode', 'PostalCode must be 4 digits (BD)');
    }
    return new PostalCodeVO(normalized);
  }

  static reconstitute(raw: string): PostalCodeVO {
    return new PostalCodeVO(raw);
  }
}
