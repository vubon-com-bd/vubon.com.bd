import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { Money } from '@vubon/shared-types/common';

export class PaymentAmountVO extends BaseVO<Money> {
  static create(value: number): PaymentAmountVO {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error('Invalid payment amount');
    }
    return new PaymentAmountVO(value as Money);
  }

  get amount(): number {
    return this.value as unknown as number;
  }

  private constructor(value: Money) {
    super(value);
  }
}
