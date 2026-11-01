/**
 * ListSubscriptionsHandler
 * @module payment-service/application/queries/subscription
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListSubscriptionsQuery } from './list-subscriptions.query.js';
import {
  SUBSCRIPTION_SERVICE,
  type ISubscriptionService,
} from '@application/services/interfaces/subscription.service.interface.js';
import type { SubscriptionListResponseDTO } from '@application/dtos/responses/subscription-response.dto.js';

@QueryHandler(ListSubscriptionsQuery)
export class ListSubscriptionsHandler
  implements IQueryHandler<ListSubscriptionsQuery, SubscriptionListResponseDTO>
{
  constructor(
    @Inject(SUBSCRIPTION_SERVICE)
    private readonly service: ISubscriptionService,
  ) {}
  async execute(q: ListSubscriptionsQuery): Promise<SubscriptionListResponseDTO> {
    return this.service.list({
      page: q.page,
      limit: q.limit,
      filter: q.filter,
      sortBy: q.sortBy,
      sortDir: q.sortDir,
    });
  }
}
