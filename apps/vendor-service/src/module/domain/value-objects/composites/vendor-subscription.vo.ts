import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SubscriptionIdVO } from '../primitives/subscription-id.vo';
import { SubscriptionPlanVO } from '../primitives/subscription-plan.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { PayoutAmountVO } from '../primitives/payout-amount.vo';

export interface VendorSubscriptionProps {
  readonly id: SubscriptionIdVO;
  readonly vendorId: VendorIdVO;
  readonly plan: SubscriptionPlanVO;
  readonly price: PayoutAmountVO;
  readonly startedAt: Date;
  readonly expiresAt: Date;
  readonly autoRenew: boolean;
  readonly cancelledAt: Date | null;
}

export class VendorSubscriptionVO extends BaseVO<VendorSubscriptionProps> {
  private constructor(props: VendorSubscriptionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorSubscriptionProps): VendorSubscriptionVO {
    return new VendorSubscriptionVO(props);
  }

  get id(): SubscriptionIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get plan(): SubscriptionPlanVO { return this.value.plan; }
  get price(): PayoutAmountVO { return this.value.price; }
  get startedAt(): Date { return this.value.startedAt; }
  get expiresAt(): Date { return this.value.expiresAt; }
  get autoRenew(): boolean { return this.value.autoRenew; }
  get cancelledAt(): Date | null { return this.value.cancelledAt; }

  get isActive(): boolean {
    return this.value.cancelledAt === null && this.value.expiresAt.getTime() > Date.now();
  }
}
