import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { Money } from '@vubon/shared-types/common';

export class SplitAmountVO extends BaseVO<Money> {
  static create(value: number): SplitAmountVO {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error('Split amount must be positive');
    }
    return new SplitAmountVO(value as Money);
  }

  get amount(): number {
    return this.value as unknown as number;
  }

  private constructor(value: Money) {
    super(value);
  }
}
