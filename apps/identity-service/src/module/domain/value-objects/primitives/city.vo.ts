/**
 * City Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidAddressError } from '../../errors/profile.errors.js';

export class CityVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CityVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidAddressError('city', 'City cannot be empty');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < 2 || normalized.length > 100) {
      throw new InvalidAddressError('city', 'City must be 2-100 chars');
    }
    return new CityVO(normalized);
  }

  static reconstitute(raw: string): CityVO {
    return new CityVO(raw);
  }
}
