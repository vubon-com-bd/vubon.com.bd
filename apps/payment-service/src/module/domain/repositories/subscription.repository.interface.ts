import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { SubscriptionIdVO } from '../value-objects/primitives/subscription-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface SubscriptionRepository extends BaseRepository<SubscriptionEntity, SubscriptionIdVO> {
  findActiveByUser(userId: UserIdVO): Promise<readonly SubscriptionEntity[]>;
  findDueForRenewal(before: Date): Promise<readonly SubscriptionEntity[]>;
}
