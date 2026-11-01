/**
 * GetSubscriptionHandler
 * @module payment-service/application/queries/subscription
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSubscriptionQuery } from './get-subscription.query.js';
import {
  SUBSCRIPTION_SERVICE,
  type ISubscriptionService,
} from '@application/services/interfaces/subscription.service.interface.js';
import type { SubscriptionResponseDTO } from '@application/dtos/responses/subscription-response.dto.js';

@QueryHandler(GetSubscriptionQuery)
export class GetSubscriptionHandler
  implements IQueryHandler<GetSubscriptionQuery, SubscriptionResponseDTO>
{
  constructor(
    @Inject(SUBSCRIPTION_SERVICE)
    private readonly service: ISubscriptionService,
  ) {}
  async execute(q: GetSubscriptionQuery): Promise<SubscriptionResponseDTO> {
    return this.service.getById(q.subscriptionId);
  }
}
