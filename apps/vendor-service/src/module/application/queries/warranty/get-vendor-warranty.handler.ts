import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorWarrantyQuery } from './get-vendor-warranty.query.js';
import {
  VENDOR_WARRANTY_SERVICE,
  type IVendorWarrantyService,
  type VendorWarrantyResponseDto,
} from '../../services/interfaces/vendor-warranty.service.interface.js';

@QueryHandler(GetVendorWarrantyQuery)
export class GetVendorWarrantyHandler
  implements IQueryHandler<GetVendorWarrantyQuery, VendorWarrantyResponseDto>
{
  constructor(@Inject(VENDOR_WARRANTY_SERVICE) private readonly service: IVendorWarrantyService) {}
  async execute(query: GetVendorWarrantyQuery): Promise<VendorWarrantyResponseDto> {
    return this.service.getByVendorId(query.vendorId);
  }
}
