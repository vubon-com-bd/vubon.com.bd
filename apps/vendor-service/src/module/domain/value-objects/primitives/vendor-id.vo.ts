import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidVendorIdError } from '../../errors/vendor.errors';

export class VendorIdVO extends BaseIdVO {
  static create(value: string): VendorIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidVendorIdError(value);
    }
    return new VendorIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
