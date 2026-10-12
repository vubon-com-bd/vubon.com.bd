import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorBySlugQuery } from './get-vendor-by-slug.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorPublicDto } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(GetVendorBySlugQuery)
export class GetVendorBySlugHandler implements IQueryHandler<GetVendorBySlugQuery, VendorPublicDto> {
  constructor(@Inject(VENDOR_SERVICE) private readonly service: IVendorService) {}
  async execute(query: GetVendorBySlugQuery): Promise<VendorPublicDto> {
    return this.service.getBySlug(query.slug);
  }
}
