import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidAddressLineError } from '../../errors/address.errors';

export class AddressLineVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AddressLineVO {
    const trimmed = raw.trim();
    if (trimmed.length < 3 || trimmed.length > 255) {
      throw new InvalidAddressLineError('must be 3-255 characters');
    }
    return new AddressLineVO(trimmed);
  }
}
