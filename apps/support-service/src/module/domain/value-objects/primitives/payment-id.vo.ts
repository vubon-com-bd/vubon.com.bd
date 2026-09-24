import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class PaymentIdVO extends BaseIdVO {
  static create(value: string): PaymentIdVO {
    return new PaymentIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
