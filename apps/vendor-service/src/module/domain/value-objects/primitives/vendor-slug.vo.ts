import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidVendorSlugError } from '../../errors/vendor.errors';

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_LENGTH = 120;

export class VendorSlugVO extends BaseVO<string> {
  static create(value: string): VendorSlugVO {
    const normalized = value.trim().toLowerCase();
    if (normalized.length === 0 || normalized.length > MAX_LENGTH) {
      throw new InvalidVendorSlugError(value);
    }
    if (!SLUG_REGEX.test(normalized)) {
      throw new InvalidVendorSlugError(value);
    }
    return new VendorSlugVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }
}
