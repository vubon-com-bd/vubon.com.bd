import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { LoyaltyEntity } from '../entities/loyalty.entity';

export class CanRedeemLoyaltySpecification extends Specification<{
  loyalty: LoyaltyEntity;
  pointsToRedeem: number;
}> {
  isSatisfiedBy(candidate: {
    loyalty: LoyaltyEntity;
    pointsToRedeem: number;
  }): boolean {
    if (candidate.loyalty.isDeleted()) return false;
    if (candidate.loyalty.status.value !== 'active') return false;
    if (candidate.loyalty.points.value < candidate.pointsToRedeem) return false;
    return true;
  }
}
