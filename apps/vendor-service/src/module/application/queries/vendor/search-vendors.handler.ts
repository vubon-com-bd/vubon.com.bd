import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SearchVendorsQuery } from './search-vendors.query.js';
import {
  VENDOR_SEARCH_SERVICE,
  type IVendorSearchService,
  type VendorSearchResultDto,
} from '../../services/interfaces/vendor-search.service.interface.js';

@QueryHandler(SearchVendorsQuery)
export class SearchVendorsHandler implements IQueryHandler<SearchVendorsQuery, VendorSearchResultDto> {
  constructor(@Inject(VENDOR_SEARCH_SERVICE) private readonly service: IVendorSearchService) {}
  async execute(query: SearchVendorsQuery): Promise<VendorSearchResultDto> {
    return this.service.search(query.input);
  }
}
