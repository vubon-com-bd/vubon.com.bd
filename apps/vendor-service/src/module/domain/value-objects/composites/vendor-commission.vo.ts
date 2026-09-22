import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CommissionIdVO } from '../primitives/commission-id.vo';
import { CommissionRateVO } from '../primitives/commission-rate.vo';
import { CommissionTypeVO } from '../primitives/commission-type.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { PayoutAmountVO } from '../primitives/payout-amount.vo';

export interface VendorCommissionProps {
  readonly id: CommissionIdVO;
  readonly vendorId: VendorIdVO;
  readonly orderId: OrderIdVO;
  readonly rate: CommissionRateVO;
  readonly type: CommissionTypeVO;
  readonly orderAmount: PayoutAmountVO;
  readonly commissionAmount: PayoutAmountVO;
  readonly calculatedAt: Date;
  readonly isSettled: boolean;
}

export class VendorCommissionVO extends BaseVO<VendorCommissionProps> {
  private constructor(props: VendorCommissionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorCommissionProps): VendorCommissionVO {
    return new VendorCommissionVO(props);
  }

  get id(): CommissionIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get rate(): CommissionRateVO { return this.value.rate; }
  get type(): CommissionTypeVO { return this.value.type; }
  get orderAmount(): PayoutAmountVO { return this.value.orderAmount; }
  get commissionAmount(): PayoutAmountVO { return this.value.commissionAmount; }
  get calculatedAt(): Date { return this.value.calculatedAt; }
  get isSettled(): boolean { return this.value.isSettled; }
}
