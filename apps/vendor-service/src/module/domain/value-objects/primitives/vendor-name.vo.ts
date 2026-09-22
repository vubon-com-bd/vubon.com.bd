import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { InvalidVendorNameError } from '../../errors/vendor.errors';

export class VendorNameVO extends BaseNameVO {
  static create(value: string): VendorNameVO {
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 100) {
      throw new InvalidVendorNameError(value);
    }
    return new VendorNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
