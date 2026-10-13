import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetFeaturedProductsQuery } from './get-featured-products.query.js';
import {
  PRODUCT_SERVICE,
  type IProductService,
} from '../../services/interfaces/product.service.interface.js';
import type { ProductSummaryResponseDTO } from '../../dtos/responses/product-response.dto.js';

@QueryHandler(GetFeaturedProductsQuery)
export class GetFeaturedProductsHandler
  implements IQueryHandler<GetFeaturedProductsQuery, readonly ProductSummaryResponseDTO[]>
{
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly service: IProductService,
  ) {}

  async execute(q: GetFeaturedProductsQuery): Promise<readonly ProductSummaryResponseDTO[]> {
    return this.service.getFeatured(q.limit);
  }
}
