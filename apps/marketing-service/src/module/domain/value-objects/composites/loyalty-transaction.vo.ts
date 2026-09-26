import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LoyaltyIdVO } from '../primitives/loyalty-id.vo';
import { LoyaltyPointsVO } from '../primitives/loyalty-points.vo';
import { OrderIdVO } from '../primitives/order-id.vo';

export interface LoyaltyTransactionProps {
  readonly loyaltyId: LoyaltyIdVO;
  readonly points: LoyaltyPointsVO;
  readonly type: string;
  readonly orderId: OrderIdVO | null;
}

export class LoyaltyTransactionVO extends BaseVO<LoyaltyTransactionProps> {
  private constructor(props: LoyaltyTransactionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: LoyaltyTransactionProps): LoyaltyTransactionVO {
    return new LoyaltyTransactionVO(props);
  }

  get loyaltyId(): LoyaltyIdVO { return this.value.loyaltyId; }
  get points(): LoyaltyPointsVO { return this.value.points; }
  get type(): string { return this.value.type; }
  get orderId(): OrderIdVO | null { return this.value.orderId; }
}
