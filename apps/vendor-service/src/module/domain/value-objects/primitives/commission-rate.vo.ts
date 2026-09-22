import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidCommissionRateError } from '../../errors/commission.errors';

export class CommissionRateVO extends BaseCodeVO {
  static create(value: string): CommissionRateVO {
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric < 0 || numeric > 100) {
      throw new InvalidCommissionRateError(value);
    }
    return new CommissionRateVO(String(numeric));
  }

  get numeric(): number {
    return Number(this.value);
  }

  private constructor(value: string) {
    super(value);
  }
}
