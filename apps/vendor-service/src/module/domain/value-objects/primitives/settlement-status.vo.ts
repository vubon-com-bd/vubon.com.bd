import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VENDOR_SETTLEMENT_STATUS } from '@vubon/shared-constants/business/vendor';
import { InvalidSettlementStatusError } from '../../errors/settlement.errors';

const VALID = new Set<string>(Object.values(VENDOR_SETTLEMENT_STATUS));

export class SettlementStatusVO extends BaseVO<string> {
  static create(value: string): SettlementStatusVO {
    if (!VALID.has(value)) {
      throw new InvalidSettlementStatusError(value);
    }
    return new SettlementStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }

  isCompleted(): boolean {
    return this.value === VENDOR_SETTLEMENT_STATUS.COMPLETED;
  }
}
