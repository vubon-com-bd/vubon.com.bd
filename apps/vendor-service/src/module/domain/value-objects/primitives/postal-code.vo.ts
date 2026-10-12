/**
 * PostalCode Value Object — BD 4-digit postal code
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const LENGTH = 4;

export class PostalCodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PostalCodeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Postal code must be a string', 'postalCode');
    }
    const normalized = raw.trim();
    if (normalized.length !== LENGTH) {
      throw new ValidationError(`Postal code must be exactly ${LENGTH} digits`, 'postalCode');
    }
    if (!/^\d+$/.test(normalized)) {
      throw new ValidationError('Postal code must contain digits only', 'postalCode');
    }
    return new PostalCodeVO(normalized);
  }

  static reconstitute(raw: string): PostalCodeVO {
    return new PostalCodeVO(raw);
  }

  /** BD postal codes start from 1000. */
  isPlausibleBD(): boolean {
    const n = Number(this.value);
    return n >= 1000 && n <= 9999;
  }
}
