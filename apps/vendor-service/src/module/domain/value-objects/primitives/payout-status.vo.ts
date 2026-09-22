import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VENDOR_PAYOUT_STATUS } from '@vubon/shared-constants/business/vendor';
import { InvalidPayoutStatusError } from '../../errors/payout.errors';

const VALID = new Set<string>(Object.values(VENDOR_PAYOUT_STATUS));

export class PayoutStatusVO extends BaseVO<string> {
  static create(value: string): PayoutStatusVO {
    if (!VALID.has(value)) {
      throw new InvalidPayoutStatusError(value);
    }
    return new PayoutStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }

  isPending(): boolean {
    return this.value === VENDOR_PAYOUT_STATUS.PENDING;
  }

  isPaid(): boolean {
    return this.value === VENDOR_PAYOUT_STATUS.PAID;
  }

  isProcessing(): boolean {
    return this.value === VENDOR_PAYOUT_STATUS.PROCESSING;
  }

  isFailed(): boolean {
    return this.value === VENDOR_PAYOUT_STATUS.FAILED;
  }
}
