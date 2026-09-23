import { LoyaltyTierVO } from '../value-objects/primitives/loyalty-tier.vo';

const TIER_ORDER: readonly string[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'vip'];

export class LoyaltyTierService {
  isUpgrade(current: LoyaltyTierVO, target: LoyaltyTierVO): boolean {
    const currentIndex = TIER_ORDER.indexOf(current.value);
    const targetIndex = TIER_ORDER.indexOf(target.value);
    return targetIndex > currentIndex;
  }
}
