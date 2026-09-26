import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidAddressLabelError } from '../../errors/vendor.errors';

export class AddressLabelVO extends BaseCodeVO {
  static create(value: string): AddressLabelVO {
    const trimmed = value.trim();
    if (trimmed.length === 0 || trimmed.length > 100) {
      throw new InvalidAddressLabelError(value);
    }
    return new AddressLabelVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
