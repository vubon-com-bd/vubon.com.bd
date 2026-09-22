import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidCommissionIdError } from '../../errors/commission.errors';

export class CommissionIdVO extends BaseIdVO {
  static create(value: string): CommissionIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidCommissionIdError(value);
    }
    return new CommissionIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
