import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorSubscriptionQuery } from './get-vendor-subscription.query.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { VendorSubscriptionResponseDto } from '../../dtos/responses/vendor-subscription-response.dto.js';

@QueryHandler(GetVendorSubscriptionQuery)
export class GetVendorSubscriptionHandler
  implements IQueryHandler<GetVendorSubscriptionQuery, VendorSubscriptionResponseDto>
{
  constructor(@Inject(VENDOR_SUBSCRIPTION_SERVICE) private readonly service: IVendorSubscriptionService) {}
  async execute(query: GetVendorSubscriptionQuery): Promise<VendorSubscriptionResponseDto> {
    return this.service.getByVendorId(query.vendorId);
  }
}
