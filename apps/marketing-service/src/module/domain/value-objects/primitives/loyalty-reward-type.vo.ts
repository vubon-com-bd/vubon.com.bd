import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'discount', 'free_shipping', 'gift', 'cashback', 'points', 'upgrade',
]);

export class LoyaltyRewardTypeVO extends BaseTypeVO<string> {
  static create(raw: string): LoyaltyRewardTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid LoyaltyRewardType: ${raw}`);
    }
    return new LoyaltyRewardTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
