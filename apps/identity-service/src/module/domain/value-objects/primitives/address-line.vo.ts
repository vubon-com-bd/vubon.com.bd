/**
 * AddressLine Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidAddressError } from '../../errors/profile.errors.js';

export class AddressLineVO extends BaseCodeVO {
  private static readonly MIN = 3;
  private static readonly MAX = 200;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AddressLineVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidAddressError('line', 'AddressLine cannot be empty');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < AddressLineVO.MIN || normalized.length > AddressLineVO.MAX) {
      throw new InvalidAddressError(
        'line',
        `AddressLine must be ${AddressLineVO.MIN}-${AddressLineVO.MAX} chars`,
      );
    }
    return new AddressLineVO(normalized);
  }

  static reconstitute(raw: string): AddressLineVO {
    return new AddressLineVO(raw);
  }
}
