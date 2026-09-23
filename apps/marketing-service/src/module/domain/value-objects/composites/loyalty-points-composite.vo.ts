import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LoyaltyPointsVO } from '../primitives/loyalty-points.vo';

export interface LoyaltyPointsCompositeProps {
  readonly points: LoyaltyPointsVO;
  readonly type: string;
  readonly reason: string | null;
}

export class LoyaltyPointsCompositeVO extends BaseVO<LoyaltyPointsCompositeProps> {
  private constructor(props: LoyaltyPointsCompositeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: LoyaltyPointsCompositeProps): LoyaltyPointsCompositeVO {
    return new LoyaltyPointsCompositeVO(props);
  }

  get points(): LoyaltyPointsVO { return this.value.points; }
  get type(): string { return this.value.type; }
  get reason(): string | null { return this.value.reason; }
}
