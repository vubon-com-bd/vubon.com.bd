import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListProductsQuery } from './list-products.query.js';
import { PRODUCT_CATALOG_SERVICE, type IProductCatalogService } from '../../services/interfaces/product-catalog.service.interface.js';
import type { ProductListResponseDTO } from '../../dtos/responses/product-list-response.dto.js';

@QueryHandler(ListProductsQuery)
export class ListProductsHandler implements IQueryHandler<ListProductsQuery, ProductListResponseDTO> {
  constructor(@Inject(PRODUCT_CATALOG_SERVICE) private readonly service: IProductCatalogService) {}
  async execute(q: ListProductsQuery): Promise<ProductListResponseDTO> {
    return this.service.list(q.options);
  }
}
