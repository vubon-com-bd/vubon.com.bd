import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShippingQuery } from './get-shipping.query.js';
import {
  VENDOR_SHIPPING_SERVICE,
  type IVendorShippingService,
  type ShippingConfigDTO,
} from '../../services/interfaces/vendor-shipping.service.interface.js';

@QueryHandler(GetShippingQuery)
export class GetShippingHandler
  implements IQueryHandler<GetShippingQuery, ShippingConfigDTO | null>
{
  constructor(
    @Inject(VENDOR_SHIPPING_SERVICE)
    private readonly service: IVendorShippingService,
  ) {}

  async execute(q: GetShippingQuery): Promise<ShippingConfigDTO | null> {
    return this.service.getByVendorId(q.vendorId);
  }
}
