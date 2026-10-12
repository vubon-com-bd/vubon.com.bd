import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CalculateShippingQuery } from './calculate-shipping.query.js';
import {
  VENDOR_SHIPPING_SERVICE,
  type IVendorShippingService,
} from '../../services/interfaces/vendor-shipping.service.interface.js';

@QueryHandler(CalculateShippingQuery)
export class CalculateShippingHandler
  implements IQueryHandler<CalculateShippingQuery, number>
{
  constructor(@Inject(VENDOR_SHIPPING_SERVICE) private readonly service: IVendorShippingService) {}
  async execute(query: CalculateShippingQuery): Promise<number> {
    return this.service.calculateShipping(query.vendorId, query.zone, query.orderTotal, query.method);
  }
}
