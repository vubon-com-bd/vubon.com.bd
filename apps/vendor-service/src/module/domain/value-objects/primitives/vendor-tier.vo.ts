import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_TIER } from '@vubon/shared-constants/business/vendor';
import { InvalidVendorTierError } from '../../errors/tier.errors';

const VALID = new Set<string>(Object.values(VENDOR_TIER));

export class VendorTierVO extends BaseTypeVO {
  static create(value: string): VendorTierVO {
    if (!VALID.has(value)) {
      throw new InvalidVendorTierError(value);
    }
    return new VendorTierVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
