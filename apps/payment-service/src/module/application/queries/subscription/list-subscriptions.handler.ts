import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSubscriptionsQuery } from './list-subscriptions.query';
import type { SubscriptionRepository } from '../../../domain/repositories/subscription.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { SubscriptionResponseDTO } from '../../dtos/responses/subscription-response.dto';

@QueryHandler(ListSubscriptionsQuery)
export class ListSubscriptionsHandler
  extends BaseQueryHandler<ListSubscriptionsQuery, readonly SubscriptionResponseDTO[]>
  implements IQueryHandler<ListSubscriptionsQuery>
{
  readonly queryType = 'subscription.list';

  constructor(
    @Inject('SubscriptionRepository')
    private readonly subscriptionRepo: SubscriptionRepository,
  ) {
    super();
  }

  async execute(query: ListSubscriptionsQuery): Promise<readonly SubscriptionResponseDTO[]> {
    const entities = await this.subscriptionRepo.findActiveByUser(UserIdVO.create(query.userId));
    return entities.map((e) => ({
      id: e.id.value,
      userId: e.userId.value,
      plan: e.plan.value,
      status: e.status.value,
      currentPeriodFrom: e.currentPeriodFrom.toISOString(),
      currentPeriodTo: e.currentPeriodTo.toISOString(),
      cancelledAt: e.cancelledAt?.toISOString(),
      createdAt: e.createdAt,
    }));
  }
}
