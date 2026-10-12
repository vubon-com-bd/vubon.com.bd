/**
 * VendorDistrict Value Object — Bangladesh district (zila)
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 80;
const MIN_LENGTH = 2;

export class VendorDistrictVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorDistrictVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('District must be a string', 'district');
    }
    const normalized = raw.trim();
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `District must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'district',
      );
    }
    if (!/^[\p{L}\s\-]+$/u.test(normalized)) {
      throw new ValidationError('District contains invalid characters', 'district');
    }
    return new VendorDistrictVO(normalized);
  }

  static reconstitute(raw: string): VendorDistrictVO {
    return new VendorDistrictVO(raw);
  }
}
