/**
 * VendorDivision Value Object — Bangladesh administrative division
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 60;
const MIN_LENGTH = 2;

export class VendorDivisionVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorDivisionVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Division must be a string', 'division');
    }
    const normalized = raw.trim();
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `Division must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'division',
      );
    }
    if (!/^[\p{L}\s\-]+$/u.test(normalized)) {
      throw new ValidationError('Division contains invalid characters', 'division');
    }
    return new VendorDivisionVO(normalized);
  }

  static reconstitute(raw: string): VendorDivisionVO {
    return new VendorDivisionVO(raw);
  }

  matches(other: string): boolean {
    return this.value.toLowerCase() === other.trim().toLowerCase();
  }
}
