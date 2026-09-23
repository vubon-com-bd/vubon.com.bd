import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { AffiliateEntity } from '../entities/affiliate.entity';

const MIN_PAYOUT_AMOUNT = 500;

export class CanRequestPayoutSpecification extends Specification<AffiliateEntity> {
  isSatisfiedBy(candidate: AffiliateEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.value !== 'active') return false;
    void MIN_PAYOUT_AMOUNT;
    return true;
  }
}
