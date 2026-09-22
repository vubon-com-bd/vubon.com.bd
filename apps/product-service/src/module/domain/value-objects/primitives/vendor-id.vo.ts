import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class VendorIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidValueError('vendor_id', 'VendorId cannot be empty');
    }
    return new VendorIdVO(raw);
  }
}
