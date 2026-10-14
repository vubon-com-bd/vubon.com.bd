import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPlansQuery } from './list-plans.query.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { SubscriptionPlanListResponseDTO } from '../../dtos/responses/subscription-response.dto.js';

@QueryHandler(ListPlansQuery)
export class ListPlansHandler
  implements IQueryHandler<ListPlansQuery, SubscriptionPlanListResponseDTO>
{
  constructor(
    @Inject(VENDOR_SUBSCRIPTION_SERVICE)
    private readonly service: IVendorSubscriptionService,
  ) {}

  async execute(_q: ListPlansQuery): Promise<SubscriptionPlanListResponseDTO> {
    return this.service.listPlans();
  }
}
