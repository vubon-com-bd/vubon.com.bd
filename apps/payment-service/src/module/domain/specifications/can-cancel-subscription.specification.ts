import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { SubscriptionEntity } from '../entities/subscription.entity';

export class CanCancelSubscriptionSpecification extends Specification<SubscriptionEntity> {
  isSatisfiedBy(candidate: SubscriptionEntity): boolean {
    if (candidate.status.value === 'cancelled') return false;
    if (candidate.status.value === 'expired') return false;
    return true;
  }
}
