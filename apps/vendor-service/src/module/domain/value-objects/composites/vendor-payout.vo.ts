import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PayoutIdVO } from '../primitives/payout-id.vo';
import { PayoutAmountVO } from '../primitives/payout-amount.vo';
import { PayoutStatusVO } from '../primitives/payout-status.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { BankAccountIdVO } from '../primitives/bank-account-id.vo';

export interface VendorPayoutProps {
  readonly id: PayoutIdVO;
  readonly vendorId: VendorIdVO;
  readonly bankAccountId: BankAccountIdVO;
  readonly amount: PayoutAmountVO;
  readonly status: PayoutStatusVO;
  readonly requestedAt: Date;
  readonly processedAt: Date | null;
  readonly failureReason: string | null;
}

export class VendorPayoutVO extends BaseVO<VendorPayoutProps> {
  private constructor(props: VendorPayoutProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorPayoutProps): VendorPayoutVO {
    return new VendorPayoutVO(props);
  }

  get id(): PayoutIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get bankAccountId(): BankAccountIdVO { return this.value.bankAccountId; }
  get amount(): PayoutAmountVO { return this.value.amount; }
  get status(): PayoutStatusVO { return this.value.status; }
  get requestedAt(): Date { return this.value.requestedAt; }
  get processedAt(): Date | null { return this.value.processedAt; }
  get failureReason(): string | null { return this.value.failureReason; }
}
