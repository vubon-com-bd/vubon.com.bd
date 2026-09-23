import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { LoyaltyEntity } from '../entities/loyalty.entity';

export class CanEarnLoyaltySpecification extends Specification<LoyaltyEntity> {
  isSatisfiedBy(candidate: LoyaltyEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.value !== 'active') return false;
    return true;
  }
}
