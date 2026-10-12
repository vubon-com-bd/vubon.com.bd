import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FindFeaturedVendorsQuery } from './find-featured-vendors.query.js';
import {
  VENDOR_SEARCH_SERVICE,
  type IVendorSearchService,
} from '../../services/interfaces/vendor-search.service.interface.js';
import type { VendorPublicDto } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(FindFeaturedVendorsQuery)
export class FindFeaturedVendorsHandler
  implements IQueryHandler<FindFeaturedVendorsQuery, readonly VendorPublicDto[]>
{
  constructor(@Inject(VENDOR_SEARCH_SERVICE) private readonly service: IVendorSearchService) {}
  async execute(query: FindFeaturedVendorsQuery): Promise<readonly VendorPublicDto[]> {
    return this.service.findFeatured(query.limit);
  }
}
