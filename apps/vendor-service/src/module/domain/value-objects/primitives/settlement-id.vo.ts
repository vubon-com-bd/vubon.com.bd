import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidSettlementIdError } from '../../errors/settlement.errors';

export class SettlementIdVO extends BaseIdVO {
  static create(value: string): SettlementIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidSettlementIdError(value);
    }
    return new SettlementIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
