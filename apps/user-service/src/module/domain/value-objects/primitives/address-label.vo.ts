import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidAddressLabelError } from '../../errors/address.errors';

export class AddressLabelVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AddressLabelVO {
    const trimmed = raw.trim();
    if (trimmed.length > 50) {
      throw new InvalidAddressLabelError('must not exceed 50 characters');
    }
    return new AddressLabelVO(trimmed);
  }
}
