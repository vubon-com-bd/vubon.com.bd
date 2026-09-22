import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class CustomerIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CustomerIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('CustomerId', 'cannot be empty');
    }
    return new CustomerIdVO(raw);
  }
}
