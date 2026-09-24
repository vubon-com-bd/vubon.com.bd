import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class OrderIdVO extends BaseIdVO {
  static create(value: string): OrderIdVO {
    return new OrderIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
