import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LoyaltyIdVO } from '../primitives/loyalty-id.vo';
import { LoyaltyStatusVO } from '../primitives/loyalty-status.vo';
import { LoyaltyPointsVO } from '../primitives/loyalty-points.vo';
import { LoyaltyTierVO } from '../primitives/loyalty-tier.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface LoyaltyProps {
  readonly id: LoyaltyIdVO;
  readonly userId: UserIdVO;
  readonly points: LoyaltyPointsVO;
  readonly tier: LoyaltyTierVO;
  readonly status: LoyaltyStatusVO;
}

export class LoyaltyVO extends BaseVO<LoyaltyProps> {
  private constructor(props: LoyaltyProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: LoyaltyProps): LoyaltyVO {
    return new LoyaltyVO(props);
  }

  get id(): LoyaltyIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get points(): LoyaltyPointsVO { return this.value.points; }
  get tier(): LoyaltyTierVO { return this.value.tier; }
  get status(): LoyaltyStatusVO { return this.value.status; }
}
