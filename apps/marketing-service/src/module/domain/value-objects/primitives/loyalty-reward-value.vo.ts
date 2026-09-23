import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class LoyaltyRewardValueVO extends BaseCodeVO {
  static create(raw: string): LoyaltyRewardValueVO {
    if (!raw) {
      throw new Error('LoyaltyRewardValue cannot be empty');
    }
    return new LoyaltyRewardValueVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
