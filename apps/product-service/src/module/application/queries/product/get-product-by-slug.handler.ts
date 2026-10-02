import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProductBySlugQuery } from './get-product-by-slug.query.js';
import { PRODUCT_CATALOG_SERVICE, type IProductCatalogService } from '../../services/interfaces/product-catalog.service.interface.js';
import type { ProductDetailResponseDTO } from '../../dtos/responses/product-detail-response.dto.js';

@QueryHandler(GetProductBySlugQuery)
export class GetProductBySlugHandler implements IQueryHandler<GetProductBySlugQuery, ProductDetailResponseDTO | null> {
  constructor(@Inject(PRODUCT_CATALOG_SERVICE) private readonly service: IProductCatalogService) {}
  async execute(q: GetProductBySlugQuery): Promise<ProductDetailResponseDTO | null> {
    return this.service.getBySlug(q.slug);
  }
}
