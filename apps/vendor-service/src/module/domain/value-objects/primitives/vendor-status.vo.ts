import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_STATUS } from '@vubon/shared-constants/business/vendor';
import { InvalidVendorStatusError } from '../../errors/vendor.errors';

const VALID = new Set<string>(Object.values(VENDOR_STATUS));

export class VendorStatusVO extends BaseStatusVO<string> {
  static create(value: string): VendorStatusVO {
    if (!VALID.has(value)) {
      throw new InvalidVendorStatusError(value);
    }
    return new VendorStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
