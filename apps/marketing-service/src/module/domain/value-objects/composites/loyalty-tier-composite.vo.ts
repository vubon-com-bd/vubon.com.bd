import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LoyaltyTierVO } from '../primitives/loyalty-tier.vo';
import { LoyaltyPointsVO } from '../primitives/loyalty-points.vo';

export interface LoyaltyTierCompositeProps {
  readonly tier: LoyaltyTierVO;
  readonly minPoints: LoyaltyPointsVO;
  readonly benefits: readonly string[];
}

export class LoyaltyTierCompositeVO extends BaseVO<LoyaltyTierCompositeProps> {
  private constructor(props: LoyaltyTierCompositeProps) {
    super(Object.freeze({
      ...props,
      benefits: Object.freeze([...props.benefits]),
    }));
  }

  static create(props: LoyaltyTierCompositeProps): LoyaltyTierCompositeVO {
    return new LoyaltyTierCompositeVO(props);
  }

  get tier(): LoyaltyTierVO { return this.value.tier; }
  get minPoints(): LoyaltyPointsVO { return this.value.minPoints; }
  get benefits(): readonly string[] { return this.value.benefits; }
}
