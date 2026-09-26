import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { LoyaltyEntity } from '../entities/loyalty.entity';
import { LoyaltyTierVO } from '../value-objects/primitives/loyalty-tier.vo';

export class CanUpgradeTierSpecification extends Specification<{
  loyalty: LoyaltyEntity;
  targetTier: LoyaltyTierVO;
}> {
  isSatisfiedBy(candidate: {
    loyalty: LoyaltyEntity;
    targetTier: LoyaltyTierVO;
  }): boolean {
    if (candidate.loyalty.isDeleted()) return false;
    if (candidate.loyalty.tier.value === candidate.targetTier.value) return false;
    return true;
  }
}
