import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class LoyaltyRewardIdVO extends BaseIdVO {
  static create(raw: string): LoyaltyRewardIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('LoyaltyRewardId cannot be empty');
    }
    return new LoyaltyRewardIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
