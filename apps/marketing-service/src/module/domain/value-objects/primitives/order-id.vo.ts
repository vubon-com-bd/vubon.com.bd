import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class OrderIdVO extends BaseIdVO {
  static create(raw: string): OrderIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('OrderId cannot be empty');
    }
    return new OrderIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
