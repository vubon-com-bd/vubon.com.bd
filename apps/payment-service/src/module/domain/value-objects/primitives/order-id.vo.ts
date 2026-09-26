import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class OrderIdVO extends BaseIdVO {
  static create(value: string): OrderIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid order id');
    }
    return new OrderIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
