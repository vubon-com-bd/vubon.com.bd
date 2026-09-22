import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class OrderItemIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderItemIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('OrderItemId', 'cannot be empty');
    }
    return new OrderItemIdVO(raw);
  }
}
