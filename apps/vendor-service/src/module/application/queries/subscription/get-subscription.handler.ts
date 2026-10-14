import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSubscriptionQuery } from './get-subscription.query.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { SubscriptionResponseDTO } from '../../dtos/responses/subscription-response.dto.js';

@QueryHandler(GetSubscriptionQuery)
export class GetSubscriptionHandler
  implements IQueryHandler<GetSubscriptionQuery, SubscriptionResponseDTO | null>
{
  constructor(
    @Inject(VENDOR_SUBSCRIPTION_SERVICE)
    private readonly service: IVendorSubscriptionService,
  ) {}

  async execute(q: GetSubscriptionQuery): Promise<SubscriptionResponseDTO | null> {
    return this.service.getActive(q.vendorId);
  }
}
