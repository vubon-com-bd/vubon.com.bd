import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class ReferralRewardVO extends BaseCodeVO {
  static create(raw: string): ReferralRewardVO {
    if (!raw) {
      throw new Error('ReferralReward cannot be empty');
    }
    return new ReferralRewardVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
