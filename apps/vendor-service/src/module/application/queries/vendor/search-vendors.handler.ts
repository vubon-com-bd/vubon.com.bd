import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SearchVendorsQuery } from './search-vendors.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorSummaryResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(SearchVendorsQuery)
export class SearchVendorsHandler
  implements IQueryHandler<SearchVendorsQuery, readonly VendorSummaryResponseDTO[]>
{
  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly service: IVendorService,
  ) {}

  async execute(q: SearchVendorsQuery): Promise<readonly VendorSummaryResponseDTO[]> {
    return this.service.search(q.term, q.limit);
  }
}
