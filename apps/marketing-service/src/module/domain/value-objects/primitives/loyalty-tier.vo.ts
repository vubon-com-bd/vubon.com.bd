import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'bronze', 'silver', 'gold', 'platinum', 'diamond', 'vip',
]);

export class LoyaltyTierVO extends BaseTypeVO<string> {
  static create(raw: string): LoyaltyTierVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid LoyaltyTier: ${raw}`);
    }
    return new LoyaltyTierVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
