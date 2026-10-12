import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorSubscriptionPublicQuery } from './get-vendor-subscription-public.query.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { VendorSubscriptionPublicDto } from '../../dtos/responses/vendor-subscription-response.dto.js';

@QueryHandler(GetVendorSubscriptionPublicQuery)
export class GetVendorSubscriptionPublicHandler
  implements IQueryHandler<GetVendorSubscriptionPublicQuery, VendorSubscriptionPublicDto>
{
  constructor(@Inject(VENDOR_SUBSCRIPTION_SERVICE) private readonly service: IVendorSubscriptionService) {}
  async execute(query: GetVendorSubscriptionPublicQuery): Promise<VendorSubscriptionPublicDto> {
    return this.service.getPublic(query.vendorId);
  }
}
