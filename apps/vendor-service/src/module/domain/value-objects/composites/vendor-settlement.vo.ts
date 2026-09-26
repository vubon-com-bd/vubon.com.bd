import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SettlementIdVO } from '../primitives/settlement-id.vo';
import { SettlementStatusVO } from '../primitives/settlement-status.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { PayoutAmountVO } from '../primitives/payout-amount.vo';

export interface VendorSettlementProps {
  readonly id: SettlementIdVO;
  readonly vendorId: VendorIdVO;
  readonly status: SettlementStatusVO;
  readonly totalAmount: PayoutAmountVO;
  readonly commissionAmount: PayoutAmountVO;
  readonly netAmount: PayoutAmountVO;
  readonly periodStart: Date;
  readonly periodEnd: Date;
  readonly settledAt: Date | null;
}

export class VendorSettlementVO extends BaseVO<VendorSettlementProps> {
  private constructor(props: VendorSettlementProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorSettlementProps): VendorSettlementVO {
    return new VendorSettlementVO(props);
  }

  get id(): SettlementIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get status(): SettlementStatusVO { return this.value.status; }
  get totalAmount(): PayoutAmountVO { return this.value.totalAmount; }
  get commissionAmount(): PayoutAmountVO { return this.value.commissionAmount; }
  get netAmount(): PayoutAmountVO { return this.value.netAmount; }
  get periodStart(): Date { return this.value.periodStart; }
  get periodEnd(): Date { return this.value.periodEnd; }
  get settledAt(): Date | null { return this.value.settledAt; }
}
