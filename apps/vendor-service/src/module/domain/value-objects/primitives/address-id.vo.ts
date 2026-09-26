import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidAddressIdError } from '../../errors/vendor.errors';

export class AddressIdVO extends BaseIdVO {
  static create(value: string): AddressIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidAddressIdError(value);
    }
    return new AddressIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
