import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class OrderIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('OrderId cannot be empty');
    }
    return new OrderIdVO(raw);
  }
}
