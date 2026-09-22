import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class OrderIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('OrderId', 'cannot be empty');
    }
    return new OrderIdVO(raw);
  }
}
