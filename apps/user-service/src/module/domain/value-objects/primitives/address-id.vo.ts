import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidAddressIdError } from '../../errors/address.errors';

export class AddressIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AddressIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidAddressIdError('AddressId cannot be empty');
    }
    return new AddressIdVO(raw);
  }
}
