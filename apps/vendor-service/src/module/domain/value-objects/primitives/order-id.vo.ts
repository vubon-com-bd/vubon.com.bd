import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidOrderIdError } from '../../errors/vendor.errors';

export class OrderIdVO extends BaseIdVO {
  static create(value: string): OrderIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidOrderIdError(value);
    }
    return new OrderIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
