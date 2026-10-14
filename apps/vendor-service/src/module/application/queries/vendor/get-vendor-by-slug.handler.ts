import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorBySlugQuery } from './get-vendor-by-slug.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(GetVendorBySlugQuery)
export class GetVendorBySlugHandler
  implements IQueryHandler<GetVendorBySlugQuery, VendorResponseDTO>
{
  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly service: IVendorService,
  ) {}

  async execute(q: GetVendorBySlugQuery): Promise<VendorResponseDTO> {
    return this.service.getBySlug(q.slug);
  }
}
