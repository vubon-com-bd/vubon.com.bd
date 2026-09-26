import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class OrderIdVO extends BaseIdVO {
  static create(value: string): OrderIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('OrderId cannot be empty');
    }
    return new OrderIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
