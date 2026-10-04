import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SearchProductsQuery } from './search-products.query.js';
import { PRODUCT_CATALOG_SERVICE, type IProductCatalogService } from '../../services/interfaces/product-catalog.service.interface.js';
import type { ProductListResponseDTO } from '../../dtos/responses/product-list-response.dto.js';

@QueryHandler(SearchProductsQuery)
export class SearchProductsHandler implements IQueryHandler<SearchProductsQuery, ProductListResponseDTO> {
  constructor(@Inject(PRODUCT_CATALOG_SERVICE) private readonly service: IProductCatalogService) {}
  async execute(q: SearchProductsQuery): Promise<ProductListResponseDTO> {
    return this.service.list({ page: q.page, limit: q.limit, filter: { search: q.search } });
  }
}
