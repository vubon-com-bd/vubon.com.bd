import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class CheckoutIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CheckoutIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('CheckoutId', 'cannot be empty');
    }
    return new CheckoutIdVO(raw);
  }
}
