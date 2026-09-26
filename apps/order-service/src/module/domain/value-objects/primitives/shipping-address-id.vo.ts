import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class ShippingAddressIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ShippingAddressIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('ShippingAddressId', 'cannot be empty');
    }
    return new ShippingAddressIdVO(raw);
  }
}
