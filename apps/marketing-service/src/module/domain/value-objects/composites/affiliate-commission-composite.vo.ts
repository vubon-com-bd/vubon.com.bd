import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AffiliateIdVO } from '../primitives/affiliate-id.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { AffiliateCommissionVO } from '../primitives/affiliate-commission.vo';
import { MoneyVO } from '@vubon/shared-kernel/domain/primitives/money.vo';

export interface AffiliateCommissionCompositeProps {
  readonly affiliateId: AffiliateIdVO;
  readonly orderId: OrderIdVO;
  readonly amount: MoneyVO;
  readonly commission: AffiliateCommissionVO;
  readonly status: string;
}

export class AffiliateCommissionCompositeVO extends BaseVO<AffiliateCommissionCompositeProps> {
  private constructor(props: AffiliateCommissionCompositeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AffiliateCommissionCompositeProps): AffiliateCommissionCompositeVO {
    return new AffiliateCommissionCompositeVO(props);
  }

  get affiliateId(): AffiliateIdVO { return this.value.affiliateId; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get amount(): MoneyVO { return this.value.amount; }
  get commission(): AffiliateCommissionVO { return this.value.commission; }
  get status(): string { return this.value.status; }
}
