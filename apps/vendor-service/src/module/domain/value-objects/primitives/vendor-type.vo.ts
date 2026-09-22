import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_TYPE } from '@vubon/shared-constants/business/vendor';
import { InvalidVendorTypeError } from '../../errors/vendor.errors';

const VALID = new Set<string>(Object.values(VENDOR_TYPE));

export class VendorTypeVO extends BaseTypeVO {
  static create(value: string): VendorTypeVO {
    if (!VALID.has(value)) {
      throw new InvalidVendorTypeError(value);
    }
    return new VendorTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
