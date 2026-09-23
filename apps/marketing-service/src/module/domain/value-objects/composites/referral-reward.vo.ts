import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ReferralRewardVO } from '../primitives/referral-reward.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { OrderIdVO } from '../primitives/order-id.vo';

export interface ReferralRewardCompositeProps {
  readonly reward: ReferralRewardVO;
  readonly userId: UserIdVO;
  readonly orderId: OrderIdVO | null;
  readonly status: string;
}

export class ReferralRewardCompositeVO extends BaseVO<ReferralRewardCompositeProps> {
  private constructor(props: ReferralRewardCompositeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ReferralRewardCompositeProps): ReferralRewardCompositeVO {
    return new ReferralRewardCompositeVO(props);
  }

  get reward(): ReferralRewardVO { return this.value.reward; }
  get userId(): UserIdVO { return this.value.userId; }
  get orderId(): OrderIdVO | null { return this.value.orderId; }
  get status(): string { return this.value.status; }
}
