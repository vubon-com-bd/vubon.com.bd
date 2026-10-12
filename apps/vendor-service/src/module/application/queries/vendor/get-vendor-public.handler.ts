import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorPublicQuery } from './get-vendor-public.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorPublicDto } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(GetVendorPublicQuery)
export class GetVendorPublicHandler implements IQueryHandler<GetVendorPublicQuery, VendorPublicDto> {
  constructor(@Inject(VENDOR_SERVICE) private readonly service: IVendorService) {}
  async execute(query: GetVendorPublicQuery): Promise<VendorPublicDto> {
    return this.service.getPublic(query.vendorId);
  }
}
