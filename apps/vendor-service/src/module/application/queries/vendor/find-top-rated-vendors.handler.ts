import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FindTopRatedVendorsQuery } from './find-top-rated-vendors.query.js';
import {
  VENDOR_SEARCH_SERVICE,
  type IVendorSearchService,
} from '../../services/interfaces/vendor-search.service.interface.js';
import type { VendorSummaryDto } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(FindTopRatedVendorsQuery)
export class FindTopRatedVendorsHandler
  implements IQueryHandler<FindTopRatedVendorsQuery, readonly VendorSummaryDto[]>
{
  constructor(@Inject(VENDOR_SEARCH_SERVICE) private readonly service: IVendorSearchService) {}
  async execute(query: FindTopRatedVendorsQuery): Promise<readonly VendorSummaryDto[]> {
    return this.service.findTopRated(query.limit);
  }
}
