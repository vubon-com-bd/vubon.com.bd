import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorShippingQuery } from './get-vendor-shipping.query.js';
import {
  VENDOR_SHIPPING_SERVICE,
  type IVendorShippingService,
  type VendorShippingResponseDto,
} from '../../services/interfaces/vendor-shipping.service.interface.js';

@QueryHandler(GetVendorShippingQuery)
export class GetVendorShippingHandler
  implements IQueryHandler<GetVendorShippingQuery, VendorShippingResponseDto>
{
  constructor(@Inject(VENDOR_SHIPPING_SERVICE) private readonly service: IVendorShippingService) {}
  async execute(query: GetVendorShippingQuery): Promise<VendorShippingResponseDto> {
    return this.service.getByVendorId(query.vendorId);
  }
}
