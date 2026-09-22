import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class BillingAddressIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BillingAddressIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('BillingAddressId', 'cannot be empty');
    }
    return new BillingAddressIdVO(raw);
  }
}
