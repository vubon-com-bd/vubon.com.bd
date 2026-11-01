import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SearchProductsQuery } from './search-products.query.js';
import {
  PRODUCT_SERVICE,
  type IProductService,
} from '../../services/interfaces/product.service.interface.js';
import type { ProductSummaryResponseDTO } from '../../dtos/responses/product-response.dto.js';

@QueryHandler(SearchProductsQuery)
export class SearchProductsHandler
  implements IQueryHandler<SearchProductsQuery, readonly ProductSummaryResponseDTO[]>
{
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly service: IProductService,
  ) {}

  async execute(q: SearchProductsQuery): Promise<readonly ProductSummaryResponseDTO[]> {
    return this.service.search(q.term, q.limit);
  }
}
