import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidPayoutIdError } from '../../errors/payout.errors';

export class PayoutIdVO extends BaseIdVO {
  static create(value: string): PayoutIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidPayoutIdError(value);
    }
    return new PayoutIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
