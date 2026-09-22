import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSubscriptionQuery } from './get-subscription.query';
import type { SubscriptionRepository } from '../../../domain/repositories/subscription.repository.interface';
import { SubscriptionIdVO } from '../../../domain/value-objects/primitives/subscription-id.vo';
import { SubscriptionOperationFailedError } from '../../errors/subscription.errors';

@QueryHandler(GetSubscriptionQuery)
export class GetSubscriptionHandler
  extends BaseQueryHandler<GetSubscriptionQuery, Readonly<Record<string, unknown>>>
  implements IQueryHandler<GetSubscriptionQuery>
{
  readonly queryType = 'subscription.get';
  constructor(
    @Inject('SubscriptionRepository')
    private readonly repo: SubscriptionRepository,
  ) { super(); }

  async execute(query: GetSubscriptionQuery): Promise<Readonly<Record<string, unknown>>> {
    const entity = await this.repo.findById(SubscriptionIdVO.create(query.subscriptionId));
    if (!entity) throw new SubscriptionOperationFailedError('subscription not found');
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      plan: entity.plan.value,
      status: entity.status.value,
    };
  }
}
