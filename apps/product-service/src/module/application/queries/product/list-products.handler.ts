import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListProductsQuery } from './list-products.query.js';
import {
  PRODUCT_SERVICE,
  type IProductService,
} from '../../services/interfaces/product.service.interface.js';
import type { ProductListResponseDTO } from '../../dtos/responses/product-response.dto.js';

@QueryHandler(ListProductsQuery)
export class ListProductsHandler
  implements IQueryHandler<ListProductsQuery, ProductListResponseDTO>
{
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly service: IProductService,
  ) {}

  async execute(q: ListProductsQuery): Promise<ProductListResponseDTO> {
    return this.service.list(q.options);
  }
}
