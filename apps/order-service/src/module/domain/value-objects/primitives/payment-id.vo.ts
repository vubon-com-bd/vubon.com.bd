import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class PaymentIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PaymentIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('PaymentId', 'cannot be empty');
    }
    return new PaymentIdVO(raw);
  }
}
