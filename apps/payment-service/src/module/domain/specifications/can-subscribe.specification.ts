import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { SubscriptionEntity } from '../entities/subscription.entity';

export class CanSubscribeSpecification extends Specification<SubscriptionEntity> {
  isSatisfiedBy(candidate: SubscriptionEntity): boolean {
    return candidate.status.value === 'incomplete' || candidate.status.value === 'trialing';
  }
}
