import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { Money } from '@vubon/shared-types/common';

export class InvoiceAmountVO extends BaseVO<Money> {
  static create(value: number): InvoiceAmountVO {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error('Invalid invoice amount');
    }
    return new InvoiceAmountVO(value as Money);
  }

  get amount(): number {
    return this.value as unknown as number;
  }

  private constructor(value: Money) {
    super(value);
  }
}
