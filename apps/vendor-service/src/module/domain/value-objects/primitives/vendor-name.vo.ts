/**
 * VendorName Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Business Rules:
 * - Min 3, Max 150 chars
 * - Normalized whitespace
 * - Allows Unicode letters, spaces, apostrophes, dots, hyphens
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 3;
const MAX_LENGTH = 150;

export class VendorNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('VendorName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `VendorName must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'name',
      );
    }
    return new VendorNameVO(normalized);
  }

  static reconstitute(raw: string): VendorNameVO {
    return new VendorNameVO(raw);
  }

  isShort(): boolean {
    return this.value.length <= 40;
  }

  isLong(): boolean {
    return this.value.length > 80;
  }
}
