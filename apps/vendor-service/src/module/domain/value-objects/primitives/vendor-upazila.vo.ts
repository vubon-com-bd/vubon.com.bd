/**
 * VendorUpazila Value Object — Bangladesh upazila / thana
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 80;
const MIN_LENGTH = 2;

export class VendorUpazilaVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorUpazilaVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Upazila must be a string', 'upazila');
    }
    const normalized = raw.trim();
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `Upazila must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'upazila',
      );
    }
    if (!/^[\p{L}\s\-]+$/u.test(normalized)) {
      throw new ValidationError('Upazila contains invalid characters', 'upazila');
    }
    return new VendorUpazilaVO(normalized);
  }

  static reconstitute(raw: string): VendorUpazilaVO {
    return new VendorUpazilaVO(raw);
  }
}
