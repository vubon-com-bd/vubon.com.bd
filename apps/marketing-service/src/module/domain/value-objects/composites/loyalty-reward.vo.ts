import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LoyaltyRewardIdVO } from '../primitives/loyalty-reward-id.vo';
import { LoyaltyRewardTypeVO } from '../primitives/loyalty-reward-type.vo';
import { LoyaltyRewardValueVO } from '../primitives/loyalty-reward-value.vo';
import { LoyaltyPointsVO } from '../primitives/loyalty-points.vo';

export interface LoyaltyRewardCompositeProps {
  readonly id: LoyaltyRewardIdVO;
  readonly type: LoyaltyRewardTypeVO;
  readonly rewardValue: LoyaltyRewardValueVO;
  readonly pointsCost: LoyaltyPointsVO;
  readonly status: string;
}

export class LoyaltyRewardCompositeVO extends BaseVO<LoyaltyRewardCompositeProps> {
  private constructor(props: LoyaltyRewardCompositeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: LoyaltyRewardCompositeProps): LoyaltyRewardCompositeVO {
    return new LoyaltyRewardCompositeVO(props);
  }

  get id(): LoyaltyRewardIdVO { return this.value.id; }
  get type(): LoyaltyRewardTypeVO { return this.value.type; }
  get rewardValue(): LoyaltyRewardValueVO { return this.value.rewardValue; }
  get pointsCost(): LoyaltyPointsVO { return this.value.pointsCost; }
  get status(): string { return this.value.status; }
}
