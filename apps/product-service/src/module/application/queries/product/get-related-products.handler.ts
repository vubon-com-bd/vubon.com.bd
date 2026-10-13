import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetRelatedProductsQuery } from './get-related-products.query.js';
import {
  PRODUCT_SERVICE,
  type IProductService,
} from '../../services/interfaces/product.service.interface.js';
import type { ProductSummaryResponseDTO } from '../../dtos/responses/product-response.dto.js';

@QueryHandler(GetRelatedProductsQuery)
export class GetRelatedProductsHandler
  implements IQueryHandler<GetRelatedProductsQuery, readonly ProductSummaryResponseDTO[]>
{
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly service: IProductService,
  ) {}

  async execute(q: GetRelatedProductsQuery): Promise<readonly ProductSummaryResponseDTO[]> {
    return this.service.getRelated(q.productId, q.limit);
  }
}
